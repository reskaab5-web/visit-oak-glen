/**
 * app/icon.tsx — Favicon (32 × 32)
 *
 * Next.js App Router auto-serves this at /icon and injects:
 *   <link rel="icon" href="/icon?..." type="image/png" sizes="32x32">
 *
 * Design: brand-primary square, brand-accent leaf mark, surface dot.
 * Colors are read directly from siteConfig.theme — changing the hex values
 * there automatically repaints the favicon on next build.
 *
 * No Photoshop, no manual asset export needed per client.
 */

import { ImageResponse } from "next/og";
import { siteConfig }    from "@/lib/config/site";

// ─── Metadata consumed by Next.js ─────────────────────────────────────────────

export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

// ─── Icon ─────────────────────────────────────────────────────────────────────

export default function Icon() {
  const { brandPrimary, brandAccent, brandPrimaryLight } = siteConfig.theme;
  // First letter of location name — readable at small sizes
  const initial = siteConfig.location.name.charAt(0).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          background:      brandPrimary,
          borderRadius:    "6px",
        }}
      >
        {/* Accent ring */}
        <div
          style={{
            position:       "absolute",
            width:          "20px",
            height:         "20px",
            borderRadius:   "50%",
            background:     brandAccent,
            opacity:        0.25,
          }}
        />
        {/* Initial letter */}
        <span
          style={{
            fontSize:    "16px",
            fontWeight:  700,
            color:       brandPrimaryLight,
            lineHeight:  1,
            // Nudge letter into optical centre
            marginTop:   "1px",
          }}
        >
          {initial}
        </span>
      </div>
    ),
    { ...size },
  );
}
