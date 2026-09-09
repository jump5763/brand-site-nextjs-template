export type CategoryId = "salads" | "bowls" | "sides" | "drinks" | "desserts";

export type Badge = "New" | "Limited" | "Chef's pick" | "Bestseller";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  priceCents: number;
  calories: number;
  diet: Array<"Vegan" | "Vegetarian" | "Gluten-free" | "High-protein">;
  image: string;
  alt: string;
  badge?: Badge;
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export const categories: { id: CategoryId | "limited"; label: string }[] = [
  { id: "salads", label: "Salads" },
  { id: "bowls", label: "Grain Bowls" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
  { id: "limited", label: "Limited Time" },
];

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "kale-caesar",
    name: "Kale Caesar",
    description:
      "Lacinato kale, toasted sourdough croutons, shaved parmesan and a bright, lemony caesar dressing.",
    category: "salads",
    priceCents: 1195,
    calories: 540,
    diet: ["Vegetarian"],
    image: img("photo-1540420773420-3366772f4999"),
    alt: "Kale caesar salad with shaved parmesan and croutons",
    badge: "Bestseller",
  },
  {
    id: "green-goddess",
    name: "Green Goddess Chop",
    description:
      "Romaine, snap peas, avocado, cucumber, fresh herbs and our creamy green goddess dressing.",
    category: "salads",
    priceCents: 1245,
    calories: 470,
    diet: ["Vegetarian", "Gluten-free"],
    image: img("photo-1553621042-f6e147245754"),
    alt: "Chopped green salad with avocado and herbs",
    badge: "New",
  },
  {
    id: "market-cobb",
    name: "Market Cobb",
    description:
      "Greens, roasted chicken, egg, avocado, cherry tomato and blue cheese — fork and knife required.",
    category: "salads",
    priceCents: 1345,
    calories: 610,
    diet: ["High-protein"],
    image: img("photo-1466637574441-749b8f19452f"),
    alt: "Cobb salad with chicken, egg and avocado",
    badge: "Chef's pick",
  },
  {
    id: "wild-salmon-salad",
    name: "Wild Salmon Salad",
    description:
      "Baby greens, wild salmon, avocado, red onion and a lemon-dill vinaigrette.",
    category: "salads",
    priceCents: 1445,
    calories: 490,
    diet: ["High-protein", "Gluten-free"],
    image: img("photo-1467003909585-2f8a72700288"),
    alt: "Wild salmon over fresh greens",
  },
  {
    id: "seasonal-garden",
    name: "Seasonal Garden Salad",
    description:
      "Whatever our partner farmers are pulling this week — tossed simply with sherry vinaigrette.",
    category: "salads",
    priceCents: 1095,
    calories: 330,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1505576399279-565b52d4ac71"),
    alt: "Garden salad with market vegetables",
    badge: "Limited",
  },
  {
    id: "quinoa-power",
    name: "Harvest Quinoa Bowl",
    description:
      "Quinoa, roasted sweet potato, black beans, charred corn, pepitas and smoky lime dressing.",
    category: "bowls",
    priceCents: 1295,
    calories: 620,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1490645935967-10de6ba17061"),
    alt: "Harvest quinoa grain bowl with roasted vegetables",
    badge: "Limited",
  },
  {
    id: "sesame-tofu",
    name: "Sesame Tofu Bowl",
    description:
      "Crispy tofu, brown rice, edamame, pickled carrot and ginger-sesame dressing.",
    category: "bowls",
    priceCents: 1295,
    calories: 560,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1455619452474-d2be8b1e70cd"),
    alt: "Sesame tofu rice bowl with edamame",
  },
  {
    id: "salmon-power",
    name: "Fire-Roasted Salmon Bowl",
    description:
      "Fire-roasted salmon, forbidden rice, avocado, charred scallion and sesame-ginger vinaigrette.",
    category: "bowls",
    priceCents: 1495,
    calories: 640,
    diet: ["High-protein", "Gluten-free"],
    image: img("photo-1512058564366-18510be2db19"),
    alt: "Fire-roasted salmon grain bowl",
    badge: "New",
  },
  {
    id: "chipotle-chicken",
    name: "Chipotle Chicken Bowl",
    description:
      "Grilled chipotle chicken, brown rice, black beans, salsa roja, tortilla strips and crema.",
    category: "bowls",
    priceCents: 1395,
    calories: 720,
    diet: ["High-protein"],
    image: img("photo-1600334129128-685c5582fd35"),
    alt: "Chipotle chicken bowl with black beans and rice",
  },
  {
    id: "charred-steak",
    name: "Charred Steak Bowl",
    description:
      "Charred steak, farro, arugula, roasted tomato, blue cheese and red wine vinaigrette.",
    category: "bowls",
    priceCents: 1595,
    calories: 690,
    diet: ["High-protein"],
    image: img("photo-1600891964092-4316c288032e"),
    alt: "Charred steak grain bowl",
    badge: "Limited",
  },
  {
    id: "smashed-avocado",
    name: "Smashed Avocado",
    description:
      "Half avocado, flaky salt, lime and our seeded house crackers.",
    category: "sides",
    priceCents: 495,
    calories: 210,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1523049673857-eb18f1d7b578"),
    alt: "Half avocado with seeds",
  },
  {
    id: "avocado-toast",
    name: "Avocado & Seed Toast",
    description:
      "Toasted sourdough, smashed avocado, hemp seeds and a little chili crunch.",
    category: "sides",
    priceCents: 795,
    calories: 290,
    diet: ["Vegetarian"],
    image: img("photo-1603046891744-1f76eb10eec4"),
    alt: "Avocado toast with seeds on sourdough",
  },
  {
    id: "fresh-fruit",
    name: "Fresh Cut Fruit",
    description:
      "Seasonal melon, berries and citrus — cut every single morning.",
    category: "sides",
    priceCents: 595,
    calories: 120,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1464965911861-746a04b4bca6"),
    alt: "Fresh cut seasonal fruit",
  },
  {
    id: "hummus-plate",
    name: "Hummus & Crudités",
    description: "Whipped hummus with market crudités and a warm side of pita.",
    category: "sides",
    priceCents: 695,
    calories: 340,
    diet: ["Vegetarian"],
    image: img("photo-1572695157366-5e585ab2b69f"),
    alt: "Hummus served with fresh vegetables",
  },
  {
    id: "cold-pressed-greens",
    name: "Cold-Pressed Greens",
    description:
      "Kale, cucumber, celery, apple and lemon — pressed in-house every morning.",
    category: "drinks",
    priceCents: 695,
    calories: 130,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1553530666-ba11a7da3888"),
    alt: "Green juice with fresh greens",
    badge: "New",
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha Oat Latte",
    description: "Stone-ground matcha, oat milk and a touch of agave over ice.",
    category: "drinks",
    priceCents: 545,
    calories: 160,
    diet: ["Vegan"],
    image: img("photo-1544145945-f90425340c7e"),
    alt: "Iced matcha latte",
  },
  {
    id: "acai-cup",
    name: "Açaí & Granola Cup",
    description:
      "Organic açaí, toasted coconut granola, banana and a drizzle of honey.",
    category: "desserts",
    priceCents: 795,
    calories: 380,
    diet: ["Vegetarian"],
    image: img("photo-1511690743698-d9d85f2fbf38"),
    alt: "Açaí bowl topped with granola and berries",
    badge: "New",
  },
  {
    id: "chia-pudding",
    name: "Vanilla Chia Pudding",
    description: "Coconut chia pudding, macerated berries and a sprig of mint.",
    category: "desserts",
    priceCents: 695,
    calories: 290,
    diet: ["Vegan", "Gluten-free"],
    image: img("photo-1490474418585-ba9bad8fd0ea"),
    alt: "Vanilla chia pudding with berries",
  },
];

