import type { Metadata } from "next";
import Image             from "next/image";
import Link              from "next/link";
import {
  ArrowRight,
  Leaf,
  Users,
  Mountain,
  Heart,
} from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
  AnimatedCounter,
} from "@/components/motion/AnimatedHeroContent";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Our Story — Oak Glen Directory",
  description:
    "Learn about Oak Glen, California — a small mountain agricultural community 4,800 feet up in the San Bernardino foothills, where apple orchards have been growing since the 1800s.",
  openGraph: {
    title:       "Our Story — Oak Glen Directory",
    description: "The history and heart of California's apple country.",
    images:      [{ url: "/images/og/about.jpg" }],
  },
};

// ─── Season data ──────────────────────────────────────────────────────────────

const SEASONS = [
  {
    name:    "Spring",
    months:  "March – May",
    color:   "bg-[#eef4ea]",
    accent:  "text-forest-mid",
    border:  "border-forest-light/40",
    description:
      "The orchards shake off winter in a rush of pink and white blossoms. Apple Blossom Festival weekends fill Oak Glen Road with visitors coming to see the trees at their most spectacular. Lilacs bloom on the hillsides, the air is cool and clean, and the farms begin opening their doors after the quiet months.",
  },
  {
    name:    "Summer",
    months:  "June – August",
    color:   "bg-[#fdf8ef]",
    accent:  "text-harvest-gold",
    border:  "border-harvest-gold/30",
    description:
      "The pace slows to something genuinely relaxed. Berry picking opens at several farms, hard cider flows at the tasting rooms, and the mountain air provides a reliable 15-degree reprieve from the valley heat. Summer evenings at Riley's Farm dinner theater and Stone Soup Farm's curated dining events are among the most coveted reservations in the community.",
  },
  {
    name:    "Autumn",
    months:  "September – November",
    color:   "bg-[#fdf1e8]",
    accent:  "text-harvest-amber",
    border:  "border-harvest-amber/30",
    description:
      "Peak season. The apple harvest runs from late August through Thanksgiving, with u-pick orchards opening daily and the farm stores stocked with 30+ varieties you won't find in any grocery store. Corn mazes, wagon rides, pumpkin patches, cider donuts, hard cider tastings, and the Apple Butter Festival make October the most electric month on the mountain.",
  },
  {
    name:    "Winter",
    months:  "December – February",
    color:   "bg-[#eef1f6]",
    accent:  "text-forest-deep",
    border:  "border-forest-deep/20",
    description:
      "A quieter, more intimate version of Oak Glen reveals itself in winter. Fewer crowds, wood smoke drifting from chimneys, and the occasional dusting of snow on the ridgeline. Riley's Farm and Oak Tree Mountain run holiday programming, the Steak House fills with locals, and the retreat centers book up with groups seeking genuine mountain solitude.",
  },
] as const;

// ─── Community values ─────────────────────────────────────────────────────────

const VALUES = [
  {
    icon:  Mountain,
    label: "Place First",
    body:  "Every business here draws its identity from this specific mountain. The elevation, the soil, the fog that rolls through the valley in October — you can taste and feel Oak Glen's geography in everything grown and made here.",
  },
  {
    icon:  Users,
    label: "Family-Owned",
    body:  "The overwhelming majority of Oak Glen's businesses are owned and operated by the families who live here. Many are second- and third-generation. That continuity — people with names attached to what they sell — changes how everything feels.",
  },
  {
    icon:  Leaf,
    label: "Rooted in Season",
    body:  "Oak Glen doesn't fight its seasons — it celebrates them. Some farms close for the winter, others open only on weekends. The schedule is governed by what the land is doing, which means when something is available, it's genuinely at its best.",
  },
  {
    icon:  Heart,
    label: "Made to Last",
    body:  "The oldest orchards here have been producing apples for over 125 years. The buildings, the trees, the farming methods — nothing is built for a trend cycle. Visitors who've come every autumn since childhood bring their own children now.",
  },
] as const;

