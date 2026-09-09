import type { FeaturesMediaGridSection } from "@/site-schema/generated/types";
import { MediaGridView, type MediaGridProps } from "./view";

export const toProps = (section: FeaturesMediaGridSection): MediaGridProps =>
  section.content as unknown as MediaGridProps;
const definition = {
  id: "features.media-grid" as const,
  type: "features" as const,
  variant: "media-grid" as const,
  toProps,
  render: (section: FeaturesMediaGridSection) => (
    <MediaGridView {...toProps(section)} />
  ),
};
export default definition;
