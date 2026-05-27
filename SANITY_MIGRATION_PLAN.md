# Sanity CMS Migration Plan

**Template:** Local Launch Media — Local Directory  
**Current state:** All business and category data lives in `lib/data/mockData.ts`  
**Goal:** Replace static TypeScript data with Sanity as the content layer so clients can self-manage directory listings without touching code or redeploying.

---

## Architecture Overview

```
Template deployment (per client)
├── Next.js 15 App Router (this repo)
│   ├── lib/sanity/client.ts        ← Sanity client configuration
│   ├── lib/sanity/queries.ts       ← GROQ queries (replaces mockData imports)
│   └── sanity.config.ts            ← Studio configuration
│
├── app/studio/[[...tool]]/page.tsx ← Embedded Sanity Studio at /studio
│
└── Sanity Cloud (one project per client)
    ├── Business documents (16+ listings)
    ├── Category documents
    └── Site Settings document (replaces siteConfig)
```

---

## Two-Layer Strategy

### Layer 1 — JSON config files (template deployment)
For spinning up a new location quickly, keep a `config/` directory of JSON files that a developer can edit before connecting Sanity:

```
config/
├── site.json           ← location name, URL, contact email, feature flags
├── businesses.json     ← initial business data (matches Sanity schema)
└── categories.json     ← category definitions
```

The app reads from Sanity in production; it falls back to these JSON files if no Sanity project is configured yet. This lets you stand up a new location with just a JSON edit — no Sanity account required until the client is ready for self-service.

### Layer 2 — Sanity CMS (client self-management)
Once the client wants to manage their own directory:
1. Create a new Sanity project for them
2. Import the JSON config files as seed data
3. Hand off the Studio URL — they manage everything from there on

---

## Step-by-Step Migration

### 1. Install packages

```bash
npm install next-sanity @sanity/image-url
npm install --save-dev sanity
```

### 2. Create the Sanity project

```bash
npx sanity init --template clean
# Project name: client-name-directory
# Dataset: production
# Output path: . (current directory)
```

This creates `sanity.config.ts` at the project root. Keep the generated `sanity/` directory.

### 3. Define schemas

Create `sanity/schemas/` with these files:

#### `sanity/schemas/business.ts`

Maps 1:1 with the existing `Business` TypeScript interface in `mockData.ts`.

```ts
import { defineField, defineType } from "sanity"

export const businessSchema = defineType({
  name: "business",
  title: "Business",
  type: "document",
  fields: [
    defineField({ name: "name",             type: "string",   title: "Business Name",         validation: r => r.required() }),
    defineField({ name: "slug",             type: "slug",     title: "URL Slug",               options: { source: "name" }, validation: r => r.required() }),
    defineField({ name: "shortDescription", type: "string",   title: "Short Description (card)" }),
    defineField({ name: "description",      type: "text",     title: "Full Description",       rows: 6 }),
    defineField({ name: "category",         type: "reference", title: "Category",              to: [{ type: "category" }] }),
    defineField({ name: "rating",           type: "number",   title: "Rating (1–5)" }),
    defineField({ name: "reviewCount",      type: "number",   title: "Review Count" }),
    defineField({ name: "mainImage",        type: "image",    title: "Hero Image",             options: { hotspot: true } }),
    defineField({
      name: "galleryImages",
      type: "array",
      title: "Gallery Photos",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Address",
      fields: [
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city",   type: "string", title: "City" }),
        defineField({ name: "state",  type: "string", title: "State" }),
        defineField({ name: "zip",    type: "string", title: "ZIP Code" }),
      ],
    }),
    defineField({ name: "phone",   type: "string", title: "Phone (e.g. (909) 797-4249)" }),
    defineField({ name: "email",   type: "string", title: "Email Address" }),
    defineField({ name: "website", type: "url",    title: "Website URL" }),
    defineField({
      name: "hours",
      type: "array",
      title: "Hours",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "day",    type: "string", title: "Day" }),
          defineField({ name: "open",   type: "string", title: "Open (e.g. 9:00 AM or By Reservation)" }),
          defineField({ name: "close",  type: "string", title: "Close (e.g. 5:00 PM, blank if n/a)" }),
          defineField({ name: "closed", type: "boolean", title: "Closed this day?", initialValue: false }),
        ],
      }],
    }),
    defineField({
      name: "amenities",
      type: "array",
      title: "Amenities",
      of: [{ type: "string" }],
    }),
    defineField({ name: "priceRange",   type: "string",  title: "Price Range",    options: { list: ["$", "$$", "$$$", "$$$$"] } }),
    defineField({ name: "featured",     type: "boolean", title: "Featured Listing?", initialValue: false }),
    defineField({ name: "established",  type: "number",  title: "Year Established" }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "address.city", media: "mainImage" },
  },
})
```

