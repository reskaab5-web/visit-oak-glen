import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  subsets:   ["latin"],
  variable:  "--font-playfair",
  display:   "swap",
  weight:    ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets:   ["latin"],
  variable:  "--font-dm-sans",
  display:   "swap",
  weight:    ["400", "500", "600"],
});

// ─── Root metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://visitoakglen.com"),
  title: {
    default:  "Oak Glen Directory — Discover the Heart of Apple Country",
    template: "%s — Oak Glen Directory",
  },
  description:
    "A curated guide to Oak Glen's finest orchards, bakeries, farms, and artisan businesses tucked in the San Bernardino Mountains.",
  openGraph: {
    siteName: "Oak Glen Directory",
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-parchment text-oak-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
