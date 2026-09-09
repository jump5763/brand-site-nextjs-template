import type { ProductsCarouselSection } from "@/site-schema/generated/types";
import type { ResolvedAction } from "@/site-schema/runtime/resolve-link";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { money, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export type SeasonalProps = Omit<
  ProductsCarouselSection["content"],
  "action" | "products"
> & { action: ResolvedAction; products: Array<Product & { href: string }> };

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

export default function ProductsCarouselView({
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
