"use client";

/**
 * MapWrapper — Client Component
 *
 * Wraps the dynamic Leaflet import so the Server Component map/page.tsx
 * can keep its `export const metadata` while satisfying Next.js 15's rule
 * that `ssr: false` in `dynamic()` must live in a Client Component.
 */

import dynamic             from "next/dynamic";
import { Loader2 }         from "lucide-react";
import type { Business }   from "@/lib/data/mockData";

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

interface MapWrapperProps {
  businesses: Business[];
}

export function MapWrapper({ businesses }: MapWrapperProps) {
  return <MapClient businesses={businesses} />;
}
