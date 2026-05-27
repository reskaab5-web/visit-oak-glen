/**
 * lib/schema/builders.ts — JSON-LD structured data builders
 *
 * Centralises all schema.org markup so it stays consistent across pages
 * and is driven from siteConfig — no hardcoded strings.
 *
 * Why this matters:
 *  SEO  — BreadcrumbList, ItemList, and LocalBusiness drive rich results
 *          (star ratings, breadcrumbs, sitelinks search box in SERPs)
 *  AEO  — FAQPage powers "People Also Ask" boxes and voice-search answers;
 *          speakable marks the sentences AI assistants should read aloud
 *  GEO  — Consistent entity graph (WebSite → Organization → LocalBusiness)
 *          helps ChatGPT, Perplexity, and Gemini attribute content correctly
 *
 * Usage:
 *   import { buildWebSiteSchema, buildOrganizationSchema } from "@/lib/schema/builders";
 *   import { JsonLd } from "@/components/seo/JsonLd";
 *   <JsonLd data={[buildWebSiteSchema(siteConfig), buildOrganizationSchema(siteConfig)]} />
 *
 * All functions return plain objects — JSON.stringify-safe, no class instances.
 */

import type { SiteConfig }  from "@/lib/config/site";
import type { Business }    from "@/lib/data/mockData";

// ─── Shared helpers ────────────────────────────────────────────────────────────

/** Absolute URL helper — joins siteConfig.url with a path segment. */
function abs(url: string, path: string): string {
  return `${url}${path.startsWith("/") ? path : `/${path}`}`;
}

// ─── WebSite + Sitelinks SearchAction ─────────────────────────────────────────
//
// Enables Google's Sitelinks Search Box in SERPs.
// AEO: signals to answer engines that this is an authoritative site hub.

export function buildWebSiteSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type":    "WebSite",
    "@id":      `${config.url}/#website`,
    name:       config.name,
    url:        config.url,
    description: config.description,
    inLanguage:  "en-US",
    potentialAction: {
      "@type":       "SearchAction",
      target: {
        "@type":       "EntryPoint",
        urlTemplate:   `${config.url}/directory?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Organization ─────────────────────────────────────────────────────────────
//
// Links the directory to a persistent entity Google can track across pages.
// GEO: AI systems use Organization to attribute authorship and source trust.

export function buildOrganizationSchema(config: SiteConfig) {
  return {
    "@context":  "https://schema.org",
    "@type":     "Organization",
    "@id":       `${config.url}/#organization`,
    name:        config.name,
    url:         config.url,
    email:       config.contactEmail,
    description: config.description,
    areaServed: {
      "@type":   "City",
      name:      config.location.name,
      sameAs:    `https://en.wikipedia.org/wiki/${encodeURIComponent(config.location.name.replace(/ /g, "_"))},_California`,
    },
    contactPoint: {
      "@type":            "ContactPoint",
      contactType:        "customer support",
      email:              config.contactEmail,
      availableLanguage:  "English",
    },
  };
}

// ─── LocalBusiness (individual listing) ───────────────────────────────────────
//
// Drives star ratings, hours, address, and phone in SERPs.
// AEO: directly answers "What time does X open?" voice queries.
// GEO: most complete entity signal for AI systems — don't skip any field.

export function buildLocalBusinessSchema(business: Business, config: SiteConfig) {
  return {
    "@context":   "https://schema.org",
    "@type":      "LocalBusiness",
    "@id":        `${abs(config.url, `/directory/${business.slug}`)}#business`,
    name:         business.name,
    description:  business.shortDescription,
    url:          abs(config.url, `/directory/${business.slug}`),
    image:        business.imageUrl,
    telephone:    business.phone,
    priceRange:   business.priceRange,
    // sameAs: array of authoritative URLs for entity disambiguation.
    // GEO: each social profile URL strengthens the knowledge graph entity link.
    ...(() => {
      const urls: string[] = [];
      if (business.website) urls.push(business.website);
      if (business.socialLinks) urls.push(...business.socialLinks.map((s) => s.url));
      return urls.length > 0 ? { sameAs: urls.length === 1 ? urls[0] : urls } : {};
    })(),
    ...(business.email    && { email:     business.email   }),
    ...(business.established && { foundingDate: String(business.established) }),
    address: {
      "@type":          "PostalAddress",
      streetAddress:    business.address.street,
      addressLocality:  business.address.city,
      addressRegion:    business.address.state,
      postalCode:       business.address.zip,
      addressCountry:   "US",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + business.address.street + " " + business.address.city)}`,
    aggregateRating: {
      "@type":       "AggregateRating",
      ratingValue:   business.rating,
      reviewCount:   business.reviewCount,
      bestRating:    5,
      worstRating:   1,
    },
    openingHoursSpecification: business.hours
      .filter((h) => !h.closed)
      .map((h) => ({
        "@type":    "OpeningHoursSpecification",
        dayOfWeek:  `https://schema.org/${h.day}`,
        opens:      h.open,
        closes:     h.close,
      })),
    // Speakable — marks text AI assistants and voice search should read aloud.
    // AEO: Google uses this for audio rich results and Assistant responses.
    speakable: {
      "@type":       "SpeakableSpecification",
      cssSelector:   ["h1", "[data-speakable]"],
    },
    // Parent organization links the listing back to the directory entity.
    parentOrganization: {
      "@id": `${config.url}/#organization`,
    },
  };
}

// ─── BreadcrumbList ────────────────────────────────────────────────────────────
//
// Shows breadcrumb trail directly in Google SERPs.
// GEO: helps AI understand page hierarchy ("this page is inside categories").

