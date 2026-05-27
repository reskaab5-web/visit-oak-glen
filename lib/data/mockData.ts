// ─── Types ────────────────────────────────────────────────────────────────────

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
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
}

export interface Category {
  slug:        string;
  label:       string;
  description: string;
  imageUrl:    string;
  count:       number;
}

// ─── Mock Businesses ──────────────────────────────────────────────────────────

export const businesses: Business[] = [
  // ── 1. Apple Orchard ───────────────────────────────────────────────────────
  {
    id:   "1",
    slug: "rileys-apple-ranch",
    name: "Riley's Apple Ranch",
    shortDescription:
      "Family-owned U-pick orchard with 30+ heritage apple varieties, fresh-pressed cider, and weekend hayrides through the mountain trees.",
    description: `Nestled at 4,800 feet in the San Bernardino Mountains, Riley's Apple Ranch has been welcoming families since 1952. Our third-generation orchard spans 28 hand-tended acres with over 30 heirloom and heritage apple varieties—many you simply won't find in any grocery store.

Visitors are welcome to wander the rows and hand-pick their own selections from September through early December. Our on-site press runs daily during peak season, producing fresh unpasteurized cider the same morning the apples are harvested. The rustic barn store carries our full range of apple butters, jams, dried rings, and pies baked by the Riley family each morning.

Weekend hayrides depart hourly through the lower orchard, and our cider-tasting flights pair beautifully with the local artisan cheese boards available at the tasting counter. School groups and private parties are warmly welcomed with advance notice—ask about our harvest education programs.`,
    category:     "Apple Orchard",
    categorySlug: "apple-orchards",
    rating:       4.8,
    reviewCount:  312,
    imageUrl:     "https://picsum.photos/seed/apple-ranch-hero/1200/675",
    galleryImages: [
      "https://picsum.photos/seed/apple-ranch-g1/800/600",
      "https://picsum.photos/seed/apple-ranch-g2/800/600",
      "https://picsum.photos/seed/apple-ranch-g3/800/600",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "11101 Apple Tree Lane",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:       "(909) 797-1001",
    website:     "https://rileysappleranch.com",
    email:       "hello@rileysappleranch.com",
    established: 1952,
    hours: [
      { day: "Monday",    open: "",         close: "",         closed: true  },
      { day: "Tuesday",   open: "",         close: "",         closed: true  },
      { day: "Wednesday", open: "9:00 AM",  close: "5:00 PM",  closed: false },
      { day: "Thursday",  open: "9:00 AM",  close: "5:00 PM",  closed: false },
      { day: "Friday",    open: "8:00 AM",  close: "6:00 PM",  closed: false },
      { day: "Saturday",  open: "7:30 AM",  close: "6:30 PM",  closed: false },
      { day: "Sunday",    open: "8:00 AM",  close: "6:00 PM",  closed: false },
    ],
    amenities: [
      "U-Pick Available",
      "Fresh-Pressed Cider",
      "Cider Tasting Flights",
      "Barn Store",
      "Weekend Hayrides",
      "Picnic Areas",
      "Restrooms",
      "Parking",
      "Dog Friendly (on leash)",
      "School Groups Welcome",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       ["u-pick", "cider", "family-friendly", "seasonal", "hayrides"],
  },

  // ── 2. Café & Cidery ───────────────────────────────────────────────────────
  {
    id:   "2",
    slug: "the-cider-press-cafe",
    name: "The Cider Press Café",
    shortDescription:
      "Artisan café and cidery serving wood-fired pastries, single-origin coffee, and small-batch hard cider crafted from locally grown mountain apples.",
    description: `The Cider Press Café began as a weekend pop-up beneath a sprawling valley oak and grew, harvest by harvest, into one of Oak Glen's most beloved morning destinations. The open-air pavilion wraps around an original 1920s cider press—restored and still occasionally operational—giving the space an authenticity you can feel the moment you step through the gate.

Pastry chef Marisol Vega fires her wood-oven twice daily: first at dawn for the breakfast menu of apple-cardamom scones, brown-butter croissants, and seasonal galettes; then again at midday for the lunch rotation of flatbreads and hand-rolled empanadas. All baked goods use heritage flour milled in Tehachapi and locally foraged fruit when in season.

On the beverage side, head cider-maker Tom Keane works exclusively with apples from within a 12-mile radius of the café, producing small-batch releases ranging from a bone-dry sparkling pét-nat to a warming barrel-aged spiced cider available only in December. Coffee is sourced from Verve Roasters and pulled on a Synesso by a team trained to treat every pour with the same care as the ciders.`,
    category:     "Café & Cidery",
    categorySlug: "cafes",
    rating:       4.9,
    reviewCount:  187,
    imageUrl:     "https://picsum.photos/seed/cider-cafe-hero/1200/675",
    galleryImages: [
      "https://picsum.photos/seed/cafe-g1/800/600",
      "https://picsum.photos/seed/cafe-g2/800/600",
      "https://picsum.photos/seed/cafe-g3/800/600",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "38740 Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:       "(909) 797-2255",
    website:     "https://ciderpress.cafe",
    email:       "hello@ciderpress.cafe",
    established: 2014,
    hours: [
      { day: "Monday",    open: "",         close: "",         closed: true  },
      { day: "Tuesday",   open: "",         close: "",         closed: true  },
      { day: "Wednesday", open: "8:00 AM",  close: "4:00 PM",  closed: false },
      { day: "Thursday",  open: "8:00 AM",  close: "4:00 PM",  closed: false },
      { day: "Friday",    open: "7:30 AM",  close: "5:00 PM",  closed: false },
      { day: "Saturday",  open: "7:00 AM",  close: "5:30 PM",  closed: false },
      { day: "Sunday",    open: "7:30 AM",  close: "4:30 PM",  closed: false },
    ],
    amenities: [
      "Outdoor Seating",
      "Hard Cider on Tap",
      "Wood-Fired Pastries",
      "Single-Origin Coffee",
      "Gluten-Free Options",
      "Vegan Options",
      "Live Music (Saturdays)",
      "Wi-Fi",
      "Pet Friendly (Patio)",
    ],
    featured:   true,
    priceRange: "$$",
    tags:       ["coffee", "cider", "pastries", "brunch", "outdoor-seating"],
  },

  // ── 3. Gift Shop ───────────────────────────────────────────────────────────
  {
    id:   "3",
    slug: "oak-tree-village-gifts",
    name: "Oak Tree Village Gifts",
    shortDescription:
      "A curated artisan shop carrying handcrafted gifts, locally made preserves, mountain-inspired home goods, and one-of-a-kind oak wood pieces.",
    description: `Oak Tree Village Gifts has anchored the heart of Oak Glen's village since 1988, operating out of a hand-built redwood cabin that co-owner Grace Whitmore and her late husband constructed over two summers. What started as a seasonal jam and preserve stand has expanded into a thoughtfully curated retail destination representing over 60 local artisans, farmers, and makers from the Inland Empire.

The shop floor unfolds room by room: the front parlor holds estate-inspired home goods, beeswax candles poured in Redlands, and hand-thrown ceramic mugs glazed in earth tones that feel native to the mountain. The middle room is devoted entirely to edible goods—house-made apple butters in 12 varieties, local honey sourced from hives three miles up the ridge, wild-harvested pine-nut brittle, and seasonal wine jellies from nearby Temecula Valley.

The back room, Grace's favorite, holds the one-of-a-kind pieces: live-edge oak serving boards finished with locally harvested beeswax, hand-forged ironwork from a Smith up in Big Bear, and a rotating selection of fine art prints by regional landscape painters. Gift wrapping in recycled kraft and beeswax-sealed ribbon is offered complimentary on every purchase.`,
    category:     "Gift Shop",
    categorySlug: "gift-shops",
    rating:       4.7,
    reviewCount:  241,
    imageUrl:     "https://picsum.photos/seed/gift-shop-hero/1200/675",
    galleryImages: [
      "https://picsum.photos/seed/gift-g1/800/600",
      "https://picsum.photos/seed/gift-g2/800/600",
      "https://picsum.photos/seed/gift-g3/800/600",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "38625 Oak Glen Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:       "(909) 797-3388",
    website:     "https://oaktreevillagegifts.com",
    email:       "shop@oaktreevillagegifts.com",
    established: 1988,
    hours: [
      { day: "Monday",    open: "10:00 AM", close: "5:00 PM",  closed: false },
      { day: "Tuesday",   open: "10:00 AM", close: "5:00 PM",  closed: false },
      { day: "Wednesday", open: "10:00 AM", close: "5:00 PM",  closed: false },
      { day: "Thursday",  open: "10:00 AM", close: "5:00 PM",  closed: false },
      { day: "Friday",    open: "10:00 AM", close: "6:00 PM",  closed: false },
      { day: "Saturday",  open: "9:00 AM",  close: "6:30 PM",  closed: false },
      { day: "Sunday",    open: "10:00 AM", close: "5:30 PM",  closed: false },
    ],
    amenities: [
      "Local Artisan Goods",
      "Gift Wrapping Available",
      "Custom Baskets",
      "Shipping Available",
      "Accessible Entrance",
      "Parking",
      "Accepts Returns",
    ],
    featured:   false,
    priceRange: "$$",
    tags:       ["gifts", "artisan", "preserves", "home-goods", "handmade"],
  },

  // ── 4. Lodge ───────────────────────────────────────────────────────────────
  {
    id:   "4",
    slug: "sage-and-summit-lodge",
    name: "Sage & Summit Lodge",
    shortDescription:
      "A boutique mountain inn offering eight individually designed suites, a garden patio, wood-burning fireplaces, and views across the San Bernardino valley.",
    description: `Sage & Summit Lodge occupies a restored 1930s mountain inn perched at the upper edge of Oak Glen, where the orchard rows give way to open chaparral and the valley spreads out 3,000 feet below. Eight individually designed suites each carry a different character: some warm and candlelit with antique quilts and cast-iron tubs; others spare and modern with Douglas fir floors, raw-edge headboards, and floor-to-ceiling windows framing the ridgeline.

A communal stone terrace wraps the south face of the inn, set with teak loungers and a wood-burning outdoor fireplace that stays lit from October through March. Mornings begin with a house-made continental spread delivered to your door: a basket of fresh pastries from The Cider Press Café two roads over, local honey, stone-fruit preserves, and a French press of seasonal coffee.

The innkeepers, David and Clara Nakashima, purchased the property in 2018 and spent four years restoring it with a focus on natural materials and minimal intervention—exposed adobe walls, hand-plastered ceilings, and hardware cast from locally salvaged bronze. Complimentary trail maps, binoculars, and a small lending library of regional natural history make the inn a natural base for exploring the surrounding San Bernardino National Forest.`,
    category:     "Lodging",
    categorySlug: "lodging",
    rating:       4.9,
    reviewCount:  98,
    imageUrl:     "https://picsum.photos/seed/lodge-hero/1200/675",
    galleryImages: [
      "https://picsum.photos/seed/lodge-g1/800/600",
      "https://picsum.photos/seed/lodge-g2/800/600",
      "https://picsum.photos/seed/lodge-g3/800/600",
    ],
    location: "Oak Glen, CA",
    address: {
      street: "11580 Summit Ridge Road",
      city:   "Oak Glen",
      state:  "CA",
      zip:    "92399",
    },
    phone:       "(909) 797-4499",
    website:     "https://sageandsummitlodge.com",
    email:       "reservations@sageandsummitlodge.com",
    established: 2022, // re-opened after restoration
    hours: [
      { day: "Monday",    open: "8:00 AM",  close: "9:00 PM",  closed: false },
      { day: "Tuesday",   open: "8:00 AM",  close: "9:00 PM",  closed: false },
      { day: "Wednesday", open: "8:00 AM",  close: "9:00 PM",  closed: false },
      { day: "Thursday",  open: "8:00 AM",  close: "9:00 PM",  closed: false },
      { day: "Friday",    open: "8:00 AM",  close: "10:00 PM", closed: false },
      { day: "Saturday",  open: "8:00 AM",  close: "10:00 PM", closed: false },
      { day: "Sunday",    open: "8:00 AM",  close: "9:00 PM",  closed: false },
    ],
    amenities: [
      "8 Boutique Suites",
      "Wood-Burning Fireplaces",
      "Valley Views",
      "Continental Breakfast Included",
      "Stone Garden Terrace",
      "Outdoor Fireplace",
      "Free Parking",
      "Pet Friendly (select rooms)",
      "Hiking Trail Access",
      "Lending Library",
      "No TV (by design)",
      "Wi-Fi Available",
    ],
    featured:   true,
    priceRange: "$$$",
    tags:       ["lodging", "boutique", "romantic", "views", "nature", "fireplace"],
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    slug:        "apple-orchards",
    label:       "Apple Orchards",
    description: "U-pick orchards, heritage varieties, and fresh-pressed cider straight from the mountain.",
    imageUrl:    "https://picsum.photos/seed/cat-orchards/800/600",
    count:       1,
  },
  {
    slug:        "cafes",
    label:       "Cafés & Cideries",
    description: "Artisan roasters, wood-fired kitchens, and craft cideries tucked among the oaks.",
    imageUrl:    "https://picsum.photos/seed/cat-cafes/800/600",
    count:       1,
  },
  {
    slug:        "gift-shops",
    label:       "Gift Shops",
    description: "Handcrafted goods, local preserves, and mountain-made artisan wares.",
    imageUrl:    "https://picsum.photos/seed/cat-gifts/800/600",
    count:       1,
  },
  {
    slug:        "lodging",
    label:       "Lodging",
    description: "Boutique inns and mountain retreats for an overnight escape into the hills.",
    imageUrl:    "https://picsum.photos/seed/cat-lodging/800/600",
    count:       1,
  },
  {
    slug:        "farms",
    label:       "Farms & Produce",
    description: "Seasonal farm stands, pumpkin patches, and locally grown mountain produce.",
    imageUrl:    "https://picsum.photos/seed/cat-farms/800/600",
    count:       0,
  },
  {
    slug:        "activities",
    label:       "Activities",
    description: "Hayrides, nature walks, pick-your-own experiences, and seasonal events.",
    imageUrl:    "https://picsum.photos/seed/cat-activities/800/600",
    count:       0,
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
