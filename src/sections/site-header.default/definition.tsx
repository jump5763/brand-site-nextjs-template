import type {
  SiteDocument,
  SiteHeaderDefaultSection,
} from "@/site-schema/generated/types";
import { resolveAction, resolveLinkTarget } from "@/site-schema/runtime/resolve-link";
import SiteHeaderView, { type SiteHeaderProps } from "./view";

export const toProps = (
  section: SiteHeaderDefaultSection,
  site: SiteDocument,
): SiteHeaderProps => ({
  id: section.id,
  brandName: section.content.brandName,
  brandTagline: section.content.brandTagline,
  brandHref: section.content.brandTarget
    ? resolveLinkTarget(section.content.brandTarget, site)
    : "/",
  navigation: section.content.navigation.map((item) => ({
    label: item.label,
    href: resolveLinkTarget(item.target, site),
  })),
  action: resolveAction(section.content.action, site),
});

export default {
  id: "site-header.default",
  type: "site-header",
  variant: "default",
  toProps,
  render: (section: SiteHeaderDefaultSection, site: SiteDocument) => (
    <SiteHeaderView {...toProps(section, site)} />
  ),
} as const;
