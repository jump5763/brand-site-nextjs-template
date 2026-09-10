import type { MenuCatalogDefaultSection } from "@/site-schema/generated/types";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import MenuCatalogDefaultView, {
  type MenuCatalogDefaultProps,
} from "./view";

export const toProps = (
  section: MenuCatalogDefaultSection,
): MenuCatalogDefaultProps => {
  const { content } = section;
  const categoryNames = new Set(
    content.categories.map((category) => category.name),
  );

  return {
    id: section.id,
    eyebrow: content.eyebrow,
    title: content.title,
    description: content.description,
    categories: content.categories.map((category) => ({
      name: category.name,
      description: category.description,
    })),
    items: content.items.map((item) => {
      if (!categoryNames.has(item.category)) {
        throw new Error("MENU_CATEGORY_UNKNOWN: " + item.category);
      }
      return {
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        tags: item.tags,
        metadata: item.metadata,
        badge: item.badge,
        image: resolveMedia(item.media),
      };
    }),
  };
};

export default {
  id: "menu-catalog.default",
  type: "menu-catalog",
  variant: "default",
  toProps,
  render: (section: MenuCatalogDefaultSection) => (
    <MenuCatalogDefaultView {...toProps(section)} />
  ),
} as const;
