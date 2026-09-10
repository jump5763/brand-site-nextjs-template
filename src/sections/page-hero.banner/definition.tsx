import type { PageHeroBannerSection } from "@/site-schema/generated/types";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import PageHeroBannerView, { type PageHeroBannerProps } from "./view";

export const toProps = (section: PageHeroBannerSection): PageHeroBannerProps => ({
  id: section.id,
  eyebrow: section.content.eyebrow,
  title: section.content.title,
  description: section.content.description,
  image: resolveMedia(section.content.media),
  meta: section.content.meta,
});

export default {
  id: "page-hero.banner",
  type: "page-hero",
  variant: "banner",
  toProps,
  render: (section: PageHeroBannerSection) => (
    <PageHeroBannerView {...toProps(section)} />
  ),
} as const;
