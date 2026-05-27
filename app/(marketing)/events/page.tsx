import type { Metadata }  from "next";
import Image              from "next/image";
import Link               from "next/link";
import {
  Calendar,
  Music,
  Palette,
  ShoppingBag,
  Star,
  MapPin,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Flame,
  Leaf,
  Sparkles,
} from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }           from "@/lib/config/site";
import {
  buildWebPageSchema,
  buildEventSchema,
}                                from "@/lib/schema/builders";
import { JsonLd }               from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Events & Festivals — ${siteConfig.location.name}, ${siteConfig.location.state}`,
  description:
    "Oak Glen hosts two beloved community festivals each year: the Apple Blossom Festival in spring and the Apple Butter Festival over Thanksgiving weekend. Discover what's happening in the mountains.",
  alternates:  { canonical: "/events" },
  openGraph: {
    title:       `${siteConfig.location.name} Events & Festivals`,
    description: "Spring blossoms and autumn harvest — Oak Glen's two beloved community celebrations.",
  },
};

// ─── Apple Butter Festival features ──────────────────────────────────────────

interface Feature {
  icon:  React.ElementType;
  label: string;
}

const APPLE_BUTTER_FEATURES: Feature[] = [
  { icon: Flame,      label: "Community Apple Butter Making"  },
  { icon: Star,       label: "Gourmet Apple Butter Treats"    },
  { icon: Music,      label: "Live Music"                     },
  { icon: Sparkles,   label: "Wagon Rides"                    },
  { icon: Palette,    label: "Sip & Paint Classes"            },
  { icon: ShoppingBag, label: "Store Sales & Specials"         },
  { icon: MapPin,     label: "Oak Glen Treasure Hunt"         },
  { icon: Star,       label: "Kid's Crafts"                   },
];

// ─── Apple Butter participating businesses ────────────────────────────────────

interface ParticipatingBusiness {
  name: string;
  href: string;
}

const APPLE_BUTTER_BUSINESSES: ParticipatingBusiness[] = [
  { name: "Los Rios Rancho",    href: "/directory/los-rios-rancho"                         },
  { name: "Riley's Farm",       href: "/directory/rileys-farm"                             },
  { name: "Wilshire's Shed",    href: "/directory/wilshires-apple-shed-coffee-shop"        },
  { name: "Oak Tree Mountain",  href: "/directory/oak-tree-mountain"                      },
  { name: "Stone Oak Manor",    href: "/directory/stone-oak-manor"                        },
  { name: "Snow-Line Orchards", href: "/directory/snow-line-orchards"                     },
];

// ─── Year-round events ────────────────────────────────────────────────────────

interface YearRoundEvent {
  business:    string;
  href:        string;
  season:      string;
  description: string;
  accent:      string; // Tailwind colour token for badge
}

const YEAR_ROUND_EVENTS: YearRoundEvent[] = [
  {
    business:    "Riley's Farm",
    href:        "/directory/rileys-farm",
    season:      "Year-round",
    description:
      "Living-history dinner theater, school programs, colonial market days, and harvest events. Riley's Farm offers something for every season — from spring farm tours to Christmas celebrations.",
    accent: "bg-brand-primary-pale text-brand-primary",
  },
  {
    business:    "Oak Tree Mountain",
    href:        "/directory/oak-tree-mountain",
    season:      "Year-round",
    description:
      "Family entertainment including gem mining, gold panning, pony rides, and a petting zoo. Seasonal attractions and special events run throughout the apple season and beyond.",
    accent: "bg-brand-primary-pale text-brand-primary",
  },
  {
    business:    "Stone Soup Farm & Heritage Orchard",
    href:        "/directory/stone-soup-farm-and-heritage-orchard",
    season:      "Seasonal",
    description:
      "Farm-to-table dinners, orchard tastings, and harvest suppers set among heritage apple trees. Stone Soup Farm brings the old-growth orchard to life through seasonal dining events.",
    accent: "bg-brand-accent-dark/15 text-brand-accent-dark",
  },
  {
    business:    "The Homestead at Wilshire Ranch",
    href:        "/directory/the-homestead-at-wilshire-ranch",
    season:      "Select weekends",
    description:
      "Open-house events at Oak Glen's premier wedding venue, showcasing the estate grounds across the seasons. Upcoming: Open House, June 13–14, 2026.",
    accent: "bg-rose-50 text-rose-700",
  },
];

// ─── Events Page ──────────────────────────────────────────────────────────────

// Apple Blossom dates vary annually in May — use next upcoming occurrence.
// Apple Butter is always Thanksgiving Weekend (Fri–Sun after US Thanksgiving).
// Update these each year or replace with a CMS-driven date field.
const APPLE_BLOSSOM_SCHEMA = buildEventSchema(
  {
    name:        "Apple Blossom Festival",
    description: `${siteConfig.location.name}'s annual spring celebration when the orchards erupt in white and pink blossoms. Farms, orchards, and businesses set special offerings — u-pick blossom walks, farm tours, special menus, and seasonal products made from the year's first pickings.`,
    startDate:   "2027-05-01",
    endDate:     "2027-05-31",
    url:         `${siteConfig.url}/events#apple-blossom`,
    imageUrl:    "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
  },
  siteConfig,
);

