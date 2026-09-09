import type {
  LocationsMapListSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import type { LocationsProps } from "./view";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
export const toProps = (
  section: LocationsMapListSection,
  site: SiteDocument,
): LocationsProps => ({
  ...section.content,
  action: resolveAction(section.content.action, site),
});
export default {
  id: "locations.map-list",
  type: "locations",
  variant: "map-list",
  toProps,
  render: (section: LocationsMapListSection, site: SiteDocument) => (
    <View id={section.id} {...toProps(section, site)} />
  ),
} as const;
