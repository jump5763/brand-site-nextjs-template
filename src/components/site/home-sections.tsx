import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  Clock,
  Leaf,
  MapPin,
  Phone,
  Sprout,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ctaClass } from "@/components/site/cta";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { ReviewsBandClient } from "@/components/site/home/reviews-band-client";
import { Reveal } from "@/components/site/motion";
import {
  featuredIds,
  locations,
  money,
  productById,
  products,
} from "@/lib/home-view-model";
import type { Review } from "@/lib/home-view-model";

const farmImage = "photo-1518843875459-f738682238a6";

const imageUrl = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="t-eyebrow text-sage-700">{children}</p>;
}

function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-[64px] tablet:py-[96px]", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

const heroDelay = (ms: number) => ({ animationDelay: `${ms}ms` });

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function HeroHome() {
  return (
    <section className="overflow-hidden pb-[16px] pt-[20px] tablet:pt-[44px]">
      <div className="container-site">
        <div className="grid items-center gap-[48px] desktop:grid-cols-[1.05fr_0.95fr] desktop:gap-[56px]">
          <div className="max-w-[640px] pb-[8px]">
            <p
              className="a-hero inline-flex items-center gap-[10px] rounded-full border border-border bg-card px-[16px] py-[9px] text-[12px] font-semibold uppercase tracking-[1.2px] text-foreground"
              style={heroDelay(0)}
            >
              <Sprout
                className="h-[16px] w-[16px] text-sage-600"
                strokeWidth={2.2}
              />
              Farm-direct · seasonal menu
            </p>
            <h1
              className="a-hero t-display mt-[28px] text-balance text-primary"
              style={heroDelay(90)}
            >
              Real food, from the ground up.
            </h1>
            <p
              className="a-hero t-lead mt-[24px] max-w-[540px] text-muted-foreground"
              style={heroDelay(190)}
            >
              Crisp salads and warm grain bowls made every morning from produce
              our partner farms picked this week — built to order, never made in
              advance.
            </p>
            <div
              className="a-hero mt-[36px] flex flex-wrap items-center gap-[14px]"
              style={heroDelay(290)}
            >
              <Link href="/menu" className={ctaClass("primary", "lg")}>
                Order online
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </Link>
              <Link
                href="/#about"
                className="group inline-flex items-center gap-[8px] rounded-full px-[18px] py-[14px] text-[15px] font-semibold text-foreground"
              >
                Our story
                <ArrowRight
                  className="h-[16px] w-[16px] transition-transform group-hover:translate-x-[3px]"
                  strokeWidth={2.2}
                />
              </Link>
            </div>
            <ul
              className="a-hero mt-[40px] flex flex-wrap gap-x-[26px] gap-y-[12px] text-[13px] text-muted-foreground"
              style={heroDelay(400)}
            >
              <li className="flex items-center gap-[8px]">
                <Leaf
                  className="h-[15px] w-[15px] text-sage-600"
                  strokeWidth={2}
                />
                Vegan & gluten-free friendly
              </li>
              <li className="flex items-center gap-[8px]">
                <Clock
                  className="h-[15px] w-[15px] text-sage-600"
                  strokeWidth={2}
                />
                Made to order, in minutes
              </li>
              <li className="flex items-center gap-[8px]">
                <Sprout
                  className="h-[15px] w-[15px] text-sage-600"
                  strokeWidth={2}
                />
                New menu every week
              </li>
            </ul>
          </div>

          <div className="a-hero" style={heroDelay(150)}>
            {/* Gentle float on the whole hero media area */}
            <div className="a-float h-[420px] tablet:h-[560px] desktop:h-[640px]">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Values strip                                                        */
/* ------------------------------------------------------------------ */

export function ValuesStrip() {
  const items = [
    {
      icon: Store,
      title: "Neighborhood roots",
      text: "Three kitchens, one short supply chain.",
    },
    {
      icon: Leaf,
      title: "Plant-forward",
      text: "Half the menu is vegan or vegetarian.",
    },
    {
      icon: Clock,
      title: "Honest fast",
      text: "Cooked to order — never sitting under a heat lamp.",
    },
  ];
  return (
    <section className="pb-[16px] tablet:pb-[24px]">
      <div className="container-site">
        <div className="grid divide-y divide-border rounded-[24px] border border-border bg-card tablet:grid-cols-3 tablet:divide-x tablet:divide-y-0">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 110} className="h-full">
              <div className="flex h-full items-start gap-[16px] px-[24px] py-[22px]">
                <span className="mt-[2px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                  <item.icon
                    className="h-[19px] w-[19px] text-sage-700"
                    strokeWidth={2}
                  />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-[4px] block text-[13px] leading-[1.6] text-muted-foreground">
                    {item.text}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seasonal arrivals rail                                              */
/* ------------------------------------------------------------------ */

const badgeClass: Record<string, string> = {
  New: "bg-butter text-[#241a06]",
  Limited: "bg-sage-600 text-white",
  "Chef's pick": "bg-white text-foreground border border-border",
  Bestseller: "bg-inverse text-white",
};

function CompactProductCard({ id }: { id: string }) {
  const product = productById(id);
  if (!product) return null;
  return (
    <Link
      href={`/menu#${product.category}`}
      className="group block h-full overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-100">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute left-[14px] top-[14px] rounded-full px-[12px] py-[6px] text-[12px] font-bold shadow-card",
              badgeClass[product.badge],
            )}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-[18px]">
        <div className="flex items-start justify-between gap-[12px]">
          <h3 className="text-[16px] font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
          <span className="shrink-0 text-[15px] font-semibold text-foreground">
            {money(product.priceCents)}
          </span>
        </div>
        <p className="mt-[10px] line-clamp-2 text-[13px] leading-[1.6] text-muted-foreground">
          {product.description}
        </p>
        <span className="mt-[16px] inline-flex items-center gap-[8px] text-[13px] font-semibold text-sage-700">
          Order on the menu
          <ArrowUpRight
            className="h-[15px] w-[15px] transition-transform duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
            strokeWidth={2.2}
          />
        </span>
      </div>
    </Link>
  );
}

export function SeasonalRail() {
  return (
    <Section id="new" className="!py-[72px] tablet:!py-[104px]">
      <Reveal className="flex flex-col gap-[24px] tablet:flex-row tablet:items-end tablet:justify-between">
        <div>
          <Eyebrow>Fresh this season</Eyebrow>
          <h2 className="t-h2 mt-[14px]">Just hit the menu.</h2>
          <p className="mt-[14px] max-w-[460px] text-[15px] leading-[1.7] text-muted-foreground">
            A rotating lineup driven by what&rsquo;s ripening on local farms
            right now. When it&rsquo;s gone, it&rsquo;s gone until next year.
          </p>
        </div>
        <Link
          href="/menu"
          className="group inline-flex w-fit shrink-0 items-center gap-[8px] rounded-full px-[14px] py-[12px] text-[14px] font-semibold text-foreground"
        >
          View the full menu
          <ArrowRight
            className="h-[16px] w-[16px] transition-transform group-hover:translate-x-[3px]"
            strokeWidth={2.2}
          />
        </Link>
      </Reveal>

      <div className="no-scrollbar -mx-[16px] mt-[36px] flex snap-x gap-[14px] overflow-x-auto px-[16px] pb-[10px] tablet:mx-0 tablet:px-0">
        {featuredIds.map((id, index) => (
          <Reveal
            key={id}
            delay={index * 100}
            className="w-[300px] shrink-0 snap-start tablet:w-[380px]"
          >
            <CompactProductCard id={id} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Farm / ingredients                                                  */
/* ------------------------------------------------------------------ */

const farmPromises = [
  "Produce from partner farms within a day's drive",
  "Cooked and chopped in our kitchens every morning",
  "No seed oils, no fryers, no ultra-processed shortcuts",
];

export function FarmSection() {
  return (
    <Section id="about">
      <div className="grid items-center gap-[44px] desktop:grid-cols-2 desktop:gap-[96px]">
        <Reveal className="order-2 desktop:order-1">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[24px] border border-border bg-sage-100 desktop:aspect-[7/6] desktop:rounded-[28px]">
              <img
                src={imageUrl(farmImage, 1400)}
                alt="Whole vegetables and greens from partner farms"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-[12px] top-[22px] hidden rounded-[18px] border border-border bg-card p-[16px] shadow-lift tablet:block desktop:-right-[28px]">
              <p className="t-eyebrow text-[10px] text-sage-700">
                In every bowl
              </p>
              <div className="mt-[10px] flex max-w-[220px] flex-wrap gap-[6px]">
                {["Kale", "Quinoa", "Avocado", "Citrus", "Herbs"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-sage-100 px-[10px] py-[5px] text-[11px] font-medium text-sage-800"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="order-1 desktop:order-2">
          <Eyebrow>Goodness starts at the farm</Eyebrow>
          <h2 className="t-h2 mt-[14px] text-balance">
            Good food starts with good dirt.
          </h2>
          <p className="mt-[20px] text-[15px] leading-[1.75] text-muted-foreground">
            We work with a short list of farms we can visit by bike. When they
            tell us a crop is perfect, we build the menu around it — not the
            other way around. That&rsquo;s why our greens actually taste like
            something.
          </p>
          <ul className="mt-[28px] space-y-[16px]">
            {farmPromises.map((promise) => (
              <li key={promise} className="flex items-start gap-[12px]">
                <span className="mt-[2px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                  <Check
                    className="h-[13px] w-[13px] text-sage-700"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-[14px] leading-[1.65] text-foreground">
                  {promise}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-[36px]">
            <Link
              href="/#locations"
              className={ctaClass("outline", "md", "shadow-none")}
            >
              Visit a store
              <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.2} />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export function ReviewsBand({ reviews }: { reviews?: Review[] } = {}) {
  return <ReviewsBandClient reviews={reviews} />;
}

/* ------------------------------------------------------------------ */
/* Order CTA                                                           */
/* ------------------------------------------------------------------ */

export function OrderCta() {
  const perks = [
    { icon: Store, label: "Pickup" },
    { icon: Bike, label: "Delivery" },
    { icon: Leaf, label: "Catering" },
  ];
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-card px-[22px] py-[56px] tablet:px-[48px] tablet:py-[72px] desktop:px-[80px]">
          <span
            aria-hidden="true"
            className="a-float pointer-events-none absolute -right-[36px] -top-[64px] select-none font-display text-[220px] font-bold leading-none text-sage-100 tablet:text-[300px]"
          >
            k
          </span>
          <div className="relative grid items-end gap-[36px] desktop:grid-cols-[1.3fr_0.7fr] desktop:gap-[64px]">
            <div>
              <Eyebrow>Skip the line</Eyebrow>
              <h2 className="t-h2 mt-[14px] text-balance">
                Hungry? Your bowl is already half made.
              </h2>
              <p className="mt-[16px] max-w-[560px] text-[15px] leading-[1.7] text-muted-foreground">
                Order ahead from any of our three stores and your salad or bowl
                will be waiting at the counter when you walk in.
              </p>
            </div>
            <div className="flex flex-col items-start gap-[20px] desktop:items-end">
              <Link href="/menu" className={ctaClass("primary", "lg")}>
                Order online
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </Link>
              <ul className="flex flex-wrap gap-[10px]">
                {perks.map((perk) => (
                  <li
                    key={perk.label}
                    className="inline-flex items-center gap-[8px] rounded-full border border-border bg-background px-[14px] py-[8px] text-[12px] font-medium text-foreground"
                  >
                    <perk.icon
                      className="h-[14px] w-[14px] text-sage-600"
                      strokeWidth={2}
                    />
                    {perk.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export function LocationsHome() {
  return (
    <Section id="locations">
      <Reveal className="max-w-[720px]">
        <Eyebrow>Find us</Eyebrow>
        <h2 className="t-h2 mt-[14px] text-balance">
          Three stores, one standard.
        </h2>
        <p className="mt-[16px] text-[15px] leading-[1.7] text-muted-foreground">
          Every keke kitchen runs on the same morning prep list — same farms,
          same recipes, same no-shortcuts rule.
        </p>
      </Reveal>

      <div className="mt-[44px] grid gap-[16px] tablet:grid-cols-2 desktop:grid-cols-3">
        {locations.map((location, index) => {
          const address = `${location.street}, ${location.city}`;
          return (
            <Reveal key={location.id} delay={index * 110} className="h-full">
              <article className="flex h-full flex-col rounded-[20px] border border-border bg-card p-[26px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lift">
                <div className="flex items-start gap-[14px]">
                  <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                    <MapPin
                      className="h-[20px] w-[20px] text-sage-700"
                      strokeWidth={2}
                    />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-foreground">
                      {location.name}
                    </h3>
                    <p className="mt-[3px] text-[13px] leading-[1.6] text-muted-foreground">
                      {location.street}
                      <br />
                      {location.city}
                    </p>
                  </div>
                </div>

                <dl className="mt-[22px] space-y-[8px] border-t border-border pt-[18px]">
                  {location.hours.map((row) => (
                    <div
                      key={row.day}
                      className="flex items-baseline justify-between gap-[12px] text-[13px]"
                    >
                      <dt className="text-muted-foreground">{row.day}</dt>
                      <dd className="font-medium text-foreground">
                        {row.time}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={location.phoneHref}
                  className="mt-[18px] inline-flex items-center gap-[8px] text-[13px] font-semibold text-foreground"
                >
                  <Phone
                    className="h-[14px] w-[14px] text-sage-600"
                    strokeWidth={2}
                  />
                  {location.phone}
                </a>

                <div className="mt-[24px] flex flex-wrap gap-[10px] pt-[2px]">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-[8px] rounded-full border border-border px-[16px] py-[10px] text-[13px] font-semibold text-foreground transition-colors hover:border-sage-400 hover:bg-sage-50"
                  >
                    Get directions
                    <ArrowUpRight
                      className="h-[14px] w-[14px]"
                      strokeWidth={2.2}
                    />
                  </a>
                  <Link
                    href="/menu"
                    className={ctaClass("primary", "sm", "shadow-none")}
                  >
                    Order pickup
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* Sanity export: the full seasonal lineup used by sections above. */
export const homeProducts = products;