const APPLE_BUTTER_SCHEMA = buildEventSchema(
  {
    name:        "Apple Butter Festival",
    description: `${siteConfig.location.name}'s beloved Thanksgiving Weekend community celebration. The whole community gathers over three days — Friday, Saturday, and Sunday — for communal apple butter making, live music, wagon rides, treasure hunts, sip-and-paint classes, and seasonal specials at participating businesses.`,
    startDate:   "2026-11-27",
    endDate:     "2026-11-29",
    url:         `${siteConfig.url}/events#apple-butter`,
    imageUrl:    "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
  },
  siteConfig,
);

export default function EventsPage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/events",
          `Events & Festivals — ${siteConfig.location.name}, ${siteConfig.location.state}`,
          `${siteConfig.location.name} hosts two beloved community festivals each year: the Apple Blossom Festival in spring and the Apple Butter Festival over Thanksgiving weekend.`,
        ),
        APPLE_BLOSSOM_SCHEMA,
        APPLE_BUTTER_SCHEMA,
      ]} />
    <main>

      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[420px] sm:min-h-[480px] flex flex-col justify-end overflow-hidden"
        aria-label={`${siteConfig.location.name} Events & Festivals`}
      >
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85"
            alt=""
            role="presentation"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/60 to-brand-primary/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-site mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 pt-24 sm:pb-16">
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
                  {siteConfig.location.name}, {siteConfig.location.state}
                </span>
              </div>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg sm:text-heading-xl lg:text-display-lg text-surface leading-[1.1]">
                Events &amp; Festivals
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <p className="mt-4 font-sans text-body-md sm:text-body-lg text-surface/80 leading-relaxed max-w-xl">
                Two beloved traditions mark the Oak Glen calendar — spring blossoms and the Thanksgiving harvest. Plus year-round events at local farms, orchards, and venues throughout the mountains.
              </p>
            </AnimatedHeroItem>

            <AnimatedHeroItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#apple-blossom"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-on-accent uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-sm"
                >
                  <Leaf size={14} aria-hidden="true" />
                  Apple Blossom
                </a>
                <a
                  href="#apple-butter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-surface/15 hover:bg-surface/25 border border-surface/30 text-label text-surface uppercase tracking-widest transition-all duration-200 hover:-translate-y-px"
                >
                  <Flame size={14} aria-hidden="true" />
                  Apple Butter
                </a>
              </div>
            </AnimatedHeroItem>

          </AnimatedHeroContent>
        </div>

        {/* Fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FESTIVAL OVERVIEW — two anchor cards
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
        <section
          className="py-section px-4 sm:px-6 lg:px-8 bg-surface"
          aria-labelledby="festivals-heading"
        >
          <div className="max-w-site mx-auto">

            <div className="mb-10 text-center">
              <p className="font-sans text-label text-brand-primary-mid uppercase tracking-widest mb-3">
                Mark your calendar
              </p>
              <h2
                id="festivals-heading"
                className="font-serif text-heading-lg text-content-strong"
              >
                Two Seasons. Two Celebrations.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Apple Blossom card */}
              <a
                href="#apple-blossom"
                className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label="Apple Blossom Festival — jump to section"
              >
                <div className="relative h-64 sm:h-72">
                  <Image
                    src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80"
                    alt="Apple orchards in spring bloom"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-[11px] font-[500] uppercase tracking-widest mb-3">
                    <Leaf size={11} aria-hidden="true" />
                    Spring
                  </div>
                  <h3 className="font-serif text-heading-md text-surface mb-1">
                    Apple Blossom Festival
                  </h3>
                  <p className="font-sans text-body-sm text-surface/75">
                    Annually in May · When the orchards bloom
                  </p>
                </div>
              </a>

              {/* Apple Butter card */}
              <a
                href="#apple-butter"
                className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label="Apple Butter Festival — jump to section"
              >
                <div className="relative h-64 sm:h-72">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                    alt="Autumn harvest in the mountain orchards"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-accent/90 via-on-accent/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent-dark/20 border border-brand-accent-dark/40 text-brand-accent-dark text-[11px] font-[500] uppercase tracking-widest mb-3">
                    <Flame size={11} aria-hidden="true" />
                    Autumn
                  </div>
                  <h3 className="font-serif text-heading-md text-surface mb-1">
                    Apple Butter Festival
                  </h3>
                  <p className="font-sans text-body-sm text-surface/75">
                    Thanksgiving Weekend · Friday, Saturday &amp; Sunday
                  </p>
                </div>
              </a>

            </div>
          </div>
        </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          APPLE BLOSSOM FESTIVAL
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
        <section
          id="apple-blossom"
          className="py-section px-4 sm:px-6 lg:px-8 bg-surface-warm border-t border-surface-muted scroll-mt-24"
          aria-labelledby="blossom-heading"
        >
          <div className="max-w-site mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Image */}
              <div className="relative rounded-xl overflow-hidden shadow-card aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1490750967868-88df5691cc47?w=800&q=80"
                  alt="Apple tree branches covered in white spring blossoms"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-surface/90 backdrop-blur-sm rounded-lg px-4 py-3">
                    <p className="font-serif text-body-md text-content-strong">
                      Oak Glen's orchards burst into bloom each May
                    </p>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary-pale border border-brand-primary-light text-brand-primary text-label uppercase tracking-widest mb-5">
                  <Leaf size={12} aria-hidden="true" />
                  Spring Celebration
                </div>

                <h2
                  id="blossom-heading"
                  className="font-serif text-heading-lg text-content-strong mb-5"
                >
                  Apple Blossom Festival
                </h2>

                <p className="font-sans text-body-md text-content-base leading-relaxed mb-4">
                  Each May, Oak Glen's orchards erupt in white and pink blossoms — a brief, breathtaking window before the growing season begins in earnest. The Apple Blossom Festival invites visitors to experience the valley at its most delicate and beautiful.
                </p>

                <p className="font-sans text-body-md text-content-base leading-relaxed mb-6">
                  Unlike a single-venue event, the festival is woven into the community itself. Each farm, orchard, and business sets its own offerings for the weekend — u-pick blossom walks, farm tours, special menus, and seasonal products made from the year's first pickings. Come for the scenery; stay for the hospitality.
                </p>

                <div className="bg-surface rounded-xl border border-surface-muted p-5 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">When</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">Annually in May</p>
                      <p className="font-sans text-body-sm text-content-base">Dates vary by year</p>
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">Where</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">{siteConfig.location.name}, {siteConfig.location.state}</p>
                      <p className="font-sans text-body-sm text-content-base">Throughout the valley</p>
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">Elevation</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">4,800 ft</p>
                      <p className="font-sans text-body-sm text-content-base">Cool spring air</p>
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">Admission</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">Varies by venue</p>
                      <p className="font-sans text-body-sm text-content-base">Many are free to explore</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/directory"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-primary hover:bg-brand-primary-mid text-label text-surface uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card min-h-[48px]"
                >
                  Browse participating businesses
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          PULL QUOTE — tradition
      ════════════════════════════════════════════════════════════════ */}
      <div
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-hidden="false"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80"
            alt=""
            role="presentation"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-primary/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="font-serif text-heading-md sm:text-heading-lg text-surface leading-snug">
            &ldquo;A community celebration for the abundant harvest that God had blessed them with, and a moment of joyful anticipation for the changing seasons.&rdquo;
          </p>
          <p className="mt-5 font-sans text-label text-brand-accent uppercase tracking-widest">
            The Apple Butter Tradition, rooted in the 16th century
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          APPLE BUTTER FESTIVAL
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
        <section
          id="apple-butter"
          className="py-section px-4 sm:px-6 lg:px-8 bg-surface scroll-mt-24"
          aria-labelledby="butter-heading"
        >
          <div className="max-w-site mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Text — left on desktop */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-accent-dark/10 border border-brand-accent-dark/30 text-brand-accent-dark text-label uppercase tracking-widest mb-5">
                  <Flame size={12} aria-hidden="true" />
                  Autumn Tradition
                </div>

                <h2
                  id="butter-heading"
                  className="font-serif text-heading-lg text-content-strong mb-5"
                >
                  Apple Butter Festival
                </h2>

                <p className="font-sans text-body-md text-content-base leading-relaxed mb-4">
                  The tradition of communal apple butter making stretches back to 16th-century European farmers gathering to boil down their year-end harvest for winter preserves. Oak Glen keeps this tradition alive every Thanksgiving weekend — Friday, Saturday, and Sunday — as the whole community comes together to close out the season.
                </p>

                <p className="font-sans text-body-md text-content-base leading-relaxed mb-8">
                  The festival runs across the entire Oak Glen community, with each participating business adding its own character to the weekend.
                </p>

                {/* Features grid */}
                <div className="mb-8">
                  <h3 className="font-sans text-label text-content-subtle uppercase tracking-widest mb-4">
                    Festival Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {APPLE_BUTTER_FEATURES.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-brand-accent-dark/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-brand-accent-dark" aria-hidden="true" />
                        </div>
                        <span className="font-sans text-body-sm text-content-base">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Festival dates */}
                <div className="bg-surface-warm rounded-xl border border-surface-muted p-5 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">When</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">Thanksgiving Weekend</p>
                      <p className="font-sans text-body-sm text-content-base">Friday, Saturday &amp; Sunday</p>
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">Frequency</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">Annual</p>
                      <p className="font-sans text-body-sm text-content-base">Every November</p>
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">Where</p>
                      <p className="font-sans text-body-md text-content-strong font-[500]">{siteConfig.location.name}, {siteConfig.location.state}</p>
                      <p className="font-sans text-body-sm text-content-base">Community-wide event</p>
                    </div>
                    <div>
                      <p className="font-sans text-label text-content-subtle uppercase tracking-widest mb-1">Info</p>
                      <a
                        href="https://www.oakglen.net/apple-butter-festival"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans text-body-sm text-brand-primary-mid hover:text-brand-primary underline underline-offset-2 transition-colors duration-200"
                      >
                        oakglen.net
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Image + participating businesses — right on desktop */}
              <div className="order-1 lg:order-2">
                <div className="relative rounded-xl overflow-hidden shadow-card aspect-[4/3] mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80"
                    alt="Autumn colours in the Oak Glen mountains during harvest season"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-surface/90 backdrop-blur-sm rounded-lg px-4 py-3">
                      <p className="font-serif text-body-md text-content-strong">
                        Thanksgiving Weekend in the mountains
                      </p>
                    </div>
                  </div>
                </div>

                {/* Participating businesses */}
                <div className="bg-surface-warm rounded-xl border border-surface-muted p-5">
                  <h3 className="font-sans text-label text-content-subtle uppercase tracking-widest mb-4">
                    Participating Businesses
                  </h3>
                  <div className="space-y-2">
                    {APPLE_BUTTER_BUSINESSES.map(({ name, href }) => (
                      <Link
                        key={name}
                        href={href}
                        className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-surface border border-transparent hover:border-surface-muted transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2
                            size={14}
                            className="text-brand-primary-mid flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-sans text-body-sm text-content-strong group-hover:text-brand-primary-mid transition-colors duration-200">
                            {name}
                          </span>
                        </div>
                        <ChevronRight
                          size={13}
                          className="text-content-subtle group-hover:text-brand-primary-mid transition-colors duration-200"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          YEAR-ROUND EVENTS
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
        <section
          className="py-section px-4 sm:px-6 lg:px-8 bg-surface-warm border-t border-surface-muted"
          aria-labelledby="yearround-heading"
        >
          <div className="max-w-site mx-auto">

            <div className="mb-10">
              <p className="font-sans text-label text-brand-primary-mid uppercase tracking-widest mb-3">
                Beyond the festivals
              </p>
              <h2
                id="yearround-heading"
                className="font-serif text-heading-lg text-content-strong"
              >
                Events at Local Businesses
              </h2>
              <p className="mt-3 font-sans text-body-md text-content-base max-w-xl leading-relaxed">
                Oak Glen's farms, ranches, and venues host their own seasonal events throughout the year — from living-history dinners to mountain wedding open houses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {YEAR_ROUND_EVENTS.map((ev) => (
                <Link
                  key={ev.business}
                  href={ev.href}
                  className="group bg-surface rounded-xl border border-surface-muted hover:border-brand-primary-light hover:shadow-card-hover p-6 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-serif text-heading-sm text-content-strong group-hover:text-brand-primary transition-colors duration-200">
                      {ev.business}
                    </h3>
                    <span
                      className={[
                        "flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-[500]",
                        ev.accent,
                      ].join(" ")}
                    >
                      {ev.season}
                    </span>
                  </div>
                  <p className="font-sans text-body-sm text-content-base leading-relaxed mb-4">
                    {ev.description}
                  </p>
                  <div className="flex items-center gap-1.5 font-sans text-body-sm text-brand-primary-mid font-[500]">
                    View listing
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      </AnimatedSectionReveal>

      {/* ════════════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════════ */}
      <AnimatedSectionReveal>
        <section
          className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-primary"
          aria-labelledby="events-cta-heading"
        >
          <div className="max-w-site mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-sans text-label text-brand-accent uppercase tracking-widest mb-2">
                Planning a visit?
              </p>
              <h2
                id="events-cta-heading"
                className="font-serif text-heading-md text-surface"
              >
                Browse the full directory
              </h2>
              <p className="mt-2 font-sans text-body-md text-surface/70 max-w-sm">
                Every farm, orchard, restaurant, and shop in Oak Glen — with hours, maps, and contact details.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/directory"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-on-accent uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card min-h-[52px]"
              >
                Explore the directory
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md bg-surface/10 hover:bg-surface/20 border border-surface/25 text-label text-surface uppercase tracking-widest transition-all duration-200 min-h-[52px]"
              >
                About Oak Glen
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSectionReveal>

    </main>
    </>
  );
}
