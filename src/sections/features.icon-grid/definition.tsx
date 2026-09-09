import type { FeaturesIconGridSection } from "@/site-schema/generated/types";
import { IconGridView, type IconGridProps } from "./view";

export const toProps = (section: FeaturesIconGridSection): IconGridProps =>
  section.content as unknown as IconGridProps;
const definition = {
  id: "features.icon-grid" as const,
  type: "features" as const,
  variant: "icon-grid" as const,
  toProps,
  render: (section: FeaturesIconGridSection) => (
    <IconGridView {...toProps(section)} />
  ),
};
export default definition;
