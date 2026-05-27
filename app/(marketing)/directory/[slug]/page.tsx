import type { Metadata }     from "next";
import { notFound }           from "next/navigation";
import Image                  from "next/image";
import Link                   from "next/link";
import {
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Globe,
  Mail,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  ExternalLink,
  Share2,
  Newspaper,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import {
  businesses,
  getBusinessBySlug,
  formatAddress,
  getTodayHours,
} from "@/lib/data/mockData";
import { siteConfig }              from "@/lib/config/site";
import { toTelHref, toMailtoHref, displayUrl, normalizeUrl } from "@/lib/utils/contact";
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema/builders";
import { JsonLd }           from "@/components/seo/JsonLd";
import { GoogleMapEmbed }   from "@/components/maps/GoogleMapEmbed";

// ─── Params type ──────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) return { title: `Business Not Found — ${siteConfig.name}` };

  return {
    title:       `${business.name} — ${siteConfig.name}`,
    description: business.shortDescription,
    alternates:  { canonical: `/directory/${slug}` },
    openGraph: {
      title:       business.name,
      description: business.shortDescription,
      images:      [{ url: business.imageUrl }],
    },
  };
}

// ─── Star display helper ──────────────────────────────────────────────────────

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={18}
            strokeWidth={1.5}
            className={
              n <= Math.round(rating)
                ? "fill-brand-accent text-brand-accent"
                : "fill-surface-muted text-surface-muted"
            }
          />
        ))}
      </div>
      <span className="font-sans text-body-md text-content-base">
        <strong className="text-content-strong">{rating.toFixed(1)}</strong>
        <span className="ml-1 text-content-subtle">({count} reviews)</span>
      </span>
    </div>
  );
}

// ─── Hours sidebar card ───────────────────────────────────────────────────────

