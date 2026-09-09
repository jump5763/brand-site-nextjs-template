import type {
  ProductsCarouselSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import {
  resolveAction,
  seasonalProducts,
  type SeasonalProps,
} from "@/lib/home-view-model";
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
