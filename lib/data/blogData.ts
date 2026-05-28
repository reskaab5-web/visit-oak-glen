/**
 * lib/data/blogData.ts — Blog / editorial content data
 *
 * These posts serve three purposes:
 *  1. SEO  — fresh, keyword-rich content that earns organic rankings and
 *             internal links back to individual business listing pages.
 *  2. GEO  — Article schema with author, datePublished, and sameAs references
 *             strengthens the site's entity graph for AI answer engines.
 *  3. Upsell — Premium listings can be featured in "Featured Business" posts,
 *              which become a genuine editorial backlink on the directory domain.
 *
 * To add a new post: copy one entry below, update all fields, and it will
 * automatically appear on /blog and /blog/[slug] with full schema markup.
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  name:    string;
  title?:  string;
  /** Absolute URL to author profile or bio page, if any */
  url?:    string;
}

export interface BlogPost {
  slug:          string;
  title:         string;
  /** Used in <meta name="description"> and the og:description tag */
  metaDescription: string;
  /** Short teaser shown on the /blog index card */
  excerpt:       string;
  /** Full post body as HTML string — safe to render with dangerouslySetInnerHTML */
  content:       string;
  /** ISO 8601 date string, e.g. "2025-09-01" */
  publishedAt:   string;
  /** ISO 8601 date string — omit if never updated */
  updatedAt?:    string;
  coverImageUrl: string;
  /** Alt text for the cover image */
  coverImageAlt: string;
  author:        BlogAuthor;
  /** Broad category label shown on cards */
  category:      string;
  /** Slug(s) of businesses featured in this post — used to render related cards */
  featuredBusinessSlugs?: string[];
  /** Primary keyword / focus keyphrase for the post */
  focusKeyphrase?: string;
}