// ─── About Page ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Hero
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[580px] lg:min-h-[660px] flex flex-col justify-center overflow-hidden"
        aria-label="About Oak Glen"
      >
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=85"
            alt=""
            role="presentation"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/30 via-forest-deep/58 to-forest-deep/85" />
        </div>

        <AnimatedHeroContent className="relative z-10 max-w-site mx-auto w-full px-6 lg:px-8 py-hero flex flex-col items-center text-center">
          <AnimatedHeroItem>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-px bg-harvest-gold" aria-hidden="true" />
              <span className="text-label text-harvest-gold uppercase tracking-[0.22em]">
                Our Story
              </span>
              <div className="w-4 h-px bg-harvest-gold" aria-hidden="true" />
            </div>
          </AnimatedHeroItem>

          <AnimatedHeroItem>
            <h1 className="font-serif text-display-lg md:text-display-xl lg:text-display-2xl text-parchment leading-[1.07] max-w-4xl">
              A Mountain Community<br className="hidden sm:block" /> Built on the Harvest
            </h1>
          </AnimatedHeroItem>

          <AnimatedHeroItem>
            <p className="mt-6 text-body-lg text-parchment/80 max-w-2xl leading-relaxed">
              Tucked into the San Bernardino foothills at 4,800 feet, Oak Glen has been growing apples — and welcoming the people who come for them — since the 1800s.
            </p>
          </AnimatedHeroItem>
        </AnimatedHeroContent>

        <div
          className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-parchment to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — Origin Story
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-parchment" aria-labelledby="story-heading">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card-hover order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=900&q=85"
                alt="Apple trees in an Oak Glen orchard"
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Inset label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-block bg-forest-deep/85 backdrop-blur-sm rounded-lg px-4 py-3">
                  <p className="font-sans text-label text-harvest-gold uppercase tracking-widest">
                    Snow-Line Orchards
                  </p>
                  <p className="font-serif text-body-sm text-parchment/90 mt-0.5">
                    Original Apple Shed, est. 1898
                  </p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <p className="text-label text-forest-mid uppercase tracking-widest mb-3">
                Since the 1800s
              </p>
              <h2 id="story-heading" className="font-serif text-heading-xl text-oak-charcoal mb-6 leading-snug">
                California's apple country, hiding in plain sight.
              </h2>
              <div className="space-y-5 font-sans text-body-md text-oak-stone leading-relaxed">
                <p>
                  Oak Glen sits at the end of a winding road in the San Bernardino Mountains, roughly 90 minutes east of Los Angeles. Most people from the Inland Empire have heard of it. Far fewer have been. And the ones who've stumbled up that road on a October afternoon and watched the apple trees turn gold tend to come back every year for the rest of their lives.
                </p>
                <p>
                  The agricultural history here runs deep. Orchards have been operating in this valley since the late 1800s — Snow-Line Orchards still stands on the grounds of its original 1898 Apple Shed, California's oldest chestnut tree growing just outside. The farming families who put down roots in this mountain soil built something that has lasted because it was built with care, not speed.
                </p>
                <p>
                  Today, Oak Glen is home to over 60 local businesses, almost all of them family-owned. Farms, cider houses, restaurants, wedding venues, living history experiences, mountain B&Bs. The community is small enough that everyone knows each other and large enough to fill a full weekend without repeating yourself.
                </p>
                <p>
                  This directory exists to help people find their way into that community — to match the right visitor with the right orchard, the right afternoon, the right jar of apple butter to bring home.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — Stats banner
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-16 px-6 lg:px-8 bg-forest-deep" aria-label="Oak Glen by the numbers">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-serif text-heading-xl text-harvest-gold">1800s</p>
              <p className="text-label text-parchment/60 uppercase tracking-widest mt-2">
                First orchards planted
              </p>
            </div>
            <div>
              <p className="font-serif text-heading-xl text-harvest-gold">4,800<span className="text-heading-md"> ft</span></p>
              <p className="text-label text-parchment/60 uppercase tracking-widest mt-2">
                Elevation above sea level
              </p>
            </div>
            <div>
              <AnimatedCounter
                target={30}
                suffix="+"
                className="font-serif text-heading-xl text-harvest-gold"
              />
              <p className="text-label text-parchment/60 uppercase tracking-widest mt-2">
                Apple varieties grown
              </p>
            </div>
            <div>
              <AnimatedCounter
                target={60}
                suffix="+"
                className="font-serif text-heading-xl text-harvest-gold"
              />
              <p className="text-label text-parchment/60 uppercase tracking-widest mt-2">
                Local businesses
              </p>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — The Four Seasons
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-parchment-warm" aria-labelledby="seasons-heading">
        <div className="max-w-site mx-auto">

          <div className="text-center mb-12">
            <p className="text-label text-forest-mid uppercase tracking-widest mb-3">
              Plan your visit
            </p>
            <h2 id="seasons-heading" className="font-serif text-heading-xl text-oak-charcoal">
              Oak Glen through the year
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SEASONS.map((season) => (
              <div
                key={season.name}
                className={`${season.color} border ${season.border} rounded-xl p-6 flex flex-col gap-4`}
              >
                <div>
                  <p className={`font-sans text-label uppercase tracking-widest font-[600] ${season.accent}`}>
                    {season.name}
                  </p>
                  <p className="font-sans text-[11px] text-oak-fog mt-0.5 uppercase tracking-wider">
                    {season.months}
                  </p>
                </div>
                <p className="font-sans text-body-sm text-oak-stone leading-relaxed">
                  {season.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — What makes Oak Glen different
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-parchment" aria-labelledby="values-heading">
        <div className="max-w-site mx-auto">

          <div className="max-w-2xl mb-12">
            <p className="text-label text-forest-mid uppercase tracking-widest mb-3">
              Why it matters
            </p>
            <h2 id="values-heading" className="font-serif text-heading-xl text-oak-charcoal leading-snug">
              What separates Oak Glen from anywhere else.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, label, body }) => (
              <div key={label} className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-full bg-forest-pale flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-forest-mid" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-body-lg text-oak-charcoal mb-2">{label}</h3>
                  <p className="font-sans text-body-sm text-oak-stone leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — Pull quote
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&q=80"
            alt=""
            role="presentation"
            fill
            quality={80}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-deep/78" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p
            className="font-serif text-display-lg sm:text-heading-xl lg:text-display-lg text-parchment leading-snug"
            aria-label="Pull quote: Just 90 minutes from Los Angeles, Oak Glen is the kind of place that makes you wonder why you don't come more often."
          >
            &ldquo;Just 90 minutes from Los Angeles, Oak Glen is the kind of place that makes you wonder why you don&rsquo;t come more often.&rdquo;
          </p>
        </div>
      </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 7 — CTA
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section className="py-section px-6 lg:px-8 bg-parchment-warm border-t border-parchment-muted" aria-labelledby="about-cta-heading">
        <div className="max-w-site mx-auto flex flex-col items-center text-center gap-6">
          <p className="text-label text-forest-mid uppercase tracking-widest">
            Ready to explore?
          </p>
          <h2 id="about-cta-heading" className="font-serif text-heading-xl text-oak-charcoal max-w-xl leading-snug">
            Find your perfect stop in Oak Glen.
          </h2>
          <p className="font-sans text-body-md text-oak-stone max-w-lg leading-relaxed">
            Browse all 16 businesses across farms, orchards, cider houses, restaurants, accommodation, and more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-forest-deep hover:bg-forest-mid text-label text-parchment uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
            >
              Browse the Directory
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/categories/farms"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-forest-light hover:border-forest-mid text-label text-forest-mid hover:text-forest-deep uppercase tracking-widest transition-all duration-200"
            >
              Start with Farms & Orchards
            </Link>
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

    </main>
  );
}
