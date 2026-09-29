import type {
  SiteDocument,
  StorySplitSection,
} from "@/site-schema/generated/types";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import StorySplitView, { type StorySplitProps } from "./view";

export const toProps = (
  section: StorySplitSection,
  site: SiteDocument,
): StorySplitProps => ({
  id: section.id,
  eyebrow: section.content.eyebrow,
  title: section.content.title,
  paragraphs: section.content.paragraphs,
  media: resolveMedia(section.content.media),
  mediaSecondary: section.content.mediaSecondary
    ? resolveMedia(section.content.mediaSecondary)
    : undefined,
  stats: section.content.stats,
  action: section.content.action
    ? resolveAction(section.content.action, site)
    : undefined,
});

export default {
  id: "story.split",
  type: "story",
  variant: "split",
  toProps,
  render: (section: StorySplitSection, site: SiteDocument) => (
    <StorySplitView {...toProps(section, site)} />
  ),
} as const;
