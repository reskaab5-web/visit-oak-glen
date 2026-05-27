import type { Metadata } from "next";
import { ClaimForm }     from "@/components/forms/ClaimForm";
import { MapPin, CheckCircle2, Clock, Star, ShieldCheck, ChevronDown } from "lucide-react";
import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }           from "@/lib/config/site";
import {
  buildWebPageSchema,
  buildFaqSchema,
}                                from "@/lib/schema/builders";
import { JsonLd }               from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `List Your Business — ${siteConfig.name}`,
  description: `Add your ${siteConfig.location.name} business to the directory, or update your existing listing.`,
  alternates:  { canonical: "/claim" },
  openGraph: {
    title:       `Get Listed — ${siteConfig.name}`,
    description: `Add or update your ${siteConfig.location.name} business listing.`,
  },
};

// ─── Trust signals ────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  {
    icon: CheckCircle2,
    title: "Free to list",
    body:  "Directory listings for Oak Glen businesses are free. We're here to help the community.",
  },
  {
    icon: Clock,
    title: "Quick turnaround",
    body:  "We review submissions and aim to publish new listings within a few business days.",
  },
  {
    icon: Star,
    title: "Featured options",
    body:  "Ask about featured placement to appear at the top of category pages and the homepage.",
  },
  {
    icon: ShieldCheck,
    title: "Update anytime",
    body:  "Hours, photos, descriptions — submit an update request whenever your details change.",
  },
] as const;

// ─── FAQ items — each Q must match a visible answer on the page ───────────────
// AEO: FAQPage schema is the highest-impact schema for "People Also Ask" capture.
// Rule: the answer text here must be readable on the page below.

const CLAIM_FAQS = [
  {
    question: `Is it free to list my business in the ${siteConfig.location.name} directory?`,
    answer:   `Yes — directory listings for ${siteConfig.location.name} businesses are free. We're here to help the community.`,
  },
  {
    question: "How long does it take to get listed after submitting?",
    answer:   "We review submissions and aim to publish new listings within a few business days.",
  },
  {
    question: "Can I get featured placement in the directory?",
    answer:   `Yes. Ask about featured placement to appear at the top of category pages and the ${siteConfig.name} homepage.`,
  },
  {
    question: "Can I update my listing after it's published?",
    answer:   "Yes. Hours, photos, descriptions — submit an update request whenever your details change and we'll process it promptly.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClaimPage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/claim",
          `List Your Business — ${siteConfig.name}`,
          `Add your ${siteConfig.location.name} business to the directory, or update your existing listing.`,
        ),
        buildFaqSchema(CLAIM_FAQS),
      ]} />
    <main>

      {/* ════════════════════════════════════════════════════════════════
          HEADER — compact, no full hero needed
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-site mx-auto">
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
                  {siteConfig.name}
                </span>
              </div>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <h1 className="font-serif text-heading-xl text-surface leading-[1.1]">
                Get Your Business Listed
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <p className="mt-4 font-sans text-body-md text-surface/75 leading-relaxed max-w-lg">
                New to the directory, or need to update your existing listing? Fill out the form and we'll take care of the rest.
              </p>
            </AnimatedHeroItem>

          </AnimatedHeroContent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          MAIN — form + trust sidebar
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-surface py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* ── Form — takes 2/3 on desktop ── */}
            <div className="lg:col-span-2">
              <ClaimForm />
            </div>

            {/* ── Sidebar ── */}
            <AnimatedSectionReveal className="space-y-6">
              {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-9 h-9 rounded-md bg-brand-primary-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-brand-primary-mid" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-sans text-body-md font-[500] text-content-strong mb-1">
                      {title}
                    </h3>
                    <p className="font-sans text-body-sm text-content-base leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-surface-muted pt-6">
                <p className="font-sans text-body-sm text-content-base leading-relaxed">
                  Questions? Email us at{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-brand-primary-mid hover:text-brand-primary underline underline-offset-2 transition-colors duration-200"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </p>
              </div>
            </AnimatedSectionReveal>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          FAQ SECTION — AEO: answers must match FAQPage schema above
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
      <section
        className="py-section px-4 sm:px-6 lg:px-8 bg-surface-warm border-t border-surface-muted"
        aria-labelledby="claim-faq-heading"
      >
        <div className="max-w-site mx-auto max-w-3xl">
          <div className="mb-10">
            <p className="font-sans text-label text-brand-primary-mid uppercase tracking-widest mb-3">
              Common questions
            </p>
            <h2
              id="claim-faq-heading"
              className="font-serif text-heading-lg text-content-strong"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-surface-muted">
            {CLAIM_FAQS.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans text-body-md font-[500] text-content-strong hover:text-brand-primary-mid transition-colors duration-200">
                  {question}
                  <ChevronDown
                    size={17}
                    className="flex-shrink-0 text-content-subtle group-open:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 font-sans text-body-md text-content-base leading-relaxed">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSectionReveal>

    </main>
    </>
  );
}
