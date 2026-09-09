import type { LocationsMapListSection } from "@/site-schema/generated/types";
import { LocationsMapListView, type LocationMapListProps } from "./view";

export const toProps = (
  section: LocationsMapListSection,
): LocationMapListProps => section.content as unknown as LocationMapListProps;
const definition = {
  id: "locations.map-list" as const,
  type: "locations" as const,
  variant: "map-list" as const,
  toProps,
  render: (section: LocationsMapListSection) => (
    <LocationsMapListView {...toProps(section)} />
  ),
};
export default definition;
