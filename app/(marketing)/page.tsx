import type { Metadata } from "next";
import Link              from "next/link";
import Image             from "next/image";
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
} from "lucide-react";

import { SearchBar }    from "@/components/search/SearchBar";
import { BusinessCard } from "@/components/directory/BusinessCard";
import { AnimatedCard } from "@/components/motion/AnimatedCard";
import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
  AnimatedCounter,
} from "@/components/motion/AnimatedHeroContent";
import {
  getFeaturedBusinesses,
  categories,
} from "@/lib/data/mockData";
import { siteConfig } from "@/lib/config/site";
import {
  buildWebSiteSchema,
  buildOrganizationSchema,
  buildItemListSchema,
} from "@/lib/schema/builders";
import { JsonLd } from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates:  { canonical: "/" },
  openGraph: {
    title:       siteConfig.name,
    description: `Discover local businesses in ${siteConfig.location.name}, ${siteConfig.location.state}.`,
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

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featured = getFeaturedBusinesses();

  return (
    <>
      <JsonLd data={[
        buildWebSiteSchema(siteConfig),
        buildOrganizationSchema(siteConfig),
        buildItemListSchema(featured, siteConfig.url, siteConfig),
      ]} />
    <main>
      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Hero
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-center overflow-hidden"
        aria-label={`Welcome to ${siteConfig.name}`}
      >
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&q=85"
            alt=""
            role="presentation"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay — forest tones */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 via-brand-primary/60 to-brand-primary/88" />
        </div>

        {/* Hero content — text layer only; bg image loads immediately for LCP */}
        <AnimatedHeroContent className="relative z-10 max-w-site mx-auto w-full px-6 lg:px-8 py-hero flex flex-col items-center text-center">
          {/* Eyebrow */}
          <AnimatedHeroItem>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
              <span className="text-label text-brand-accent uppercase tracking-[0.22em]">
                Oak Glen, California
              </span>
              <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
            </div>
          </AnimatedHeroItem>

          {/* Title */}
          <AnimatedHeroItem>
            <h1 className="font-serif text-display-lg md:text-display-xl lg:text-display-2xl text-surface leading-[1.07] max-w-4xl">
              Discover the Heart<br className="hidden sm:block" /> of Apple Country
            </h1>
          </AnimatedHeroItem>

          {/* Subtitle */}
          <AnimatedHeroItem>
            <p className="mt-6 text-body-lg text-surface/80 max-w-2xl leading-relaxed">
              A curated guide to Oak Glen's finest orchards, cideries, farms, and artisan businesses tucked in the San Bernardino Mountains.
            </p>
          </AnimatedHeroItem>

          {/* Search bar */}
          <AnimatedHeroItem className="mt-10 w-full max-w-2xl">
            <SearchBar variant="hero" />
          </AnimatedHeroItem>

          {/* Quick category pills */}
          <AnimatedHeroItem>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Farms & Orchards", "Cider Houses", "Entertainment", "Accommodation"].map((label) => (
                <span
                  key={label}
                  className="px-4 py-1.5 rounded-full bg-surface/15 backdrop-blur-sm border border-surface/25 text-body-sm text-surface/80"
                >
                  {label}
                </span>
              ))}
            </div>
          </AnimatedHeroItem>
        </AnimatedHeroContent>

        {/* Bottom fade into page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-surface to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — Featured Categories
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-surface" aria-labelledby="categories-heading">
        <div className="max-w-site mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-2">Browse by type</p>
              <h2 id="categories-heading" className="font-serif text-heading-xl text-content-strong">
                Featured Categories
              </h2>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 text-body-sm text-brand-primary-mid hover:text-brand-accent font-sans transition-colors duration-200 group"
            >
              View all listings
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] ?? Map;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col items-center text-center p-5 rounded-lg bg-surface-warm border border-surface-muted hover:border-brand-primary-light hover:shadow-card-hover transition-all duration-slow ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-primary-pale group-hover:bg-brand-primary-mid/20 flex items-center justify-center mb-3 transition-colors duration-200">
                    <Icon size={22} className="text-brand-primary-mid group-hover:text-brand-primary transition-colors duration-200" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <span className="font-sans text-body-sm font-[500] text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200 leading-snug">
                    {cat.label}
                  </span>
                  {cat.count > 0 && (
                    <span className="mt-1 text-label text-content-subtle">
                      {cat.count} {cat.count === 1 ? "listing" : "listings"}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — Featured Businesses
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-surface-warm" aria-labelledby="featured-heading">
        <div className="max-w-site mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-label text-brand-accent uppercase tracking-widest mb-2">Hand-picked</p>
              <h2 id="featured-heading" className="font-serif text-heading-xl text-content-strong">
                Featured Businesses
              </h2>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 text-body-sm text-brand-primary-mid hover:text-brand-accent font-sans transition-colors duration-200 group"
            >
              Explore all
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((business, i) => (
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
                  tier={business.tier}
                />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — About Oak Glen banner
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-brand-primary" aria-labelledby="about-banner-heading">
        <div className="max-w-site mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Copy */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-label text-brand-accent uppercase tracking-widest mb-3">
              4,800 ft in the San Bernardinos
            </p>
            <h2 id="about-banner-heading" className="font-serif text-heading-xl lg:text-heading-xl text-surface mb-5 leading-snug">
              Oak Glen is California's best-kept mountain secret.
            </h2>
            <p className="text-body-lg text-surface/75 leading-relaxed max-w-xl">
              Just 90 minutes from Los Angeles, this small agricultural community transforms every autumn into a living celebration of the harvest season—apples, cider, wood smoke, and mountain air.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-on-accent uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
              >
                Our Story <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-surface/40 hover:border-surface/75 text-label text-surface uppercase tracking-widest backdrop-blur-sm hover:bg-surface/10 transition-all duration-200"
              >
                Browse Directory
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 lg:gap-8 text-center flex-shrink-0">
            <div>
              <p className="font-serif text-heading-xl text-brand-accent">1800s</p>
              <p className="text-label text-surface/60 uppercase tracking-widest mt-1">First orchards</p>
            </div>
            <div>
              <AnimatedCounter
                target={30}
                suffix="+"
                className="font-serif text-heading-xl text-brand-accent"
              />
              <p className="text-label text-surface/60 uppercase tracking-widest mt-1">Apple varieties</p>
            </div>
            <div>
              <AnimatedCounter
                target={60}
                suffix="+"
                className="font-serif text-heading-xl text-brand-accent"
              />
              <p className="text-label text-surface/60 uppercase tracking-widest mt-1">Local businesses</p>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>
    </main>
    </>
  );
}
