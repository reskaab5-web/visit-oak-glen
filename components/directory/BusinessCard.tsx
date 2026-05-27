"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ImageOff } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BusinessCardProps {
  /** Display name of the business */
  name: string;
  /** Primary category label (e.g. "Apple Orchard", "Bakery") */
  category: string;
  /** Numeric rating 0–5 */
  rating: number;
  /** Optional total review count shown in parentheses */
  reviewCount?: number;
  /** Absolute or relative URL for the hero image */
  imageUrl?: string;
  /** Short location string, e.g. "Oak Glen, CA" */
  location?: string;
  /** URL slug used to build the detail-page link */
  slug: string;
  /** Renders a gold ring + "Featured" badge when true */
  featured?: boolean;
}

// ─── Star Rating sub-component ────────────────────────────────────────────────

function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            strokeWidth={1.5}
            className={
              star <= rounded
                ? "fill-harvest-gold text-harvest-gold"
                : "fill-parchment-muted text-parchment-muted"
            }
          />
        ))}
      </div>
      <span className="text-body-sm text-oak-stone font-sans">
        {rating.toFixed(1)}
        {reviewCount !== undefined && (
          <span className="ml-1 text-oak-fog">({reviewCount})</span>
        )}
      </span>
    </div>
  );
}

// ─── BusinessCard ─────────────────────────────────────────────────────────────

export function BusinessCard({
  name,
  category,
  rating,
  reviewCount,
  imageUrl,
  location,
  slug,
  featured = false,
}: BusinessCardProps) {
  return (
    <Link
      href={`/directory/${slug}`}
      className={[
        "group block bg-parchment-warm rounded-lg overflow-hidden",
        "border border-parchment-muted",
        "shadow-card hover:shadow-card-hover",
        "hover:border-forest-light",
        "transition-all duration-slow ease-premium",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-harvest-gold focus-visible:ring-offset-2",
        "focus-visible:ring-offset-parchment",
        featured ? "ring-2 ring-harvest-gold ring-offset-2 ring-offset-parchment" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Image container — locked to 16:9 ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-parchment-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover transition-transform duration-slow ease-premium group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* ── Placeholder ── */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forest-pale">
            <div className="w-12 h-12 rounded-full bg-parchment-warm/80 flex items-center justify-center">
              <ImageOff size={20} className="text-forest-mid" strokeWidth={1.5} />
            </div>
            <span className="text-label text-oak-stone uppercase tracking-widest">
              Photo Coming Soon
            </span>
          </div>
        )}

        {/* Category badge — overlaid bottom-left of image */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-forest-deep/90 backdrop-blur-sm text-label text-parchment uppercase tracking-widest">
            {category}
          </span>
        </div>

        {/* Featured badge — top-right */}
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-harvest-gold text-label text-earth-bark uppercase tracking-widest">
              ★ Featured
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-heading-sm text-oak-charcoal leading-snug group-hover:text-forest-mid transition-colors duration-200 line-clamp-2">
          {name}
        </h3>

        <StarRating rating={rating} reviewCount={reviewCount} />

        {location && (
          <div className="flex items-center gap-1.5 text-body-sm text-oak-fog">
            <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* ── Footer hint ── */}
      <div className="px-4 pb-4 pt-0">
        <span className="text-label text-forest-mid uppercase tracking-widest group-hover:text-harvest-gold transition-colors duration-200">
          View Details →
        </span>
      </div>
    </Link>
  );
}

export default BusinessCard;