// ─── Posts ─────────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    slug:            "best-apple-picking-oak-glen",
    title:           "The Best Apple Picking in Oak Glen: A Farm-by-Farm Guide",
    metaDescription:
      "Planning an apple picking trip to Oak Glen, CA? Here's how to choose the right farm for your group — from U-pick orchards to cider tasting and farm animals.",
    excerpt:
      "Oak Glen is home to more than a dozen working orchards, and choosing the right one comes down to what you're after. Here's how to match your group to the perfect farm.",
    publishedAt:  "2025-09-05",
    updatedAt:    "2025-10-01",
    coverImageUrl: "https://momsoakglen.com/wp-content/uploads/2025/08/20250829_113420-1-1024x576.jpg",
    coverImageAlt: "Apple trees heavy with fruit at Mom's Country Orchards in Oak Glen",
    author: {
      name:  "Visit Oak Glen",
      title: "Editorial Team",
    },
    category:               "Guide",
    focusKeyphrase:         "apple picking Oak Glen",
    featuredBusinessSlugs:  [
      "snow-line-orchards",
      "los-rios-rancho",
      "oak-glen-cider-company",
      "moms-country-orchards",
    ],
    content: `
<p data-speakable>Oak Glen sits at roughly 4,800 feet in the San Bernardino Mountains, and that elevation is the reason this two-square-mile community has grown world-class apples since the 1850s. The crisp nights that arrive in late August trigger the color development and sugar concentration that make Oak Glen apples worth the drive from Los Angeles, the Inland Empire, or the high desert.</p>

<p>With more than a dozen working orchards operating between late July and early December, the question isn't whether to go — it's which farm matches your group best. Here's a practical breakdown.</p>

<h2>For the Full Experience: Snow-Line Orchards</h2>

<p><a href="/directory/snow-line-orchards">Snow-Line Orchards</a> has been running since 1921 and is the benchmark that most visitors measure everything else against. They grow more than 30 apple varieties, press their own cider, and run a bakery that turns out apple pies, donuts, and strudel from their own fruit. The U-pick fields are well-maintained and the staff is consistently knowledgeable about which varieties are ready on a given weekend.</p>

<p>If you can only go to one farm, Snow-Line is the default recommendation — it's the most complete operation in the valley.</p>

<h2>For History and Sheer Scale: Los Rios Rancho</h2>

<p><a href="/directory/los-rios-rancho">Los Rios Rancho</a> dates to 1906 and is the oldest continually operated apple orchard in California. The property spans more than 100 acres, the farm stand is stocked with an exceptional range of heirloom varieties, and the atmosphere has a lived-in quality that newer operations simply can't replicate.</p>

<p>Los Rios is particularly good for families who want to spread out — the property is large enough that it doesn't feel crowded even on a busy October Saturday.</p>

<h2>For Cider Lovers: Oak Glen Cider Company</h2>

<p><a href="/directory/oak-glen-cider-company">Oak Glen Cider Company</a> is Oak Glen's dedicated craft cider producer. Where other farms press sweet cider for all ages, Oak Glen Cider produces small-batch hard cider from estate apples. The tasting room is relaxed, the staff is genuinely enthusiastic about fermentation, and the lineup changes seasonally.</p>

<p>It pairs naturally with a stop at one of the farms for U-pick, then an afternoon tasting session on the way out.</p>

<h2>For a Quieter Morning: Mom's Country Orchards</h2>

<p><a href="/directory/moms-country-orchards">Mom's Country Orchards</a> offers a more relaxed pace — friendly staff, a well-stocked farm stand, and a less crowded experience than the larger destination farms. It's particularly good for visitors who want genuine orchard time without navigating a large crowd.</p>

<h2>Practical Notes</h2>

<ul>
  <li><strong>Season:</strong> Late July through late November, with peak variety availability in September and October.</li>
  <li><strong>Weekday vs. weekend:</strong> Saturday and Sunday afternoons in October are the busiest times of the year. If you can go on a Friday or early Saturday morning, the experience is substantially calmer.</li>
  <li><strong>Dress for the elevation:</strong> Even on warm September afternoons, temperatures can drop quickly after 4 PM. Bring a layer.</li>
  <li><strong>Parking:</strong> Most farms have ample free parking. The road through Oak Glen (Oak Glen Road) is a single two-lane highway — allow extra time on busy weekends.</li>
</ul>

<p>The full directory of Oak Glen farms, orchards, and apple-season businesses is at <a href="/directory">Visit Oak Glen's business directory</a>.</p>
    `.trim(),
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    slug:            "oak-glen-year-round-guide",
    title:           "Oak Glen Beyond Apple Season: What to Do Year-Round",
    metaDescription:
      "Oak Glen is worth visiting in every season — here's what's open in winter, spring, and summer, and why the off-season crowds are a fraction of October's.",
    excerpt:
      "Most people think of Oak Glen as an October destination. The locals know it's worth the drive in January, April, and July too.",
    publishedAt:  "2025-11-15",
    coverImageUrl: "https://rileysfarm.com/wp-content/uploads/2024/09/web_fj_20240908.jpg",
    coverImageAlt: "Riley's Farm grounds with the San Bernardino mountain backdrop in autumn",
    author: {
      name:  "Visit Oak Glen",
      title: "Editorial Team",
    },
    category:               "Guide",
    focusKeyphrase:         "Oak Glen year round",
    featuredBusinessSlugs:  [
      "riley-s-farm",
      "stone-oak-manor",
      "oak-tree-mountain",
      "oak-glen-schoolhouse-museum",
    ],
    content: `
<p data-speakable>The busiest weekend of the year at Oak Glen is the second or third Saturday of October, when the apple harvest is near peak and every orchard is running at capacity. That weekend is genuinely wonderful — but it's also crowded, parking is difficult, and you'll share the experience with thousands of other visitors.</p>

<p>What most visitors don't realize is that Oak Glen is worth the drive in every month of the year, and the off-season version of this community is often the more memorable one.</p>

<h2>Winter: Snow, Quiet, and Riley's Farm</h2>

<p>Oak Glen sits high enough to receive genuine snowfall several times each winter, and when that happens, the drive up from the valley floor delivers a landscape that feels dramatically removed from Southern California. Several restaurants and businesses remain open year-round, and the lack of crowds makes it easy to find parking, take your time, and have genuine conversations with the people who work here.</p>

<p><a href="/directory/riley-s-farm">Riley's Farm</a> operates year-round with living history programs, school group events, and overnight experiences that run through the winter months. It's one of the few operations in Oak Glen designed specifically around education and immersive history rather than produce sales, and the winter calendar is often its most interesting.</p>

<h2>Spring: Blossoms, Weddings, and the Return of the Valley</h2>

<p>Apple blossoms typically arrive in late March and April, and the orchard landscape during bloom is as beautiful as it is during harvest — arguably more so, because the crowds haven't returned yet. Spring is also wedding season at properties like <a href="/directory/stone-oak-manor">Stone Oak Manor</a>, Oak Glen's premier event venue, which books heavily through April and May.</p>

<p>Lilacs bloom alongside the apple blossoms across many properties, filling the valley with a fragrance that's worth planning a trip around. The Oak Glen Apple Blossom Festival is the community's major spring event — check the <a href="/events">events calendar</a> for dates each year.</p>

<h2>Summer: Cool Air, Adventure, and Cider</h2>

<p>On days when the Inland Empire is sitting at 105°F, Oak Glen is often a full 25–30 degrees cooler. That elevation differential makes the valley a genuine escape during Southern California's summers, and <a href="/directory/oak-tree-mountain">Oak Tree Mountain</a> has built an outdoor recreation operation specifically around summer visitors — zip lines, mountain biking, and hiking that fills the gap between harvest seasons.</p>

<p>Summer is also when Oak Glen Cider Company releases several of its limited small-batch runs, as the fermentation program catches up with the prior year's apple harvest.</p>

<h2>A Year-Round Stop: The Schoolhouse Museum</h2>

<p>The <a href="/directory/oak-glen-schoolhouse-museum">Oak Glen Schoolhouse Museum & Park</a> is open year-round, free to visit, and genuinely worth a stop in any season. The park surrounding the historic one-room schoolhouse has picnic areas, a dog park, a tennis court, and walking paths — making it an easy mid-day anchor for a visit at any time of year.</p>
    `.trim(),
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    slug:            "oak-glen-wedding-venues",
    title:           "Oak Glen Wedding Venues: A Complete Guide for 2025",
    metaDescription:
      "Planning a wedding in Oak Glen, CA? Here's what to know about the mountain's two premier event venues — Stone Oak Manor and The Homestead at Wilshire Ranch.",
    excerpt:
      "Oak Glen's elevation, orchard setting, and dramatic mountain views make it one of Southern California's most distinctive wedding destinations. Here's how to choose the right venue.",
    publishedAt:  "2025-02-14",
    updatedAt:    "2025-04-01",
    coverImageUrl: "https://homesteadoakglen.com/wp-content/uploads/sites/6084/2018/10/Sewell-A-0914.jpg",
    coverImageAlt: "Outdoor wedding ceremony at The Homestead at Wilshire Ranch in Oak Glen",
    author: {
      name:  "Visit Oak Glen",
      title: "Editorial Team",
    },
    category:               "Weddings",
    focusKeyphrase:         "Oak Glen wedding venues",
    featuredBusinessSlugs:  [
      "stone-oak-manor",
      "the-homestead-at-wilshire-ranch",
    ],
    content: `
<p data-speakable>Oak Glen sits in the San Bernardino Mountains at 4,800 feet, and that elevation does something to the landscape that no venue stylist can replicate. Apple orchards, California oaks, sweeping mountain views, and air that smells different from anything in the valley below — these are the baseline conditions for a wedding here, regardless of which property you choose.</p>

<p>The community has two dedicated wedding venues, each with a distinct character. Here's how to decide between them.</p>

<h2>Stone Oak Manor: Full-Service, Elegant, Year-Round</h2>

<p><a href="/directory/stone-oak-manor">Stone Oak Manor</a> is Oak Glen's most complete event venue — a property that handles the ceremony, reception, catering, and accommodations under one roof, with on-site coordination staff who manage the logistics so you don't have to.</p>

<p>The manor house sits on grounds that blend formal garden spaces with the natural orchard landscape. Stone pathways, mature oaks, and layered garden plantings give it a manicured quality that photographs beautifully in every season. The indoor reception hall handles weather contingencies without sacrificing the ambiance, which matters at an elevation that can produce genuine rain and snow between October and April.</p>

<p>Stone Oak Manor is the right choice for couples who want a handled experience — a venue that operates like a private resort and takes the coordination weight off the couple and their families.</p>

<h2>The Homestead at Wilshire Ranch: Natural, Private, Panoramic</h2>

<p><a href="/directory/the-homestead-at-wilshire-ranch">The Homestead at Wilshire Ranch</a> is a 5.5-acre property designed for couples who want the natural landscape to do the work. Apple trees, lilacs, California oaks, and sycamores frame ceremony and reception spaces that face north toward Wilshire Peak and south toward Lake Perris — a panorama that turns the backdrop of every photograph into something exceptional.</p>

<p>The Homestead is a canvas rather than a turnkey package. It suits couples with a clear vision, a preferred vendor team, and a desire for a setting that feels genuinely private. The property handles both intimate ceremonies and larger celebrations, but the experience is deliberately less structured than Stone Oak Manor's.</p>

<h2>Practical Considerations</h2>

<ul>
  <li><strong>Booking lead time:</strong> Both venues book 12–18 months in advance for peak season dates (May–June and September–October). If you have a specific date in mind, start conversations early.</li>
  <li><strong>Guest logistics:</strong> Oak Glen Road is a single two-lane highway with limited shoulder — for weddings over 80 guests, coordinate a shuttle from Yucaipa or Beaumont to keep parking manageable.</li>
  <li><strong>Season:</strong> Both venues operate year-round. Winter weddings (November–March) offer dramatically reduced pricing, snow possibilities, and a level of quiet and privacy that peak season simply can't match.</li>
</ul>

<p>Both venues are listed in the <a href="/directory">Visit Oak Glen business directory</a> with current contact information, hours, and direct booking links.</p>
    `.trim(),
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    slug:            "oak-glen-restaurants-dining-guide",
    title:           "Where to Eat in Oak Glen: A Dining Guide",
    metaDescription:
      "From fine dining at Oak Glen Steak House to country cooking at Oak Tree Village, here's where to eat in Oak Glen, CA — and what to order.",
    excerpt:
      "Dining in Oak Glen tends to be straightforward and honest — farm-sourced ingredients, generous portions, and settings that match the mountain character of the community.",
    publishedAt:  "2025-08-20",
    coverImageUrl: "https://oakglensteakhouse.com/wp-content/uploads/2025/10/E5821913-0AEE-490D-BF51-8BE5005E0DF6_L0_001-7_16_2024-8_15_01-PM-scaled.jpg",
    coverImageAlt: "Interior dining room at Oak Glen Steak House with warm mountain ambiance",
    author: {
      name:  "Visit Oak Glen",
      title: "Editorial Team",
    },
    category:               "Food & Drink",
    focusKeyphrase:         "where to eat Oak Glen",
    featuredBusinessSlugs:  [
      "oak-glen-steak-house",
      "oak-tree-mountain",
    ],
    content: `
<p data-speakable>Oak Glen's dining scene is small — the community covers only about two square miles — but the quality-to-setting ratio is hard to match anywhere at this elevation. Most restaurants source from the orchards and farms that surround them, the portions reflect mountain appetites, and every table comes with a view that's worth the drive on its own.</p>

<p>Here's where to eat, and what to know before you go.</p>

<h2>For a Proper Dinner: Oak Glen Steak House</h2>

<p><a href="/directory/oak-glen-steak-house">Oak Glen Steak House</a> is the most established sit-down restaurant in the valley — a classic American steakhouse that's been feeding visitors since the apple-picking era began. The menu is built around prime cuts, the wine list is carefully chosen, and the room has the kind of comfortable formality that makes it feel like an occasion without being stuffy.</p>

<p>The apple-inspired desserts — particularly the apple cobbler and the brandy-glazed apple over vanilla ice cream — are worth ordering alongside your steak rather than as an afterthought.</p>

<p>Reservations are strongly recommended on weekend evenings in September and October.</p>

<h2>For Lunch with a View: Oak Tree Mountain</h2>

<p><a href="/directory/oak-tree-mountain">Oak Tree Mountain</a> is primarily an outdoor adventure operation, but the food service runs throughout the day and the setting — an elevated deck with views across the valley — makes it one of the best lunch spots in Oak Glen. The menu skews toward casual: burgers, sandwiches, and local cider pairings that work well after a morning of U-pick or a zip line run.</p>

<h2>Farm Stands and Bakeries</h2>

<p>Several of the major orchards — Snow-Line, Los Rios Rancho, and Mom's Country Orchards — operate bakeries and farm stands where the food is produced from their own harvest. Fresh-pressed cider, apple cider donuts, pies, and preserves are all worth picking up. The quality is directly tied to the harvest, which means September and October produce the best versions of everything.</p>

<h2>Practical Notes</h2>

<ul>
  <li><strong>Hours vary by season:</strong> Several restaurants operate on reduced hours or days outside of peak apple season (September–November). Always check current hours before making a trip — listings in the <a href="/directory">directory</a> reflect verified current schedules.</li>
  <li><strong>Cash:</strong> Some farm stands are cash-preferred; card readers are not universal. Bring both.</li>
  <li><strong>Pacing:</strong> Oak Glen is not a fast-food kind of place. Build extra time into your day, particularly for sit-down meals on weekends.</li>
</ul>
    `.trim(),
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Returns posts sorted newest-first */
export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
