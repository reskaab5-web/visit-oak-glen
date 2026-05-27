# Local Directory — Next.js Template

A production-ready local business directory built with Next.js 15 App Router.
Clone it, fill in `lib/config/site.ts`, and you have a fully themed, SEO-ready
directory site for any community.

**Oak Glen, CA** is the reference deployment. All other files are generic.

---

## Requirements

| Tool | Version |
|------|---------|
| Node.js | 18.17 or later (tested on 22) |
| npm | 9+ |

> **Why `--legacy-peer-deps`?**
> Leaflet 1.9 ships peer dep declarations for React 16/17.
> React 18 satisfies them at runtime but npm's strict resolver rejects the
> version range. The flag tells npm to use the older, lenient resolver.
> Nothing is actually broken — this is a Leaflet housekeeping lag.
> Track [leaflet#8461](https://github.com/Leaflet/Leaflet/issues/8461) for
> when the upstream fix lands.

---

## Install & run

```bash
git clone <repo-url>
cd local-directory

# Required — see note above
npm install --legacy-peer-deps

cp .env.example .env.local   # fill in your GHL webhook URLs (see below)

npm run dev                  # http://localhost:3000
```

---

## Environment variables

Copy `.env.example` to `.env.local` and set both values before running locally
or deploying. `.env.local` is gitignored — never commit real URLs.

| Variable | Where to get it |
|----------|----------------|
| `GHL_CONTACT_WEBHOOK_URL` | GHL → Automations → Workflows → (contact workflow) → Webhook Trigger → Copy URL |
| `GHL_CLAIM_WEBHOOK_URL` | GHL → Automations → Workflows → (claim workflow) → Webhook Trigger → Copy URL |

Both API routes return `503 Service Unavailable` if the matching env var is
missing, so the site still loads — only form submissions fail.

---

## Deploy for a new client

Everything site-specific lives in **one file**: `lib/config/site.ts`.
Change the values there and the entire site repaints — metadata, nav,
footer, map centre, OG image, favicon, sitemap, and all CSS colours.

### Step-by-step checklist

1. **Fork / copy the repo** into a new repository named for the client.

2. **Edit `lib/config/site.ts`**
   - `name` — full display name, e.g. `"Idyllwild Directory"`
   - `tagline` — short hero line, e.g. `"Gateway to the San Jacintos"`
   - `description` — default meta description (also used in the footer blurb)
   - `url` — canonical base URL with no trailing slash, e.g. `"https://idyllwild.directory"`
   - `contactEmail` — shown in the footer and contact sidebar
   - `location.name` — short place name used in nav, logo, and OG card
   - `location.state`, `location.zip`, `location.region`, `location.elevation`
   - `map.center` — lat/lng of the community midpoint (Google Maps → right-click → copy coordinates)
   - `map.defaultZoom` — 14 works for a 1–2 mile area; lower = zoomed out
   - `features.map / events / claim` — toggle pages off if the client doesn't need them
   - `theme.*` — replace all hex values with the client's brand colours (see theming section below)

3. **Replace business data**
   - `lib/data/mockData.ts` → swap businesses and categories arrays with real data
   - `lib/data/mapCoords.ts` → add a `slug → { lat, lng }` entry for each business

4. **Update page copy**
   - `app/(marketing)/about/page.tsx` — community history / description
   - `app/(marketing)/events/page.tsx` — event listings or CMS wire-up

5. **Update fonts** (optional)
   `app/layout.tsx` imports `Playfair_Display` and `DM_Sans` via `next/font`.
   Swap the import names and keep the `variable: "--font-serif"` / `variable: "--font-sans"`
   assignments — all downstream Tailwind classes continue to work unchanged.

6. **Add `.env.local`** with the client's GHL webhook URLs.

7. **Deploy to Render** (or Vercel / Netlify)
   - Build command: `npm run build`
   - Start command: `npm start`
   - Add both env vars in the platform's environment settings
   - On Render: Settings → Build & Deploy → set `npm install --legacy-peer-deps` as the install command,
     or add `NPM_FLAGS=--legacy-peer-deps` as an environment variable

---

## Theming

The site uses a single layer of CSS custom properties. The flow is:

```
siteConfig.theme  →  buildThemeCssVars()  →  <html style={...}>  →  var(--color-*)  ←  Tailwind tokens
```

You only ever change hex values in `siteConfig.theme`. You never touch
`tailwind.config.ts` or `globals.css` for a retheme. The OG image, favicon,
and Apple touch icon all read `siteConfig.theme` directly and repaint
automatically on the next build.

### Token reference

| Token | CSS var | Used for |
|-------|---------|----------|
| `brandPrimary` | `--color-brand-primary` | Nav bar, deep section backgrounds |
| `brandPrimaryMid` | `--color-brand-primary-mid` | Hover states, overlays |
| `brandPrimaryLight` | `--color-brand-primary-light` | Icon fills, muted headings |
| `brandPrimaryPale` | `--color-brand-primary-pale` | Tinted section backgrounds |
| `brandAccent` | `--color-brand-accent` | CTAs, star ratings, badges |
| `brandAccentDark` | `--color-brand-accent-dark` | Accent hover state |
| `brandAccentPale` | `--color-brand-accent-pale` | Accent tinted backgrounds |
| `surface` | `--color-surface` | Page background |
| `surfaceWarm` | `--color-surface-warm` | Card hover backgrounds |
| `surfaceMuted` | `--color-surface-muted` | Borders, dividers |
| `contentStrong` | `--color-content-strong` | Headings, primary text |
| `contentBase` | `--color-content-base` | Body text |
| `contentSubtle` | `--color-content-subtle` | Captions, labels |
| `onAccent` | `--color-on-accent` | Text placed on accent backgrounds |

---

## Project structure

```
app/
  (marketing)/          # All public-facing pages (share Header + Footer)
    about/              # About the community
    categories/[cat]/   # Category landing pages
    claim/              # "List your business" form
    contact/            # Contact form
    directory/          # Business listing index
    directory/[slug]/   # Individual business detail pages
    events/             # Events page
    map/                # Interactive Leaflet map
  api/
    claim/              # POST → GHL claim webhook (rate-limited)
    contact/            # POST → GHL contact webhook (rate-limited)
  error.tsx             # Segment error boundary
  global-error.tsx      # Root layout error boundary
  globals.css           # Base styles, CSS reset, component layer
  icon.tsx              # Favicon (auto-wired by Next.js)
  apple-icon.tsx        # iOS touch icon
  layout.tsx            # Root layout — fonts, CSS vars, metadata
  not-found.tsx         # 404 page
  opengraph-image.tsx   # OG / Twitter share card
  robots.ts             # robots.txt
  sitemap.ts            # sitemap.xml

components/
  forms/                # ContactForm, ClaimForm
  layout/               # Header, Footer
  map/                  # MapClient (Leaflet, loaded with ssr:false)
  ui/                   # BusinessCard, BusinessCardSkeleton, SearchBar, etc.

lib/
  config/
    site.ts             # ← THE file to edit per client
  data/
    mapCoords.ts        # slug → lat/lng (update per client)
    mockData.ts         # businesses[], categories[] (replace per client)
  rateLimit.ts          # In-memory sliding-window rate limiter
```

---

## Rate limiting

`/api/claim` and `/api/contact` use an in-memory sliding-window rate limiter
(`lib/rateLimit.ts`). Limits are:

| Route | Limit |
|-------|-------|
| `/api/contact` | 5 requests per 15 minutes per IP |
| `/api/claim` | 3 requests per hour per IP |

**Caveat:** the in-memory store does not share state across multiple server
instances. This is fine on Render's single-process Node deployment. If you
ever scale to multiple instances, swap `lib/rateLimit.ts`'s `store` for
[Upstash Redis](https://upstash.com/) — the call sites in both routes don't change.
