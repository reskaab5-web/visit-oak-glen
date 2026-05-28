import type { Metadata } from "next";
import Link              from "next/link";
import {
  ArrowRight,
  Clock,
  CalendarDays,
  MapPin,
  Users,
  Coffee,
  Leaf,
} from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }         from "@/lib/config/site";
import { buildWebPageSchema } from "@/lib/schema/builders";
import { JsonLd }             from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:       `Plan Your Visit — ${siteConfig.name}`,
  description:
    "Everything you need to plan a trip to Oak Glen, CA — sample itineraries, tips for families and couples, and what to know before you go.",
  alternates:  { canonical: "/plan" },
  openGraph: {
    title:       `Plan Your Oak Glen Visit — ${siteConfig.name}`,
    description: "Sample itineraries, best times to visit, and practical tips for planning a day trip or weekend in Oak Glen.",
  },
};

const ITINERARIES = [
  {
    icon:     Clock,
    title:    "Half-day visit (4–5 hours)",
    audience: "Day-trippers, first-timers",
    steps: [
      { time: "9:30am",  desc: "Arrive early — parking fills fast on fall weekends. Start at Snow-Line Orchards for a walk through the original orchard rows and a stop at the apple shed store." },
      { time: "11:00am", desc: "Drive up to Mom's Country Orchards for u-pick (September–November). Pick your bag, grab a cider donut from the farm store." },
      { time: "12:30pm", desc: "Lunch at the Oak Glen Steakhouse or a quick bite at Oak Tree Village." },
      { time: "2:00pm",  desc: "Browse the shops at Oak Tree Village — honey, jams, handmade goods, and the fudge shop. Pick up provisions for the drive home." },
    ],
    cta: { label: "Browse farms", href: "/categories/farms" },
  },
  {
    icon:     CalendarDays,
    title:    "Full day (7–8 hours)",
    audience: "Families, groups",
    steps: [
      { time: "9:00am",  desc: "Early start at Riley's Farm for a living history experience or farm tour. Book tickets in advance — programs sell out." },
      { time: "11:30am", desc: "U-pick at Willow Brook Apple Farm or Mom's Country Orchards. Wander the rows and fill your bag." },
      { time: "1:00pm",  desc: "Lunch at the Oak Glen Steakhouse — full menu, family-friendly, no reservations needed at lunch." },
      { time: "2:30pm",  desc: "Cider tasting at Willowbrook Apple Farm. Try the seasonal hard ciders alongside the orchard views." },
      { time: "4:00pm",  desc: "Last stop: Oak Tree Village for shopping, ice cream, and the walk-through exhibits." },
    ],
    cta: { label: "Entertainment", href: "/categories/entertainment" },
  },
  {
    icon:     Users,
    title:    "Weekend getaway",
    audience: "Couples, small groups",
    steps: [
      { time: "Saturday morning", desc: "Check in early at the Homestead at Wilshire Ranch or the Oak Glen Retreat Center. Drop your bags and walk the property before the farms open." },
      { time: "Saturday afternoon", desc: "U-pick and farm store circuit: Snow-Line, Mom's, and Willow Brook in one afternoon. Each has a distinct personality — plan 45 minutes per stop." },
      { time: "Saturday evening", desc: "Dinner at the Oak Glen Steakhouse, then a quiet evening at your accommodation with your farm-store haul." },
      { time: "Sunday morning", desc: "Riley's Farm for the morning programming. Sunday tends to be slightly less crowded than Saturday." },
      { time: "Sunday afternoon", desc: "Los Rios Rancho for their apple products and the historic ranch grounds, then head home via Oak Glen Road — stop for the view." },
    ],
    cta: { label: "Accommodation", href: "/categories/accommodation" },
  },
] as const;

