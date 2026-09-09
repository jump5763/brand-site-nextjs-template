import type {
  HeroDefaultSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import { resolveAction, type HeroProps } from "@/lib/home-view-model";
export const toProps = (
  section: HeroDefaultSection,
  site: SiteDocument,
): HeroProps => ({
  ...section.content,
  primaryAction: resolveAction(section.content.primaryAction, site),
  secondaryAction: resolveAction(section.content.secondaryAction, site),
});
export default {
  id: "hero.default",
  type: "hero",
  variant: "default",
  toProps,
  render: (section: HeroDefaultSection, site: SiteDocument) => (
    <View id={section.id} {...toProps(section, site)} />
  ),
} as const;
