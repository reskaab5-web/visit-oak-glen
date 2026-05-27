/**
 * app/opengraph-image.tsx — Root OG / Twitter share card (1200 × 630)
 *
 * Next.js auto-injects these tags on every page that doesn't override them:
 *   <meta property="og:image" content="/opengraph-image?..." />
 *   <meta name="twitter:image" content="/opengraph-image?..." />
 *
 * One file covers Facebook, iMessage, Slack, LinkedIn, and Twitter previews.
 *
 * Design:
 *   - Brand-primary background with a large decorative ring (top-right)
 *   - Accent eyebrow: location + state (+ elevation if set)
 *   - Two-tone site name: pale headline line + muted "Directory" line
 *   - Accent underline bar
 *   - Tagline
 *   - Bottom bar: region · elevation  |  canonical URL
 *
 * All values flow from siteConfig — change the config, rebuild, card updates.
 * No Photoshop, no external font fetches, no per-client asset work required.
 *
 * To override on a specific page (e.g. a business listing), create
 * app/(marketing)/directory/[slug]/opengraph-image.tsx with the same
 * exports but different content.
 */

import { ImageResponse } from "next/og";
import { siteConfig }    from "@/lib/config/site";

// ─── Metadata consumed by Next.js ─────────────────────────────────────────────

export const alt  = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function Image() {
  const {
    brandPrimary,
    brandPrimaryMid,
    brandPrimaryLight,
    brandPrimaryPale,
    brandAccent,
    brandAccentPale,
  } = siteConfig.theme;

  const { location, name, tagline, url } = siteConfig;

  // Strip protocol for display (https://visitoakglen.com → visitoakglen.com)
  const displayUrl = url.replace(/^https?:\/\//, "");

  // Eyebrow: "OAK GLEN · CA · 4,800 FT" (elevation only if defined)
  const eyebrowParts = [
    location.name.toUpperCase(),
    location.state,
    ...(location.elevation ? [location.elevation] : []),
  ];

  // Split name for two-tone effect: first word(s) pale, last word muted
  // "Oak Glen Directory" → headline = "Oak Glen", sub = "Directory"
  const nameParts  = name.split(" ");
  const subWord    = nameParts.at(-1) ?? "";
  const headLine   = nameParts.slice(0, -1).join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width:          "100%",
          height:         "100%",
          display:        "flex",
          flexDirection:  "column",
          background:     brandPrimary,
          padding:        "72px 80px 64px",
          position:       "relative",
          overflow:       "hidden",
        }}
      >

        {/* ── Decorative ring — top-right ── */}
        <div
          style={{
            position:     "absolute",
            top:          "-140px",
            right:        "-140px",
            width:        "560px",
            height:       "560px",
            borderRadius: "50%",
            border:       `72px solid ${brandPrimaryMid}`,
            opacity:      0.55,
          }}
        />

        {/* ── Second, smaller ring ── */}
        <div
          style={{
            position:     "absolute",
            top:          "60px",
            right:        "60px",
            width:        "280px",
            height:       "280px",
            borderRadius: "50%",
            border:       `3px solid ${brandAccent}`,
            opacity:      0.2,
          }}
        />

        {/* ── Eyebrow ── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "14px",
            marginBottom:   "48px",
          }}
        >
          {/* Accent dot */}
          <div
            style={{
              width:        "10px",
              height:       "10px",
              borderRadius: "50%",
              background:   brandAccent,
              flexShrink:   0,
            }}
          />
          <span
            style={{
              color:        brandAccent,
              fontSize:     "20px",
              fontWeight:   600,
              letterSpacing: "0.18em",
            }}
          >
            {eyebrowParts.join("  ·  ")}
          </span>
        </div>

        {/* ── Site name (two-tone) ── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            marginBottom:  "28px",
            lineHeight:    1.0,
          }}
        >
          <span
            style={{
              fontSize:   "92px",
              fontWeight: 700,
              color:      brandPrimaryPale,
            }}
          >
            {headLine}
          </span>
          <span
            style={{
              fontSize:   "92px",
              fontWeight: 700,
              color:      brandPrimaryLight,
            }}
          >
            {subWord}
          </span>
        </div>

        {/* ── Accent underline ── */}
        <div
          style={{
            width:        "72px",
            height:       "5px",
            background:   brandAccent,
            borderRadius: "3px",
            marginBottom: "32px",
          }}
        />

        {/* ── Tagline ── */}
        <span
          style={{
            fontSize:  "32px",
            color:     brandPrimaryPale,
            opacity:   0.75,
            maxWidth:  "700px",
            lineHeight: 1.35,
          }}
        >
          {tagline}
        </span>

        {/* ── Bottom bar ── */}
        <div
          style={{
            position:       "absolute",
            bottom:         "56px",
            left:           "80px",
            right:          "80px",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
          }}
        >
          {/* Region · elevation */}
          <span
            style={{
              fontSize: "19px",
              color:    brandPrimaryPale,
              opacity:  0.38,
              letterSpacing: "0.04em",
            }}
          >
            {location.region}
            {location.elevation ? `  ·  ${location.elevation}` : ""}
          </span>

          {/* URL pill */}
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              background:   brandAccentPale,
              borderRadius: "100px",
              padding:      "8px 22px",
            }}
          >
            <span
              style={{
                fontSize:     "18px",
                fontWeight:   600,
                color:        brandPrimary,
                letterSpacing: "0.03em",
              }}
            >
              {displayUrl}
            </span>
          </div>
        </div>

      </div>
    ),
    { ...size },
  );
}
