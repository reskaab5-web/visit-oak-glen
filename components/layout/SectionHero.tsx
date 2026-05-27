import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OverlayVariant = "light" | "dark" | "forest";
type AlignVariant   = "left" | "center";

interface CtaButton {
  label: string;
  href:  string;
}

interface SectionHeroProps {
  /** Main display heading — rendered as <h1> in Playfair Display */
  title: string;
  /** Optional paragraph beneath the title */
  subtitle?: string;
  /** Absolute or relative URL for the full-bleed background image */
  backgroundImageUrl?: string;
  /** Small all-caps line above the title with a pin icon */
  eyebrow?: string;
  /** Primary CTA button (gold fill) */
  primaryCta?: CtaButton;
  /** Secondary CTA button (ghost/outlined) */
  secondaryCta?: CtaButton;
  /** Gradient overlay preset controlling legibility vs. drama */
  overlay?: OverlayVariant;
  /** Text / content alignment */
  align?: AlignVariant;
  /**
   * Tailwind min-height utility applied to the section.
   * Defaults to "min-h-[600px]". Pass "min-h-screen" for a full-viewport hero.
   */
  minHeight?: string;
  /**
   * When true a soft gradient fades the hero into the page background.
   * Disable on dark-background pages.
   */
  fadeBottom?: boolean;
}

// ─── Overlay gradient map ─────────────────────────────────────────────────────

const OVERLAY: Record<OverlayVariant, string> = {
  light:  "from-black/20  via-black/30  to-black/55",
  dark:   "from-black/55  via-black/65  to-black/80",
  forest: "from-forest-deep/35 via-forest-deep/58 to-forest-deep/88",
};

// ─── SectionHero ─────────────────────────────────────────────────────────────

export function SectionHero({
  title,
  subtitle,
  backgroundImageUrl,
  eyebrow,
  primaryCta,
  secondaryCta,
  overlay   = "forest",
  align     = "center",
  minHeight = "min-h-[600px]",
  fadeBottom = true,
}: SectionHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={`relative w-full ${minHeight} flex flex-col overflow-hidden`}
      aria-label={eyebrow ?? title}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt=""
            role="presentation"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          /* Fallback solid brand color when no image is supplied */
          <div className="absolute inset-0 bg-forest-deep" />
        )}

        {/* Gradient overlay for legibility */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${OVERLAY[overlay]}`}
        />
      </div>

      {/* ── Content ── */}
      <div
        className={[
          "relative flex-1 flex flex-col justify-center",
          "max-w-site mx-auto w-full px-6 lg:px-8 py-hero",
          isCenter ? "items-center text-center" : "items-start text-left",
        ].join(" ")}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <div
            className={[
              "flex items-center gap-2 mb-5",
              isCenter ? "justify-center" : "justify-start",
            ].join(" ")}
          >
            <MapPin
              size={13}
              className="text-harvest-gold flex-shrink-0"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-label text-harvest-gold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={[
            "font-serif text-display-lg md:text-display-xl lg:text-display-2xl",
            "text-parchment leading-[1.07]",
            isCenter ? "max-w-4xl" : "max-w-3xl",
          ].join(" ")}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={[
              "mt-6 text-body-lg text-parchment/80 leading-relaxed",
              isCenter ? "max-w-2xl" : "max-w-xl",
            ].join(" ")}
          >
            {subtitle}
          </p>
        )}

        {/* CTA row */}
        {(primaryCta || secondaryCta) && (
          <div
            className={[
              "mt-10 flex flex-wrap gap-4",
              isCenter ? "justify-center" : "justify-start",
            ].join(" ")}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-harvest-gold hover:bg-harvest-amber text-label text-earth-bark uppercase tracking-widest transition-all duration-slow ease-premium shadow-card hover:shadow-card-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {primaryCta.label}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-parchment/45 hover:border-parchment/85 text-label text-parchment uppercase tracking-widest backdrop-blur-sm hover:bg-parchment/10 transition-all duration-slow ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parchment/60"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom fade into page ── */}
      {fadeBottom && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
    </section>
  );
}

export default SectionHero;
