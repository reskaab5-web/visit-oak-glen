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

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Business Directory — Oak Glen, CA",
  description:
    "Browse all businesses in Oak Glen — orchards, cideries, gift shops, lodging, and more. Filter by category and find your next favourite stop.",
  openGraph: {
    title:       "Oak Glen Business Directory",
    description: "Every orchard, café, and artisan shop in one place.",
    images:      [{ url: "/images/og/directory.jpg" }],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DirectoryPage() {
  const totalCount = businesses.length;

  return (
    <main>
      {/* ════════════════════════════════════════════════════════════════
          HERO — compact, not full-screen; lets users reach listings fast
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[300px] sm:min-h-[340px] flex flex-col justify-end overflow-hidden"
        aria-label="Oak Glen Business Directory"
      >
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://picsum.photos/seed/directory-hero/1600/600"
            alt=""
            role="presentation"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/55 to-forest-deep/20" />
        </div>

        {/* Content — animated on mount */}
        <div className="relative z-10 max-w-site mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 pt-20 sm:pb-14">
          <AnimatedHeroContent className="max-w-2xl">

            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-4">
                <MapPin
                  size={13}
                  className="text-harvest-gold"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="font-sans text-label text-harvest-gold uppercase tracking-[0.2em]">
                  Oak Glen, California
                </span>
              </div>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg sm:text-heading-xl lg:text-display-lg text-parchment leading-[1.1]">
                Business Directory
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <p className="mt-4 font-sans text-body-md sm:text-body-lg text-parchment/80 leading-relaxed">
                {totalCount} curated listings spanning orchards, cafés, gift shops, and lodging in the San Bernardino Mountains.
              </p>
            </AnimatedHeroItem>

          </AnimatedHeroContent>
        </div>

        {/* Fade to page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-parchment to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          INTERACTIVE DIRECTORY — filter, sort, animated grid
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-parchment min-h-[60vh]">
        <DirectoryClient
          businesses={businesses}
          categories={categories}
        />
      </div>
    </main>
  );
}
