import type {
  StorySplitSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import type { FarmProps } from "./view";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
export const toProps = (
  section: StorySplitSection,
  site: SiteDocument,
): FarmProps => ({
  ...section.content,
  action: resolveAction(section.content.action, site),
});
export default {
  id: "story.split",
  type: "story",
  variant: "split",
  toProps,
  render: (section: StorySplitSection, site: SiteDocument) => (
    <View id={section.id} {...toProps(section, site)} />
  ),
} as const;
