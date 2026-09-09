import type { MenuCatalogSection } from "@/site-schema/generated/types";
import { MenuCatalogView, type MenuCatalogViewModel } from "./view";

export const toProps = (section: MenuCatalogSection): MenuCatalogViewModel =>
  section.content as unknown as MenuCatalogViewModel;
const definition = {
  id: "menu.catalog" as const,
  type: "menu" as const,
  variant: "catalog" as const,
  toProps,
  render: (section: MenuCatalogSection) => (
    <MenuCatalogView {...toProps(section)} />
  ),
};
export default definition;
