/**
 * app/sitemap.ts — Next.js dynamic sitemap
 *
 * Automatically submitted to search engines via the <link rel="sitemap"> tag
 * that Next.js adds to every page's <head> when this file is present.
 *
 * Covers:
 *  - All static marketing pages
 *  - All dynamic /directory/[slug] listing pages
 *  - All category pages derived from mock data
 *
 * When you switch from mockData to a real CMS (Sanity, Contentful, etc.):
 *  - Replace the businesses / categories imports with your data-fetching calls
 *  - Mark this function `async` and await those calls
 *
 * Priority / changefreq guidance:
 *  - Home: 1.0 / daily  (most important, crawl often for promotions)
 *  - Directory index + categories: 0.9 / weekly
 *  - Individual listings: 0.7 / monthly
 *  - Static pages (about, events, map): 0.6 / monthly
 *  - Utility pages (claim, contact): 0.4 / yearly
 */

import type { MetadataRoute } from "next";
import { siteConfig }         from "@/lib/config/site";
import { businesses, categories } from "@/lib/data/mockData";
import { blogPosts }          from "@/lib/data/blogData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function url(path: string): string {
  return `${siteConfig.url}${path}`;
}

type SitemapEntry = MetadataRoute.Sitemap[number];

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────────────────────────

  const staticPages: SitemapEntry[] = [
    {
      url:             url("/"),
      lastModified:    new Date(),
      changeFrequency: "daily",
      priority:        1.0,
    },
    {
      url:             url("/directory"),
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             url("/categories"),
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             url("/about"),
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.6,
    },
    {
      url:             url("/contact"),
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.4,
    },
    {
      url:             url("/claim"),
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.4,
    },
  ];

  // ── Feature-flagged pages ─────────────────────────────────────────────────

  if (siteConfig.features.events) {
    staticPages.push({
      url:             url("/events"),
      lastModified:    new Date(),
      changeFrequency: "daily",
      priority:        0.7,
    });
  }

  if (siteConfig.features.map) {
    staticPages.push({
      url:             url("/map"),
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.5,
    });
  }

  // ── Category pages ────────────────────────────────────────────────────────

  const categoryPages: SitemapEntry[] = categories.map((cat) => ({
    url:             url(`/categories/${cat.slug}`),
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.8,
  }));

  // ── Individual listing pages ──────────────────────────────────────────────

  const listingPages: SitemapEntry[] = businesses.map((biz) => ({
    url:             url(`/directory/${biz.slug}`),
    lastModified:    new Date(),
    changeFrequency: "monthly" as const,
    priority:        0.7,
  }));

  // ── Blog index + post pages ───────────────────────────────────────────────
  // Blog earns rankings through fresh content — keep changeFrequency "weekly"
  // so crawlers revisit as new posts are added.

  const blogIndexPage: SitemapEntry = {
    url:             url("/blog"),
    lastModified:    new Date(),
    changeFrequency: "weekly",
    priority:        0.8,
  };

  const blogPostPages: SitemapEntry[] = blogPosts.map((post) => ({
    url:             url(`/blog/${post.slug}`),
    lastModified:    post.updatedAt
      ? new Date(post.updatedAt)
      : new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority:        0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...listingPages,
    blogIndexPage,
    ...blogPostPages,
  ];
}
