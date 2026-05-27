/**
 * lib/config/site.ts — Master site configuration
 *
 * This is THE file to edit when deploying this template for a new client.
 * Everything in here flows into metadata, layout CSS vars, nav, footer,
 * and the map. No other file should have hardcoded site-specific values.
 *
 * How theming works:
 *   1. `siteConfig.theme` holds hex color values for the client's brand.
 *   2. `buildThemeCssVars()` converts them to CSS custom property names.
 *   3. `app/layout.tsx` injects them onto <html style={...}>.
 *   4. Tailwind tokens in tailwind.config.ts reference those vars via var(--color-*).
 *   Result: change a hex value here → entire site repaints. No other edits needed.
 *
 * Fonts:
 *   The font stack (serif / sans) is configured in app/layout.tsx via next/font.
 *   Change the imported font families there to reskin typography.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SiteTheme {
  // Primary brand color — nav bar, deep section backgrounds, headings on light bg
  brandPrimary:      string;
  brandPrimaryMid:   string;
  brandPrimaryLight: string;
  brandPrimaryPale:  string;

  // Accent / highlight — CTAs, stars, badges, focus rings
  brandAccent:     string;
  brandAccentDark: string;
  brandAccentPale: string;

  // Surface / background tones
  surface:       string;
  surfaceWarm:   string;
  surfaceMuted:  string;

  // Content / text tones
  contentStrong: string;
  contentBase:   string;
  contentSubtle: string;

  // Text placed directly on accent-coloured backgrounds
  onAccent: string;
}

export interface SiteConfig {
  // ── Identity ───────────────────────────────────────────────────────────────
  /** Full display name shown in metadata and footer, e.g. "Oak Glen Directory" */
  name:         string;
  /** Short tagline for hero and page titles, e.g. "Discover Apple Country" */
  tagline:      string;
  /** Default meta description used on pages without their own. */
  description:  string;
  /** Canonical base URL — no trailing slash. Used for metadataBase. */
  url:          string;
  /** Public contact email shown in footer and claim/contact pages. */
  contactEmail: string;

  // ── Location ───────────────────────────────────────────────────────────────
  location: {
    /** Short place name used in nav ("About Oak Glen") and hero eyebrows. */
    name:       string;
    state:      string;
    zip:        string;
    /** Longer regional descriptor, e.g. "San Bernardino Mountains" */
    region:     string;
    /** Optional — shown in footer location chip and hero subtext. */
    elevation?: string;
  };

  // ── Map ────────────────────────────────────────────────────────────────────
  map: {
    /** Geographic centre of the map on first load. */
    center:      { lat: number; lng: number };
    /** Initial zoom level (0–19). 14 works well for a 1–2 mile area. */
    defaultZoom: number;
  };

  // ── Feature flags ──────────────────────────────────────────────────────────
  /** Toggle pages on/off without deleting them. Hidden from nav when false. */
  features: {
    map:    boolean;
    events: boolean;
    claim:  boolean;
    blog:   boolean;
  };

  // ── Theme ──────────────────────────────────────────────────────────────────
  /** Brand colours — injected as CSS custom properties by app/layout.tsx. */
  theme: SiteTheme;
}

// ─── Hex → RGB helpers ────────────────────────────────────────────────────────

/**
 * Converts a 6-digit hex colour to space-separated RGB channels.
 * Required format for Tailwind opacity modifier syntax (bg-brand-primary/40 etc.)
 * e.g. "#1A2E1A" → "26 46 26"
 */
function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/**
 * Converts a 6-digit hex colour to comma-separated RGB string.
 * Used only for legacy rgba() box-shadow helpers (--shadow-rgb, --*-rgb).
 * e.g. "#2C2416" → "44, 36, 22"
 */
function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// ─── CSS var builder ─────────────────────────────────────────────────────────

/**
 * Converts a SiteTheme into a flat Record of CSS custom property names → values.
 * Cast to React.CSSProperties at the call site:
 *   <html style={buildThemeCssVars(siteConfig.theme) as React.CSSProperties}>
 */
export function buildThemeCssVars(theme: SiteTheme): Record<string, string> {
  return {
    // Space-separated RGB channels — required for Tailwind opacity modifiers (/40, /75, etc.)
    "--color-brand-primary":       hexToRgbChannels(theme.brandPrimary),
    "--color-brand-primary-mid":   hexToRgbChannels(theme.brandPrimaryMid),
    "--color-brand-primary-light": hexToRgbChannels(theme.brandPrimaryLight),
    "--color-brand-primary-pale":  hexToRgbChannels(theme.brandPrimaryPale),

    "--color-brand-accent":        hexToRgbChannels(theme.brandAccent),
    "--color-brand-accent-dark":   hexToRgbChannels(theme.brandAccentDark),
    "--color-brand-accent-pale":   hexToRgbChannels(theme.brandAccentPale),

    "--color-surface":             hexToRgbChannels(theme.surface),
    "--color-surface-warm":        hexToRgbChannels(theme.surfaceWarm),
    "--color-surface-muted":       hexToRgbChannels(theme.surfaceMuted),

    "--color-content-strong":      hexToRgbChannels(theme.contentStrong),
    "--color-content-base":        hexToRgbChannels(theme.contentBase),
    "--color-content-subtle":      hexToRgbChannels(theme.contentSubtle),

    "--color-on-accent":           hexToRgbChannels(theme.onAccent),

    // Comma-separated RGB for legacy rgba() box-shadows — auto-derived
    "--shadow-rgb":               hexToRgb(theme.contentStrong),
    "--color-brand-accent-rgb":   hexToRgb(theme.brandAccent),
    "--color-brand-primary-rgb":  hexToRgb(theme.brandPrimary),
  };
}

// ─── Site config — Oak Glen ───────────────────────────────────────────────────
//
// TO DEPLOY FOR A NEW CLIENT:
//   1. Update every field below.
//   2. Replace theme hex values with the client's brand colours.
//   3. Set map.center to the geographic centre of their area.
//   4. Toggle features on/off as needed.
//   5. Update the font imports in app/layout.tsx if the brand uses different typefaces.
//   6. Replace business data in lib/data/mockData.ts (or wire Sanity).
//   7. Replace page copy in app/(marketing)/about/ and app/(marketing)/events/.
//
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  name:         "Oak Glen Directory",
  tagline:      "Discover the Heart of Apple Country",
  description:
    "A curated guide to Oak Glen's finest orchards, bakeries, farms, and artisan businesses tucked in the San Bernardino Mountains.",
  url:          "https://directory.visitoakglen.com",
  contactEmail: "hello@visitoakglen.com",

  location: {
    name:      "Oak Glen",
    state:     "CA",
    zip:       "92399",
    region:    "San Bernardino Mountains",
    elevation: "4,800 ft",
  },

  map: {
    center:      { lat: 34.0415, lng: -116.9330 },
    defaultZoom: 14,
  },

  features: {
    map:    true,
    events: true,
    claim:  true,
    blog:   true,
  },

  theme: {
    brandPrimary:      "#1A2E1A",
    brandPrimaryMid:   "#2D4A2D",
    brandPrimaryLight: "#4A7A4A",
    brandPrimaryPale:  "#EEF4EE",

    brandAccent:     "#C17F24",
    brandAccentDark: "#A86B1A",
    brandAccentPale: "#F5E6C8",

    surface:      "#F5F0E8",
    surfaceWarm:  "#F0EAE0",
    surfaceMuted: "#DDD6C8",

    contentStrong: "#2C2416",
    contentBase:   "#5C5040",
    contentSubtle: "#8C7E6A",

    onAccent: "#6B4226",
  },
};
