"use client";

/**
 * MapClient
 *
 * Interactive Leaflet map of all Oak Glen businesses.
 * Loaded with Next.js dynamic() ssr:false to avoid SSR issues with Leaflet.
 *
 * Features:
 *  - Custom colour-coded markers by category
 *  - Click marker → popup with business name, category, rating, and link
 *  - Sidebar list with category filter pills
 *  - Click a sidebar row → pan + open that marker's popup
 *  - Hover sidebar row → highlight marker
 *  - Mobile: map stacks above the list
 */

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  type KeyboardEvent,
} from "react";
import Link                 from "next/link";
import "leaflet/dist/leaflet.css";
import L                    from "leaflet";
import { MapPin, Star, ChevronRight, X } from "lucide-react";

import type { Business }    from "@/lib/data/mockData";
import { BUSINESS_COORDS } from "@/lib/data/mapCoords";
import { siteConfig }      from "@/lib/config/site";

// ─── Category colours ─────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "farms":         "#4a7c59",
  "restaurants":   "#b45309",
  "cider-houses":  "#6d28d9",
  "shops":         "#be185d",
  "accommodation": "#1d4ed8",
  "entertainment": "#c2410c",
  "weddings":      "#9f1239",
  "education":     "#0f766e",
};

const DEFAULT_COLOR = "#374151";

function categoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] ?? DEFAULT_COLOR;
}

// ─── SVG marker factory ────────────────────────────────────────────────────────

