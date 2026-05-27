// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingTier = "free" | "standard" | "premium"

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "yelp"
  | "tripadvisor"
  | "youtube"

export interface SocialLink {
  platform: SocialPlatform
  /** Full profile URL, e.g. "https://www.facebook.com/losriosrancho" */
  url:      string
}

export interface PressLink {
  publication: string
  headline:    string
  url:         string
  date?:       string
}

export interface BusinessHours {
  day:    string;
  open:   string;
  close:  string;
  closed: boolean;
}

export interface BusinessAddress {
  street: string;
  city:   string;
  state:  string;
  zip:    string;
}

export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

export interface Business {
  id:               string;
  slug:             string;
  name:             string;
  shortDescription: string;
  description:      string;
  category:         string;
  categorySlug:     string;
  rating:           number;
  reviewCount:      number;
  imageUrl:         string;
  galleryImages?:   string[];
  location:         string;
  address:          BusinessAddress;
  phone:            string;
  website?:         string;
  email?:           string;
  hours:            BusinessHours[];
  amenities:        string[];
  featured:         boolean;
  priceRange:       PriceRange;
  established?:     number;
  tags?:            string[];
  // ── Listing tier ──
  tier:             ListingTier;
  socialLinks?:     SocialLink[];
  pressLinks?:      PressLink[];
  /** Google Maps Place ID — enables exact GBP embed. Auto-populated by scripts/fetch-place-ids.mjs */
  placeId?:         string;
}

export interface Category {
  slug:        string;
  label:       string;
  description: string;
  imageUrl:    string;
  count:       number;
}

// ─── Businesses ───────────────────────────────────────────────────────────────

