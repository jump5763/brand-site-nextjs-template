import type { ReviewsCarouselSection } from "@/site-schema/generated/types";
import { ReviewsCarouselView, type ReviewsCarouselProps } from "./view";

export const toProps = (
  section: ReviewsCarouselSection,
): ReviewsCarouselProps => section.content as unknown as ReviewsCarouselProps;
const definition = {
  id: "reviews.carousel" as const,
  type: "reviews" as const,
  variant: "carousel" as const,
  toProps,
  render: (section: ReviewsCarouselSection) => (
    <ReviewsCarouselView {...toProps(section)} />
  ),
};
export default definition;
