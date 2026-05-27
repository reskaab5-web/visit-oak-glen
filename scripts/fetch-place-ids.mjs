#!/usr/bin/env node
/**
 * fetch-place-ids.mjs
 *
 * Looks up the Google Maps Place ID for every business in mockData.ts
 * and writes the results back into the file as `placeId: "ChIJ..."`.
 *
 * STANDARD WORKFLOW — run this once after populating a new directory:
 *
 *   node scripts/fetch-place-ids.mjs
 *
 * Requires:
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local  (or as env var)
 *   "Maps JavaScript API" or "Places API (New)" enabled in Google Cloud Console
 *
 * Safe to re-run: already-populated placeId fields are skipped.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname }            from "path";
import { fileURLToPath }               from "url";
import { createRequire }               from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, "..");

// ─── Load env ────────────────────────────────────────────────────────────────
// Support .env.local without requiring dotenv as a dep
function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] ??= m[2].trim();
    }
  } catch { /* no .env.local — rely on shell env */ }
}
loadEnv();

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!API_KEY || API_KEY.startsWith("REPLACE_")) {
  console.error(
    "\n❌  No API key found.\n" +
    "    Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and re-run.\n"
  );
  process.exit(1);
}

// ─── Extract businesses from mockData.ts via regex ───────────────────────────
const DATA_FILE = resolve(root, "lib/data/mockData.ts");
let   src       = readFileSync(DATA_FILE, "utf8");

// Find all business objects: pull slug, name, address block
const businessRe =
  /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?address:\s*\{[\s\S]*?street:\s*"([^"]+)"[\s\S]*?city:\s*"([^"]+)"[\s\S]*?state:\s*"([^"]+)"[\s\S]*?zip:\s*"([^"]+)"/g;

const businesses = [];
let m;
while ((m = businessRe.exec(src)) !== null) {
  businesses.push({
    slug:    m[1],
    name:    m[2],
    address: `${m[3]}, ${m[4]}, ${m[5]} ${m[6]}`,
  });
}

if (businesses.length === 0) {
  console.error("❌  No businesses found in mockData.ts — check the regex.");
  process.exit(1);
}

// Check which already have a placeId
function alreadyHasPlaceId(slug) {
  // Look for placeId immediately after the slug block for this business
  const idx   = src.indexOf(`slug: "${slug}"`);
  if (idx === -1) return false;
  const chunk = src.slice(idx, idx + 2000);
  return /placeId:\s*"ChIJ/.test(chunk);
}

// ─── Places API lookup ────────────────────────────────────────────────────────
// Uses Places API (New) — requires an unrestricted API key (no HTTP referrer restrictions)
// for server-side use. Create a temporary unrestricted key in Google Cloud Console,
// run this script, then delete it. Your browser-restricted key stays on Vercel.
async function findPlaceId(name, address) {
  const url = "https://places.googleapis.com/v1/places:searchText";

  const res  = await fetch(url, {
    method:  "POST",
    headers: {
      "Content-Type":     "application/json",
      "X-Goog-Api-Key":   API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
      "Referer":          "https://localhost",
    },
    body: JSON.stringify({ textQuery: `${name} ${address}` }),
  });

  const json = await res.json();

  if (!res.ok) {
    const msg = json.error?.message ?? res.statusText;
    throw new Error(msg);
  }

  return json.places?.[0]?.id ?? null;
}

// ─── Patch mockData.ts — insert placeId after the slug line ──────────────────
function patchPlaceId(slug, placeId) {
  // Insert `placeId: "..."` right before the closing brace of this business
  // We find the slug marker and locate the tier line (last unique field) to
  // anchor the insertion point safely.
  const slugMarker = `slug: "${slug}"`;
  const idx = src.indexOf(slugMarker);
  if (idx === -1) return false;

  // Find "tier:" line for this business (first occurrence after slug)
  const tierRe = /tier:\s*"[^"]+",?/g;
  tierRe.lastIndex = idx;
  const tierMatch = tierRe.exec(src);
  if (!tierMatch) return false;

  const insertAt = tierMatch.index + tierMatch[0].length;
  const line     = `\n  placeId:         "${placeId}",`;

  src = src.slice(0, insertAt) + line + src.slice(insertAt);
  return true;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log(`\n🗺️  Fetching Place IDs for ${businesses.length} businesses...\n`);

let updated = 0;
let skipped = 0;
let failed  = 0;

for (const biz of businesses) {
  if (alreadyHasPlaceId(biz.slug)) {
    console.log(`  ⏭  ${biz.name} — already has Place ID, skipping`);
    skipped++;
    continue;
  }

  process.stdout.write(`  🔍 ${biz.name}... `);

  try {
    const placeId = await findPlaceId(biz.name, biz.address);
    if (placeId) {
      const ok = patchPlaceId(biz.slug, placeId);
      if (ok) {
        console.log(`✅  ${placeId}`);
        updated++;
      } else {
        console.log(`⚠️  found ${placeId} but couldn't patch — check manually`);
        failed++;
      }
    } else {
      console.log(`❌  not found (check business name / address)`);
      failed++;
    }
  } catch (err) {
    console.log(`❌  error: ${err.message}`);
    failed++;
  }

  // Be polite to the API
  await new Promise(r => setTimeout(r, 200));
}

// ─── Write file ───────────────────────────────────────────────────────────────
if (updated > 0) {
  writeFileSync(DATA_FILE, src, "utf8");
  console.log(`\n✅  Wrote ${updated} Place ID(s) to mockData.ts`);
} else {
  console.log(`\nℹ️  No changes written.`);
}

if (skipped > 0) console.log(`⏭  ${skipped} already populated — skipped`);
if (failed  > 0) console.log(`⚠️  ${failed} failed — add placeId manually for those`);

console.log("\nDone! Commit mockData.ts and you're set.\n");
