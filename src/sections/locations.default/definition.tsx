import type {
  LocationsDefaultSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
import LocationsDefaultView, {
  type LocationsDefaultProps,
} from "./view";

export const toProps = (
  section: LocationsDefaultSection,
  site: SiteDocument,
): LocationsDefaultProps => ({
  id: section.id,
  eyebrow: section.content.eyebrow,
  title: section.content.title,
  description: section.content.description,
  mapNote: section.content.mapNote,
  stores: section.content.stores.map((store) => ({
    name: store.name,
    address: store.address,
    phone: store.phone,
    hours: store.hours,
    mapQuery: store.mapQuery,
    mapZoom: store.mapZoom,
    directions: store.directions
      ? resolveAction(store.directions, site)
      : undefined,
  })),
});

export default {
  id: "locations.default",
  type: "locations",
  variant: "default",
  toProps,
  render: (section: LocationsDefaultSection, site: SiteDocument) => (
    <LocationsDefaultView {...toProps(section, site)} />
  ),
} as const;
