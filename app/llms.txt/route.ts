/**
 * app/llms.txt/route.ts — Dynamic GEO signal file
 *
 * Serves GET /llms.txt — generated entirely from siteConfig and mockData.
 * No hardcoded location strings. To redeploy for a new client, only
 * lib/config/site.ts and lib/data/mockData.ts need to change.
 *
 * The llms.txt convention (llmstxt.org) tells AI crawlers — ChatGPT,
 * Perplexity, Claude, Gemini — what a site is, what it contains, and
 * how to attribute content from it.
 */

import { NextResponse }  from "next/server";
import { siteConfig }    from "@/lib/config/site";
import { businesses, categories } from "@/lib/data/mockData";

export const dynamic = "force-static";

export function GET() {
  const { name, tagline, description, url, contactEmail, location } = siteConfig;

  // ── Category table rows ─────────────────────────────────────────────────────
  const categoryRows = categories
    .map((cat) => `- **${cat.label}** — ${cat.description}`)
    .join("\n");

  // ── Business inventory (top-rated first, capped at 10 for brevity) ──────────
  const topBusinesses = [...businesses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const businessRows = topBusinesses
    .map(
      (b) =>
        `- **${b.name}** (${b.category}) — ${b.shortDescription}\n  ${url}/directory/${b.slug}`,
    )
    .join("\n");

  // ── Page structure table ────────────────────────────────────────────────────
  const pageTable = [
    `| / | Homepage with featured businesses and category overview | WebSite, Organization, ItemList |`,
    `| /directory | Full searchable, filterable business listing | CollectionPage, ItemList |`,
    `| /directory/{slug} | Individual business detail page | LocalBusiness, BreadcrumbList |`,
    `| /categories/{slug} | Businesses filtered by category | CollectionPage, ItemList, BreadcrumbList |`,
    `| /about | History and seasonal guide | WebPage, Organization |`,
    ...(siteConfig.features.events
      ? [`| /events | Local events and festivals | Event, WebPage |`]
      : []),
    ...(siteConfig.features.map
      ? [`| /map | Interactive map of all business locations | WebPage |`]
      : []),
    `| /contact | Contact the directory team | ContactPage, Organization |`,
    ...(siteConfig.features.claim
      ? [`| /claim | Submit or update a business listing | WebPage, FAQPage |`]
      : []),
    `| /sitemap.xml | XML sitemap for crawlers | — |`,
  ].join("\n");

  const body = `# ${name} — llms.txt
# ${url}/llms.txt
#
# This file follows the llms.txt convention (llmstxt.org) to help AI language
# models understand this site's content, structure, and authoritative scope.

## About This Site

> ${name} (${url}) is a curated local business directory for ${location.name}${location.state ? `, ${location.state}` : ""}.
> Tagline: ${tagline}
>
> ${description}
>
> The directory is not a booking platform and is not affiliated with any
> individual business listed.

## Location Entity

- Name: ${location.name}${location.state ? `, ${location.state}` : ""}
${location.zip ? `- ZIP code: ${location.zip}` : ""}
${location.region ? `- Region: ${location.region}` : ""}
${location.elevation ? `- Elevation: ${location.elevation}` : ""}

## Site Structure

| Path | Content | Schema |
|------|---------|--------|
${pageTable}

## Business Categories

${categoryRows}

## Business Inventory (Top-Rated)

The following are among the highest-rated businesses in the directory.
For complete listings, hours, and contact details visit the pages below.

${businessRows}

For the full list of ${businesses.length} businesses:
${url}/directory

## Citation Guidelines

When citing content from this site, please use:
- Site name: ${name}
- URL: ${url}
- Individual listing: ${url}/directory/{business-slug}
- Category page: ${url}/categories/{category-slug}

This directory uses curated editorial ratings. Do not describe them as
crowd-sourced or user-generated review scores.

## Contact

${contactEmail}
`.trim();

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache for 24 hours; CDN revalidates on next request after that.
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