function makeMarkerIcon(color: string, active = false): L.DivIcon {
  const size   = active ? 36 : 28;
  const border = active ? 3 : 2;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 6}" viewBox="0 0 ${size} ${size + 6}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - border}" fill="${color}" stroke="white" stroke-width="${border}"/>
      <polygon points="${size / 2 - 5},${size} ${size / 2 + 5},${size} ${size / 2},${size + 6}" fill="${color}"/>
    </svg>
  `.trim();

  return L.divIcon({
    html:      svg,
    className: "",
    iconSize:     [size, size + 6],
    iconAnchor:   [size / 2, size + 6],
    popupAnchor:  [0, -(size + 6)],
  });
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface MapClientProps {
  businesses: Business[];
}

// ─── ALL_SLUG sentinel ─────────────────────────────────────────────────────────

const ALL_SLUG = "__all__";

// ─── MapClient ────────────────────────────────────────────────────────────────

export function MapClient({ businesses }: MapClientProps) {
  const mapRef        = useRef<L.Map | null>(null);
  const mapElRef      = useRef<HTMLDivElement>(null);
  const markerMapRef  = useRef<Map<string, L.Marker>>(new Map());

  const [activeSlug,    setActiveSlug]    = useState<string | null>(null);
  const [filterCat,     setFilterCat]     = useState(ALL_SLUG);

  // ── Filtered list ──────────────────────────────────────────────────────────

  const filtered = useMemo(
    () =>
      filterCat === ALL_SLUG
        ? businesses
        : businesses.filter((b) => b.categorySlug === filterCat),
    [businesses, filterCat],
  );

  // ── Mapped vs unmapped counts (drives sidebar header) ────────────────────

  const mappedCount = useMemo(
    () => filtered.filter((b) => !!BUSINESS_COORDS[b.slug]).length,
    [filtered],
  );

  // ── Category options (only those present in data) ─────────────────────────

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: { slug: string; label: string }[] = [];
    businesses.forEach((b) => {
      if (!seen.has(b.categorySlug)) {
        seen.add(b.categorySlug);
        result.push({ slug: b.categorySlug, label: b.category });
      }
    });
    return result;
  }, [businesses]);

  // ── Initialise map (once) ─────────────────────────────────────────────────

  useEffect(() => {
    if (mapRef.current || !mapElRef.current) return;

    const map = L.map(mapElRef.current, {
      center:      [siteConfig.map.center.lat, siteConfig.map.center.lng],
      zoom:        siteConfig.map.defaultZoom,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Add / refresh markers when filter changes ─────────────────────────────

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove all existing markers
    markerMapRef.current.forEach((m) => m.remove());
    markerMapRef.current.clear();

    filtered.forEach((business) => {
      const coords = BUSINESS_COORDS[business.slug];
      if (!coords) return;

      const color  = categoryColor(business.categorySlug);
      const marker = L.marker([coords.lat, coords.lng], {
        icon: makeMarkerIcon(color),
        title: business.name,
      });

      const popupContent = `
        <div style="font-family:sans-serif;min-width:180px;max-width:220px">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;margin:0 0 4px">${business.category}</p>
          <strong style="font-size:14px;color:#111827;display:block;margin-bottom:4px">${business.name}</strong>
          <span style="font-size:12px;color:#374151">⭐ ${business.rating} · ${business.reviewCount} reviews</span>
          <br/>
          <a href="/directory/${business.slug}" style="display:inline-block;margin-top:8px;font-size:12px;color:#166534;font-weight:600;text-decoration:none">
            View listing →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 240, offset: [0, -4] });

      marker.on("click", () => setActiveSlug(business.slug));
      marker.on("popupclose", () =>
        setActiveSlug((prev) => (prev === business.slug ? null : prev)),
      );

      marker.addTo(map);
      markerMapRef.current.set(business.slug, marker);
    });
  }, [filtered]);

  // ── Update active marker icon ─────────────────────────────────────────────

  useEffect(() => {
    markerMapRef.current.forEach((marker, slug) => {
      const business = businesses.find((b) => b.slug === slug);
      if (!business) return;
      const color = categoryColor(business.categorySlug);
      marker.setIcon(makeMarkerIcon(color, slug === activeSlug));
    });
  }, [activeSlug, businesses]);

  // ── Pan to marker when sidebar row clicked ────────────────────────────────

  const flyTo = useCallback((slug: string) => {
    const coords = BUSINESS_COORDS[slug];
    const marker = markerMapRef.current.get(slug);
    if (!coords || !mapRef.current) return;
    mapRef.current.flyTo([coords.lat, coords.lng], 16, { duration: 0.8 });
    setTimeout(() => marker?.openPopup(), 850);
    setActiveSlug(slug);
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] min-h-[600px]">

      {/* ── MAP ── */}
      <div className="relative flex-1 min-h-[360px] lg:min-h-0">
        <div ref={mapElRef} className="absolute inset-0 z-0" />

        {/* Active business overlay card */}
        {activeSlug && (() => {
          const b = businesses.find((x) => x.slug === activeSlug);
          if (!b) return null;
          return (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 z-10 bg-surface rounded-xl shadow-modal border border-surface-muted p-4">
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                aria-label="Close"
                className="absolute top-3 right-3 text-content-subtle hover:text-content-strong"
              >
                <X size={14} />
              </button>
              <p className="font-sans text-[11px] text-content-subtle uppercase tracking-widest mb-1">
                {b.category}
              </p>
              <p className="font-serif text-heading-sm text-content-strong mb-1">
                {b.name}
              </p>
              <div className="flex items-center gap-1 mb-3">
                <Star size={12} className="text-brand-accent fill-brand-accent" aria-hidden="true" />
                <span className="font-sans text-body-sm text-content-base">
                  {b.rating} · {b.reviewCount} reviews
                </span>
              </div>
              <Link
                href={`/directory/${b.slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-body-sm text-brand-primary-mid font-[500] hover:text-brand-primary transition-colors duration-200"
              >
                View listing <ChevronRight size={12} aria-hidden="true" />
              </Link>
            </div>
          );
        })()}
      </div>

      {/* ── SIDEBAR ── */}
      <aside
        className="w-full lg:w-80 xl:w-96 flex flex-col border-t lg:border-t-0 lg:border-l border-surface-muted bg-surface overflow-hidden"
        aria-label="Business list"
      >
        {/* Filter pills */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-surface-muted overflow-x-auto scrollbar-hide">
          <div className="flex gap-2" role="group" aria-label="Filter by category">
            <button
              type="button"
              onClick={() => setFilterCat(ALL_SLUG)}
              aria-pressed={filterCat === ALL_SLUG}
              className={[
                "flex-shrink-0 px-3 py-1.5 rounded-full font-sans text-[12px] font-[500] transition-all duration-200",
                filterCat === ALL_SLUG
                  ? "bg-brand-primary text-surface"
                  : "bg-surface-warm border border-surface-muted text-content-base hover:border-brand-primary-light",
              ].join(" ")}
            >
              All ({businesses.length})
            </button>
            {categories.map(({ slug, label }) => (
              <button
                key={slug}
                type="button"
                onClick={() => setFilterCat(slug)}
                aria-pressed={filterCat === slug}
                className={[
                  "flex-shrink-0 px-3 py-1.5 rounded-full font-sans text-[12px] font-[500] transition-all duration-200 whitespace-nowrap",
                  filterCat === slug
                    ? "bg-brand-primary text-surface"
                    : "bg-surface-warm border border-surface-muted text-content-base hover:border-brand-primary-light",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="flex-shrink-0 px-4 py-2 border-b border-surface-muted/50">
          <p className="font-sans text-[12px] text-content-subtle">
            <span className="font-[500] text-content-strong">{mappedCount}</span>{" "}
            {mappedCount === 1 ? "pin" : "pins"} on map
            {mappedCount < filtered.length && (
              <span className="ml-1.5 text-content-subtle/70">
                · {filtered.length - mappedCount} no location
              </span>
            )}
          </p>
        </div>

        {/* Business list */}
        <ul className="flex-1 overflow-y-auto" role="list">
          {filtered.map((business) => {
            const hasCoords = !!BUSINESS_COORDS[business.slug];
            const isActive  = activeSlug === business.slug;
            const color     = categoryColor(business.categorySlug);

            return (
              <li key={business.id}>
                <button
                  type="button"
                  disabled={!hasCoords}
                  onClick={() => hasCoords && flyTo(business.slug)}
                  onKeyDown={(e: KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      hasCoords && flyTo(business.slug);
                    }
                  }}
                  className={[
                    "w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all duration-150",
                    "border-b border-surface-muted/60",
                    isActive
                      ? "bg-brand-primary-pale"
                      : "hover:bg-surface-warm",
                    !hasCoords && "opacity-50 cursor-default",
                  ].join(" ")}
                  aria-label={`Fly to ${business.name}`}
                  aria-pressed={isActive}
                >
                  {/* Colour dot */}
                  <div
                    className="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}1a`, border: `2px solid ${color}` }}
                    aria-hidden="true"
                  >
                    <MapPin size={12} style={{ color }} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={[
                        "font-sans text-body-sm font-[500] truncate",
                        isActive ? "text-brand-primary" : "text-content-strong",
                      ].join(" ")}
                    >
                      {business.name}
                    </p>
                    <p className="font-sans text-[11px] text-content-subtle truncate">
                      {business.category}
                    </p>
                    {hasCoords ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={10} className="text-brand-accent fill-brand-accent" aria-hidden="true" />
                        <span className="font-sans text-[11px] text-content-base">
                          {business.rating}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-block mt-0.5 font-sans text-[10px] font-[500] text-content-subtle/70 bg-surface-muted rounded px-1.5 py-0.5 uppercase tracking-wide">
                        No location
                      </span>
                    )}
                  </div>

                  <ChevronRight
                    size={14}
                    className={[
                      "flex-shrink-0 mt-1 transition-colors duration-150",
                      isActive ? "text-brand-primary-mid" : "text-content-subtle",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-surface-muted bg-surface-warm">
          <p className="font-sans text-[11px] text-content-subtle text-center">
            Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors
          </p>
        </div>
      </aside>

    </div>
  );
}

export default MapClient;
