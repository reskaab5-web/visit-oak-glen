import type { Metadata } from "next";
import Link              from "next/link";
import { ArrowRight, Car, Clock, MapPin, AlertTriangle, Navigation } from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }         from "@/lib/config/site";
import { buildWebPageSchema } from "@/lib/schema/builders";
import { JsonLd }             from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:       `Getting Here — ${siteConfig.name}`,
  description:
    "Directions to Oak Glen, CA from Los Angeles, San Diego, and the Inland Empire. Parking tips, road conditions, and what to know before driving up.",
  alternates:  { canonical: "/getting-here" },
  openGraph: {
    title:       `Getting to Oak Glen, CA — ${siteConfig.name}`,
    description: "Directions, parking, road conditions, and driving tips for visiting Oak Glen in the San Bernardino Mountains.",
  },
};

const ROUTES = [
  {
    from:     "Los Angeles / West LA",
    time:     "~90 minutes",
    distance: "~75 miles",
    steps: [
      "Take the 10 Freeway East toward San Bernardino",
      "Exit at Beaumont Ave / Oak Glen Road (exit 88B) in Beaumont",
      "Turn left onto Oak Glen Road and follow it north approximately 11 miles into the mountains",
      "Oak Glen Road winds through the valley — follow it past Live Oak Canyon Road to reach the main farm area",
    ],
    note: "Add 20–30 minutes during peak fall weekends due to congestion on the 10 and on Oak Glen Road itself.",
  },
  {
    from:     "Inland Empire (Riverside / San Bernardino)",
    time:     "~45 minutes",
    distance: "~30 miles",
    steps: [
      "Take the 10 Freeway East or the 60 East to Beaumont",
      "Exit at Beaumont Ave / Oak Glen Road",
      "Turn left and follow Oak Glen Road north ~11 miles",
    ],
    note: "The closest major city. Great option for a weekday visit when LA traffic isn't a factor.",
  },
  {
    from:     "San Diego",
    time:     "~2 hours",
    distance: "~120 miles",
    steps: [
      "Take the 15 North to the 215 North",
      "Merge onto the 10 Freeway East toward Beaumont",
      "Exit at Beaumont Ave / Oak Glen Road and follow north into the mountains",
    ],
    note: "A scenic and worthwhile drive. Consider combining with a stop in Redlands on the way back.",
  },
  {
    from:     "Orange County",
    time:     "~75 minutes",
    distance: "~65 miles",
    steps: [
      "Take the 91 Freeway East to the 15 North, then merge onto the 10 East",
      "Alternatively: take the 91 East directly to Beaumont (can be faster on weekends)",
      "Exit at Beaumont Ave / Oak Glen Road, follow north into the mountains",
    ],
    note: "91/10 interchange in Corona can back up on weekend mornings — leave before 8:30am.",
  },
] as const;

const PARKING_TIPS = [
  {
    title: "Arrive before 10am on fall weekends",
    body:  "The farms along Oak Glen Road don't have large centralized parking — each business has its own lot. By 10:30am on a busy October Saturday, the most popular farms (Snow-Line, Mom's, Riley's) see lots fill. Early arrival is the single most effective tip.",
  },
  {
    title: "Oak Glen Road has roadside pullouts",
    body:  "If a specific farm's lot is full, there are legal roadside pullout areas on Oak Glen Road. It's common to park and walk a short distance. Keep Oak Glen Road clear of blocking traffic.",
  },
  {
    title: "Overflow near Oak Tree Village",
    body:  "Oak Tree Village tends to have more parking capacity than the smaller farm lots. It makes a good base for walking to nearby stops.",
  },
  {
    title: "No paid parking lots",
    body:  "All business parking is free. There are no parking structures or paid lots in Oak Glen.",
  },
] as const;

const ROAD_INFO = [
  {
    icon:  AlertTriangle,
    title: "Snow and ice in winter",
    body:  "Oak Glen Road can be icy or snow-covered from November through February. CalTrans occasionally requires chains. Check the CalTrans Quickmap (quickmap.dot.ca.gov) before driving up in winter.",
  },
  {
    icon:  Navigation,
    title: "GPS works, but verify the route",
    body:  "Most GPS apps route correctly to Oak Glen Road. Double-check that your navigation is directing you to Oak Glen Road off the 10 in Beaumont — not to the city of Oak Glen in a different county.",
  },
  {
    icon:  Car,
    title: "The road is winding",
    body:  "Oak Glen Road climbs ~2,000 feet over about 11 miles. It's paved and well-maintained but curvy. Take it easy, especially on the descent. Some riders experience motion sickness — plan accordingly.",
  },
] as const;

