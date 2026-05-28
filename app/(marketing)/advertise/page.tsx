import type { Metadata } from "next";
import Link              from "next/link";
import {
  ArrowRight,
  BarChart2,
  Eye,
  MapPin,
  Star,
  CheckCircle2,
  Zap,
  Users,
  Globe,
} from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }         from "@/lib/config/site";
import { buildWebPageSchema } from "@/lib/schema/builders";
import { JsonLd }             from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Advertise Your Business — ${siteConfig.name}`,
  description:
    `Reach visitors planning a trip to Oak Glen, CA. Get your business in front of thousands of people searching for orchards, farms, cider houses, and experiences in the San Bernardino Mountains.`,
  alternates:  { canonical: "/advertise" },
  openGraph: {
    title:       `Advertise on ${siteConfig.name}`,
    description: `Connect your Oak Glen business with visitors actively planning their trip.`,
  },
};

// ─── Tier data ────────────────────────────────────────────────────────────────

const TIERS = [
  {
    name:     "Standard",
    price:    "Free",
    note:     "Always free",
    color:    "bg-surface border-surface-muted",
    heading:  "text-content-strong",
    features: [
      "Business name, address & phone",
      "Hours of operation",
      "Category listing",
      "Google Maps pin",
      "Basic search visibility",
    ],
    cta:      { label: "Get listed free", href: "/claim" },
    accent:   false,
  },
  {
    name:     "Enhanced",
    price:    "Coming soon",
    note:     "Founding rate available",
    color:    "bg-brand-primary border-brand-primary",
    heading:  "text-surface",
    features: [
      "Everything in Standard",
      "Photo gallery (up to 8 images)",
      "Extended business description",
      "Social media & website links",
      "Press & media mentions",
      "Priority search placement",
      "\"Featured\" badge on listing card",
    ],
    cta:      { label: "Get notified", href: "/claim" },
    accent:   true,
  },
  {
    name:     "Premium",
    price:    "Coming soon",
    note:     "Limited spots",
    color:    "bg-surface border-brand-accent",
    heading:  "text-content-strong",
    features: [
      "Everything in Enhanced",
      "Homepage feature placement",
      "Category page spotlight",
      "Seasonal promotion callouts",
      "Performance analytics dashboard",
      "Dedicated listing support",
    ],
    cta:      { label: "Join waitlist", href: "/claim" },
    accent:   false,
  },
] as const;

// ─── Why advertise stats ───────────────────────────────────────────────────────

const STATS = [
  { icon: Eye,      value: "High intent",  label: "Visitors are actively planning a trip to Oak Glen" },
  { icon: MapPin,   value: "Local focus",  label: "Every search is for Oak Glen businesses specifically" },
  { icon: Users,    value: "Family crowd", label: "Seasonal visitors looking for farms, food & experiences" },
  { icon: BarChart2,value: "Growing",      label: "Directory traffic grows with every new business added" },
] as const;

// ─── Benefits ─────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon:  Globe,
    title: "Visitors find you before they arrive",
    body:  "People planning a day trip or weekend in Oak Glen search for exactly what you offer. A directory listing puts you in front of them at the moment they're deciding where to go.",
  },
  {
    icon:  Zap,
    title: "No website required",
    body:  "Whether you have a full website or just a phone number, a directory listing gives you a professional presence online and makes it easy for people to find your hours, location, and contact info.",
  },
  {
    icon:  Star,
    title: "Built for Oak Glen, not the whole internet",
    body:  "Unlike Yelp or Google, this directory is exclusively about Oak Glen. Everyone who finds your listing is already interested in visiting the community — not just scrolling past.",
  },
  {
    icon:  CheckCircle2,
    title: "Standard listings are always free",
    body:  "We believe every Oak Glen business deserves to be found. Basic listings are free forever. Enhanced and Premium tiers add visibility and features for businesses that want more.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdvertisePage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/advertise",
          `Advertise Your Business — ${siteConfig.name}`,
          "Reach visitors planning a trip to Oak Glen, CA. Get your business listed in the directory.",
        ),
      ]} />
      <main>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 — Hero
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="bg-brand-primary py-24 lg:py-32 px-6 lg:px-8"
          aria-label="Advertise your Oak Glen business"
        >
          <AnimatedHeroContent className="max-w-site mx-auto text-center flex flex-col items-center">
            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
                <span className="text-label text-brand-accent uppercase tracking-[0.22em]">
                  For Businesses
                </span>
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
              </div>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg md:text-display-xl lg:text-display-2xl text-surface leading-[1.07] max-w-3xl">
                Get Found by Visitors<br className="hidden sm:block" /> Planning Their Trip
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <p className="mt-6 text-body-lg text-surface/80 max-w-2xl leading-relaxed">
                The Oak Glen Directory connects local businesses with the thousands of families, couples, and day-trippers who visit the mountain every year. Standard listings are free — always.
              </p>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link
                  href="/claim"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
                >
                  List Your Business Free
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/directory"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-surface/30 hover:border-surface/60 text-label text-surface/80 hover:text-surface uppercase tracking-widest transition-all duration-200"
                >
                  Browse Listings
                </Link>
              </div>
            </AnimatedHeroItem>
          </AnimatedHeroContent>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 — Why it works
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface-warm border-b border-surface-muted" aria-labelledby="why-heading">
          <div className="max-w-site mx-auto">
            <div className="text-center mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Why it works</p>
              <h2 id="why-heading" className="font-serif text-heading-xl text-content-strong">
                High-intent traffic, focused on Oak Glen
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={value} className="bg-surface rounded-xl p-6 border border-surface-muted flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary-pale flex items-center justify-center">
                    <Icon size={18} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <p className="font-serif text-body-lg text-content-strong">{value}</p>
                  <p className="font-sans text-body-sm text-content-base leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 — Benefits
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface" aria-labelledby="benefits-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Benefits</p>
              <h2 id="benefits-heading" className="font-serif text-heading-xl text-content-strong leading-snug">
                A directory built for this community.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {BENEFITS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-5">
                  <div className="w-11 h-11 rounded-full bg-brand-primary-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={20} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-body-lg text-content-strong mb-2">{title}</h3>
                    <p className="font-sans text-body-sm text-content-base leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 4 — Tiers
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface-warm" aria-labelledby="tiers-heading">
          <div className="max-w-site mx-auto">
            <div className="text-center mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Listing options</p>
              <h2 id="tiers-heading" className="font-serif text-heading-xl text-content-strong">
                Start free. Grow when you're ready.
              </h2>
              <p className="mt-4 font-sans text-body-md text-content-base max-w-xl mx-auto leading-relaxed">
                Every Oak Glen business gets a free listing. Enhanced tiers are in development — sign up now to lock in a founding rate.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-xl border-2 p-8 flex flex-col gap-6 ${tier.color}`}
                >
                  <div>
                    <p className={`font-sans text-label uppercase tracking-widest font-[600] mb-1 ${tier.accent ? "text-brand-accent" : "text-brand-primary-mid"}`}>
                      {tier.name}
                    </p>
                    <p className={`font-serif text-heading-xl ${tier.heading}`}>{tier.price}</p>
                    <p className={`font-sans text-body-sm mt-1 ${tier.accent ? "text-surface/60" : "text-content-subtle"}`}>
                      {tier.note}
                    </p>
                  </div>

                  <ul className="space-y-3" role="list">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${tier.accent ? "text-brand-accent" : "text-brand-primary-mid"}`}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span className={`font-sans text-body-sm leading-snug ${tier.accent ? "text-surface/85" : "text-content-base"}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta.href}
                    className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-label uppercase tracking-widest transition-all duration-200 hover:-translate-y-px ${
                      tier.accent
                        ? "bg-brand-accent hover:bg-brand-accent-dark text-white shadow-card"
                        : "bg-brand-primary hover:bg-brand-primary-mid text-surface shadow-card"
                    }`}
                  >
                    {tier.cta.label}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 5 — CTA
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-brand-primary" aria-labelledby="advertise-cta-heading">
          <div className="max-w-site mx-auto flex flex-col items-center text-center gap-6">
            <p className="text-label text-brand-accent uppercase tracking-widest">Ready to get started?</p>
            <h2 id="advertise-cta-heading" className="font-serif text-heading-xl text-surface max-w-xl leading-snug">
              Your listing takes less than five minutes.
            </h2>
            <p className="font-sans text-body-md text-surface/70 max-w-lg leading-relaxed">
              Fill out a short form and we'll review your submission within a few business days. No account required, no credit card.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link
                href="/claim"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
              >
                List Your Business Free
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-surface/30 hover:border-surface/60 text-label text-surface/80 hover:text-surface uppercase tracking-widest transition-all duration-200"
              >
                Have a question?
              </Link>
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

      </main>
    </>
  );
}
