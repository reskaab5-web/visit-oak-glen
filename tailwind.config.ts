import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color palette ───────────────────────────────────────────────
      colors: {
        // Forest greens
        forest: {
          deep:  "#1A2E1A",
          mid:   "#2D4A2D",
          light: "#4A7A4A",
          pale:  "#EEF4EE",
        },
        // Harvest golds
        harvest: {
          gold:   "#C17F24",
          amber:  "#A86B1A",
          warm:   "#F5E6C8",
        },
        // Parchment / page base
        parchment: {
          DEFAULT: "#F5F0E8",
          warm:    "#F0EAE0",
          muted:   "#DDD6C8",
        },
        // Oak / text tones
        oak: {
          charcoal: "#2C2416",
          stone:    "#5C5040",
          fog:      "#8C7E6A",
        },
        // Earth / accent
        earth: {
          bark:  "#6B4226",
          rust:  "#8B4513",
          sienna:"#A0522D",
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale
        "display-2xl": ["4.5rem",   { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
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

      // ─── Spacing ─────────────────────────────────────────────────────
      spacing: {
        section: "6rem",
        hero:    "9rem",
        site:    "1400px",
      },
      maxWidth: {
        site: "1400px",
      },

      // ─── Border radius ───────────────────────────────────────────────
      borderRadius: {
        card:  "0.75rem",
        badge: "0.375rem",
      },

      // ─── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        card:       "0 2px 8px 0 rgba(44,36,22,0.08), 0 1px 2px 0 rgba(44,36,22,0.04)",
        "card-hover":"0 8px 24px 0 rgba(44,36,22,0.14), 0 2px 6px 0 rgba(44,36,22,0.06)",
        input:      "0 0 0 3px rgba(193,127,36,0.18)",
        modal:      "0 20px 60px 0 rgba(26,46,26,0.22), 0 4px 12px 0 rgba(26,46,26,0.08)",
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        slow: "350ms",
      },
    },
  },
  plugins: [],
};

export default config;
