import type {
  HeroDefaultSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import type { HeroProps } from "./view";
import { resolveAction } from "@/site-schema/runtime/resolve-link";
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