function HoursCard({ hours }: { hours: { day: string; open: string; close: string; closed: boolean }[] }) {
  const todayName  = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = getTodayHours(hours);
  const isOpenToday = todayHours && !todayHours.closed;

  return (
    <div className="bg-surface-warm border border-surface-muted rounded-lg overflow-hidden shadow-card">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-surface-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-brand-primary-mid" strokeWidth={1.75} aria-hidden="true" />
          <h3 className="font-sans text-body-sm font-[500] text-content-strong uppercase tracking-wide">
            Hours
          </h3>
        </div>
        <span
          className={[
            "text-label uppercase tracking-widest px-2.5 py-1 rounded-full",
            isOpenToday
              ? "bg-brand-primary-pale text-brand-primary"
              : "bg-surface border border-surface-muted text-content-subtle",
          ].join(" ")}
        >
          {isOpenToday ? "Open today" : "Closed today"}
        </span>
      </div>

      {/* Hours table */}
      <ul className="divide-y divide-surface-muted">
        {hours.map(({ day, open, close, closed }) => {
          const isToday = day === todayName;
          return (
            <li
              key={day}
              className={[
                "flex items-center justify-between px-5 py-3 font-sans text-body-sm",
                isToday ? "bg-brand-primary-pale/40" : "",
              ].join(" ")}
              aria-current={isToday ? "true" : undefined}
            >
              <span
                className={isToday ? "font-[500] text-brand-primary" : "text-content-base"}
              >
                {day}
              </span>
              <span
                className={
                  closed
                    ? "text-content-subtle italic"
                    : isToday
                    ? "font-[500] text-brand-primary"
                    : "text-content-strong"
                }
              >
                {closed ? "Closed" : close ? `${open} – ${close}` : open}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Business Detail Page ─────────────────────────────────────────────────────

export default async function BusinessDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) notFound();

  const fullAddress = formatAddress(business.address);
  const mapsUrl     = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + fullAddress)}`;

  return (
    <>
      <JsonLd data={[
        buildLocalBusinessSchema(business, siteConfig),
        buildBreadcrumbSchema([
          { name: "Home",             item: siteConfig.url },
          { name: "Directory",        item: `${siteConfig.url}/directory` },
          { name: business.category,  item: `${siteConfig.url}/categories/${business.categorySlug}` },
          { name: business.name,      item: `${siteConfig.url}/directory/${business.slug}` },
        ]),
      ]} />
    <main>
      {/* ════════════════════════════════════════════════════════════════
          HERO IMAGE — tall, edge-to-edge
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden" aria-hidden="true">
        <Image
          src={business.imageUrl}
          alt={`${business.name} — hero photo`}
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Bottom gradient so breadcrumb bar reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-brand-primary/30" />

        {/* Featured badge over image */}
        {business.featured && (
          <div className="absolute top-5 right-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-accent/95 backdrop-blur-sm text-label text-on-accent uppercase tracking-widest shadow-card">
              <Star size={12} className="fill-on-accent" aria-hidden="true" /> Featured
            </span>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          BREADCRUMB BAR
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-surface border-b border-surface-muted">
        <div className="max-w-site mx-auto px-6 lg:px-8 py-3 flex items-center gap-1.5 flex-wrap">
          <Link href="/"
            className="text-content-subtle hover:text-brand-primary-mid text-body-sm transition-colors duration-200">Home</Link>
          <ChevronRight size={13} className="text-surface-muted" aria-hidden="true" />
          <Link href="/directory"
            className="text-content-subtle hover:text-brand-primary-mid text-body-sm transition-colors duration-200">Directory</Link>
          <ChevronRight size={13} className="text-surface-muted" aria-hidden="true" />
          <Link href={`/categories/${business.categorySlug}`}
            className="text-content-subtle hover:text-brand-primary-mid text-body-sm transition-colors duration-200">
            {business.category}
          </Link>
          <ChevronRight size={13} className="text-surface-muted" aria-hidden="true" />
          <span className="text-content-strong font-[500] text-body-sm" aria-current="page">
            {business.name}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-surface">
        <div className="max-w-site mx-auto px-6 lg:px-8 py-section">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 xl:gap-16">

            {/* ──────────────────────────────────────────────────────────
                LEFT COLUMN — main content
            ────────────────────────────────────────────────────────── */}
            <article>

              {/* Back link */}
              <Link
                href={`/categories/${business.categorySlug}`}
                className="inline-flex items-center gap-1.5 text-body-sm text-brand-primary-mid hover:text-brand-accent transition-colors duration-200 mb-6 group"
              >
                <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
                Back to {business.category}
              </Link>

              {/* Category chip + tier badge */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/categories/${business.categorySlug}`}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-brand-primary-pale border border-brand-primary-light/30 text-label text-brand-primary uppercase tracking-widest hover:bg-brand-primary-pale/70 transition-colors duration-200"
                >
                  {business.category}
                </Link>
                {business.tier === "premium" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-label uppercase tracking-widest">
                    <Sparkles size={11} aria-hidden="true" /> Premium
                  </span>
                )}
                {business.tier === "standard" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-surface-muted text-content-subtle text-label uppercase tracking-widest">
                    <TrendingUp size={11} aria-hidden="true" /> Standard
                  </span>
                )}
              </div>

              {/* Business name */}
              <h1 className="font-serif text-display-lg text-content-strong leading-[1.1] mb-4">
                {business.name}
              </h1>

              {/* Rating row */}
              <div className="mb-3">
                <StarRow rating={business.rating} count={business.reviewCount} />
              </div>

              {/* Location + established */}
              <div className="flex flex-wrap items-center gap-4 text-body-sm text-content-subtle mb-8">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                  {business.location}
                </span>
                {business.established && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
                    Est. {business.established}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full border border-surface-muted text-content-base">
                  {business.priceRange}
                </span>
              </div>

              {/* Divider */}
              <hr className="border-surface-muted mb-8" />

              {/* Description */}
              <section aria-labelledby="desc-heading">
                <h2 id="desc-heading" className="font-serif text-heading-md text-content-strong mb-5">
                  About {business.name}
                </h2>
                <div className="space-y-4 font-sans text-body-md text-content-base leading-relaxed">
                  {business.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Divider */}
              <hr className="border-surface-muted my-10" />

              {/* Photo gallery */}
              {business.galleryImages && business.galleryImages.length > 0 && (
                <section aria-labelledby="gallery-heading" className="mb-10">
                  <h2 id="gallery-heading" className="font-serif text-heading-md text-content-strong mb-5">
                    Photos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {business.galleryImages.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-surface-muted">
                        <Image
                          src={src}
                          alt={`${business.name} — photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-slow ease-premium"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Divider */}
              <hr className="border-surface-muted my-10" />

              {/* Amenities */}
              <section aria-labelledby="amenities-heading">
                <h2 id="amenities-heading" className="font-serif text-heading-md text-content-strong mb-5">
                  What's Here
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {business.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2.5 font-sans text-body-md text-content-base">
                      <CheckCircle2
                        size={17}
                        className="text-brand-primary-mid flex-shrink-0 mt-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Social Links (Premium only) ────────────────────────── */}
              {business.tier === "premium" && business.socialLinks && business.socialLinks.length > 0 && (
                <>
                  <hr className="border-surface-muted my-10" />
                  <section aria-labelledby="social-heading">
                    <h2 id="social-heading" className="font-serif text-heading-md text-content-strong mb-5 flex items-center gap-2">
                      <Share2 size={18} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                      Follow {business.name}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {business.socialLinks.map((link) => {
                        const labels: Record<string, string> = {
                          facebook:    "Facebook",
                          instagram:   "Instagram",
                          twitter:     "Twitter / X",
                          yelp:        "Yelp",
                          tripadvisor: "TripAdvisor",
                          youtube:     "YouTube",
                        };
                        return (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-surface-muted bg-surface-warm hover:border-brand-primary-light hover:bg-brand-primary-pale/30 text-body-sm text-content-strong transition-colors duration-200"
                          >
                            {labels[link.platform] ?? link.platform}
                            <ExternalLink size={12} className="text-content-subtle" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  </section>
                </>
              )}

              {/* ── Press Mentions (Premium only) ──────────────────────── */}
              {business.tier === "premium" && business.pressLinks && business.pressLinks.length > 0 && (
                <>
                  <hr className="border-surface-muted my-10" />
                  <section aria-labelledby="press-heading">
                    <h2 id="press-heading" className="font-serif text-heading-md text-content-strong mb-5 flex items-center gap-2">
                      <Newspaper size={18} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                      In the Press
                    </h2>
                    <ul className="space-y-4">
                      {business.pressLinks.map((item) => (
                        <li key={item.url} className="border border-surface-muted rounded-lg p-4 bg-surface-warm hover:border-brand-primary-light transition-colors duration-200">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <p className="font-sans text-body-md font-[500] text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200 leading-snug mb-1.5">
                              &ldquo;{item.headline}&rdquo;
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-label text-content-subtle uppercase tracking-wide">
                                {item.publication}
                              </span>
                              {item.date && (
                                <>
                                  <span className="text-content-subtle">·</span>
                                  <span className="text-label text-content-subtle">
                                    {new Date(item.date).toLocaleDateString("en-US", {
                                      year: "numeric", month: "long",
                                    })}
                                  </span>
                                </>
                              )}
                              <ExternalLink size={11} className="text-content-subtle ml-auto" aria-hidden="true" />
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}

              {/* ── Badge Embed Code (Premium only) ────────────────────── */}
              {business.tier === "premium" && (
                <>
                  <hr className="border-surface-muted my-10" />
                  <section aria-labelledby="badge-heading">
                    <h2 id="badge-heading" className="font-serif text-heading-md text-content-strong mb-2">
                      Add Our Badge to Your Website
                    </h2>
                    <p className="font-sans text-body-sm text-content-base leading-relaxed mb-5">
                      Copy and paste this snippet onto your website to display a &ldquo;Listed on {siteConfig.name}&rdquo; badge
                      — linking visitors directly to your listing.
                    </p>
                    <div className="rounded-lg bg-surface border border-surface-muted overflow-hidden">
                      <div className="px-4 py-2 bg-surface-muted/50 border-b border-surface-muted flex items-center justify-between">
                        <span className="text-label text-content-subtle uppercase tracking-wide">Embed Code</span>
                        <Image
                          src={`/api/badge/${business.slug}`}
                          alt={`Listed on ${siteConfig.name}`}
                          width={150}
                          height={39}
                          unoptimized
                        />
                      </div>
                      <pre className="p-4 text-xs font-mono text-content-base overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`<a href="${siteConfig.url}/directory/${business.slug}" target="_blank" rel="noopener">
  <img
    src="${siteConfig.url}/api/badge/${business.slug}"
    alt="Listed on ${siteConfig.name}"
    width="200"
    height="52"
  />
</a>`}
                      </pre>
                    </div>
                  </section>
                </>
              )}

              {/* ── Upgrade CTA (Free tier only) ────────────────────────── */}
              {business.tier === "free" && (
                <>
                  <hr className="border-surface-muted my-10" />
                  <section
                    aria-labelledby="upgrade-heading"
                    className="rounded-lg border border-brand-primary-light/40 bg-brand-primary-pale/30 p-6"
                  >
                    <h2 id="upgrade-heading" className="font-serif text-heading-sm text-content-strong mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-brand-primary-mid" strokeWidth={1.5} aria-hidden="true" />
                      Is this your business?
                    </h2>
                    <p className="font-sans text-body-sm text-content-base leading-relaxed mb-4">
                      Claim this listing to update your hours, add photos, and promote your business
                      to visitors planning their trip to {business.address.city}.
                    </p>
                    <Link
                      href="/claim"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-brand-primary hover:bg-brand-primary-mid text-label text-surface uppercase tracking-widest transition-colors duration-200"
                    >
                      Claim This Listing
                    </Link>
                  </section>
                </>
              )}

            </article>

            {/* ──────────────────────────────────────────────────────────
                RIGHT COLUMN — sticky sidebar
            ────────────────────────────────────────────────────────── */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-[100px] lg:self-start">

              {/* ── CTA Card ── */}
              <div className="bg-brand-primary rounded-lg overflow-hidden shadow-modal p-6 text-center">
                <p className="font-serif text-heading-sm text-surface mb-2">
                  Ready to visit?
                </p>
                <p className="text-body-sm text-surface/90 mb-6 font-sans leading-relaxed">
                  {business.shortDescription}
                </p>
                {business.website && (
                  <a
                    href={normalizeUrl(business.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-on-accent uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card mb-3"
                  >
                    Visit Website
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
                {toTelHref(business.phone) && (
                  <a
                    href={toTelHref(business.phone)}
                    className="flex items-center justify-center gap-2.5 w-full py-3 rounded-md border border-surface/35 hover:border-surface/70 text-label text-surface uppercase tracking-widest hover:bg-surface/10 transition-all duration-200"
                  >
                    <Phone size={13} aria-hidden="true" />
                    {business.phone}
                  </a>
                )}
              </div>

              {/* ── Hours ── */}
              <HoursCard hours={business.hours} />

              {/* ── Address / contact ── */}
              <div className="bg-surface-warm border border-surface-muted rounded-lg shadow-card overflow-hidden">
                <div className="px-5 py-4 border-b border-surface-muted">
                  <h3 className="font-sans text-body-sm font-[500] text-content-strong uppercase tracking-wide">
                    Location & Contact
                  </h3>
                </div>
                <ul className="divide-y divide-surface-muted">
                  {/* Address */}
                  <li className="px-5 py-4">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <MapPin size={16} className="text-brand-primary-mid flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                      <div>
                        <p className="font-sans text-body-sm text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200 leading-snug">
                          {business.address.street}
                        </p>
                        <p className="font-sans text-body-sm text-content-base">
                          {business.address.city}, {business.address.state} {business.address.zip}
                        </p>
                        <p className="text-label text-brand-accent mt-1 uppercase tracking-widest group-hover:text-brand-accent-dark transition-colors duration-200">
                          Get directions ↗
                        </p>
                      </div>
                    </a>
                  </li>

                  {/* Phone */}
                  {toTelHref(business.phone) && (
                    <li className="px-5 py-4">
                      <a
                        href={toTelHref(business.phone)}
                        className="flex items-center gap-3 group"
                      >
                        <Phone size={16} className="text-brand-primary-mid flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-sans text-body-sm text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200">
                          {business.phone}
                        </span>
                      </a>
                    </li>
                  )}

                  {/* Email */}
                  {business.email && (
                    <li className="px-5 py-4">
                      <a
                        href={toMailtoHref(business.email)}
                        className="flex items-center gap-3 group"
                      >
                        <Mail size={16} className="text-brand-primary-mid flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-sans text-body-sm text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200 break-all">
                          {business.email}
                        </span>
                      </a>
                    </li>
                  )}

                  {/* Website */}
                  {business.website && (
                    <li className="px-5 py-4">
                      <a
                        href={normalizeUrl(business.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <Globe size={16} className="text-brand-primary-mid flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-sans text-body-sm text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200 truncate">
                          {displayUrl(business.website)}
                        </span>
                        <ExternalLink size={12} className="text-content-subtle flex-shrink-0 ml-auto" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* ── Google Map Embed ── */}
              <div className="overflow-hidden rounded-lg shadow-card">
                <div className="px-5 py-3 bg-surface-warm border border-b-0 border-surface-muted rounded-t-lg flex items-center justify-between">
                  <h3 className="font-sans text-body-sm font-[500] text-content-strong uppercase tracking-wide">
                    Find Us
                  </h3>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-brand-accent hover:text-brand-accent-dark uppercase tracking-widest transition-colors duration-200 flex items-center gap-1"
                  >
                    Directions <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </div>
                <GoogleMapEmbed
                  businessName={business.name}
                  address={fullAddress}
                  height={280}
                  className="rounded-none rounded-b-lg border border-t-0 border-surface-muted"
                />
              </div>

              {/* ── Tags ── */}
              {business.tags && business.tags.length > 0 && (
                <div className="bg-surface-warm border border-surface-muted rounded-lg shadow-card p-5">
                  <h3 className="font-sans text-label text-content-base uppercase tracking-wide mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {business.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-surface border border-surface-muted text-label text-content-base uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
