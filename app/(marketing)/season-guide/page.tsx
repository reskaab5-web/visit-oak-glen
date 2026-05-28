import type { Metadata } from "next";
import Link              from "next/link";
import {
  ArrowRight,
  Flower2,
  Sun,
  Leaf,
  Snowflake,
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
  title:       `Season Guide — ${siteConfig.name}`,
  description:
    "Plan your Oak Glen visit by season. From spring apple blossoms to fall harvest, learn what's open, what's happening, and what to expect every month of the year.",
  alternates:  { canonical: "/season-guide" },
  openGraph: {
    title:       `Oak Glen Season Guide — ${siteConfig.name}`,
    description: "What to expect in Oak Glen every season — spring blossoms, summer cider, fall harvest, and winter solitude.",
  },
};

// ─── Season data ──────────────────────────────────────────────────────────────

const SEASONS = [
  {
    id:       "spring",
    name:     "Spring",
    months:   "March – May",
    icon:     Flower2,
    bg:       "bg-[#eef4ea]",
    border:   "border-[#c8dbbf]",
    accent:   "text-brand-primary-mid",
    dot:      "bg-brand-primary-mid",
    headline: "Blossoms and the first warm weekends",
    intro:
      "Spring is when Oak Glen shakes off winter and announces itself in pink and white. The apple orchards bloom in late March through April, covering the hillsides with color that draws visitors from across Southern California. Temperatures are cool and comfortable — typically 55–70°F — making it one of the best times to walk the orchard rows.",
    highlights: [
      {
        title: "Apple Blossom Season",
        body:  "The orchards bloom mid-March through April. Snow-Line Orchards and Mom's Country Orchards are both worth visiting for the blossom display. Weekends in April get busy — arrive before noon.",
      },
      {
        title: "Apple Blossom Festival",
        body:  "Riley's Farm hosts Apple Blossom Festival weekends each April with living history demonstrations, entertainment, and farm activities for families. Check rileysfarm.com for exact dates.",
      },
      {
        title: "Hiking and walking",
        body:  "Spring trails are clear and green. The orchard roads make for beautiful walking. Willow Brook Apple Farm and Oak Tree Village have pleasant outdoor areas open in spring.",
      },
      {
        title: "What's open",
        body:  "Most farms open weekends by April. A few (Riley's Farm, Oak Glen Steakhouse, Oak Tree Village) operate year-round. Call ahead before visiting smaller operations.",
      },
    ],
    tip:    "Best spring weekend: third or fourth weekend in April when blossoms peak and the weather is reliably good.",
    cta:    { label: "Farms & Orchards", href: "/categories/farms" },
  },
  {
    id:       "summer",
    name:     "Summer",
    months:   "June – August",
    icon:     Sun,
    bg:       "bg-[#fdf8ef]",
    border:   "border-[#e8d5a3]",
    accent:   "text-brand-accent",
    dot:      "bg-brand-accent",
    headline: "Mountain escape from the valley heat",
    intro:
      "When temperatures in the Inland Empire and LA hit triple digits, Oak Glen sits at a reliable 15–20 degrees cooler. That alone makes summer worthwhile. The farm activity is quieter than fall — the apple harvest hasn't started — but the cider houses, restaurants, and entertainment venues run full schedules. Berry picking opens at several farms in June and July.",
    highlights: [
      {
        title: "Hard cider tasting",
        body:  "Willowbrook Apple Farm and other cider houses pour their best on summer weekends. The shaded tasting areas are a natural refuge from the heat. Check hours as summer schedules vary.",
      },
      {
        title: "Riley's Farm dinner theater",
        body:  "Summer is prime season for Riley's Farm evening events — colonial dinner theater, outdoor concerts, and special programming. Reservations fill weeks out; book early.",
      },
      {
        title: "Berry picking",
        body:  "Several farms open berry picking in June and July depending on the season. Call ahead to confirm availability before making the drive.",
      },
      {
        title: "Fewer crowds",
        body:  "Summer weekdays are genuinely quiet. If you want Oak Glen without the weekend crowds, a Tuesday or Wednesday in July gives you easy parking and unhurried farm visits.",
      },
    ],
    tip:    "Summer evenings cool down fast at 4,800 feet. Bring a light layer even in July.",
    cta:    { label: "Cider Houses", href: "/categories/cider-houses" },
  },
  {
    id:       "autumn",
    name:     "Autumn",
    months:   "September – November",
    icon:     Leaf,
    bg:       "bg-[#fdf1e8]",
    border:   "border-[#e8c4a0]",
    accent:   "text-brand-accent-dark",
    dot:      "bg-brand-accent-dark",
    headline: "Peak season — the apple harvest",
    intro:
      "Fall is Oak Glen at its best and busiest. The apple harvest runs from late August through Thanksgiving, with u-pick orchards opening daily, farm stores stocked with 30+ apple varieties, cider donuts, fresh-pressed juice, and the smell of apple butter in the air. October is the most electric month — the foliage turns, the air crisps, and virtually every business in Oak Glen is open and running.",
    highlights: [
      {
        title: "U-pick apple orchards",
        body:  "Mom's Country Orchards, Snow-Line Orchards, Oak Glen Orchard, and Willow Brook Apple Farm all open u-pick in September. Different varieties ripen at different times — early September for Galas, late October for Fujis and Braeburns.",
      },
      {
        title: "Apple Butter Festival",
        body:  "Held at Los Rios Rancho in October, the Apple Butter Festival is one of Oak Glen's most beloved traditions. Stirring the copper kettles, apple butter on fresh bread, craft vendors, and live music.",
      },
      {
        title: "Corn maze, pumpkins & wagon rides",
        body:  "Riley's Farm runs its full autumn programming through October: corn maze, pumpkin patch, wagon rides, and cider pressing demonstrations alongside the living history experiences.",
      },
      {
        title: "Fall foliage",
        body:  "The oak and apple trees turn gold and amber in late October. The drive up Oak Glen Road in the third week of October is one of the best fall color experiences in Southern California.",
      },
      {
        title: "What to expect",
        body:  "October weekends are the busiest of the year. Arrive before 10am or plan for a wait. Weekdays in October are noticeably calmer and still fully operational.",
      },
    ],
    tip:    "The single best weekend: third weekend of October. Full harvest, peak color, everything open.",
    cta:    { label: "All Businesses", href: "/directory" },
  },
  {
    id:       "winter",
    name:     "Winter",
    months:   "December – February",
    icon:     Snowflake,
    bg:       "bg-[#eef1f6]",
    border:   "border-[#c4cfe0]",
    accent:   "text-brand-primary",
    dot:      "bg-brand-primary",
    headline: "Quiet, cold, and surprisingly beautiful",
    intro:
      "Winter is Oak Glen's best-kept secret. The crowds are gone, the orchards are bare but beautiful against the grey sky, and on lucky weekends a dusting of snow covers the ridgeline. The businesses that stay open — Riley's Farm, the Oak Glen Steakhouse, and the retreat centers — feel genuinely local in a way that the peak-season crowds don't allow.",
    highlights: [
      {
        title: "Holiday programming",
        body:  "Riley's Farm runs Christmas-themed events in December: colonial holiday dinners, a Christmas Carol dinner theater, and family programming. Oak Tree Village and the Steakhouse draw local regulars through the season.",
      },
      {
        title: "Retreat and rest",
        body:  "The Oak Glen Retreat Center and Homestead at Wilshire Ranch both see heavy winter bookings for groups seeking mountain solitude. The B&Bs fill with couples looking for a quiet escape.",
      },
      {
        title: "Snow",
        body:  "Snow is possible but not guaranteed. When it does come — usually January or February — Oak Glen Glen Road and the orchard rows look extraordinary. Check road conditions before driving up.",
      },
      {
        title: "What's closed",
        body:  "Most u-pick orchards and farm stores close after Thanksgiving or in early December. A handful of core businesses stay open year-round. Call ahead; hours shrink significantly in winter.",
      },
    ],
    tip:    "Check the weather the day before — a post-storm winter visit with fresh snow is one of the most memorable Oak Glen experiences.",
    cta:    { label: "Accommodation", href: "/categories/accommodation" },
  },
] as const;

