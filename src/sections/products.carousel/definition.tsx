import { toProduct } from "@/lib/catalog";
import {
  resolveAction,
  resolveLinkTarget,
} from "@/site-schema/runtime/resolve-link";
import type {
  ProductsCarouselSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import type { SeasonalProps } from "./view";
export const toProps = (
  section: ProductsCarouselSection,
  site: SiteDocument,
): SeasonalProps => ({
  ...section.content,
  action: resolveAction(section.content.action, site),
  products: seasonalProducts(section.content, site),
});
export default {
  id: "products.carousel",
  type: "products",
  variant: "carousel",
  toProps,
  render: (section: ProductsCarouselSection, site: SiteDocument) => (
    <View id={section.id} {...toProps(section, site)} />
  ),
} as const;

const seasonalProducts = (
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
