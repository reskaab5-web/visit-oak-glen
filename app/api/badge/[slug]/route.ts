/**
 * GET /api/badge/[slug]
 *
 * Returns an SVG "Listed on [Directory]" badge that businesses can embed
 * on their own websites. The badge links back to their listing page, creating
 * a genuine dofollow backlink from the business's domain to the directory.
 *
 * Usage (for business to embed on their site):
 *   <a href="https://visitoakglen.com/directory/[slug]">
 *     <img src="https://visitoakglen.com/api/badge/[slug]" alt="Listed on Visit Oak Glen" width="180" height="48" />
 *   </a>
 *
 * The badge:
 *  - Is a standalone SVG — no JS, no cookies, no tracking
 *  - References brand colors from siteConfig for consistent styling
 *  - Returns 404 if the slug doesn't correspond to a known business
 *  - Is cache-controlled so CDNs can cache it aggressively
 *
 * Premium listings get an embeddable badge embed-code section on their
 * detail pages (wired in Task #71 detail page update).
 */

import { NextRequest, NextResponse }  from "next/server";
import { getBusinessBySlug }          from "@/lib/data/mockData";
import { siteConfig }                 from "@/lib/config/site";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    return new NextResponse("Business not found", { status: 404 });
  }

  const siteName  = siteConfig.name;
  const bizName   = business.name;
  // Truncate long names so they don't overflow the badge
  const displayName = bizName.length > 28 ? bizName.slice(0, 27) + "…" : bizName;

  // Brand colors
  const bgColor     = "#2D5016"; // brand-primary (deep forest green from siteConfig)
  const accentColor = "#E8A020"; // brand-accent  (harvest gold)
  const textLight   = "#FFFFFF";
  const textMuted   = "rgba(255,255,255,0.75)";

  const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="52"
  viewBox="0 0 200 52"
  role="img"
  aria-label="Listed on ${siteName}"
>
  <title>Listed on ${siteName}</title>

  <!-- Background -->
  <rect width="200" height="52" rx="8" fill="${bgColor}" />

  <!-- Left accent strip -->
  <rect width="5" height="52" rx="0" fill="${accentColor}" />
  <rect x="0" y="0" width="8" height="52" rx="4" fill="${accentColor}" />
  <rect x="5" y="0" width="3" height="52" fill="${bgColor}" opacity="0.3" />

  <!-- Star icon (accent) -->
  <text x="18" y="20" font-family="serif" font-size="11" fill="${accentColor}" text-anchor="start">★</text>

  <!-- "Listed on" label -->
  <text
    x="34"
    y="20"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="9"
    font-weight="400"
    fill="${textMuted}"
    text-anchor="start"
    letter-spacing="0.08em"
  >LISTED ON</text>

  <!-- Site name -->
  <text
    x="34"
    y="34"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="11"
    font-weight="700"
    fill="${textLight}"
    text-anchor="start"
    letter-spacing="0.02em"
  >${escapeXml(siteName)}</text>

  <!-- Business name -->
  <text
    x="100"
    y="44"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="8"
    font-weight="400"
    fill="${textMuted}"
    text-anchor="middle"
    letter-spacing="0.03em"
  >${escapeXml(displayName)}</text>

</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type":  "image/svg+xml",
      // Cache 1 hour on CDN, revalidate in background — badge rarely changes
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      // Allow cross-origin embedding on any business website
      "Access-Control-Allow-Origin": "*",
    },
  });
}

/** Escape characters that would break inline SVG XML */
function escapeXml(str: string): string {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&apos;");
}
