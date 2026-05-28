import type { Metadata } from "next";
import Link              from "next/link";
import { Mail, FileText, Image as ImageIcon, ArrowRight } from "lucide-react";

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
  title:       `Press & Media — ${siteConfig.name}`,
  description:
    `Press inquiries, media resources, and facts about the Oak Glen Directory and the Oak Glen, CA community.`,
  alternates:  { canonical: "/press" },
  openGraph: {
    title:       `Press & Media — ${siteConfig.name}`,
    description: `Media kit, facts, and contact information for press covering Oak Glen, CA.`,
  },
};

// ─── Fast facts ───────────────────────────────────────────────────────────────

const FACTS = [
  { label: "Location",       value: "Oak Glen, CA — San Bernardino Mountains" },
  { label: "Elevation",      value: "4,800 feet above sea level" },
  { label: "Distance",       value: "~90 minutes east of Los Angeles" },
  { label: "History",        value: "Apple orchards operating since the late 1800s" },
  { label: "Apple varieties",value: "30+ varieties grown locally" },
  { label: "Businesses",     value: "60+ local businesses, almost all family-owned" },
  { label: "Peak season",    value: "September – November (apple harvest)" },
  { label: "Directory URL",  value: "directory.visitoakglen.com" },
] as const;

// ─── Media resources ──────────────────────────────────────────────────────────

const RESOURCES = [
  {
    icon:  FileText,
    title: "Story ideas",
    body:  "Seasonal harvest coverage, family travel, agritourism in Southern California, living history experiences, mountain escapes from LA.",
  },
  {
    icon:  ImageIcon,
    title: "Images & assets",
    body:  "For photography and media assets, email us and we'll connect you with local businesses and the Oak Glen community association.",
  },
  {
    icon:  Mail,
    title: "Press contact",
    body:  `Reach us at ${siteConfig.contactEmail}. We aim to respond to press inquiries within one business day.`,
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PressPage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/press",
          `Press & Media — ${siteConfig.name}`,
          "Press inquiries and media resources for the Oak Glen Directory.",
        ),
      ]} />
      <main>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 — Hero
        ════════════════════════════════════════════════════════════════ */}
        <section className="bg-brand-primary py-24 lg:py-32 px-6 lg:px-8" aria-label="Press and media">
          <AnimatedHeroContent className="max-w-site mx-auto flex flex-col items-center text-center">
            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
                <span className="text-label text-brand-accent uppercase tracking-[0.22em]">Media</span>
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
              </div>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg md:text-display-xl text-surface leading-[1.07] max-w-2xl">
                Press &amp; Media Inquiries
              </h1>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <p className="mt-6 text-body-lg text-surface/80 max-w-xl leading-relaxed">
                Covering Oak Glen or the San Bernardino Mountains? We're happy to help connect you with local businesses, story ideas, and community resources.
              </p>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=Press Inquiry`}
                className="mt-10 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
              >
                Email the press team
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </AnimatedHeroItem>
          </AnimatedHeroContent>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 — Media resources
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface" aria-labelledby="resources-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">For media</p>
              <h2 id="resources-heading" className="font-serif text-heading-xl text-content-strong leading-snug">
                How we can help.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESOURCES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-surface-warm border border-surface-muted rounded-xl p-6 flex flex-col gap-4">
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

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 — Fast facts
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface-warm border-t border-surface-muted" aria-labelledby="facts-heading">
          <div className="max-w-site mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-label text-brand-primary-mid uppercase tracking-widest mb-3">Quick reference</p>
              <h2 id="facts-heading" className="font-serif text-heading-xl text-content-strong">
                Oak Glen — fast facts
              </h2>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 max-w-3xl">
              {FACTS.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 border-b border-surface-muted pb-5">
                  <dt className="font-sans text-label text-content-subtle uppercase tracking-widest">{label}</dt>
                  <dd className="font-serif text-body-lg text-content-strong">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 4 — CTA
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-16 px-6 lg:px-8 bg-surface border-t border-surface-muted" aria-labelledby="press-cta-heading">
          <div className="max-w-site mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 id="press-cta-heading" className="font-serif text-heading-lg text-content-strong">
                Ready to get in touch?
              </h2>
              <p className="font-sans text-body-md text-content-base mt-1">
                Email us at{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-brand-primary-mid hover:text-brand-primary underline underline-offset-2 transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-primary hover:bg-brand-primary-mid text-label text-surface uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
              >
                About Oak Glen
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-brand-primary-light hover:border-brand-primary-mid text-label text-brand-primary-mid uppercase tracking-widest transition-all duration-200"
              >
                General contact
              </Link>
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

      </main>
    </>
  );
}
