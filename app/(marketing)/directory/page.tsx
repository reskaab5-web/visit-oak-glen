/**
 * /directory — Main business listing page
 *
 * Server component: handles metadata and initial data fetch.
 * Client component (DirectoryClient): handles all interactivity.
 *
 * This split keeps metadata generation server-side (required by Next.js)
 * while the interactive filter, sort, and animation logic runs client-side.
 */

import type { Metadata } from "next";
import Image             from "next/image";
import { MapPin }        from "lucide-react";

import { DirectoryClient }          from "@/components/directory/DirectoryClient";
import {
  AnimatedHeroContent,
  AnimatedHeroItem,
}                                   from "@/components/motion/AnimatedHeroContent";
import { businesses, categories }   from "@/lib/data/mockData";
import { siteConfig }               from "@/lib/config/site";
import {
  buildCollectionPageSchema,
  buildItemListSchema,
}                                   from "@/lib/schema/builders";
import { JsonLd }                   from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Business Directory — ${siteConfig.location.name}, ${siteConfig.location.state}`,
  description: `Browse all businesses in ${siteConfig.location.name} — filter by category and find your next favourite stop.`,
  alternates:  { canonical: "/directory" },
  openGraph: {
    title:       `${siteConfig.location.name} Business Directory`,
    description: `Every business in ${siteConfig.location.name} in one place.`,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q }      = await searchParams;
  const initialQuery = typeof q === "string" ? q.trim() : "";
  const totalCount = businesses.length;

  return (
    <>
      <JsonLd data={[
        buildCollectionPageSchema(
          siteConfig,
          "/directory",
          `${siteConfig.location.name} Business Directory`,
          `Browse all businesses in ${siteConfig.location.name} — filter by category and find your next favourite stop.`,
        ),
        buildItemListSchema(businesses, `${siteConfig.url}/directory`, siteConfig),
      ]} />
    <main>
      {/* ════════════════════════════════════════════════════════════════
          HERO — compact, not full-screen; lets users reach listings fast
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[300px] sm:min-h-[340px] flex flex-col justify-end overflow-hidden"
        aria-label={`${siteConfig.location.name} Business Directory`}
      >
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://www.oakglen.org/wp-content/uploads/2024/04/oak-2-scaled.jpg"
            alt=""
            role="presentation"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/55 to-brand-primary/20" />
        </div>

        {/* Content — animated on mount */}
        <div className="relative z-10 max-w-site mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 pt-20 sm:pb-14">
          <AnimatedHeroContent className="max-w-2xl">

            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-4">
                <MapPin
                  size={13}
                  className="text-brand-accent"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="font-sans text-label text-brand-accent uppercase tracking-[0.2em]">
                  {siteConfig.location.name}, {siteConfig.location.state}
                </span>
              </div>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg sm:text-heading-xl lg:text-display-lg text-surface leading-[1.1]">
                Business Directory
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <p className="mt-4 font-sans text-body-md sm:text-body-lg text-surface/80 leading-relaxed">
                {totalCount} curated listings spanning farms, orchards, cider houses, restaurants, and more in the San Bernardino Mountains.
              </p>
            </AnimatedHeroItem>

          </AnimatedHeroContent>
        </div>

        {/* Fade to page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          INTERACTIVE DIRECTORY — filter, sort, animated grid
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-surface min-h-[60vh]">
        <DirectoryClient
          businesses={businesses}
          categories={categories}
          initialQuery={initialQuery}
        />
      </div>
    </main>
    </>
  );
}
