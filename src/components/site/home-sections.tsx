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
  money,
  type Product,
  type HeroProps,
  type ValuesProps,
  type SeasonalProps,
  type FarmProps,
  type ReviewsProps,
  type OrderProps,
  type LocationsProps,
} from "@/lib/home-view-model";

const icons = {
  store: Store,
  leaf: Leaf,
  clock: Clock,
  sprout: Sprout,
  bike: Bike,
};

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

export function HeroHome({ id, ...content }: HeroProps & { id: string }) {
  return (
    <section
      id={id}
      className="overflow-hidden pb-[16px] pt-[20px] tablet:pt-[44px]"
    >
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
              {content.eyebrow}
            </p>
            <h1
              className="a-hero t-display mt-[28px] text-balance text-primary"
              style={heroDelay(90)}
            >
              {content.title}
            </h1>
            <p
              className="a-hero t-lead mt-[24px] max-w-[540px] text-muted-foreground"
              style={heroDelay(190)}
            >
              {content.description}
            </p>
            <div
              className="a-hero mt-[36px] flex flex-wrap items-center gap-[14px]"
              style={heroDelay(290)}
            >
              <Link
                href={content.primaryAction.href}
                className={ctaClass("primary", "lg")}
              >
                {content.primaryAction.label}
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </Link>
              <Link
                href={content.secondaryAction.href}
                className="group inline-flex items-center gap-[8px] rounded-full px-[18px] py-[14px] text-[15px] font-semibold text-foreground"
              >
                {content.secondaryAction.label}
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
              {content.benefits.map((benefit) => {
                const Icon = icons[benefit.icon];
                return (
                  <li
                    key={benefit.label}
                    className="flex items-center gap-[8px]"
                  >
                    <Icon
                      className="h-[15px] w-[15px] text-sage-600"
                      strokeWidth={2}
                    />
                    {benefit.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="a-hero" style={heroDelay(150)}>
            {/* Gentle float on the whole hero media area */}
            <div className="a-float h-[420px] tablet:h-[560px] desktop:h-[640px]">
              <HeroCarousel
                slides={content.media.map((media) => ({
                  src: media.path,
                  alt: media.alt,
                }))}
                {...content.carousel}
              />
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

export function ValuesStrip({ id, items }: ValuesProps & { id: string }) {
  return (
    <section id={id} className="pb-[16px] tablet:pb-[24px]">
      <div className="container-site">
        <div className="grid divide-y divide-border rounded-[24px] border border-border bg-card tablet:grid-cols-3 tablet:divide-x tablet:divide-y-0">
          {items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 110} className="h-full">
                <div className="flex h-full items-start gap-[16px] px-[24px] py-[22px]">
                  <span className="mt-[2px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                    <Icon
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
            );
          })}
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

function CompactProductCard({
  product,
  actionLabel,
}: {
  product: Product & { href: string };
  actionLabel: string;
}) {
  return (
    <Link
      href={product.href}
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
          {actionLabel}
          <ArrowUpRight
            className="h-[15px] w-[15px] transition-transform duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
            strokeWidth={2.2}
          />
        </span>
      </div>
    </Link>
  );
}

export function SeasonalRail({
  id,
  products,
  ...content
}: SeasonalProps & { id: string }) {
  return (
    <Section id={id} className="!py-[72px] tablet:!py-[104px]">
      <Reveal className="flex flex-col gap-[24px] tablet:flex-row tablet:items-end tablet:justify-between">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="t-h2 mt-[14px]">{content.title}</h2>
          <p className="mt-[14px] max-w-[460px] text-[15px] leading-[1.7] text-muted-foreground">
            {content.description}
          </p>
        </div>
        <Link
          href={content.action.href}
          className="group inline-flex w-fit shrink-0 items-center gap-[8px] rounded-full px-[14px] py-[12px] text-[14px] font-semibold text-foreground"
        >
          {content.action.label}
          <ArrowRight
            className="h-[16px] w-[16px] transition-transform group-hover:translate-x-[3px]"
            strokeWidth={2.2}
          />
        </Link>
      </Reveal>

      <div className="no-scrollbar -mx-[16px] mt-[36px] flex snap-x gap-[14px] overflow-x-auto px-[16px] pb-[10px] tablet:mx-0 tablet:px-0">
        {products.map((product, index) => (
          <Reveal
            key={product.id}
            delay={index * 100}
            className="w-[300px] shrink-0 snap-start tablet:w-[380px]"
          >
            <CompactProductCard
              product={product}
              actionLabel={content.productActionLabel}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Farm / ingredients                                                  */
/* ------------------------------------------------------------------ */

export function FarmSection({ id, ...content }: FarmProps & { id: string }) {
  return (
    <Section id={id}>
      <div className="grid items-center gap-[44px] desktop:grid-cols-2 desktop:gap-[96px]">
        <Reveal className="order-2 desktop:order-1">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[24px] border border-border bg-sage-100 desktop:aspect-[7/6] desktop:rounded-[28px]">
              <img
                src={content.media.path}
                alt={content.media.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-[12px] top-[22px] hidden rounded-[18px] border border-border bg-card p-[16px] shadow-lift tablet:block desktop:-right-[28px]">
              <p className="t-eyebrow text-[10px] text-sage-700">
                {content.ingredientsLabel}
              </p>
              <div className="mt-[10px] flex max-w-[220px] flex-wrap gap-[6px]">
                {content.ingredients.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-sage-100 px-[10px] py-[5px] text-[11px] font-medium text-sage-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="order-1 desktop:order-2">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="t-h2 mt-[14px] text-balance">{content.title}</h2>
          <p className="mt-[20px] text-[15px] leading-[1.75] text-muted-foreground">
            {content.description}
          </p>
          <ul className="mt-[28px] space-y-[16px]">
            {content.promises.map((promise) => (
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
              href={content.action.href}
              className={ctaClass("outline", "md", "shadow-none")}
            >
              {content.action.label}
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

export function ReviewsBand(props: ReviewsProps & { id: string }) {
  return <ReviewsBandClient {...props} />;
}

/* ------------------------------------------------------------------ */
/* Order CTA                                                           */
/* ------------------------------------------------------------------ */

export function OrderCta({ id, ...content }: OrderProps & { id: string }) {
  return (
    <Section id={id}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-card px-[22px] py-[56px] tablet:px-[48px] tablet:py-[72px] desktop:px-[80px]">
          <span
            aria-hidden="true"
            className="a-float pointer-events-none absolute -right-[36px] -top-[64px] select-none font-display text-[220px] font-bold leading-none text-sage-100 tablet:text-[300px]"
          >
            {content.monogram}
          </span>
          <div className="relative grid items-end gap-[36px] desktop:grid-cols-[1.3fr_0.7fr] desktop:gap-[64px]">
            <div>
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h2 className="t-h2 mt-[14px] text-balance">{content.title}</h2>
              <p className="mt-[16px] max-w-[560px] text-[15px] leading-[1.7] text-muted-foreground">
                {content.description}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[20px] desktop:items-end">
              <Link
                href={content.action.href}
                className={ctaClass("primary", "lg")}
              >
                {content.action.label}
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </Link>
              <ul className="flex flex-wrap gap-[10px]">
                {content.perks.map((perk) => {
                  const Icon = icons[perk.icon];
                  return (
                    <li
                      key={perk.label}
                      className="inline-flex items-center gap-[8px] rounded-full border border-border bg-background px-[14px] py-[8px] text-[12px] font-medium text-foreground"
                    >
                      <Icon
                        className="h-[14px] w-[14px] text-sage-600"
                        strokeWidth={2}
                      />
                      {perk.label}
                    </li>
                  );
                })}
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

export function LocationsHome({
  id,
  locations,
  ...content
}: LocationsProps & { id: string }) {
  return (
    <Section id={id}>
      <Reveal className="max-w-[720px]">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="t-h2 mt-[14px] text-balance">{content.title}</h2>
        <p className="mt-[16px] text-[15px] leading-[1.7] text-muted-foreground">
          {content.description}
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
                    {content.directionsLabel}
                    <ArrowUpRight
                      className="h-[14px] w-[14px]"
                      strokeWidth={2.2}
                    />
                  </a>
                  <Link
                    href={content.action.href}
                    className={ctaClass("primary", "sm", "shadow-none")}
                  >
                    {content.action.label}
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
