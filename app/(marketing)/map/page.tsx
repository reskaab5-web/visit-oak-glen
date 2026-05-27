/**
 * /map — Interactive business map
 *
 * Server component: metadata + data fetch.
 * MapClient: dynamically imported with ssr:false to avoid Leaflet
 * window-access errors during Next.js server rendering.
 */

import type { Metadata }   from "next";
import dynamic             from "next/dynamic";
import { MapPin, Loader2 } from "lucide-react";
import { businesses }    from "@/lib/data/mockData";
import { siteConfig }    from "@/lib/config/site";
import { buildWebPageSchema } from "@/lib/schema/builders";
import { JsonLd }        from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Map — ${siteConfig.location.name}, ${siteConfig.location.state}`,
  description: `Interactive map of all ${siteConfig.location.name} businesses. Click any pin to explore.`,
  alternates:  { canonical: "/map" },
  openGraph: {
    title:       `${siteConfig.location.name} Business Map`,
    description: `Find every business in ${siteConfig.location.name} on the map.`,
  },
};

// ─── Dynamic import — must be ssr:false for Leaflet ──────────────────────────

const MapClient = dynamic(
  () => import("@/components/map/MapClient").then((m) => m.MapClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] bg-surface gap-4">
        <Loader2
          size={32}
          className="text-brand-primary-mid animate-spin"
          aria-hidden="true"
        />
        <p className="font-sans text-body-md text-content-base">Loading map…</p>
      </div>
    ),
  },
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MapPage() {
  return (
    <>
      <JsonLd data={buildWebPageSchema(
        siteConfig,
        "/map",
        `${siteConfig.location.name} Business Map`,
        `Interactive map of all ${siteConfig.location.name} businesses. Click any pin to explore farms, orchards, cider houses, restaurants, and more.`,
      )} />
    <main>

      {/* ── Compact header bar ── */}
      <div className="bg-brand-primary px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MapPin
            size={16}
            className="text-brand-accent flex-shrink-0"
            strokeWidth={2}
            aria-hidden="true"
          />
          <div>
            <h1 className="font-serif text-surface text-lg leading-none">
              {siteConfig.location.name} Map
            </h1>
            <p className="font-sans text-[11px] text-surface/60 mt-0.5 uppercase tracking-widest">
              {businesses.length} locations
            </p>
          </div>
        </div>

        {/* Legend dots */}
        <div className="hidden sm:flex items-center gap-3 flex-wrap justify-end">
          {[
            { label: "Farms",          color: "#4a7c59" },
            { label: "Restaurants",    color: "#b45309" },
            { label: "Cider Houses",   color: "#6d28d9" },
            { label: "Entertainment",  color: "#c2410c" },
            { label: "Accommodation",  color: "#1d4ed8" },
            { label: "Weddings",       color: "#9f1239" },
            { label: "Education",      color: "#0f766e" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <span className="font-sans text-[11px] text-surface/70">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map + sidebar ── */}
      <MapClient businesses={businesses} />

    </main>
    </>
  );
}