/** Cards promoted in the seasonal rail on the home page. */
export const featuredIds = [
  "green-goddess",
  "salmon-power",
  "seasonal-garden",
  "acai-cup",
];

export interface Review {
  quote: string;
  author: string;
  location: string;
  source: string;
}

export const reviews: Review[] = [
  {
    quote:
      "The kale caesar is my whole personality at lunch now. Crunchy, bright, never soggy.",
    author: "Maya L.",
    location: "SoMa · SF",
    source: "Google",
  },
  {
    quote:
      "Finally a fast-casual spot that tastes like somebody actually cooked for you.",
    author: "Dan K.",
    location: "Mission · SF",
    source: "Yelp",
  },
  {
    quote:
      "The sesame tofu bowl converted my whole office. Three of us order it every Tuesday.",
    author: "Priya S.",
    location: "Palo Alto",
    source: "Google",
  },
  {
    quote:
      "You can genuinely taste that the greens were alive this morning. No exaggeration.",
    author: "Andre G.",
    location: "Arts District · LA",
    source: "DoorDash",
  },
  {
    quote:
      "Grain bowls with actual grains — not mush. I would drive across town for this.",
    author: "Elena R.",
    location: "Culver City · LA",
    source: "Yelp",
  },
];

export interface LocationInfo {
  id: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  phoneHref: string;
  hours: { day: string; time: string }[];
}

export const locations: LocationInfo[] = [
  {
    id: "soma",
    name: "SoMa",
    street: "300 2nd Street",
    city: "San Francisco, CA 94107",
    phone: "(415) 555-0117",
    phoneHref: "tel:+14155550117",
    hours: [
      { day: "Mon – Fri", time: "10:30 AM – 9:00 PM" },
      { day: "Sat – Sun", time: "9:00 AM – 9:00 PM" },
    ],
  },
  {
    id: "arts-district",
    name: "Arts District",
    street: "748 Mateo Street",
    city: "Los Angeles, CA 90021",
    phone: "(213) 555-0149",
    phoneHref: "tel:+12135550149",
    hours: [
      { day: "Mon – Fri", time: "10:30 AM – 9:00 PM" },
      { day: "Sat – Sun", time: "9:00 AM – 9:00 PM" },
    ],
  },
  {
    id: "palo-alto",
    name: "University Ave",
    street: "444 University Avenue",
    city: "Palo Alto, CA 94301",
    phone: "(650) 555-0133",
    phoneHref: "tel:+16505550133",
    hours: [
      { day: "Mon – Fri", time: "10:30 AM – 8:30 PM" },
      { day: "Sat – Sun", time: "9:00 AM – 8:30 PM" },
    ],
  },
];

export const productById = (id: string) =>
  products.find((product) => product.id === id);
