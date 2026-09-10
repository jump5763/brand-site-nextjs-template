import type {
  PageHeroOverlaySection,
  SiteDocument,
} from "@/site-schema/generated/types";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
import { resolveMedia } from "@/site-schema/runtime/resolve-media";
import PageHeroOverlayView, { type PageHeroOverlayProps } from "./view";

export const toProps = (
  section: PageHeroOverlaySection,
  site: SiteDocument,
): PageHeroOverlayProps => ({
  id: section.id,
  eyebrow: section.content.eyebrow,
  headline: section.content.headline,
  subheadline: section.content.subheadline,
  image: resolveMedia(section.content.media),
  primaryAction: resolveAction(section.content.primaryAction, site),
  secondaryAction: section.content.secondaryAction
    ? resolveAction(section.content.secondaryAction, site)
    : undefined,
  highlights: section.content.highlights,
});

export default {
  id: "page-hero.overlay",
  type: "page-hero",
  variant: "overlay",
  toProps,
  render: (section: PageHeroOverlaySection, site: SiteDocument) => (
    <PageHeroOverlayView {...toProps(section, site)} />
  ),
} as const;