const TIPS = [
  {
    icon:  CalendarDays,
    title: "Best time to visit",
    body:  "September through October is peak season — full harvest, all businesses open, and the best weather. Spring (April–May) is excellent for blossoms and no crowds. Avoid the first two November weekends after a cold snap — they can be unexpectedly packed.",
  },
  {
    icon:  Clock,
    title: "Arrive before 10am",
    body:  "On fall weekends, Oak Glen Road fills up and parking at the popular farms gets tight by mid-morning. The farms are a different experience at 9am versus noon. Early arrivals get the orchards to themselves.",
  },
  {
    icon:  MapPin,
    title: "One road, easy navigation",
    body:  "Almost everything is on Oak Glen Road. You can drive the entire length in about 15 minutes, which makes it easy to hop between farms without planning complex routes. A rough north-to-south order: Riley's Farm → Snow-Line → Mom's → Los Rios Rancho → Willow Brook → Oak Tree Village.",
  },
  {
    icon:  Coffee,
    title: "Bring cash",
    body:  "Most farms accept cards, but a few smaller vendors and roadside stands are cash-only. An ATM is not easy to find once you're on the mountain. $40–60 cash per person covers u-pick, a farm store visit, and food comfortably.",
  },
  {
    icon:  Users,
    title: "Call ahead in winter",
    body:  "Hours shrink significantly November through February, and some smaller farms close entirely. Always check a business's current hours before making the drive — it's 90 minutes from LA.",
  },
  {
    icon:  Leaf,
    title: "Dress in layers",
    body:  "At 4,800 feet, temperatures drop fast once the sun moves behind the ridgeline — even in September. A fleece or light jacket is essential for afternoon visits, and a warm layer is mandatory for anything after 4pm in fall or spring.",
  },
] as const;

export default function PlanPage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/plan",
          `Plan Your Visit — ${siteConfig.name}`,
          "Itineraries, tips, and everything you need to plan a trip to Oak Glen, CA.",
        ),
      ]} />
      <main>

        {/* Hero */}
        <section className="bg-brand-primary py-24 lg:py-32 px-6 lg:px-8" aria-label="Plan your Oak Glen visit">
          <AnimatedHeroContent className="max-w-site mx-auto text-center flex flex-col items-center">
            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
                <span className="text-label text-brand-accent uppercase tracking-[0.22em]">Visitor guide</span>
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
              </div>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg md:text-display-xl lg:text-display-2xl text-surface leading-[1.07] max-w-3xl">
                Plan Your<br className="hidden sm:block" /> Oak Glen Visit
              </h1>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <p className="mt-6 text-body-lg text-surface/80 max-w-2xl leading-relaxed">
                Sample itineraries for half-day trips, full days, and weekend stays — plus practical tips to make the most of your visit.
              </p>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link href="/season-guide" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card">
                  Season Guide <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/getting-here" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-surface/30 hover:border-surface/60 text-label text-surface/80 hover:text-surface uppercase tracking-widest transition-all duration-200">
                  Getting Here
                </Link>
              </div>
            </AnimatedHeroItem>
          </AnimatedHeroContent>
        </section>

        {/* Itineraries */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface" aria-labelledby="itineraries-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Sample itineraries</p>
              <h2 id="itineraries-heading" className="font-serif text-heading-xl text-content-strong leading-snug">
                However much time you have.
              </h2>
            </div>
            <div className="space-y-10">
              {ITINERARIES.map(({ icon: Icon, title, audience, steps, cta }) => (
                <div key={title} className="bg-surface-warm border border-surface-muted rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-surface-muted flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-brand-primary-pale flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-heading-md text-content-strong">{title}</h3>
                      <p className="font-sans text-body-sm text-content-subtle mt-0.5">Best for: {audience}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <ol className="space-y-5" role="list">
                      {steps.map(({ time, desc }) => (
                        <li key={time} className="flex gap-4">
                          <span className="font-sans text-label text-brand-primary-mid uppercase tracking-wider flex-shrink-0 w-28 pt-0.5">{time}</span>
                          <p className="font-sans text-body-sm text-content-base leading-relaxed">{desc}</p>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-6 pt-5 border-t border-surface-muted">
                      <Link href={cta.href} className="inline-flex items-center gap-2 text-label text-brand-primary-mid hover:text-brand-primary uppercase tracking-widest text-[11px] transition-colors">
                        {cta.label} <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* Tips */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface-warm border-t border-surface-muted" aria-labelledby="tips-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Before you go</p>
              <h2 id="tips-heading" className="font-serif text-heading-xl text-content-strong leading-snug">
                Things worth knowing.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TIPS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary-pale flex items-center justify-center">
                    <Icon size={18} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-body-lg text-content-strong">{title}</h3>
                  <p className="font-sans text-body-sm text-content-base leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* CTA */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-brand-primary" aria-labelledby="plan-cta-heading">
          <div className="max-w-site mx-auto flex flex-col items-center text-center gap-6">
            <h2 id="plan-cta-heading" className="font-serif text-heading-xl text-surface max-w-xl leading-snug">
              Find the businesses that fit your trip.
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/directory" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card">
                Browse the Directory <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/map" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-surface/30 hover:border-surface/60 text-label text-surface/80 hover:text-surface uppercase tracking-widest transition-all duration-200">
                View the Map
              </Link>
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

      </main>
    </>
  );
}
