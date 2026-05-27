import type { NextConfig } from "next";

// ─── Security headers ─────────────────────────────────────────────────────────
//
// Applied to all routes. These are the headers that security scanners
// (Snyk, Observatory, Lighthouse) check for and that Google's Page Experience
// audit expects to see.
//
// CSP is intentionally omitted here — it needs careful tuning per deployment
// once inline scripts, GTM, fonts, and map tiles are finalised. Add it as a
// separate `Content-Security-Policy` header in a follow-up pass.

const SECURITY_HEADERS = [
  // Prevents the page from being embedded in an iframe on other origins.
  // Stops clickjacking attacks.
  { key: "X-Frame-Options",        value: "SAMEORIGIN" },

  // Prevents browsers from MIME-sniffing a response away from the declared
  // content-type. Blocks a class of XSS attacks on uploaded-content routes.
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Sends the full URL as the referrer for same-origin navigations;
  // only the origin for cross-origin navigations; nothing over HTTP.
  { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },

  // Opts out of browser features that the site doesn't use.
  // Reduces attack surface if a dependency is ever compromised.
  {
    key:   "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },

  // Forces HTTPS for 1 year, including subdomains.
  // Only effective once deployed to a host with a valid TLS cert.
  {
    key:   "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

// ─── Next.js config ───────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  // ── Images ────────────────────────────────────────────────────────────────
  // Add domains here for any external image hosts used in mockData / CMS.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos"       },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // ── Security headers ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to every route — adjust the source pattern if you ever need
        // to exclude specific paths (e.g. /api/webhooks for third-party POSTs).
        source:  "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
