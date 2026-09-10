import type {
  FeaturedDishesCarouselSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import FeaturedDishesCarouselView, {
  type FeaturedDishesCarouselProps,
} from "./view";

export const toProps = (
  section: FeaturedDishesCarouselSection,
  site: SiteDocument,
): FeaturedDishesCarouselProps => {
  const { content } = section;
  return {
    id: section.id,
    eyebrow: content.eyebrow,
    title: content.title,
    description: content.description,
    items: content.items.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      badge: item.badge,
      image: resolveMedia(item.media),
      action: item.action ? resolveAction(item.action, site) : undefined,
    })),
    action: content.action ? resolveAction(content.action, site) : undefined,
  };
};

export default {
  id: "featured-dishes.carousel",
  type: "featured-dishes",
  variant: "carousel",
  toProps,
  render: (section: FeaturedDishesCarouselSection, site: SiteDocument) => (
    <FeaturedDishesCarouselView {...toProps(section, site)} />
  ),
} as const;
