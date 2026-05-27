/**
 * app/robots.ts — Next.js robots.txt generator
 *
 * Served at /robots.txt. Tells crawlers:
 *  - Index the public site
 *  - Block API routes (no SEO value, avoids accidental form indexing)
 *  - Block /claim — form-only page that shouldn't appear in SERPs
 *  - Points to the sitemap so Google picks it up automatically
 *
 * Disallow rules use path prefixes, so /api/* covers all API routes.
 */

import type { MetadataRoute } from "next";
import { siteConfig }         from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  [
          "/api/",    // server-only endpoints — no crawl value
          "/claim",   // form page — not useful as a search result
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
