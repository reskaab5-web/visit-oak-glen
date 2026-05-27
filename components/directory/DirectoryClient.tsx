"use client";

/**
 * DirectoryClient
 *
 * The interactive core of /directory. Handles:
 *   - Category filter pills (horizontally scrollable on mobile)
 *   - Featured-only toggle
 *   - Sort order (rating, name, newest)
 *   - Simulated skeleton loading state (800ms, matches a real API latency)
 *   - Framer Motion AnimatePresence grid transitions on filter change
 *   - Empty state when no listings match the current filters
 *   - Fully mobile-responsive with 44px+ touch targets throughout
 *
 * Receives pre-fetched data as props from the server component parent,
 * keeping this component's bundle lean (no DB/fetch logic here).
 */

import {
  useState,
  useMemo,
  useEffect,
  useId,
  type ChangeEvent,
} from "react";
import Link                   from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Star,
  LayoutGrid,
  SearchX,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { BusinessCard }             from "@/components/directory/BusinessCard";
import { BusinessCardSkeletonGrid } from "@/components/directory/BusinessCardSkeleton";
import type { Business, Category }  from "@/lib/data/mockData";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_SLUG = "__all__";

const SORT_OPTIONS = [
  { value: "rating",  label: "Top Rated"  },
  { value: "name",    label: "Name A–Z"   },
  { value: "newest",  label: "Newest"     },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ─── Props ────────────────────────────────────────────────────────────────────

interface DirectoryClientProps {
  businesses: Business[];
  categories: Category[];
}

// ─── Filter pill sub-component ────────────────────────────────────────────────

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label:   string;
  count?:  number;
  active:  boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "filter-pill",
        active ? "filter-pill-active" : "filter-pill-default",
      ].join(" ")}
    >
      {label}
      {count !== undefined && (
        <span
          className={[
            "inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-[500]",
            active
              ? "bg-parchment/20 text-parchment"
              : "bg-parchment-muted text-oak-fog",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Toggle sub-component ─────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked:  boolean;
  onChange: (v: boolean) => void;
  id:       string;
}) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "toggle-track border-0",
        checked ? "bg-harvest-gold" : "bg-parchment-muted",
      ].join(" ")}
    >
      <div
        className="toggle-thumb"
        style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
      />
      <span className="sr-only">{checked ? "On" : "Off"}</span>
    </button>
  );
}

// ─── DirectoryClient ──────────────────────────────────────────────────────────

