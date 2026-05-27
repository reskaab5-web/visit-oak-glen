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
} from "lucide-react";

import {
  businesses,
  getBusinessBySlug,
  formatAddress,
  getTodayHours,
} from "@/lib/data/mockData";

// ─── Params type ──────────────────────────────────────────────────────────────

interface PageProps {
  params: { slug: string };
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const business = getBusinessBySlug(params.slug);
  if (!business) return { title: "Business Not Found — Oak Glen Directory" };

  return {
    title:       `${business.name} — Oak Glen Directory`,
    description: business.shortDescription,
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
                ? "fill-harvest-gold text-harvest-gold"
                : "fill-parchment-muted text-parchment-muted"
            }
          />
        ))}
      </div>
      <span className="font-sans text-body-md text-oak-stone">
        <strong className="text-oak-charcoal">{rating.toFixed(1)}</strong>
        <span className="ml-1 text-oak-fog">({count} reviews)</span>
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
    <div className="bg-parchment-warm border border-parchment-muted rounded-lg overflow-hidden shadow-card">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-parchment-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-forest-mid" strokeWidth={1.75} aria-hidden="true" />
          <h3 className="font-sans text-body-sm font-[500] text-oak-charcoal uppercase tracking-wide">
            Hours
          </h3>
        </div>
        <span
          className={[
            "text-label uppercase tracking-widest px-2.5 py-1 rounded-full",
            isOpenToday
              ? "bg-forest-pale text-forest-deep"
              : "bg-parchment border border-parchment-muted text-oak-fog",
          ].join(" ")}
        >
          {isOpenToday ? "Open today" : "Closed today"}
        </span>
      </div>

      {/* Hours table */}
      <ul className="divide-y divide-parchment-muted">
        {hours.map(({ day, open, close, closed }) => {
          const isToday = day === todayName;
          return (
            <li
              key={day}
              className={[
                "flex items-center justify-between px-5 py-3 font-sans text-body-sm",
                isToday ? "bg-forest-pale/40" : "",
              ].join(" ")}
              aria-current={isToday ? "true" : undefined}
            >
              <span
                className={isToday ? "font-[500] text-forest-deep" : "text-oak-stone"}
              >
                {day}
              </span>
              <span
                className={
                  closed
                    ? "text-oak-fog italic"
                    : isToday
                    ? "font-[500] text-forest-deep"
                    : "text-oak-charcoal"
                }
              >
                {closed ? "Closed" : `${open} – ${close}`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Business Detail Page ─────────────────────────────────────────────────────

export default function BusinessDetailPage({ params }: PageProps) {
  const business = getBusinessBySlug(params.slug);

  if (!business) notFound();

  const fullAddress = formatAddress(business.address);
  const mapsUrl     = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + fullAddress)}`;

  return (
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
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-forest-deep/30" />

        {/* Featured badge over image */}
        {business.featured && (
          <div className="absolute top-5 right-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-harvest-gold/95 backdrop-blur-sm text-label text-earth-bark uppercase tracking-widest shadow-card">
              <Star size={12} className="fill-earth-bark" aria-hidden="true" /> Featured
            </span>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          BREADCRUMB BAR
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-parchment border-b border-parchment-muted">
        <div className="max-w-site mx-auto px-6 lg:px-8 py-3 flex items-center gap-1.5 flex-wrap">
          <Link href="/"
            className="text-oak-fog hover:text-forest-mid text-body-sm transition-colors duration-200">Home</Link>
          <ChevronRight size={13} className="text-parchment-muted" aria-hidden="true" />
          <Link href="/directory"
            className="text-oak-fog hover:text-forest-mid text-body-sm transition-colors duration-200">Directory</Link>
          <ChevronRight size={13} className="text-parchment-muted" aria-hidden="true" />
          <Link href={`/categories/${business.categorySlug}`}
            className="text-oak-fog hover:text-forest-mid text-body-sm transition-colors duration-200">
            {business.category}
          </Link>
          <ChevronRight size={13} className="text-parchment-muted" aria-hidden="true" />
          <span className="text-oak-charcoal font-[500] text-body-sm" aria-current="page">
            {business.name}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-parchment">
        <div className="max-w-site mx-auto px-6 lg:px-8 py-section">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 xl:gap-16">

            {/* ──────────────────────────────────────────────────────────
                LEFT COLUMN — main content
            ────────────────────────────────────────────────────────── */}
            <article>

              {/* Back link */}
              <Link
                href={`/categories/${business.categorySlug}`}
                className="inline-flex items-center gap-1.5 text-body-sm text-forest-mid hover:text-harvest-gold transition-colors duration-200 mb-6 group"
              >
                <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
                Back to {business.category}
              </Link>

              {/* Category chip */}
              <div className="mb-4">
                <Link
                  href={`/categories/${business.categorySlug}`}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-forest-pale border border-forest-light/30 text-label text-forest-deep uppercase tracking-widest hover:bg-forest-pale/70 transition-colors duration-200"
                >
                  {business.category}
                </Link>
              </div>

              {/* Business name */}
              <h1 className="font-serif text-display-lg text-oak-charcoal leading-[1.1] mb-4">
                {business.name}
              </h1>

              {/* Rating row */}
              <div className="mb-3">
                <StarRow rating={business.rating} count={business.reviewCount} />
              </div>

              {/* Location + established */}
              <div className="flex flex-wrap items-center gap-4 text-body-sm text-oak-fog mb-8">
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
                <span className="px-2.5 py-0.5 rounded-full border border-parchment-muted text-oak-stone">
                  {business.priceRange}
                </span>
              </div>

              {/* Divider */}
              <hr className="border-parchment-muted mb-8" />

              {/* Description */}
              <section aria-labelledby="desc-heading">
                <h2 id="desc-heading" className="font-serif text-heading-md text-oak-charcoal mb-5">
                  About {business.name}
                </h2>
                <div className="space-y-4 font-sans text-body-md text-oak-stone leading-relaxed">
                  {business.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Divider */}
              <hr className="border-parchment-muted my-10" />

              {/* Photo gallery */}
              {business.galleryImages && business.galleryImages.length > 0 && (
                <section aria-labelledby="gallery-heading" className="mb-10">
                  <h2 id="gallery-heading" className="font-serif text-heading-md text-oak-charcoal mb-5">
                    Photos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {business.galleryImages.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-parchment-muted">
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
              <hr className="border-parchment-muted my-10" />

              {/* Amenities */}
              <section aria-labelledby="amenities-heading">
                <h2 id="amenities-heading" className="font-serif text-heading-md text-oak-charcoal mb-5">
                  What's Here
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {business.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2.5 font-sans text-body-md text-oak-stone">
                      <CheckCircle2
                        size={17}
                        className="text-forest-mid flex-shrink-0 mt-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </section>

            </article>

            {/* ──────────────────────────────────────────────────────────
                RIGHT COLUMN — sticky sidebar
            ────────────────────────────────────────────────────────── */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-[100px] lg:self-start">

              {/* ── CTA Card ── */}
              <div className="bg-forest-deep rounded-lg overflow-hidden shadow-modal p-6 text-center">
                <p className="font-serif text-heading-sm text-parchment mb-2">
                  Ready to visit?
                </p>
                <p className="text-body-sm text-parchment/70 mb-6 font-sans leading-relaxed">
                  {business.shortDescription}
                </p>
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-md bg-harvest-gold hover:bg-harvest-amber text-label text-earth-bark uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card mb-3"
                  >
                    Visit Website
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={`tel:${business.phone.replace(/\D/g, "")}`}
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-md border border-parchment/35 hover:border-parchment/70 text-label text-parchment uppercase tracking-widest hover:bg-parchment/10 transition-all duration-200"
                >
                  <Phone size={13} aria-hidden="true" />
                  {business.phone}
                </a>
              </div>

              {/* ── Hours ── */}
              <HoursCard hours={business.hours} />

              {/* ── Address / contact ── */}
              <div className="bg-parchment-warm border border-parchment-muted rounded-lg shadow-card overflow-hidden">
                <div className="px-5 py-4 border-b border-parchment-muted">
                  <h3 className="font-sans text-body-sm font-[500] text-oak-charcoal uppercase tracking-wide">
                    Location & Contact
                  </h3>
                </div>
                <ul className="divide-y divide-parchment-muted">
                  {/* Address */}
                  <li className="px-5 py-4">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <MapPin size={16} className="text-forest-mid flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                      <div>
                        <p className="font-sans text-body-sm text-oak-charcoal group-hover:text-forest-mid transition-colors duration-200 leading-snug">
                          {business.address.street}
                        </p>
                        <p className="font-sans text-body-sm text-oak-stone">
                          {business.address.city}, {business.address.state} {business.address.zip}
                        </p>
                        <p className="text-label text-harvest-gold mt-1 uppercase tracking-widest group-hover:text-harvest-amber transition-colors duration-200">
                          Get directions ↗
                        </p>
                      </div>
                    </a>
                  </li>

                  {/* Phone */}
                  <li className="px-5 py-4">
                    <a
                      href={`tel:${business.phone.replace(/\D/g, "")}`}
                      className="flex items-center gap-3 group"
                    >
                      <Phone size={16} className="text-forest-mid flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      <span className="font-sans text-body-sm text-oak-charcoal group-hover:text-forest-mid transition-colors duration-200">
                        {business.phone}
                      </span>
                    </a>
                  </li>

                  {/* Email */}
                  {business.email && (
                    <li className="px-5 py-4">
                      <a
                        href={`mailto:${business.email}`}
                        className="flex items-center gap-3 group"
                      >
                        <Mail size={16} className="text-forest-mid flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-sans text-body-sm text-oak-charcoal group-hover:text-forest-mid transition-colors duration-200 break-all">
                          {business.email}
                        </span>
                      </a>
                    </li>
                  )}

                  {/* Website */}
                  {business.website && (
                    <li className="px-5 py-4">
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <Globe size={16} className="text-forest-mid flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-sans text-body-sm text-oak-charcoal group-hover:text-forest-mid transition-colors duration-200 truncate">
                          {business.website.replace(/^https?:\/\//, "")}
                        </span>
                        <ExternalLink size={12} className="text-oak-fog flex-shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* ── Tags ── */}
              {business.tags && business.tags.length > 0 && (
                <div className="bg-parchment-warm border border-parchment-muted rounded-lg shadow-card p-5">
                  <h3 className="font-sans text-label text-oak-stone uppercase tracking-wide mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {business.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-parchment border border-parchment-muted text-label text-oak-stone uppercase tracking-wide"
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
  );
}