// ─── Monthly quick-ref ────────────────────────────────────────────────────────

const MONTHS = [
  { m: "Jan",  season: "winter", note: "Quietest month. Snow possible. Mostly closed." },
  { m: "Feb",  season: "winter", note: "Late winter. Snow possible. Limited hours." },
  { m: "Mar",  season: "spring", note: "Orchards wake up. Early blossoms." },
  { m: "Apr",  season: "spring", note: "Apple blossoms peak. Blossom Festival." },
  { m: "May",  season: "spring", note: "Full spring. Most farms open weekends." },
  { m: "Jun",  season: "summer", note: "Berry picking opens. Cider houses full schedule." },
  { m: "Jul",  season: "summer", note: "Hot in valley, cool here. Uncrowded weekdays." },
  { m: "Aug",  season: "summer", note: "Early harvest begins late August." },
  { m: "Sep",  season: "autumn", note: "U-pick opens. Harvest in full swing." },
  { m: "Oct",  season: "autumn", note: "Peak season. All open. Apple Butter Festival." },
  { m: "Nov",  season: "autumn", note: "Late harvest through Thanksgiving." },
  { m: "Dec",  season: "winter", note: "Holiday events. Many farms close after Thanksgiving." },
] as const;

const SEASON_COLOR: Record<string, string> = {
  spring: "bg-[#eef4ea] text-brand-primary-mid border-[#c8dbbf]",
  summer: "bg-[#fdf8ef] text-brand-accent border-[#e8d5a3]",
  autumn: "bg-[#fdf1e8] text-brand-accent-dark border-[#e8c4a0]",
  winter: "bg-[#eef1f6] text-brand-primary border-[#c4cfe0]",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SeasonGuidePage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(
          siteConfig,
          "/season-guide",
          `Season Guide — ${siteConfig.name}`,
          "What to expect in Oak Glen, CA every season — spring blossoms, summer cider, fall harvest, and winter solitude.",
        ),
      ]} />
      <main>

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section className="bg-brand-primary py-24 lg:py-32 px-6 lg:px-8" aria-label="Oak Glen season guide">
          <AnimatedHeroContent className="max-w-site mx-auto text-center flex flex-col items-center">
            <AnimatedHeroItem>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
                <span className="text-label text-brand-accent uppercase tracking-[0.22em]">Plan your visit</span>
                <div className="w-4 h-px bg-brand-accent" aria-hidden="true" />
              </div>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <h1 className="font-serif text-display-lg md:text-display-xl lg:text-display-2xl text-surface leading-[1.07] max-w-3xl">
                Oak Glen Through<br className="hidden sm:block" /> the Seasons
              </h1>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <p className="mt-6 text-body-lg text-surface/80 max-w-2xl leading-relaxed">
                Every season in Oak Glen is worth experiencing — they're just worth experiencing for different reasons. Here's what to expect, month by month.
              </p>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                {SEASONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-surface/25 hover:border-surface/50 text-label text-surface/75 hover:text-surface uppercase tracking-wider text-[11px] transition-all duration-200"
                  >
                    <s.icon size={13} aria-hidden="true" />
                    {s.name}
                  </a>
                ))}
              </div>
            </AnimatedHeroItem>
          </AnimatedHeroContent>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            MONTHLY OVERVIEW
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-14 px-6 lg:px-8 bg-surface-warm border-b border-surface-muted" aria-labelledby="monthly-heading">
          <div className="max-w-site mx-auto">
            <h2 id="monthly-heading" className="font-serif text-heading-lg text-content-strong mb-8">
              Month at a glance
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {MONTHS.map(({ m, season, note }) => (
                <a
                  key={m}
                  href={`#${season}`}
                  className={`rounded-xl border p-4 flex flex-col gap-2 hover:shadow-card-hover transition-shadow duration-200 ${SEASON_COLOR[season]}`}
                >
                  <p className="font-sans font-[600] text-label uppercase tracking-widest">{m}</p>
                  <p className="font-sans text-[11px] leading-snug opacity-80">{note}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

        {/* ════════════════════════════════════════════════════════════════
            SEASON SECTIONS
        ════════════════════════════════════════════════════════════════ */}
        {SEASONS.map((season, idx) => (
          <AnimatedSectionReveal key={season.id}>
          <section
            id={season.id}
            className={`py-section px-6 lg:px-8 ${idx % 2 === 0 ? "bg-surface" : "bg-surface-warm"} border-b border-surface-muted`}
            aria-labelledby={`${season.id}-heading`}
          >
            <div className="max-w-site mx-auto">

              {/* Season header */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
                <div className={`w-14 h-14 rounded-2xl ${season.bg} border ${season.border} flex items-center justify-center`}>
                  <season.icon size={26} className={season.accent} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <p className={`font-sans text-label uppercase tracking-widest font-[600] ${season.accent}`}>
                    {season.months}
                  </p>
                  <h2 id={`${season.id}-heading`} className="font-serif text-heading-xl text-content-strong leading-snug">
                    {season.name} — {season.headline}
                  </h2>
                </div>
              </div>

              {/* Intro */}
              <p className="font-sans text-body-md text-content-base leading-relaxed max-w-3xl mb-10">
                {season.intro}
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {season.highlights.map((h) => (
                  <div key={h.title} className={`rounded-xl ${season.bg} border ${season.border} p-6`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${season.dot}`} aria-hidden="true" />
                      <h3 className="font-serif text-body-lg text-content-strong">{h.title}</h3>
                    </div>
                    <p className="font-sans text-body-sm text-content-base leading-relaxed">{h.body}</p>
                  </div>
                ))}
              </div>

              {/* Pro tip + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-surface-muted">
                <p className="font-sans text-body-sm text-content-subtle max-w-xl">
                  <span className={`font-[600] ${season.accent}`}>Pro tip: </span>
                  {season.tip}
                </p>
                <Link
                  href={season.cta.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-brand-primary hover:bg-brand-primary-mid text-label text-surface uppercase tracking-widest text-[11px] transition-all duration-200 hover:-translate-y-px shadow-card flex-shrink-0"
                >
                  {season.cta.label}
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>

            </div>
          </section>
          </AnimatedSectionReveal>
        ))}

        {/* ════════════════════════════════════════════════════════════════
            CTA
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-brand-primary" aria-labelledby="season-cta-heading">
          <div className="max-w-site mx-auto flex flex-col items-center text-center gap-6">
            <p className="text-label text-brand-accent uppercase tracking-widest">Ready to plan?</p>
            <h2 id="season-cta-heading" className="font-serif text-heading-xl text-surface max-w-xl leading-snug">
              Find the right businesses for your visit.
            </h2>
            <p className="font-sans text-body-md text-surface/70 max-w-lg leading-relaxed">
              Browse the full directory by category — farms, cider houses, restaurants, accommodation, and more.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link
                href="/directory"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-accent hover:bg-brand-accent-dark text-label text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px shadow-card"
              >
                Browse the Directory
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/getting-here"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md border border-surface/30 hover:border-surface/60 text-label text-surface/80 hover:text-surface uppercase tracking-widest transition-all duration-200"
              >
                Getting Here
              </Link>
            </div>
          </div>
        </section>
        </AnimatedSectionReveal>

      </main>
    </>
  );
}
