import type { FeaturesIconGridSection } from "@/site-schema/generated/types";
import View from "./view";
import type { ValuesProps } from "./view";
export const toProps = (section: FeaturesIconGridSection): ValuesProps =>
  section.content;
export default {
  id: "features.icon-grid",
  type: "features",
  variant: "icon-grid",
  toProps,
  render: (section: FeaturesIconGridSection) => (
    <View id={section.id} {...toProps(section)} />
  ),
} as const;
