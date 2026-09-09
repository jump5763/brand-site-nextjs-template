import type { LocationsFeaturedSingleSection } from "@/site-schema/generated/types";
import {
  LocationsFeaturedSingleView,
  type FeaturedLocationProps,
} from "./view";

export const toProps = (
  section: LocationsFeaturedSingleSection,
): FeaturedLocationProps => section.content as unknown as FeaturedLocationProps;
const definition = {
  id: "locations.featured-single" as const,
  type: "locations" as const,
  variant: "featured-single" as const,
  toProps,
  render: (section: LocationsFeaturedSingleSection) => (
    <LocationsFeaturedSingleView {...toProps(section)} />
  ),
};
export default definition;