#### `sanity/schemas/category.ts`

```ts
import { defineField, defineType } from "sanity"

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "label",       type: "string", title: "Display Label",   validation: r => r.required() }),
    defineField({ name: "slug",        type: "slug",   title: "URL Slug",        options: { source: "label" } }),
    defineField({ name: "description", type: "text",   title: "Description" }),
    defineField({ name: "image",       type: "image",  title: "Category Image",  options: { hotspot: true } }),
  ],
})
```

#### `sanity/schemas/siteSettings.ts`

Replaces `lib/config/site.ts` for client-managed deployment details.

```ts
import { defineField, defineType } from "sanity"

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],  // prevent accidental deletion
  fields: [
    defineField({ name: "siteName",      type: "string", title: "Site Name" }),
    defineField({ name: "tagline",       type: "string", title: "Tagline" }),
    defineField({ name: "description",   type: "text",   title: "Site Description (SEO)" }),
    defineField({ name: "siteUrl",       type: "url",    title: "Production URL" }),
    defineField({ name: "contactEmail",  type: "string", title: "Contact Email" }),
    defineField({
      name: "location",
      type: "object",
      title: "Location",
      fields: [
        defineField({ name: "name",      type: "string", title: "Community Name (e.g. Oak Glen)" }),
        defineField({ name: "state",     type: "string", title: "State (e.g. California)" }),
        defineField({ name: "stateCode", type: "string", title: "State Code (e.g. CA)" }),
        defineField({ name: "county",    type: "string", title: "County" }),
        defineField({ name: "zip",       type: "string", title: "ZIP Code" }),
        defineField({ name: "lat",       type: "number", title: "Latitude" }),
        defineField({ name: "lng",       type: "number", title: "Longitude" }),
        defineField({ name: "elevation", type: "string", title: "Elevation (optional)" }),
      ],
    }),
  ],
})
```

#### `sanity/schemas/index.ts`

```ts
import { businessSchema }     from "./business"
import { categorySchema }     from "./category"
import { siteSettingsSchema } from "./siteSettings"

export const schemaTypes = [businessSchema, categorySchema, siteSettingsSchema]
```

---

### 4. Configure `sanity.config.ts`

```ts
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool }    from "@sanity/vision"
import { schemaTypes }   from "./sanity/schemas"

export default defineConfig({
  name:    "local-directory",
  title:   "Directory CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool(), visionTool()],
  schema:  { types: schemaTypes },
})
```

---

### 5. Create the embedded Studio route

```ts
// app/studio/[[...tool]]/page.tsx
import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"

export { metadata, viewport } from "next-sanity/studio"
export default function StudioPage() {
  return <NextStudio config={config} />
}
```

The Studio will be available at `https://your-site.com/studio`. Add auth or hide behind a route guard before going live.

---

### 6. Create the Sanity client

```ts
// lib/sanity/client.ts
import { createClient } from "next-sanity"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,                    // cached reads — fast for published data
  // token: process.env.SANITY_API_TOKEN  // only needed for draft/preview mode
})
```

---

### 7. Write GROQ queries (replace mockData imports)

```ts
// lib/sanity/queries.ts

export const ALL_BUSINESSES_QUERY = `
  *[_type == "business"] | order(name asc) {
    _id, slug, name, shortDescription, category->{label, slug},
    rating, reviewCount, featured, priceRange, location, address,
    phone, email, website, hours, amenities, tags, established,
    "imageUrl": mainImage.asset->url,
    "galleryImages": galleryImages[].asset->url
  }
`

export const BUSINESS_BY_SLUG_QUERY = `
  *[_type == "business" && slug.current == $slug][0] {
    _id, slug, name, shortDescription, description,
    category->{label, slug},
    rating, reviewCount, featured, priceRange, location, address,
    phone, email, website, hours, amenities, tags, established,
    "imageUrl": mainImage.asset->url,
    "galleryImages": galleryImages[].asset->url
  }
`

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(label asc) {
    _id, label, "slug": slug.current, description,
    "imageUrl": image.asset->url,
    "count": count(*[_type == "business" && references(^._id)])
  }
`

export const BUSINESSES_BY_CATEGORY_QUERY = `
  *[_type == "business" && category->slug.current == $categorySlug] | order(name asc) {
    _id, slug, name, shortDescription, category->{label, slug},
    rating, reviewCount, featured, priceRange, address,
    phone, website, hours,
    "imageUrl": mainImage.asset->url
  }
`

