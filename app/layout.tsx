import type { Metadata } from "next";
import type React from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, buildThemeCssVars } from "@/lib/config/site";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  subsets:   ["latin"],
  variable:  "--font-serif",
  display:   "swap",
  weight:    ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets:   ["latin"],
  variable:  "--font-sans",
  display:   "swap",
  weight:    ["400", "500", "600"],
});

// ─── Root metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:  `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: "/site.webmanifest",
  // Colors the browser chrome (address bar) on mobile — matches the nav bar
  themeColor: siteConfig.theme.brandPrimary,
  openGraph: {
    siteName: siteConfig.name,
    locale:   "en_US",
    type:     "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      style={buildThemeCssVars(siteConfig.theme) as React.CSSProperties}
    >
      <body className="font-sans bg-surface text-content-strong antialiased">
        {children}
      </body>
    </html>
  );
}