export interface BreadcrumbItem {
  name: string;
  item: string; // full URL
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context":     "https://schema.org",
    "@type":        "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       crumb.name,
      item:       crumb.item,
    })),
  };
}

// ─── ItemList (directory / category pages) ────────────────────────────────────
//
// Tells search engines and AI systems exactly what entities are on the page.
// GEO: the most important schema for a directory — AI uses ItemList to
// enumerate businesses when answering "what are the best X in Y?" queries.

export function buildItemListSchema(
  businesses: Business[],
  listUrl:    string,
  config:     SiteConfig,
) {
  return {
    "@context":    "https://schema.org",
    "@type":       "ItemList",
    name:          `Businesses in ${config.location.name}`,
    url:           listUrl,
    numberOfItems: businesses.length,
    itemListElement: businesses.map((b, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      url:        abs(config.url, `/directory/${b.slug}`),
      name:       b.name,
      description: b.shortDescription,
      image:      b.imageUrl,
    })),
  };
}

// ─── CollectionPage ────────────────────────────────────────────────────────────
//
// Wraps ItemList pages with page-level context.
// GEO: AI systems treat CollectionPage as an authoritative list resource.

export function buildCollectionPageSchema(
  config:      SiteConfig,
  path:        string,
  name:        string,
  description: string,
) {
  return {
    "@context":  "https://schema.org",
    "@type":     "CollectionPage",
    "@id":       `${abs(config.url, path)}#collection`,
    name,
    description,
    url:         abs(config.url, path),
    isPartOf:    { "@id": `${config.url}/#website` },
    publisher:   { "@id": `${config.url}/#organization` },
    inLanguage:  "en-US",
  };
}

// ─── Event ────────────────────────────────────────────────────────────────────
//
// Surfaces events in Google's Events rich results and in AI event queries.
// AEO: directly answers "When is the Apple Blossom Festival?" queries.

export interface EventInput {
  name:        string;
  description: string;
  startDate:   string; // ISO 8601 date or datetime
  endDate?:    string;
  url:         string;
  imageUrl?:   string;
  isRecurring?: boolean;
}

export function buildEventSchema(event: EventInput, config: SiteConfig) {
  return {
    "@context":   "https://schema.org",
    "@type":      "Event",
    name:         event.name,
    description:  event.description,
    url:          event.url,
    ...(event.imageUrl && { image: event.imageUrl }),
    startDate:    event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    eventStatus:  "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type":   "Place",
      name:      config.location.name,
      address: {
        "@type":         "PostalAddress",
        addressLocality: config.location.name,
        addressRegion:   config.location.state,
        postalCode:      config.location.zip,
        addressCountry:  "US",
      },
    },
    organizer: {
      "@id": `${config.url}/#organization`,
    },
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
//
// Powers "People Also Ask" accordion in SERPs and voice-search answers.
// AEO: the single highest-impact schema for featured snippet capture.
// Rule: every FAQ in schema MUST have a matching visible Q&A on the page.

export interface FaqItem {
  question: string;
  answer:   string;
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context":   "https://schema.org",
    "@type":      "FAQPage",
    mainEntity:   items.map((item) => ({
      "@type":          "Question",
      name:             item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    item.answer,
      },
    })),
  };
}

// ─── ContactPage ─────────────────────────────────────────────────────────────
//
// Marks the page as the canonical contact resource for the organization.
// GEO: AI systems surface contact pages when users ask "how do I contact X?"

export function buildContactPageSchema(config: SiteConfig) {
  return {
    "@context":  "https://schema.org",
    "@type":     "ContactPage",
    "@id":       `${config.url}/contact#contactpage`,
    name:        `Contact ${config.name}`,
    url:         `${config.url}/contact`,
    description: `Get in touch with the ${config.name} team`,
    isPartOf:    { "@id": `${config.url}/#website` },
    publisher:   { "@id": `${config.url}/#organization` },
    inLanguage:  "en-US",
  };
}

// ─── Article (blog posts) ─────────────────────────────────────────────────────
//
// Enables Google News / Discover eligibility and AEO content attribution.
// GEO: Article schema with author + sameAs links each post to the site entity.

export interface ArticleInput {
  slug:          string;
  title:         string;
  description:   string;
  publishedAt:   string;
  updatedAt?:    string;
  imageUrl:      string;
  imageAlt:      string;
  authorName:    string;
  focusKeyphrase?: string;
}

export function buildArticleSchema(article: ArticleInput, config: SiteConfig) {
  const url = abs(config.url, `/blog/${article.slug}`);
  return {
    "@context":       "https://schema.org",
    "@type":          "Article",
    "@id":            `${url}#article`,
    headline:         article.title,
    description:      article.description,
    url,
    datePublished:    article.publishedAt,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    image: {
      "@type":  "ImageObject",
      url:      article.imageUrl,
      caption:  article.imageAlt,
    },
    author: {
      "@type": "Organization",
      name:    article.authorName,
      "@id":   `${config.url}/#organization`,
    },
    publisher: {
      "@id": `${config.url}/#organization`,
    },
    isPartOf: { "@id": `${config.url}/#website` },
    inLanguage: "en-US",
    // Speakable marks the excerpt sentence for voice-search audio rich results.
    speakable: {
      "@type":     "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

// ─── WebPage (generic fallback) ───────────────────────────────────────────────

export function buildWebPageSchema(
  config:      SiteConfig,
  path:        string,
  name:        string,
  description: string,
) {
  return {
    "@context":  "https://schema.org",
    "@type":     "WebPage",
    "@id":       `${abs(config.url, path)}#webpage`,
    name,
    description,
    url:         abs(config.url, path),
    isPartOf:    { "@id": `${config.url}/#website` },
    publisher:   { "@id": `${config.url}/#organization` },
    inLanguage:  "en-US",
  };
}
