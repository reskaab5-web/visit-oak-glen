import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import Link              from "next/link";
import { ChevronRight, LayoutGrid, AlertCircle } from "lucide-react";

import { SectionHero }  from "@/components/layout/SectionHero";
import { BusinessCard } from "@/components/directory/BusinessCard";
import { AnimatedCard } from "@/components/motion/AnimatedCard";
import { AnimatedSectionReveal } from "@/components/motion/AnimatedHeroContent";
import {
  categories,
  getCategoryBySlug,
  getBusinessesByCategory,
} from "@/lib/data/mockData";

// ─── Params type ──────────────────────────────────────────────────────────────

interface PageProps {
  params: { category: string };
}

// ─── Static params — pre-render all known category slugs ─────────────────────

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return { title: "Category Not Found — Oak Glen Directory" };

  return {
    title:       `${cat.label} in Oak Glen, CA — Oak Glen Directory`,
    description: cat.description,
    openGraph: {
      title:       `${cat.label} — Oak Glen Directory`,
      description: cat.description,
      images:      [{ url: cat.imageUrl }],
    },
  };
}

// ─── Sort options (future-ready, currently display-only) ─────────────────────

const SORT_OPTIONS = [
  { value: "rating",   label: "Top Rated"    },
  { value: "newest",   label: "Newest"       },
  { value: "name",     label: "Name A–Z"     },
] as const;

// ─── Category Page ────────────────────────────────────────────────────────────

export default function CategoryPage({ params }: PageProps) {
  const cat = getCategoryBySlug(params.category);

  // 404 for unknown slugs
  if (!cat) notFound();

  const businesses = getBusinessesByCategory(params.category);

  return (
    <main>
      {/* ════════════════════════════════════════════════════════════════
          HERO — SectionHero with category context
      ════════════════════════════════════════════════════════════════ */}
      <SectionHero
        eyebrow="Oak Glen Directory"
        title={cat.label}
        subtitle={cat.description}
        backgroundImageUrl={cat.imageUrl}
        align="left"
        overlay="forest"
        minHeight="min-h-[420px]"
        fadeBottom
      />

      {/* ════════════════════════════════════════════════════════════════
          BREADCRUMB + TOOLBAR
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-parchment border-b border-parchment-muted sticky top-[64px] lg:top-[80px] z-40">
        <div className="max-w-site mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 py-3 text-body-sm" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-oak-fog hover:text-forest-mid transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight size={13} className="text-parchment-muted flex-shrink-0" aria-hidden="true" />
            <Link
              href="/directory"
              className="text-oak-fog hover:text-forest-mid transition-colors duration-200"
            >
              Directory
            </Link>
            <ChevronRight size={13} className="text-parchment-muted flex-shrink-0" aria-hidden="true" />
            <span className="text-oak-charcoal font-[500]" aria-current="page">
              {cat.label}
            </span>
          </nav>

          {/* Toolbar — count + sort */}
          <div className="flex items-center justify-between py-3 border-t border-parchment-muted">
            <div className="flex items-center gap-2 text-body-sm text-oak-stone">
              <LayoutGrid size={15} className="text-oak-fog" aria-hidden="true" />
              <span>
                <strong className="text-oak-charcoal font-[500]">{businesses.length}</strong>{" "}
                {businesses.length === 1 ? "listing" : "listings"} in {cat.label}
              </span>
            </div>

            {/* Sort selector (future: wire to state/URL params) */}
            <label className="flex items-center gap-2 text-body-sm text-oak-stone">
              <span className="hidden sm:inline">Sort by</span>
              <select
                aria-label="Sort listings"
                className="bg-parchment-warm border border-parchment-muted rounded-md px-3 py-1.5 text-body-sm text-oak-charcoal focus:outline-none focus:ring-2 focus:ring-harvest-gold cursor-pointer"
                defaultValue="rating"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          LISTINGS GRID
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section
        className="py-section px-6 lg:px-8 bg-parchment"
        aria-label={`${cat.label} listings`}
      >
        <div className="max-w-site mx-auto">
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {businesses.map((business, i) => (
                <AnimatedCard key={business.id} index={i}>
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
                </AnimatedCard>
              ))}
            </div>
          ) : (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-forest-pale flex items-center justify-center mb-5">
                <AlertCircle size={26} className="text-forest-mid" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="font-serif text-heading-md text-oak-charcoal mb-3">
                No listings yet
              </h2>
              <p className="text-body-md text-oak-stone max-w-sm leading-relaxed mb-8">
                We haven't added any {cat.label.toLowerCase()} to the directory just yet. Check back soon — we're growing!
              </p>
              <Link
                href="/directory"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-forest-deep hover:bg-forest-mid text-label text-parchment uppercase tracking-widest transition-all duration-200"
              >
                Browse all listings
              </Link>
            </div>
          )}
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          RELATED CATEGORIES
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-section px-6 lg:px-8 bg-parchment-warm border-t border-parchment-muted" aria-labelledby="other-cat-heading">
        <div className="max-w-site mx-auto">
          <h2 id="other-cat-heading" className="font-serif text-heading-md text-oak-charcoal mb-6">
            Explore other categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== params.category)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="inline-flex items-center px-5 py-2.5 rounded-md bg-parchment border border-parchment-muted hover:border-forest-light hover:shadow-card text-body-sm text-oak-stone hover:text-forest-mid transition-all duration-200"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
