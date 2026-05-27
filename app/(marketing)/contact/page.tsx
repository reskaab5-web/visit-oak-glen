import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }           from "@/lib/config/site";
import {
  buildContactPageSchema,
  buildOrganizationSchema,
}                                from "@/lib/schema/builders";
import { JsonLd }               from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Contact — ${siteConfig.name}`,
  description: `Get in touch with the ${siteConfig.name} team. Questions about listings, corrections, partnerships, or anything else — we're here.`,
  alternates:  { canonical: "/contact" },
  openGraph: {
    title:       `Contact ${siteConfig.name}`,
    description: `Reach the team behind the ${siteConfig.name}.`,
  },
};

// ─── Contact details ──────────────────────────────────────────────────────────
// Not `as const` — values are derived from siteConfig at module load time.

const CONTACT_DETAILS = [
  {
    icon:  Mail,
    label: "Email",
    value: siteConfig.contactEmail,
    href:  `mailto:${siteConfig.contactEmail}`,
  },
  {
    icon:  MapPin,
    label: "Location",
    value: `${siteConfig.location.name}, ${siteConfig.location.state} ${siteConfig.location.zip}`,
    href:  null as string | null,
  },
  {
    icon:  Clock,
    label: "Response time",
    value: "1–2 business days",
    href:  null as string | null,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[
        buildContactPageSchema(siteConfig),
        buildOrganizationSchema(siteConfig),
      ]} />
    <main>

      {/* ════════════════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-site mx-auto">
          <AnimatedHeroContent className="max-w-2xl">

            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare
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
                Get in touch
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <p className="mt-4 font-sans text-body-md text-surface/75 leading-relaxed max-w-lg">
                Questions about a listing, something that needs correcting, or just want to say hello — we read every message.
              </p>
            </AnimatedHeroItem>

          </AnimatedHeroContent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          MAIN — form + info sidebar
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-surface py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* ── Form — takes 2/3 on desktop ── */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* ── Sidebar ── */}
            <AnimatedSectionReveal className="space-y-8">

              {/* Contact details */}
              <div className="space-y-5">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-9 h-9 rounded-md bg-brand-primary-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-brand-primary-mid" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="font-sans text-body-md text-brand-primary-mid hover:text-brand-primary underline underline-offset-2 transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-body-md text-content-strong">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-surface-muted" />

              {/* List your business CTA */}
              <div className="rounded-xl bg-brand-primary-pale border border-brand-primary-light/20 p-5 space-y-3">
                <h3 className="font-sans text-body-md font-[500] text-content-strong">
                  Own a business in Oak Glen?
                </h3>
                <p className="font-sans text-body-sm text-content-base leading-relaxed">
                  Get your listing in front of thousands of visitors. It's free to join the directory.
                </p>
                <Link
                  href="/claim"
                  className="
                    inline-flex items-center gap-1.5 font-sans text-body-sm font-[500]
                    text-brand-primary-mid hover:text-brand-primary
                    underline underline-offset-2 transition-colors duration-200
                  "
                >
                  Submit your listing →
                </Link>
              </div>

            </AnimatedSectionReveal>

          </div>
        </div>
      </div>

    </main>
    </>
  );
}
