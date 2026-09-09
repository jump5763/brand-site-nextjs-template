import type {
  CtaBannerSection,
  SiteDocument,
} from "@/site-schema/generated/types";
import View from "./view";
import { resolveAction, type OrderProps } from "@/lib/home-view-model";
export const toProps = (
  section: CtaBannerSection,
  site: SiteDocument,
): OrderProps => ({
  ...section.content,
  action: resolveAction(section.content.action, site),
});
export default {
  id: "cta.banner",
  type: "cta",
  variant: "banner",
  toProps,
  render: (section: CtaBannerSection, site: SiteDocument) => (
    <View id={section.id} {...toProps(section, site)} />
  ),
} as const;
