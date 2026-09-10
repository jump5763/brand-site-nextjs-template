import type { IngredientsDefaultSection } from "@/site-schema/generated/types";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import IngredientsDefaultView, {
  type IngredientsDefaultProps,
} from "./view";

export const toProps = (
  section: IngredientsDefaultSection,
): IngredientsDefaultProps => ({
  id: section.id,
  eyebrow: section.content.eyebrow,
  title: section.content.title,
  description: section.content.description,
  note: section.content.note,
  media: resolveMedia(section.content.media),
  mediaSecondary: section.content.mediaSecondary
    ? resolveMedia(section.content.mediaSecondary)
    : undefined,
  items: section.content.items,
});

export default {
  id: "ingredients.default",
  type: "ingredients",
  variant: "default",
  toProps,
  render: (section: IngredientsDefaultSection) => (
    <IngredientsDefaultView {...toProps(section)} />
  ),
} as const;