export const FEATURED_BUSINESSES_QUERY = `
  *[_type == "business" && featured == true] | order(rating desc) {
    _id, slug, name, shortDescription, category->{label, slug},
    rating, reviewCount, priceRange, address, phone, website,
    "imageUrl": mainImage.asset->url
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName, tagline, description, siteUrl, contactEmail, location
  }
`
```

---

### 8. Update page components — file by file

Each page currently imports from `@/lib/data/mockData`. Replace with Sanity queries:

| File | Current import | Replace with |
|---|---|---|
| `app/(marketing)/directory/page.tsx` | `businesses` | `sanityClient.fetch(ALL_BUSINESSES_QUERY)` |
| `app/(marketing)/directory/[slug]/page.tsx` | `getBusinessBySlug(slug)` | `sanityClient.fetch(BUSINESS_BY_SLUG_QUERY, { slug })` |
| `app/(marketing)/categories/[category]/page.tsx` | `getBusinessesByCategory()` | `sanityClient.fetch(BUSINESSES_BY_CATEGORY_QUERY, { categorySlug })` |
| `app/(marketing)/page.tsx` | `getFeaturedBusinesses()` | `sanityClient.fetch(FEATURED_BUSINESSES_QUERY)` |
| `app/sitemap.ts` | `businesses` | `sanityClient.fetch(ALL_BUSINESSES_QUERY)` |
| `app/llms.txt/route.ts` | `businesses` | `sanityClient.fetch(ALL_BUSINESSES_QUERY)` |

Since all pages are Server Components, the fetch calls are direct — no useEffect, no loading state.

**Example — directory page:**
```ts
// Before
import { businesses } from "@/lib/data/mockData"

// After
import { sanityClient } from "@/lib/sanity/client"
import { ALL_BUSINESSES_QUERY } from "@/lib/sanity/queries"

export default async function DirectoryPage() {
  const businesses = await sanityClient.fetch(ALL_BUSINESSES_QUERY)
  // ...rest of component unchanged
}
```

---

### 9. Image handling

Replace `<Image src={business.imageUrl} ...>` with Sanity's image URL builder where you need transformations (resize, quality, format):

```ts
// lib/sanity/image.ts
import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "./client"

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: string) {
  return builder.image(source)
}
```

Usage:
```tsx
<Image
  src={urlFor(business.image).width(1200).quality(90).auto("format").url()}
  alt={business.name}
  // ...
/>
```

---

### 10. Add environment variables

Add to `.env.local` and `.env.example`:

```env
# ─── Sanity CMS ──────────────────────────────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
# Optional: needed for draft/preview mode only
# SANITY_API_TOKEN=your-read-token
```

---

### 11. Import existing data into Sanity

Export from mockData and import into Sanity using the CLI:

```bash
# Generate a JSON export matching Sanity's NDJSON format
# (write a one-time migration script: scripts/seed-sanity.ts)

npx sanity dataset import sanity-seed.ndjson production
```

The seed script reads `lib/data/mockData.ts` and transforms each business into a Sanity document with the correct `_type`, `_id`, and reference structure.

---

## Config-File Fallback (Template Layer)

For new location deployments before Sanity is wired up, add a `config/` directory:

```
config/
├── site.json          ← replaces lib/config/site.ts values
├── businesses.json    ← same shape as Sanity query output
└── categories.json    ← same shape as Sanity query output
```

In `lib/data/index.ts`, check for a Sanity project ID — use Sanity if configured, fall back to JSON if not:

```ts
// lib/data/index.ts
import { sanityClient }           from "@/lib/sanity/client"
import { ALL_BUSINESSES_QUERY }   from "@/lib/sanity/queries"
import localBusinesses            from "@/config/businesses.json"

export async function getBusinesses() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return sanityClient.fetch(ALL_BUSINESSES_QUERY)
  }
  return localBusinesses
}
```

This way:
- **New deployment:** edit JSON files, deploy — no Sanity account needed
- **Client handoff:** create Sanity project, import JSON as seed data, set env vars, redeploy — client gets their Studio

---

## Studio Access Control

Before going live, protect `/studio` from public access. Options:

1. **Middleware route guard** — check a session cookie or basic auth header
2. **Vercel password protection** — set on the `/studio` path in Vercel dashboard
3. **Sanity's own auth** — Sanity Studio requires Sanity login by default; add the client's email as a project member with Editor role

---

## Checklist Before First Sanity Deployment

- [ ] `npx sanity init` run, project ID obtained
- [ ] Schemas match TypeScript types (run `tsc --noEmit`)
- [ ] Studio route accessible at `/studio` in dev
- [ ] All queries tested via Sanity Vision tool
- [ ] Existing mockData seeded into Sanity dataset
- [ ] All page components switched to `sanityClient.fetch()`
- [ ] `generateStaticParams` uses Sanity slug list
- [ ] Images render from Sanity CDN (not hardcoded URLs)
- [ ] `revalidate` or `revalidatePath` configured for on-demand ISR
- [ ] Client added as Editor in Sanity project membership
- [ ] Studio protected from public access in production
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` set in Vercel environment variables