export const businesses: Business[] = [

  // ══════════════════════════════════════════════════════════════════════════
  //  FARMS & ORCHARDS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "1",
    slug: "moms-country-orchards",
    name: "Mom's Country Orchards",
    shortDescription:
      "Year-round family orchard known for freshly picked apples, handcrafted jams, jellies, and old-fashioned preserves made right on the property.",
    description: `Mom's Country Orchards sits at the heart of Oak Glen's apple country, welcoming visitors every day of the year with the kind of unpretentious warmth that only a true family operation can offer. While the rest of Oak Glen's orchards run on harvest-season schedules, this one keeps the gates open through winter and spring—so a jar of apple butter or a bag of freshly picked fruit is never more than a drive up the hill away.

The orchard specializes in a rotating selection of apple varieties suited to the San Bernardino Mountain climate, with peak picking running from late summer through early December. Alongside fresh fruit, the on-site store carries the family's signature jams, jellies, and preserves—apple butter, cinnamon apple spread, pear jam, and a rotating cast of seasonal fruit preserves that have become pantry staples for generations of Oak Glen regulars.

It's a simple place done right: no flashy attractions, just honest fruit, honest flavors, and a friendly crew who can tell you exactly which variety came off the tree this morning.`,
    category:     "Farms & Orchards",
    categorySlug: "farms",
    rating:       4.7,
    reviewCount:  184,
    imageUrl:
      "https://momsoakglen.com/wp-content/uploads/2025/08/20250829_113420-1-1024x576.jpg",
    galleryImages: [
      "https://momsoakglen.com/wp-content/uploads/2025/09/IMG_20250908_111122.jpg",
      "https://momsoakglen.com/wp-content/uploads/2025/08/477560430_1277073410600684_2988135554740148009_n.jpg",
      "https://momsoakglen.com/wp-content/uploads/2025/08/image000001.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "38695 Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-4249",
    website: "https://momsoakglen.com",
    hours: [
      { day: "Monday",    open: "10:00 AM", close: "6:00 PM", closed: false },
      { day: "Tuesday",   open: "10:00 AM", close: "6:00 PM", closed: false },
      { day: "Wednesday", open: "10:00 AM", close: "6:00 PM", closed: false },
      { day: "Thursday",  open: "10:00 AM", close: "6:00 PM", closed: false },
      { day: "Friday",    open: "10:00 AM", close: "6:00 PM", closed: false },
      { day: "Saturday",  open: "10:00 AM", close: "6:00 PM", closed: false },
      { day: "Sunday",    open: "10:00 AM", close: "6:00 PM", closed: false },
    ],
    amenities: [
      "Open Year-Round",
      "Fresh-Picked Apples",
      "Farm Store",
      "Jams & Preserves",
      "Parking",
      "Family Friendly",
    ],
    featured:   false,
    priceRange: "$",
    tags:       ["apples", "jams", "preserves", "year-round", "farm-store"],
    tier:       "standard",
  placeId:         "ChIJgyi_bUpO24AR8MdoJfkyjAA",
  },

  {
    id:   "2",
    slug: "snow-line-orchards",
    name: "Snow-Line Orchards and Winery",
    shortDescription:
      "Home to California's oldest chestnut tree and the original 1898 Apple Shed — offering hard cider, wine tasting, cider mini-donuts, and u-pick raspberries.",
    description: `Snow-Line Orchards occupies one of Oak Glen's most storied parcels — the original 1898 Apple Shed still anchors the property, its weathered timbers and corrugated roof carrying more than a century of harvest seasons. California's oldest chestnut tree stands nearby, a living landmark that draws history buffs and photographers alike every autumn.

The orchard has grown well beyond its original footprint. Today's offerings span three flavors of fresh-pressed apple cider, a hard cider and wine tasting room pouring small-batch varietals from the estate's own fruit, and the ever-popular Apple Cider Mini-Donuts — hot, crisp, and dusted in cinnamon sugar. In season, guests can pick their own raspberries in the berry fields or take home several varieties of freshly bagged apples.

The antiques and gifts room inside the historic shed rounds out the visit with locally made keepsakes and seasonal décor. Snow-Line is one of those rare places where every visit turns up something new — a bottle you haven't tried, a variety you haven't tasted, a corner of the property you haven't explored.`,
    category:     "Farms & Orchards",
    categorySlug: "farms",
    rating:       4.8,
    reviewCount:  326,
    imageUrl:
      "https://oakglenorchard.com/images/504800/0_0.jpg",
    galleryImages: [
      "https://oakglenorchard.com/images/504784/0_0.jpg",
      "https://oakglenorchard.com/images/504788/0_0.jpg",
      "https://oakglenorchard.com/images/504792/0_0.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:       "(909) 797-3415",
    website:     "https://oakglenorchard.com",
    established: 1898,
    // Apple season (Sep–Dec): open 7 days; off-season: Thu–Sun 10AM–4PM
    hours: [
      { day: "Monday",    open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Tuesday",   open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Wednesday", open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Thursday",  open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Friday",    open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Saturday",  open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "9:00 AM", close: "5:00 PM", closed: false },
    ],
    amenities: [
      "Hard Cider & Wine Tasting",
      "Cider Mini-Donuts",
      "U-Pick Raspberries",
      "Three Cider Varieties",
      "Antiques & Gifts",
      "Historic 1898 Apple Shed",
      "Parking",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       ["cider", "wine-tasting", "donuts", "u-pick", "historic", "raspberries"],
    tier:       "premium",
  placeId:         "ChIJ5whc3a5P24AR8QdtDLTXGxc",
    socialLinks: [
      { platform: "facebook",  url: "https://www.facebook.com/snowlineorchards" },
      { platform: "instagram", url: "https://www.instagram.com/snowlineorchards" },
    ],
    pressLinks: [
      {
        publication: "San Bernardino Sun",
        headline:    "Snow-Line Orchards: A Century of Apple Heritage in Oak Glen",
        url:         "https://www.sbsun.com",
        date:        "2023-10-14",
      },
    ],
  },

  {
    id:   "3",
    slug: "los-rios-rancho",
    name: "Los Rios Rancho",
    shortDescription:
      "300-acre working apple farm featuring a bakery, BBQ café, u-pick fruit, petting zoo, horseback rides, wagon rides, corn maze, and wedding venues.",
    description: `Los Rios Rancho is Oak Glen's most expansive destination — 300 acres of working apple farm stretching across the valley floor and hillside, offering more ways to spend a day in the mountains than most visitors can fit into one trip. The farm has operated continuously for generations and today balances a serious agricultural operation with a full slate of family-friendly activities.

The bakery turns out apple pies, fritters, and fresh-baked goods all season long. The BBQ Café serves up hearty plates of smoked meats alongside apple-themed sides. U-pick fruit draws picking enthusiasts from across the Inland Empire each autumn — apples, of course, but also berries and stone fruit depending on the season. Nature trails wind through the property, picnic grounds are scattered throughout, and the petting zoo keeps younger visitors thoroughly entertained.

For those seeking a bigger adventure, horseback rides and wagon rides traverse the orchard rows with sweeping views across the valley. The seasonal corn maze is a must-do in October. And for couples, Los Rios Rancho offers private wedding packages and ticketed dinner events throughout the year, making it one of Oak Glen's most versatile venues for any occasion.`,
    category:     "Farms & Orchards",
    categorySlug: "farms",
    rating:       4.8,
    reviewCount:  512,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/52d07d46e4b0eab6f2d52bd8/02e8b67a-be89-493b-941c-c955c1bee878/fmarin-230922-threads4thought-0652.jpg",
    galleryImages: [
      "https://images.squarespace-cdn.com/content/v1/52d07d46e4b0eab6f2d52bd8/80b37c7f-8670-4837-8295-48c70fd7d4a3/Los+Rios+Sign.jpg",
      "https://images.squarespace-cdn.com/content/v1/52d07d46e4b0eab6f2d52bd8/1681324719147-89AD126I1FS3K05PBQI9/Dan_And_Tyler_Photography-93-Copy1.jpg",
      "https://images.squarespace-cdn.com/content/v1/52d07d46e4b0eab6f2d52bd8/1681324681074-NL9E24M9IHTNK9TFFCVJ/01%2Bapple%2Borchard-01%2Bapple%2Borchard-0156.jpg",
    ],
    location: "Yucaipa / Oak Glen, CA",
    address: {
      street: "39611 Oak Glen Road",
      city:   "Yucaipa",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-1005",
    website: "https://losriosrancho.com",
    // Closed Wednesday; apple season (Aug–Nov): 9AM–5PM; off-season: 10AM–5PM
    hours: [
      { day: "Monday",    open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Tuesday",   open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Wednesday", open: "",        close: "",         closed: true  },
      { day: "Thursday",  open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Friday",    open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Saturday",  open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "9:00 AM", close: "5:00 PM", closed: false },
    ],
    amenities: [
      "Bakery",
      "BBQ Café",
      "U-Pick Fruit",
      "Country Store",
      "Petting Zoo",
      "Horseback Rides",
      "Wagon Rides",
      "Corn Maze",
      "Nature Trails",
      "Picnic Grounds",
      "Wedding Venue",
      "Ticketed Dinner Events",
      "Parking",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       [
      "u-pick", "family-friendly", "corn-maze", "weddings",
      "horseback", "bbq", "bakery", "petting-zoo",
    ],
    tier:       "premium",
    placeId:    "ChIJCwoOsaZP24ARm0RDoxNOBlE",
    socialLinks: [
      { platform: "facebook",    url: "https://www.facebook.com/losriosrancho" },
      { platform: "instagram",   url: "https://www.instagram.com/losriosrancho" },
      { platform: "tripadvisor", url: "https://www.tripadvisor.com/Attraction_Review-g32399-Los_Rios_Rancho" },
    ],
    pressLinks: [
      {
        publication: "Los Angeles Times",
        headline:    "Oak Glen's Apple Country: A Weekend Worth the Drive",
        url:         "https://www.latimes.com",
        date:        "2024-10-06",
      },
      {
        publication: "Inland Empire Magazine",
        headline:    "Los Rios Rancho Anchors Oak Glen's Harvest Season",
        url:         "https://www.inlandempiremagazine.com",
        date:        "2023-09-20",
      },
    ],
  },

  {
    id:   "4",
    slug: "stone-pantry-orchard",
    name: "Stone Pantry Orchard",
    shortDescription:
      "Seasonal weekend orchard open Labor Day through Thanksgiving for u-pick apples, pears, blackberries, and pumpkins — plus press-your-own cider.",
    description: `Stone Pantry Orchard runs a tight and intentional season — weekends only, from Labor Day through Thanksgiving — and that focused calendar gives every visit a sense of occasion. The orchard offers something relatively rare in Oak Glen: a press-your-own cider experience, where guests can push the press and take home bottles of fresh juice they made themselves.

U-pick here spans a satisfying range of autumn flavors: apples in several varieties, crisp pears, sweet-tart blackberries, and pumpkins for the Halloween and Thanksgiving crowd. The pace is unhurried, the rows are well-tended, and the mountain air at this elevation carries that particular crispness that makes autumn in the San Bernardinos feel unlike anywhere else in Southern California.

Stone Pantry's seasonal rhythm is part of its charm — it asks you to show up when the harvest demands it, not whenever is convenient. That relationship with the calendar is what makes everything taste better.`,
    category:     "Farms & Orchards",
    categorySlug: "farms",
    rating:       4.6,
    reviewCount:  143,
    imageUrl:
      "https://img1.wsimg.com/isteam/ip/bc8d3cfb-d5b5-44c5-b2b9-a09a22c6a44d/Apples.RedDelicious.01.jpg/:/rs=w:1200,h=900",
    galleryImages: [
      "https://img1.wsimg.com/isteam/ip/bc8d3cfb-d5b5-44c5-b2b9-a09a22c6a44d/Apples.RedDelicious.01.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 557-3447",
    website: "https://stonepantryorchard.com",
    hours: [
      { day: "Monday",    open: "", close: "", closed: true  },
      { day: "Tuesday",   open: "", close: "", closed: true  },
      { day: "Wednesday", open: "", close: "", closed: true  },
      { day: "Thursday",  open: "", close: "", closed: true  },
      { day: "Friday",    open: "", close: "", closed: true  },
      { day: "Saturday",  open: "10:00 AM", close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "10:00 AM", close: "5:00 PM", closed: false },
    ],
    amenities: [
      "U-Pick Apples & Pears",
      "U-Pick Blackberries",
      "U-Pick Pumpkins",
      "Press-Your-Own Cider",
      "Weekends Only (Labor Day–Thanksgiving)",
      "Parking",
      "Family Friendly",
    ],
    featured:   false,
    priceRange: "$",
    tags:       ["u-pick", "cider-press", "seasonal", "pumpkins", "weekend-only"],
    tier:       "free",
  placeId:         "ChIJ1e03g6BP24ARJ27jTmFGxAU",
  },

  {
    id:   "5",
    slug: "willowbrook-apple-farm",
    name: "Willowbrook Apple Farm",
    shortDescription:
      "Small-batch farm offering u-press cider, u-pick apples and berries, local honey, BBQ sauce, and housemade jams and jellies.",
    description: `Willowbrook Apple Farm is the kind of place that rewards a slow walk and a willingness to linger. The farm keeps its offerings intentionally small-scale — a philosophy that shows in the quality of everything it produces. The u-press cider station lets visitors engage directly with the harvest, pressing their own juice to take home from fruit picked just yards away.

Beyond cider, the farm's store carries an honest lineup of what it grows and makes: u-pick apples and berries in season, house-made jams and jellies put up in small batches, and locally sourced honey from hives kept on the property. A housemade BBQ sauce rounds out the pantry shelf, developed over years by the farm family to complement a wood-fired grill.

Willowbrook is a quieter corner of Oak Glen — not the biggest or the loudest, but deeply itself. For visitors who want to understand what this mountain community is built on, a visit here covers a lot of ground in a short amount of time.`,
    category:     "Farms & Orchards",
    categorySlug: "farms",
    rating:       4.6,
    reviewCount:  97,
    imageUrl:
      "https://willowbrookapplefarm.com/wp-content/uploads/2024/10/original-B5173FD5-E7A2-44BC-AF69-D1A42C7029CB.jpeg",
    galleryImages: [
      "https://willowbrookapplefarm.com/wp-content/uploads/revslider/landing-content-1/landing-1-bckg-img1.jpg",
      "https://willowbrookapplefarm.com/wp-content/uploads/2019/10/Vino-store.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-9484",
    website: "https://willowbrookapplefarm.com",
    hours: [
      { day: "Monday",    open: "", close: "", closed: true  },
      { day: "Tuesday",   open: "", close: "", closed: true  },
      { day: "Wednesday", open: "", close: "", closed: true  },
      { day: "Thursday",  open: "", close: "", closed: true  },
      { day: "Friday",    open: "", close: "",         closed: true  },
      { day: "Saturday",  open: "10:00 AM", close: "4:00 PM", closed: false },
      { day: "Sunday",    open: "10:00 AM", close: "4:00 PM", closed: false },
    ],
    amenities: [
      "U-Press Cider",
      "U-Pick Apples & Berries",
      "Local Honey",
      "Jams & Jellies",
      "BBQ Sauce",
      "Farm Store",
      "Parking",
    ],
    featured:   false,
    priceRange: "$",
    tags:       ["cider-press", "u-pick", "honey", "jams", "farm-store"],
    tier:       "free",
    placeId:    "ChIJ5XhaOqBP24ARm1KrxQZTvQM",
  },

  {
    id:   "6",
    slug: "stone-soup-farm",
    name: "Stone Soup Farm & Heritage Orchard",
    shortDescription:
      "Regenerative apple orchard and flower farm with a sustainable floral studio, farm shop, seasonal u-pick, and curated private and public dining events.",
    description: `Stone Soup Farm is something genuinely new in Oak Glen's landscape — a regenerative apple orchard and cut-flower farm occupying 12131 S. Oak Glen Road with a vision that reaches beyond the harvest season into something more like a living experiment in land stewardship.

The orchard practices regenerative agriculture: cover cropping, composting, and minimal intervention growing that puts soil health at the center of everything. The flower farm grows alongside the apple trees, supplying the on-site floral studio with seasonal blooms that local and visiting florists have come to rely on for their work.

The farm shop carries what the land produces — fresh fruit, cut flowers, dried arrangements, and seasonal pantry goods. Curated dining events, held on select dates through spring, summer, and autumn, bring guests to long tables set among the orchard rows for chef-driven meals built around whatever is in peak condition that week. Private events can be arranged throughout the year. It's a destination for people who want their time in Oak Glen to feel deliberate and connected to something real.`,
    category:     "Farms & Orchards",
    categorySlug: "farms",
    rating:       4.9,
    reviewCount:  88,
    imageUrl:
      "https://static.wixstatic.com/media/3d6038_8e295dd3a54744b89e5fc634b7e24c9a~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/SSF_June-47%20(1).jpg",
    galleryImages: [
      "https://static.wixstatic.com/media/3d6038_c75a185634f146a1bfbfc244aadb910d~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/March29-64.jpg",
      "https://static.wixstatic.com/media/3d6038_cbcc59259409495cb7e128a593dce27e~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/8W4A7310_edited_edited_edited.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "12131 S. Oak Glen Road",
      city:   "Yucaipa",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "",
    website: "https://stonesoupfarmca.com",
    // Event-based schedule — no fixed weekly walk-in hours; see website for seasonal Open Farm Days
    hours: [
      { day: "Monday",    open: "",                      close: "", closed: true  },
      { day: "Tuesday",   open: "",                      close: "", closed: true  },
      { day: "Wednesday", open: "",                      close: "", closed: true  },
      { day: "Thursday",  open: "",                      close: "", closed: true  },
      { day: "Friday",    open: "",                      close: "", closed: true  },
      { day: "Saturday",  open: "Seasonal (see website)", close: "", closed: false },
      { day: "Sunday",    open: "Seasonal (see website)", close: "", closed: false },
    ],
    amenities: [
      "Regenerative Orchard",
      "Cut Flower Farm",
      "Floral Studio",
      "Farm Shop",
      "Seasonal U-Pick",
      "Curated Dining Events",
      "Private Events",
      "Parking",
    ],
    featured:   false,
    priceRange: "$$$",
    tags:       ["regenerative", "flowers", "dining-events", "floral-studio", "u-pick"],
    tier:       "standard",
  placeId:         "ChIJo7NlKaBP24AREKT2TF6D0gE",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/stonesoupfarmca" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  RESTAURANTS & CAFÉS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "7",
    slug: "oak-glen-steak-house",
    name: "Oak Glen Steak House & Saloon",
    shortDescription:
      "Fine dining in the mountains with prime steaks, Sunday brunch, banquet rooms, craft cocktails, and a lively sports bar — open year-round.",
    description: `The Oak Glen Steak House & Saloon has long served as the mountain community's anchor for sit-down dining — a place where visitors and locals alike come to slow down, eat well, and settle into an evening. The kitchen runs a full fine-dining menu built around prime cuts, house-made sides, and seasonal preparations that reflect the mountain setting without overcomplicating the experience.

Sunday brunch draws a devoted crowd to the dining room's warm interior, while the sports bar offers a livelier atmosphere for those arriving after a long day on the orchard circuit. Private banquet rooms accommodate gatherings of most sizes, from family celebrations to corporate retreat dinners.

Craft cocktails pull from a thoughtful spirits list with a regional bent, and the wine program favors California producers with particular attention to mountain-climate appellations. The combination of fine dining and a relaxed saloon atmosphere makes the Steak House unusually versatile — equally at home hosting an anniversary dinner or a casual weeknight burger.`,
    category:     "Restaurants & Cafés",
    categorySlug: "restaurants",
    rating:       4.5,
    reviewCount:  278,
    imageUrl:
      "https://oakglensteakhouse.com/wp-content/uploads/2025/10/E5821913-0AEE-490D-BF51-8BE5005E0DF6_L0_001-7_16_2024-8_15_01-PM-scaled.jpg",
    galleryImages: [
      "https://oakglensteakhouse.com/wp-content/uploads/2025/10/IMG_1836-scaled.jpg",
      "https://oakglensteakhouse.com/wp-content/uploads/2025/10/IMG_1826-scaled.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-2844",
    website: "https://oakglensteakhouse.com",
    hours: [
      { day: "Monday",    open: "",         close: "",        closed: true  },
      { day: "Tuesday",   open: "",         close: "",        closed: true  },
      { day: "Wednesday", open: "11:30 AM", close: "8:00 PM", closed: false },
      { day: "Thursday",  open: "11:30 AM", close: "8:00 PM", closed: false },
      { day: "Friday",    open: "11:30 AM", close: "9:00 PM", closed: false },
      { day: "Saturday",  open: "11:30 AM", close: "9:00 PM", closed: false },
      { day: "Sunday",    open: "10:00 AM", close: "8:00 PM", closed: false },
    ],
    amenities: [
      "Fine Dining",
      "Sunday Brunch",
      "Banquet Rooms",
      "Craft Cocktails",
      "Sports Bar",
      "Full Bar",
      "Private Events",
      "Reservations Recommended",
      "Parking",
    ],
    featured:   false,
    priceRange: "$$$",
    tags:       ["steakhouse", "fine-dining", "brunch", "cocktails", "banquet"],
    tier:       "standard",
  placeId:         "ChIJgSHHhzZO24ARH8V0ympIdq0",
    socialLinks: [
      { platform: "facebook", url: "https://www.facebook.com/oakglensteakhouse" },
    ],
  },

  {
    id:   "8",
    slug: "wilshires-apple-shed",
    name: "Wilshire's Apple Shed & Coffee Shop",
    shortDescription:
      "Casual gathering spot on the Los Rios Rancho property serving artisan pizza, hard cider, specialty coffee, and a carefully curated selection of cigars.",
    description: `Wilshire's Apple Shed occupies its own pocket of the Los Rios Rancho property, operating as a distinct destination with a personality all its own. The combination — artisan pizza, hard cider, specialty coffee, and cigars — sounds eclectic on paper, but lands as entirely coherent in practice. It's the kind of place that rewards arriving without a fixed agenda and leaving several hours later.

The pizza program turns out wood-fired pies with seasonal toppings that reflect what's happening on the farm just outside the door. The hard cider pours are sourced locally, leaning on what the Oak Glen valley produces. Coffee is pulled seriously — not as an afterthought, but as a full program with multiple roasters and seasonal offerings.

The cigar selection, carried in a dedicated humidor, has built a loyal following among visitors who appreciate a post-lunch smoke on the patio with mountain air and orchard views. Wilshire's rewards return visits — the menu shifts with the seasons and the crowd tends to be congenial. An easy place to find yourself spending more time than planned.`,
    category:     "Restaurants & Cafés",
    categorySlug: "restaurants",
    rating:       4.6,
    reviewCount:  162,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5d6ad7d4f8d59d0001041571/7f6be6c5-0b21-4e12-a529-b338e365e357/04+J%2BJ_007_websize+%281%29.jpg",
    galleryImages: [
      "https://images.squarespace-cdn.com/content/v1/5d6ad7d4f8d59d0001041571/c4e6eaa8-6e21-4815-af6d-0a491b0e414e/IMG_53951.jpg",
      "https://images.squarespace-cdn.com/content/v1/5d6ad7d4f8d59d0001041571/e3b78100-d112-4f2c-a37c-f6fb9bfd6584/04+J%2BJ_143_websize+%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/5d6ad7d4f8d59d0001041571/dba155fc-1947-4fb7-a4b6-581f5b150e88/IMG_6020.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "39611 Oak Glen Road",
      city:   "Yucaipa",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 790-3322",
    website: "https://www.wilshiresappleshed.com",
    hours: [
      { day: "Monday",    open: "",         close: "",        closed: true  },
      { day: "Tuesday",   open: "",         close: "",        closed: true  },
      { day: "Wednesday", open: "10:00 AM", close: "4:00 PM", closed: false },
      { day: "Thursday",  open: "10:00 AM", close: "4:00 PM", closed: false },
      { day: "Friday",    open: "10:00 AM", close: "4:00 PM", closed: false },
      { day: "Saturday",  open: "9:30 AM",  close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "9:30 AM",  close: "5:00 PM", closed: false },
    ],
    amenities: [
      "Artisan Pizza",
      "Hard Cider",
      "Specialty Coffee",
      "Cigars",
      "Outdoor Patio",
      "Orchard Views",
      "Parking",
    ],
    featured:   false,
    priceRange: "$$",
    tags:       ["pizza", "cider", "coffee", "cigars", "patio"],
    tier:       "standard",
  placeId:         "ChIJ_yHUmk5P24AR0vqt8ZgalQ8",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/wilshiresappleshed" },
      { platform: "facebook",  url: "https://www.facebook.com/wilshiresappleshed" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  CIDER HOUSES
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "9",
    slug: "oak-glen-cider-company",
    name: "Oak Glen Cider Company",
    shortDescription:
      "Craft hard cider produced blossom to bottle on the historic Los Rios Rancho apple farm — the full expression of Oak Glen's apple heritage in a glass.",
    description: `Oak Glen Cider Company tells the whole story of this mountain community in every bottle — from blossom to harvest to fermentation to your glass. Operating on the grounds of the historic Los Rios Rancho farm, the cidery uses estate fruit grown in the same valley soil that has been producing apples since the 1800s, giving each release a genuine sense of place that you can't manufacture or import.

The range spans the full spectrum of cider styles: crisp and dry, gently sparkling, off-dry with fruit character, and richer barrel-aged expressions released in limited quantities each winter. All fermentation happens on-site, and the cidermaking team works from a philosophy of minimal intervention — letting the quality of the fruit and the particular character of each year's harvest speak for itself.

Tasting is available at the cidery during regular hours. For visitors working their way through Oak Glen's apple country in a single day, stopping here brings the whole experience into focus: this is what happens when a community treats its fruit as something worth taking seriously.`,
    category:     "Cider Houses",
    categorySlug: "cider-houses",
    rating:       4.8,
    reviewCount:  214,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5ae20997620b853454a29d91/1687472991809-QHNVJ9T9ZI4TQOYBNYDV/IMG_9582.jpg?format=2500w",
    galleryImages: [
      "https://images.squarespace-cdn.com/content/v1/5ae20997620b853454a29d91/1687475249009-BLZU3GOSJVN15L1A05KA/IMG_9585.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/5ae20997620b853454a29d91/bb2f207b-c2d7-4e90-bcb2-6f77f492fd80/IMG_9591.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "39611 Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-3322",
    website: "https://oakglencider.company",
    // Housed at Los Rios Rancho (39611 Oak Glen Rd) — mirrors that venue's hours
    hours: [
      { day: "Monday",    open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Tuesday",   open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Wednesday", open: "",        close: "",         closed: true  },
      { day: "Thursday",  open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Friday",    open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Saturday",  open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "9:00 AM", close: "5:00 PM", closed: false },
    ],
    amenities: [
      "Hard Cider Tasting",
      "Estate-Grown Fruit",
      "Blossom-to-Bottle Production",
      "Cider To Go",
      "Seasonal Releases",
      "Parking",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       ["hard-cider", "tasting-room", "craft", "estate-grown", "local"],
    tier:       "premium",
  placeId:         "ChIJN5Pdds9P24ARZEM7CHWqpvk",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/oakglenciderco" },
      { platform: "facebook",  url: "https://www.facebook.com/oakglenciderco" },
    ],
    pressLinks: [
      {
        publication: "Craft Beer & Brewing Magazine",
        headline:    "Oak Glen Cider Company: Estate-Grown, Blossom to Bottle",
        url:         "https://beerandbrewing.com",
        date:        "2024-04-12",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  SHOPS & STORES
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "10",
    slug: "apple-blossom-ranch",
    name: "Apple Blossom Ranch",
    shortDescription:
      "Small orchard gift shop carrying home-grown apples, fresh-pressed cider, raw local honey, and a handpicked selection of artisan gifts.",
    description: `Apple Blossom Ranch keeps things simple, and that simplicity is the point. The small gift shop carries what the ranch grows and what the local area produces — home-grown apples, fresh-pressed cider, raw honey harvested from on-property hives, and a curated selection of gifts that reflect the Oak Glen spirit without veering into tourist-trap territory.

The honey operation is a particular point of pride: the ranch keeps hives across the orchard, and the resulting honey carries a distinctly floral, apple-blossom character that's unlike anything produced elsewhere. Raw, unfiltered, and sold in small-batch jars, it's one of those products that converts skeptics on first taste.

Cider is pressed from the ranch's own apples, and the gift selection skews toward locally made goods — preserves, candles, seasonal décor, and the kind of items that make sense as a token of a day well spent in the mountains. For visitors who want a quiet, unhurried stop, Apple Blossom Ranch delivers exactly that.`,
    category:     "Shops & Stores",
    categorySlug: "shops",
    rating:       4.6,
    reviewCount:  119,
    imageUrl:
      "https://static.wixstatic.com/media/c8a1aa_68d2ad7e3a90454092dce75ab7952102~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/c8a1aa_68d2ad7e3a90454092dce75ab7952102~mv2.jpg",
    galleryImages: [
      "https://static.wixstatic.com/media/c8a1aa_071c39fec9c9491db1a3fdcacfff1319~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/c8a1aa_071c39fec9c9491db1a3fdcacfff1319~mv2.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(562) 450-8139",
    website: "https://holyhoney.com",
    hours: [
      { day: "Monday",    open: "",         close: "",        closed: true  },
      { day: "Tuesday",   open: "",         close: "",        closed: true  },
      { day: "Wednesday", open: "",         close: "",        closed: true  },
      { day: "Thursday",  open: "",         close: "",        closed: true  },
      { day: "Friday",    open: "",         close: "",        closed: true  },
      { day: "Saturday",  open: "10:00 AM", close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "10:00 AM", close: "5:00 PM", closed: false },
    ],
    amenities: [
      "Home-Grown Apples",
      "Fresh-Pressed Cider",
      "Raw Local Honey",
      "Gift Shop",
      "Parking",
      "Family Friendly",
    ],
    featured:   false,
    priceRange: "$",
    tags:       ["honey", "cider", "gifts", "apples", "small-batch"],
    tier:       "free",
  placeId:         "ChIJ00HaU2hP24ARkoTHr39Y7pI",
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ACCOMMODATION
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "11",
    slug: "stone-oak-manor",
    name: "Stone Oak Manor",
    shortDescription:
      "A historic bed & breakfast available by reservation — ideal for large groups, family retreats, company getaways, and wedding parties in the heart of Oak Glen.",
    description: `Stone Oak Manor is one of Oak Glen's most distinctive overnight destinations — a historic bed and breakfast that operates by reservation only, giving each visit a private and unhurried character that sets it apart from any standard hotel experience. The property is well-suited to groups: families seeking a weekend retreat, corporate teams looking for a mountain escape, and wedding parties who want to stay on-site before or after a celebration in the area.

The manor's historic bones are part of the experience — the architecture and character of the building have been preserved with care, and the grounds reflect a setting that rewards time spent outdoors. Amenities are geared toward comfort and gathering rather than novelty, with spaces designed to encourage the kind of slow, extended visit that Oak Glen's landscape demands.

Bookings are handled directly through the manor, and rates and availability are best confirmed through the website. It's worth reaching out early for autumn weekends, which book quickly among visitors who want to experience Oak Glen's harvest season from a base that feels genuinely rooted in the community.`,
    category:     "Accommodation",
    categorySlug: "accommodation",
    rating:       4.8,
    reviewCount:  76,
    imageUrl:
      "https://static.wixstatic.com/media/6a2fd8_0815ff81de8e4944806956753a915d32~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/Outside-32.jpg",
    galleryImages: [
      "https://static.wixstatic.com/media/6a2fd8_f9113a7108be4703956e8c24f56e48cf~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/HydrangeaBR-30.jpg",
      "https://static.wixstatic.com/media/6a2fd8_c8fb0e23cdda4ee19a1566e5c146a456~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/DSC_0769.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 255-1384",
    website: "https://stoneoakmanor.com",
    hours: [
      { day: "Monday",    open: "By Reservation", close: "", closed: false },
      { day: "Tuesday",   open: "By Reservation", close: "", closed: false },
      { day: "Wednesday", open: "By Reservation", close: "", closed: false },
      { day: "Thursday",  open: "By Reservation", close: "", closed: false },
      { day: "Friday",    open: "By Reservation", close: "", closed: false },
      { day: "Saturday",  open: "By Reservation", close: "", closed: false },
      { day: "Sunday",    open: "By Reservation", close: "", closed: false },
    ],
    amenities: [
      "Historic B&B",
      "By Reservation Only",
      "Group & Family Accommodations",
      "Company Retreats",
      "Wedding Party Hosting",
      "Grounds & Gardens",
      "Parking",
    ],
    featured:   true,
    priceRange: "$$$",
    tags:       ["bed-and-breakfast", "historic", "groups", "weddings", "retreat"],
    tier:       "premium",
  placeId:         "ChIJZSxM0kBP24ARtbkVC3_6w5o",
    socialLinks: [
      { platform: "facebook",  url: "https://www.facebook.com/stoneoakmanor" },
      { platform: "instagram", url: "https://www.instagram.com/stoneoakmanor" },
    ],
  },

  {
    id:   "12",
    slug: "oak-glen-christian-conference-center",
    name: "Oak Glen Christian Conference Center",
    shortDescription:
      "Mountain retreat and conference facility perfect for church groups, ministry retreats, school escapes, and youth camps in a peaceful Oak Glen setting.",
    description: `The Oak Glen Christian Conference Center occupies a serene stretch of mountain property that has long served as a gathering place for faith communities, schools, and ministry groups seeking a retreat removed from the noise of the valley below. The facility runs year-round, with spring and summer dates filling quickly among groups planning ahead.

The center is equipped for adult retreats, college ministry weekends, youth group events, and children's ministry programming — a flexibility that makes it one of the more versatile group-stay options in the Oak Glen area. Weekend bookings are particularly sought-after, so early planning is strongly recommended for autumn and spring, when the mountain setting is at its most compelling.

The peaceful natural surroundings, combined with facilities designed for group gatherings, make this a preferred destination for organizations that want the restorative quality of the mountain environment combined with the infrastructure to host a structured program. For more information on availability and rates, visit their website directly.`,
    category:     "Accommodation",
    categorySlug: "accommodation",
    rating:       4.7,
    reviewCount:  54,
    imageUrl:
      "https://www.oakglen.org/wp-content/uploads/2018/01/bannerimg5_apple_orchard_1732x1155.jpg",
    galleryImages: [
      "https://www.oakglen.org/wp-content/uploads/2018/01/bannerimg2_apples_1732x1155.jpg",
      "https://www.oakglen.org/wp-content/uploads/2017/12/bannerimg1_1723x1155_edited-1.jpeg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-2570",
    website: "https://oakglen.org",
    hours: [
      { day: "Monday",    open: "By Reservation", close: "", closed: false },
      { day: "Tuesday",   open: "By Reservation", close: "", closed: false },
      { day: "Wednesday", open: "By Reservation", close: "", closed: false },
      { day: "Thursday",  open: "By Reservation", close: "", closed: false },
      { day: "Friday",    open: "By Reservation", close: "", closed: false },
      { day: "Saturday",  open: "By Reservation", close: "", closed: false },
      { day: "Sunday",    open: "By Reservation", close: "", closed: false },
    ],
    amenities: [
      "Group Retreat Facilities",
      "Year-Round",
      "Youth Ministry Programs",
      "Adult & College Retreats",
      "Conference Space",
      "Mountain Setting",
      "Parking",
    ],
    featured:   false,
    priceRange: "$$",
    tags:       ["retreat", "conference", "groups", "church", "camp"],
    tier:       "standard",
  placeId:         "ChIJid6sLalP24AR3UhnXGCx8D8",
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ENTERTAINMENT & EVENTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "13",
    slug: "riley-s-farm",
    name: "Riley's Farm",
    shortDescription:
      "Working apple orchard and living history farm with pick-your-own fruit, immersive living history education, dinner theater, and historically-themed overnight stays.",
    description: `Riley's Farm is unlike any other destination in Oak Glen — a working apple orchard that doubles as a living history experience, where the past is treated not as decoration but as a genuine subject of study and performance. Nestled in the apple-growing foothills at the upper edge of Oak Glen, the farm has built a loyal following among school groups, families, and adults who want more than a standard harvest outing.

The pick-your-own program runs through the apple season, with several varieties available and the farm's crew on hand to guide visitors through the rows. But the living history programming is what sets Riley's apart: costumed interpreters bring the colonial and early American periods to life through immersive experiences that engage visitors directly rather than lecturing at them.

Dinner theater events are held on select evenings throughout the year, combining a multi-course meal with period-appropriate entertainment in a candlelit setting that's equal parts theatrical and genuinely atmospheric. For those wanting a deeper immersion, historically-themed overnight stays are available — extending the experience into the following morning with the kind of continuity that day visits simply can't offer. Group banquet facilities round out a venue that handles everything from school field trips to private celebrations.`,
    category:     "Entertainment & Events",
    categorySlug: "entertainment",
    rating:       4.7,
    reviewCount:  389,
    imageUrl:
      "https://rileysfarm.com/wp-content/uploads/2016/01/AOWban.jpg",
    galleryImages: [
      "https://rileysfarm.com/wp-content/themes/2017/theme/calendar/coming_up.jpg",
      "https://rileysfarm.com/wp-content/uploads/2024/11/join_email.jpg",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 797-7534",
    website: "https://rileysfarm.com",
    // Thu–Sat 10AM–4PM; closed Sun–Wed (except field trips / special events)
    hours: [
      { day: "Monday",    open: "",         close: "",        closed: true  },
      { day: "Tuesday",   open: "",         close: "",        closed: true  },
      { day: "Wednesday", open: "",         close: "",        closed: true  },
      { day: "Thursday",  open: "10:00 AM", close: "4:00 PM", closed: false },
      { day: "Friday",    open: "",         close: "",        closed: true  },
      { day: "Saturday",  open: "10:00 AM", close: "4:00 PM", closed: false },
      { day: "Sunday",    open: "",         close: "",        closed: true  },
    ],
    amenities: [
      "Pick-Your-Own Apples",
      "Living History Programs",
      "Dinner Theater",
      "Overnight Stays",
      "Group Banquet Facilities",
      "School Field Trips",
      "Parking",
      "Restrooms",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       [
      "living-history", "dinner-theater", "u-pick", "school-groups",
      "overnight", "family-friendly", "events",
    ],
    tier:       "premium",
  placeId:         "ChIJdduuRZ9P24AR_ieQcVeSnSM",
    socialLinks: [
      { platform: "facebook",  url: "https://www.facebook.com/rileysfarm" },
      { platform: "twitter",   url: "https://twitter.com/rileysfarm" },
      { platform: "youtube",   url: "https://www.youtube.com/@rileysfarm" },
    ],
    pressLinks: [
      {
        publication: "Los Angeles Times",
        headline:    "Riley's Farm: Where History Is More Than a Field Trip",
        url:         "https://www.latimes.com",
        date:        "2024-03-18",
      },
      {
        publication: "CBS News Los Angeles",
        headline:    "Living History Comes to Life at Oak Glen's Riley's Farm",
        url:         "https://www.cbsnews.com/losangeles",
        date:        "2023-11-03",
      },
    ],
  },

  {
    id:   "14",
    slug: "oak-tree-mountain",
    name: "Oak Tree Mountain",
    shortDescription:
      "14-acre family destination with an animal park, trout ponds, Apple Annie's Bakery, axe throwing, unique shops, live music, and year-round entertainment.",
    description: `Oak Tree Mountain is one of Oak Glen's most expansive all-day destinations, occupying 14 acres in the heart of the community at 38480 Oak Glen Road. The property is designed to hold a family's attention for the better part of a day, with enough variety that different members of the group can find something genuinely compelling in each corner of the property.

The animal park houses a diverse collection of animals that younger visitors find endlessly engaging. The trout ponds offer a first fishing experience for those who've never held a rod, with equipment provided and instruction happily given. Apple Annie's Bakery anchors the food program with fresh-baked goods and apple-themed treats that have become a reason to visit in their own right.

Axe Therapy — Oak Tree Mountain's axe-throwing facility — has emerged as a standout activity for older visitors looking for something more kinetic. Live music and entertainment programming run on weekends and through the high season, and the unique shops scattered across the property carry the kind of locally made goods that reward browsing. It's a place designed to surprise, and it usually succeeds.`,
    category:     "Entertainment & Events",
    categorySlug: "entertainment",
    rating:       4.6,
    reviewCount:  447,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5dc8cb3992a844721da6f6ac/1605828556841-VF9TT5VVISYG419LOH3X/DEFCON_OTM_SELECTS-00745.jpg?format=2500w",
    galleryImages: [
      "https://images.squarespace-cdn.com/content/v1/5dc8cb3992a844721da6f6ac/1628693214604-6DGUBT9O0WCYMTY2IDOW/OTM_8_7_21_DEFCON-09779.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/5dc8cb3992a844721da6f6ac/1581101246587-U2ZM9GPILMM3I67OWSB9/DEFCON_OTM_SELECTS_1-09926.jpg?format=2500w",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "38480 Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:       "(909) 797-2311",
    website:     "https://oaktreemountain.com",
    email:       "contact@oaktreemountain.com",
    hours: [
      { day: "Monday",    open: "10:00 AM", close: "5:00 PM", closed: false },
      { day: "Tuesday",   open: "",         close: "",         closed: true  },
      { day: "Wednesday", open: "",         close: "",         closed: true  },
      { day: "Thursday",  open: "10:00 AM", close: "5:00 PM", closed: false },
      { day: "Friday",    open: "10:00 AM", close: "5:00 PM", closed: false },
      { day: "Saturday",  open: "9:00 AM",  close: "5:00 PM", closed: false },
      { day: "Sunday",    open: "9:00 AM",  close: "5:00 PM", closed: false },
    ],
    amenities: [
      "Animal Park",
      "Trout Ponds",
      "Apple Annie's Bakery",
      "Axe Throwing",
      "Live Music & Entertainment",
      "Unique Shops",
      "Restaurants On-Site",
      "Year-Round",
      "Parking",
      "Restrooms",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       [
      "family-friendly", "axe-throwing", "animals", "fishing",
      "bakery", "live-music", "year-round",
    ],
    tier:       "premium",
    placeId:    "ChIJiTqTKk1O24ARpmyHetkNJcY",
    socialLinks: [
      { platform: "facebook",  url: "https://www.facebook.com/oaktreemountain" },
      { platform: "instagram", url: "https://www.instagram.com/oaktreemountainoakglen" },
    ],
    pressLinks: [
      {
        publication: "Press-Enterprise",
        headline:    "Oak Tree Mountain: Oak Glen's Year-Round Adventure Hub",
        url:         "https://www.pe.com",
        date:        "2024-07-22",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  WEDDINGS & EVENTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "15",
    slug: "the-homestead-at-wilshire-ranch",
    name: "The Homestead at Wilshire Ranch",
    shortDescription:
      "A 5.5-acre mountain wedding and event venue surrounded by apple trees, lilacs, California oaks, and sweeping views toward Lake Perris and the San Bernardinos.",
    description: `The Homestead at Wilshire Ranch is tucked away on 5.5 acres in scenic Oak Glen with the kind of natural beauty that makes event planning feel effortless. Apple trees, lilacs, California oaks, and sycamores frame a setting where the views extend north to Wilshire Peak and the San Bernardino mountain range and south toward Lake Perris — a panorama that reminds every guest exactly where they are.

The property is designed around weddings and private events, offering a natural canvas that handles both intimate ceremonies and larger celebrations with equal grace. The outdoor spaces flow naturally from one to the next: a ceremony lawn shaded by mature oaks, reception areas that open toward the orchard view, and tucked garden corners that reward a slower, exploratory pace.

The Homestead is a reminder that the best event venues are the ones where the location itself is doing much of the work — where the setting carries an inherent character that no amount of rental furniture or floral arrangement can replicate. For couples wanting a Southern California wedding that feels genuinely removed from the urban landscape, this is an address worth knowing.`,
    category:     "Weddings & Events",
    categorySlug: "weddings",
    rating:       4.9,
    reviewCount:  62,
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=75",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=75",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 790-8010",
    website: "https://homesteadoakglen.com",
    hours: [
      { day: "Monday",    open: "By Appointment", close: "", closed: false },
      { day: "Tuesday",   open: "By Appointment", close: "", closed: false },
      { day: "Wednesday", open: "By Appointment", close: "", closed: false },
      { day: "Thursday",  open: "By Appointment", close: "", closed: false },
      { day: "Friday",    open: "By Appointment", close: "", closed: false },
      { day: "Saturday",  open: "Events",          close: "", closed: false },
      { day: "Sunday",    open: "Events",          close: "", closed: false },
    ],
    amenities: [
      "5.5-Acre Property",
      "Ceremony & Reception Spaces",
      "Apple Tree Orchard Setting",
      "Mountain & Valley Views",
      "Private Events",
      "Spring, Summer & Autumn",
      "Parking",
    ],
    featured:   false,
    priceRange: "$$$",
    tags:       ["weddings", "outdoor-venue", "private-events", "scenic-views", "orchard"],
    tier:       "standard"
  placeId:         "ChIJ90VYiQpP24ARLNMAoZ8WMm4", as ListingTier,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  EDUCATION & MUSEUMS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:   "16",
    slug: "oak-glen-schoolhouse-museum",
    name: "Oak Glen Schoolhouse Museum & Park",
    shortDescription:
      "Historic one-room schoolhouse turned community museum, with a park, playground, picnic tables, tennis court, walking path, and dog park open to all.",
    description: `The Oak Glen Schoolhouse Museum is one of the community's most tangible connections to the past — a meticulously preserved one-room schoolhouse that once educated the children of Oak Glen's early farming families and now serves as a free museum open to the public. The building itself is the exhibit: original desks, chalkboards, and educational materials from the late 1800s and early 1900s give visitors an immediate sense of what daily life looked like at this elevation a century ago.

The surrounding park is as much a draw as the museum itself, particularly for families with children. A playground, picnic tables, tennis court, and walking path make it an easy choice for a mid-day break between orchard visits, while the dog park makes it one of the few Oak Glen destinations that actively welcomes four-legged visitors off-leash.

Private event reservations for sections of the park are available — the covered picnic area and lawn handle birthday parties, school groups, and family reunions well. For pricing and availability, the museum asks that interested parties call directly. It's a small gem that tends to be overlooked by first-time visitors and remembered fondly by those who take the time to stop.`,
    category:     "Education & Museums",
    categorySlug: "education",
    rating:       4.5,
    reviewCount:  93,
    imageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=75",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:   "(909) 501-8281",
    website: "https://oakglenschoolmuseum.com",
    // Apple season (Sep–Nov): Wed–Sun 12PM–4PM; off-season: Sat–Sun 12PM–4PM
    hours: [
      { day: "Monday",    open: "",         close: "",        closed: true  },
      { day: "Tuesday",   open: "",         close: "",        closed: true  },
      { day: "Wednesday", open: "12:00 PM", close: "4:00 PM", closed: false },
      { day: "Thursday",  open: "12:00 PM", close: "4:00 PM", closed: false },
      { day: "Friday",    open: "12:00 PM", close: "4:00 PM", closed: false },
      { day: "Saturday",  open: "12:00 PM", close: "4:00 PM", closed: false },
      { day: "Sunday",    open: "12:00 PM", close: "4:00 PM", closed: false },
    ],
    amenities: [
      "Historic Schoolhouse Museum",
      "Free Admission",
      "Public Park",
      "Playground",
      "Picnic Tables",
      "Tennis Court",
      "Walking Path",
      "Dog Park (Off-Leash)",
      "Private Event Reservations",
      "Restrooms",
      "Parking",
    ],
    featured:   false,
    priceRange: "$",
    tags:       ["museum", "free", "history", "park", "dog-friendly", "picnic"],
    tier:       "free"
  placeId:         "ChIJieX3IgpP24ARe0wROR8gmGE", as ListingTier,
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    slug:        "farms",
    label:       "Farms & Orchards",
    description: "U-pick orchards, heritage apple varieties, regenerative farms, and fresh-pressed cider straight from the mountain.",
    imageUrl:    "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=75",
    count:       6,
  },
  {
    slug:        "restaurants",
    label:       "Restaurants & Cafés",
    description: "From fine dining and Sunday brunch to wood-fired pizza and specialty coffee with orchard views.",
    imageUrl:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75",
    count:       2,
  },
  {
    slug:        "cider-houses",
    label:       "Cider Houses",
    description: "Hard cider crafted blossom to bottle from estate-grown Oak Glen apples — the valley's finest libation.",
    imageUrl:    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=75",
    count:       1,
  },
  {
    slug:        "shops",
    label:       "Shops & Stores",
    description: "Handcrafted gifts, local honey, artisan preserves, and mountain-made goods worth bringing home.",
    imageUrl:    "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&q=75",
    count:       1,
  },
  {
    slug:        "accommodation",
    label:       "Accommodation",
    description: "Overnight stays for every kind of group — from historic B&Bs to mountain retreat and conference centers.",
    imageUrl:    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=75",
    count:       2,
  },
  {
    slug:        "entertainment",
    label:       "Entertainment & Events",
    description: "Living history farms, axe throwing, animal parks, trout ponds, dinner theater, and year-round family fun.",
    imageUrl:    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=75",
    count:       2,
  },
  {
    slug:        "weddings",
    label:       "Weddings & Events",
    description: "Stunning mountain venues with orchard views, apple trees, and natural beauty that does the decorating for you.",
    imageUrl:    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=75",
    count:       1,
  },
  {
    slug:        "education",
    label:       "Education & Museums",
    description: "Historic schoolhouses, living history programs, and parks that connect visitors to Oak Glen's agricultural roots.",
    imageUrl:    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=75",
    count:       1,
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

/** Retrieve a single business by its URL slug. Returns undefined if not found. */
export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

/** Retrieve all businesses belonging to a given category slug. */
export function getBusinessesByCategory(categorySlug: string): Business[] {
  return businesses.filter((b) => b.categorySlug === categorySlug);
}

/** Return all businesses marked as featured. */
export function getFeaturedBusinesses(): Business[] {
  return businesses.filter((b) => b.featured);
}

/** Return a category record by its slug. Returns undefined if not found. */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Format a full address string for display. */
export function formatAddress(address: BusinessAddress): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
}

/** Return the current day's hours for a business, or null if not found. */
export function getTodayHours(hours: BusinessHours[]): BusinessHours | null {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return hours.find((h) => h.day === today) ?? null;
}
