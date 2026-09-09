import type {
  MenuCatalogSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import { toProduct } from "@/lib/catalog";
import { resolveAction } from "@/lib/home-view-model";
import View from "./view";
export const toProps = (section: MenuCatalogSection, site: SiteDocument) => ({
  id: section.id,
  products: section.content.categories.flatMap((category) =>
    category.products.map(toProduct),
  ),
  categories: section.content.categories.map(({ id, label, description }) => ({
    id,
    label,
    description,
  })),
  hero: {
    ...section.content.hero,
    action: resolveAction(section.content.hero.action, site),
  },
  limitedDescription: section.content.limitedDescription,
  currency: section.content.currency,
});
export default {
  id: "menu.catalog",
  type: "menu",
  variant: "catalog",
  toProps,
  render: (section: MenuCatalogSection, site: SiteDocument) => (
    <View {...toProps(section, site)} />
  ),
} as const;
