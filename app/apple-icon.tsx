/**
 * app/apple-icon.tsx — Apple Touch Icon (180 × 180)
 *
 * Auto-served at /apple-icon and injected as:
 *   <link rel="apple-touch-icon" href="/apple-icon?..." sizes="180x180">
 *
 * Used when a visitor adds the site to their iOS home screen.
 * Larger canvas → richer detail: uses the same initial letter design
 * with a subtle leaf badge to echo the header logo.
 */

import { ImageResponse } from "next/og";
import { siteConfig }    from "@/lib/config/site";

export const size        = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const { brandPrimary, brandAccent, brandPrimaryLight, brandPrimaryPale } =
    siteConfig.theme;

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
          borderRadius:    "38px", // iOS icon rounding
        }}
      >
        {/* Soft glow ring */}
        <div
          style={{
            position:       "absolute",
            width:          "120px",
            height:         "120px",
            borderRadius:   "50%",
            background:     brandAccent,
            opacity:        0.15,
          }}
        />

        {/* Initial letter */}
        <span
          style={{
            fontSize:    "80px",
            fontWeight:  700,
            color:       brandPrimaryPale,
            lineHeight:  1,
            marginTop:   "4px",
          }}
        >
          {initial}
        </span>

        {/* Accent dot — bottom-right badge */}
        <div
          style={{
            position:       "absolute",
            bottom:         "22px",
            right:          "22px",
            width:          "28px",
            height:         "28px",
            borderRadius:   "50%",
            background:     brandAccent,
            border:         `3px solid ${brandPrimary}`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "14px", color: brandPrimaryLight }}>
            ✦
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
