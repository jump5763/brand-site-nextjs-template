import type {
  SiteDocument,
  SiteAction,
  HeroDefaultSection,
  FeaturesIconGridSection,
  ProductsCarouselSection,
  StorySplitSection,
  ReviewsCarouselSection,
  CtaBannerSection,
  LocationsMapListSection,
} from "@/site-schema/generated/types";
import { resolveLinkTarget } from "@/site-schema/runtime/resolve-link";
import { toProduct, type Product } from "./catalog";
export { money } from "./catalog";
export type { Product } from "./catalog";
export type { CustomerReview as Review } from "@/site-schema/generated/types";
export type Action = { label: string; href: string };
export const resolveAction = (
  action: SiteAction,
  site: SiteDocument,
): Action => ({
  label: action.label,
  href: resolveLinkTarget(action.target, site),
});
export type HeroProps = Omit<
  HeroDefaultSection["content"],
  "primaryAction" | "secondaryAction"
> & { primaryAction: Action; secondaryAction: Action };
export type ValuesProps = FeaturesIconGridSection["content"];
export type SeasonalProps = Omit<
  ProductsCarouselSection["content"],
  "action" | "products"
> & { action: Action; products: Array<Product & { href: string }> };
export type FarmProps = Omit<StorySplitSection["content"], "action"> & {
  action: Action;
};
export type ReviewsProps = ReviewsCarouselSection["content"];
export type OrderProps = Omit<CtaBannerSection["content"], "action"> & {
  action: Action;
};
export type LocationsProps = Omit<
  LocationsMapListSection["content"],
  "action"
> & { action: Action };
export const seasonalProducts = (
  content: ProductsCarouselSection["content"],
  site: SiteDocument,
) =>
  content.products.map((product) => ({
    ...toProduct(product),
    href:
      content.action.target.kind === "page"
        ? resolveLinkTarget(
            { ...content.action.target, fragment: product.category },
            site,
          )
        : resolveLinkTarget(content.action.target, site),
  }));
