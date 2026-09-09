import type { ReviewsCarouselSection } from "@/site-schema/generated/types";
import View from "./view";
import type { ReviewsProps } from "./view";
export const toProps = (section: ReviewsCarouselSection): ReviewsProps =>
  section.content;
export default {
  id: "reviews.carousel",
  type: "reviews",
  variant: "carousel",
  toProps,
  render: (section: ReviewsCarouselSection) => (
    <View id={section.id} {...toProps(section)} />
  ),
} as const;
