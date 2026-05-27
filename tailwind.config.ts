import type { Config }    from "tailwindcss";
import typography         from "@tailwindcss/typography";

/**
 * Tailwind config — template edition
 *
 * All brand colors reference CSS custom properties defined in globals.css.
 * To reskin for a new client, update the --color-* variables in :root —
 * no Tailwind config changes required.
 *
 * Token vocabulary (semantic, not area-specific):
 *   brand-primary-*   Primary brand color (nav, CTAs, headings on light bg)
 *   brand-accent-*    Accent / highlight color (buttons, stars, badges)
 *   surface-*         Page and card backgrounds
 *   content-*         Body text at varying emphasis levels
 *   on-accent         Text placed directly on an accent-colored background
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color palette ───────────────────────────────────────────────────
      colors: {
        // Primary brand color
        "brand-primary":       "var(--color-brand-primary)",
        "brand-primary-mid":   "var(--color-brand-primary-mid)",
        "brand-primary-light": "var(--color-brand-primary-light)",
        "brand-primary-pale":  "var(--color-brand-primary-pale)",

        // Accent / highlight color
        "brand-accent":        "var(--color-brand-accent)",
        "brand-accent-dark":   "var(--color-brand-accent-dark)",
        "brand-accent-pale":   "var(--color-brand-accent-pale)",

        // Surface / background tones
        "surface":             "var(--color-surface)",
        "surface-warm":        "var(--color-surface-warm)",
        "surface-muted":       "var(--color-surface-muted)",

        // Content / text tones
        "content-strong":      "var(--color-content-strong)",
        "content-base":        "var(--color-content-base)",
        "content-subtle":      "var(--color-content-subtle)",

        // Text on accent-colored backgrounds
        "on-accent":           "var(--color-on-accent)",
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)",  "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale
        "display-2xl": ["4.5rem",   { lineHeight: "1.05", letterSpacing: "-0.03em",  fontWeight: "700" }],
        "display-xl":  ["3.75rem",  { lineHeight: "1.06", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-lg":  ["3rem",     { lineHeight: "1.08", letterSpacing: "-0.02em",  fontWeight: "700" }],
        // Heading scale
        "heading-xl":  ["2rem",     { lineHeight: "1.2",  letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-lg":  ["1.5rem",   { lineHeight: "1.3",  letterSpacing: "-0.01em",  fontWeight: "600" }],
        "heading-md":  ["1.25rem",  { lineHeight: "1.4",  letterSpacing: "-0.005em", fontWeight: "600" }],
        "heading-sm":  ["1.125rem", { lineHeight: "1.4",  fontWeight: "600" }],
        // Body scale
        "body-lg":     ["1.125rem", { lineHeight: "1.7" }],
        "body-md":     ["1rem",     { lineHeight: "1.65" }],
        "body-sm":     ["0.875rem", { lineHeight: "1.6" }],
        // Label / micro
        "label":       ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        section: "6rem",
        hero:    "9rem",
        site:    "1400px",
      },
      maxWidth: {
        site: "1400px",
      },

      // ─── Border radius ───────────────────────────────────────────────────
      borderRadius: {
        card:  "0.75rem",
        badge: "0.375rem",
      },

      // ─── Shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        card:        "0 2px 8px 0 rgba(var(--shadow-rgb), 0.08), 0 1px 2px 0 rgba(var(--shadow-rgb), 0.04)",
        "card-hover":"0 8px 24px 0 rgba(var(--shadow-rgb), 0.14), 0 2px 6px 0 rgba(var(--shadow-rgb), 0.06)",
        input:       "0 0 0 3px rgba(var(--color-brand-accent-rgb), 0.18)",
        modal:       "0 20px 60px 0 rgba(var(--color-brand-primary-rgb), 0.22), 0 4px 12px 0 rgba(var(--color-brand-primary-rgb), 0.08)",
      },

      // ─── Transitions ─────────────────────────────────────────────────────
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        slow: "350ms",
      },
    },
  },
  plugins: [typography],
};

export default config;
