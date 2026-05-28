import type { Metadata }  from "next";
import Image               from "next/image";
import Link                from "next/link";
import {
  Tractor,
  Utensils,
  Wine,
  ShoppingBag,
  Home,
  Music,
  Heart,
  BookOpen,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { categories, getBusinessesByCategory } from "@/lib/data/mockData";
import { siteConfig }                          from "@/lib/config/site";
import { buildWebPageSchema }                  from "@/lib/schema/builders";
import { JsonLd }                              from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Browse by Category — ${siteConfig.name}`,
  description:
    `Explore all ${siteConfig.location.name} businesses by category — farms & orchards, restaurants, cider houses, shops, accommodation, entertainment, weddings, and education.`,
  alternates:  { canonical: "/categories" },
  openGraph: {
    title:       `Browse by Category — ${siteConfig.name}`,
    description: `Find every type of business Oak Glen has to offer, organised by category.`,
  },
};

// ─── Category icon map ────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "farms":         Tractor,
  "restaurants":   Utensils,
  "cider-houses":  Wine,
  "shops":         ShoppingBag,
  "accommodation": Home,
  "entertainment": Music,
  "weddings":      Heart,
  "education":     BookOpen,
};

// ─── Categories Page ──────────────────────────────────────────────────────────

export default function CategoriesPage() {
  // Compute live business counts from data (authoritative, not the static count field)
  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    count: getBusinessesByCategory(cat.slug).length,
  }));

  const totalBusinesses = categoriesWithCounts.reduce(
    (sum, cat) => sum + cat.count,
    0,
  );

  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/categories",
          `Browse by Category — ${siteConfig.name}`,
          `Explore all ${siteConfig.location.name} businesses by category — farms & orchards, restaurants, cider houses, shops, accommodation, entertainment, weddings, and education.`,
        ),
      ]} />
    <main>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Hero
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[480px] lg:min-h-[560px] flex flex-col justify-center overflow-hidden"
        aria-label="Browse Oak Glen by Category"
      >
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://www.oakglen.org/wp-content/uploads/2024/04/oak-2-scaled.jpg"
            alt=""
            role="presentation"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/55 via-brand-primary/72 to-brand-primary/90" />
        </div>

        <AnimatedHeroContent className="relative z-10 max-w-site mx-auto w-full px-6 lg:px-8 py-20 flex flex-col items-center text-center">
          <AnimatedHeroItem>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium ring-1 ring-white/20 mb-6">
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              {totalBusinesses} businesses across {categoriesWithCounts.length} categories
            </span>
          </AnimatedHeroItem>

          <AnimatedHeroItem>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Browse by Category
            </h1>
          </AnimatedHeroItem>

          <AnimatedHeroItem>
            <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
              Every kind of Oak Glen experience — farms, cider houses, dining, shopping,
              accommodation, and more — organised so you can find exactly what you&apos;re
              looking for.
            </p>
          </AnimatedHeroItem>
        </AnimatedHeroContent>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — Category grid
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 lg:py-24 bg-white"
        aria-label="All categories"
      >
        <div className="max-w-site mx-auto px-6 lg:px-8">

          <AnimatedSectionReveal>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary tracking-tight">
                What will you discover?
              </h2>
              <p className="mt-3 text-brand-primary/65 text-lg max-w-xl mx-auto">
                Select a category to see every listing, read reviews, check hours, and plan your visit.
              </p>
            </div>
          </AnimatedSectionReveal>

          <AnimatedSectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoriesWithCounts.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.slug] ?? LayoutGrid;

                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-primary/10 hover:shadow-md hover:ring-brand-primary/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    aria-label={`Browse ${cat.label} — ${cat.count} listing${cat.count !== 1 ? "s" : ""}`}
                  >
                    {/* Card image */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.label}
                        fill
                        quality={80}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/25 to-transparent" />

                      {/* Icon badge */}
                      <div className="absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                        <Icon className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                      </div>

                      {/* Count badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-brand-accent text-white text-xs font-semibold">
                        {cat.count} {cat.count === 1 ? "listing" : "listings"}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-base font-bold text-brand-primary leading-snug group-hover:text-brand-accent transition-colors duration-200">
                        {cat.label}
                      </h3>
                      <p className="mt-1.5 text-sm text-brand-primary/65 leading-relaxed line-clamp-3 flex-1">
                        {cat.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-brand-accent text-sm font-medium">
                        <span>Explore</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </AnimatedSectionReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — CTA strip
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="py-14 bg-brand-primary"
        aria-label="View all listings"
      >
        <AnimatedSectionReveal>
          <div className="max-w-site mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Not sure where to start?
              </h2>
              <p className="mt-1 text-white/75 text-base">
                Browse every Oak Glen business in one place.
              </p>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold text-sm transition-colors duration-200 shrink-0"
            >
              View all listings
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSectionReveal>
      </section>

    </main>
    </>
  );
}