export default function GettingHerePage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/getting-here",
          `Getting Here — ${siteConfig.name}`,
          "Directions to Oak Glen, CA from Los Angeles, San Diego, and the Inland Empire.",
        ),
      ]} />
      <main>

        {/* Hero */}
        <section className="bg-brand-primary py-24 lg:py-32 px-6 lg:px-8" aria-label="Directions to Oak Glen">
          <AnimatedHeroContent className="max-w-site mx-auto text-center flex flex-col items-center">
            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
                <span className="text-label text-brand-accent uppercase tracking-[0.22em]">Directions</span>
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
              </div>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg md:text-display-xl lg:text-display-2xl text-surface leading-[1.07] max-w-3xl">
                Getting to Oak Glen
              </h1>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <p className="mt-6 text-body-lg text-surface/80 max-w-xl leading-relaxed">
                Oak Glen sits at 4,800 feet in the San Bernardino Mountains, about 90 minutes east of Los Angeles. Here's how to get here from anywhere in Southern California.
              </p>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <div className="mt-8 inline-flex items-center gap-3 bg-surface/10 backdrop-blur-sm border border-surface/20 rounded-xl px-5 py-3">
                <MapPin size={16} className="text-brand-accent flex-shrink-0" aria-hidden="true" />
                <span className="font-sans text-body-sm text-surface/90">
                  Oak Glen Road, Oak Glen, CA 92399
                </span>
              </div>
            </AnimatedHeroItem>
          </AnimatedHeroContent>
        </section>

        {/* Directions */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface" aria-labelledby="directions-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">By car</p>
              <h2 id="directions-heading" className="font-serif text-heading-xl text-content-strong leading-snug">
                Directions from major areas
              </h2>
              <p className="mt-3 font-sans text-body-md text-content-base">
                Oak Glen is accessible only by car — there is no public transit service to the mountain.
              </p>
            </div>
            <div className="space-y-6">
              {ROUTES.map(({ from, time, distance, steps, note }) => (
                <div key={from} className="bg-surface-warm border border-surface-muted rounded-xl overflow-hidden">
                  <div className="p-5 border-b border-surface-muted flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-serif text-heading-md text-content-strong">{from}</h3>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-content-subtle" aria-hidden="true" />
                        <span className="font-sans text-body-sm text-content-subtle">{time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Navigation size={14} className="text-content-subtle" aria-hidden="true" />
                        <span className="font-sans text-body-sm text-content-subtle">{distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <ol className="space-y-2 mb-4" role="list">
                      {steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-sans text-label text-brand-primary-mid font-[600] flex-shrink-0 w-5">{i + 1}.</span>
                          <span className="font-sans text-body-sm text-content-base leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="font-sans text-body-sm text-content-subtle italic border-t border-surface-muted pt-4">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* Road info */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface-warm border-t border-surface-muted" aria-labelledby="road-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Road conditions</p>
              <h2 id="road-heading" className="font-serif text-heading-xl text-content-strong">What to know about the drive</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ROAD_INFO.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-surface border border-surface-muted rounded-xl p-6 flex flex-col gap-4">
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

        {/* Parking */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface border-t border-surface-muted" aria-labelledby="parking-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">On arrival</p>
              <h2 id="parking-heading" className="font-serif text-heading-xl text-content-strong">Parking tips</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
              {PARKING_TIPS.map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-2">
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
        <section className="py-section px-6 lg:px-8 bg-brand-primary" aria-labelledby="gethere-cta-heading">
          <div className="max-w-site mx-auto flex flex-col items-center text-center gap-6">
            <h2 id="gethere-cta-heading" className="font-serif text-heading-xl text-surface max-w-xl leading-snug">
              Now plan what you'll do when you get here.
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/plan" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card">
                Plan Your Visit <ArrowRight size={15} aria-hidden="true" />
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