export function DirectoryClient({ businesses, categories }: DirectoryClientProps) {
  const toggleId = useId();

  const [activeCategory,    setActiveCategory]    = useState(ALL_SLUG);
  const [showFeaturedOnly,  setShowFeaturedOnly]  = useState(false);
  const [sortBy,            setSortBy]            = useState<SortValue>("rating");
  const [isLoading,         setIsLoading]         = useState(true);

  // Simulate 800ms skeleton loading — replace with real async data in production
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // ── Filtered + sorted data ─────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let result = [...businesses];

    if (activeCategory !== ALL_SLUG) {
      result = result.filter((b) => b.categorySlug === activeCategory);
    }

    if (showFeaturedOnly) {
      result = result.filter((b) => b.featured);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => (b.established ?? 0) - (a.established ?? 0));
        break;
    }

    return result;
  }, [businesses, activeCategory, showFeaturedOnly, sortBy]);

  // Key that changes whenever the filter/sort combination changes —
  // triggers AnimatePresence exit + re-enter of the grid.
  const gridKey = `${activeCategory}|${showFeaturedOnly}|${sortBy}`;

  // Category counts for pill badges
  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { [ALL_SLUG]: businesses.length };
    businesses.forEach((b) => {
      map[b.categorySlug] = (map[b.categorySlug] ?? 0) + 1;
    });
    return map;
  }, [businesses]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ══ FILTER BAR — sticky below the main header ══════════════════════ */}
      <div className="sticky top-[64px] lg:top-[80px] z-40 bg-parchment/[0.97] backdrop-blur-md border-b border-parchment-muted">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Category pills row (horizontally scrollable on mobile) ── */}
          <div
            className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide"
            role="group"
            aria-label="Filter by category"
          >
            {/* "All" pill */}
            <FilterPill
              label="All"
              count={countByCategory[ALL_SLUG]}
              active={activeCategory === ALL_SLUG}
              onClick={() => setActiveCategory(ALL_SLUG)}
            />

            {/* Category pills — only those with listings */}
            {categories
              .filter((c) => (countByCategory[c.slug] ?? 0) > 0)
              .map((cat) => (
                <FilterPill
                  key={cat.slug}
                  label={cat.label}
                  count={countByCategory[cat.slug]}
                  active={activeCategory === cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                />
              ))}
          </div>

          {/* ── Toolbar row: result count + featured toggle + sort ── */}
          <div className="flex items-center justify-between gap-4 pb-3 flex-wrap">

            {/* Result count */}
            <p className="font-sans text-body-sm text-oak-stone flex-shrink-0">
              <span className="font-[500] text-oak-charcoal">{filtered.length}</span>
              {" "}
              {filtered.length === 1 ? "listing" : "listings"}
              {activeCategory !== ALL_SLUG && (
                <span className="text-oak-fog"> in{" "}
                  <span className="text-forest-mid">
                    {categories.find((c) => c.slug === activeCategory)?.label}
                  </span>
                </span>
              )}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Featured-only toggle */}
              <div className="flex items-center gap-2.5">
                <label
                  htmlFor={toggleId}
                  className="font-sans text-body-sm text-oak-stone cursor-pointer select-none flex items-center gap-1.5"
                >
                  <Star size={13} className="text-harvest-gold" aria-hidden="true" />
                  Featured only
                </label>
                <Toggle
                  id={toggleId}
                  checked={showFeaturedOnly}
                  onChange={setShowFeaturedOnly}
                />
              </div>

              {/* Sort selector */}
              <div className="relative flex items-center">
                <SlidersHorizontal
                  size={14}
                  className="absolute left-3 text-oak-fog pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  value={sortBy}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSortBy(e.target.value as SortValue)
                  }
                  aria-label="Sort listings"
                  className="appearance-none bg-parchment-warm border border-parchment-muted rounded-md pl-8 pr-8 py-2 font-sans text-body-sm text-oak-charcoal cursor-pointer focus:outline-none focus:ring-2 focus:ring-harvest-gold min-h-[44px]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 text-oak-fog pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ═══════════════════════════════════════════════════ */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-section">

        {/* ── Skeleton state ── */}
        {isLoading && (
          <BusinessCardSkeletonGrid
            count={businesses.length}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
          />
        )}

        {/* ── Loaded state ── */}
        {!isLoading && (
          <>
            {filtered.length > 0 ? (
              /* ── Animated grid — fades + re-enters on filter change ── */
              <AnimatePresence mode="wait">
                <motion.div
                  key={gridKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0,    transition: { duration: 0.1  } }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
                >
                  {filtered.map((business, i) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, y: 22, scale: 0.97 }}
                      animate={{
                        opacity: 1,
                        y:       0,
                        scale:   1,
                        transition: {
                          delay:    Math.min(i * 0.06, 0.3),
                          duration: 0.45,
                          ease:     [0.22, 1, 0.36, 1],
                        },
                      }}
                    >
                      <BusinessCard
                        name={business.name}
                        category={business.category}
                        rating={business.rating}
                        reviewCount={business.reviewCount}
                        imageUrl={business.imageUrl}
                        location={business.location}
                        slug={business.slug}
                        featured={business.featured}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              /* ── Empty state ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-forest-pale flex items-center justify-center mb-5">
                  <SearchX
                    size={26}
                    className="text-forest-mid"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h2 className="font-serif text-heading-md text-oak-charcoal mb-3">
                  No listings found
                </h2>
                <p className="font-sans text-body-md text-oak-stone max-w-sm leading-relaxed mb-8">
                  Try removing a filter or browsing a different category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory(ALL_SLUG);
                    setShowFeaturedOnly(false);
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-forest-deep hover:bg-forest-mid text-label text-parchment uppercase tracking-widest transition-all duration-200 min-h-[44px]"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ══ BOTTOM CTA BANNER ══════════════════════════════════════════════ */}
      {!isLoading && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bg-parchment-warm border-t border-parchment-muted py-14 px-4 sm:px-6 lg:px-8"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-site mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-sans text-label text-forest-mid uppercase tracking-widest mb-2">
                Own a business in Oak Glen?
              </p>
              <h2
                id="cta-heading"
                className="font-serif text-heading-md text-oak-charcoal"
              >
                Get listed in the directory
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md bg-forest-deep hover:bg-forest-mid text-label text-parchment uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card flex-shrink-0 min-h-[52px]"
            >
              Submit your listing
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </motion.section>
      )}
    </>
  );
}

export default DirectoryClient;
