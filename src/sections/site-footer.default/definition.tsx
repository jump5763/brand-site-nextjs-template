import type {
  SiteDocument,
  SiteFooterDefaultSection,
} from "@/site-schema/generated/types";
import { resolveAction, resolveLinkTarget } from "@/site-schema/runtime/resolve-link";
import SiteFooterView, { type SiteFooterProps } from "./view";

export const toProps = (
  section: SiteFooterDefaultSection,
  site: SiteDocument,
): SiteFooterProps => ({
  id: section.id,
  brandName: section.content.brandName,
  tagline: section.content.tagline,
  social: section.content.social?.map((item) => ({
    label: item.label,
    icon: item.icon,
    href: resolveLinkTarget(item.target, site),
  })),
  explore: {
    title: section.content.explore.title,
    links: section.content.explore.links.map((link) => ({
      label: link.label,
      href: resolveLinkTarget(link.target, site),
    })),
  },
  hours: section.content.hours,
  visit: section.content.visit,
  backToTop: section.content.backToTop
    ? resolveAction(section.content.backToTop, site)
    : undefined,
  legalNote: section.content.legalNote,
});

export default {
  id: "site-footer.default",
  type: "site-footer",
  variant: "default",
  toProps,
  render: (section: SiteFooterDefaultSection, site: SiteDocument) => (
    <SiteFooterView {...toProps(section, site)} />
  ),
} as const;
