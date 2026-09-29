import type { TestimonialsGridSection } from "@/site-schema/generated/types";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import TestimonialsGridView, {
  type TestimonialsGridProps,
} from "./view";

export const toProps = (
  section: TestimonialsGridSection,
): TestimonialsGridProps => ({
  id: section.id,
  eyebrow: section.content.eyebrow,
  title: section.content.title,
  description: section.content.description,
  items: section.content.items.map((item) => ({
    quote: item.quote,
    name: item.name,
    location: item.location,
    rating: item.rating,
    media: item.media ? resolveMedia(item.media) : undefined,
  })),
});

export default {
  id: "testimonials.grid",
  type: "testimonials",
  variant: "grid",
  toProps,
  render: (section: TestimonialsGridSection) => (
    <TestimonialsGridView {...toProps(section)} />
  ),
} as const;
