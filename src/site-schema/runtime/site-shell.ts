import type { SiteDocument } from "../generated/types";
import { resolveLinkTarget } from "./resolve-link";
import { resolveAction } from "@/lib/home-view-model";

export function createSiteShellProps(site: SiteDocument) {
  const header = site.layout.header.content;
  const footer = site.layout.footer.content;
  const target = footer.locationsTarget;
  if (target.kind !== "page") throw new Error("SHELL_LOCATIONS_TARGET_INVALID");
  const section = site.pages
    .find((page) => page.id === target.pageId)
    ?.sections.find((section) => section.id === target.fragment);
  if (
    !section ||
    section.type !== "locations" ||
    section.variant !== "map-list"
  )
    throw new Error("SHELL_LOCATIONS_SECTION_UNKNOWN");
  const homeHref = resolveLinkTarget({ kind: "page", pageId: "home" }, site);
  return {
    header: {
      ...header,
      navLinks: header.navigation.map((link) => resolveAction(link, site)),
      action: resolveAction(header.action, site),
      homeHref,
    },
    footer: {
      ...footer,
      navigation: footer.navigation.map((link) => resolveAction(link, site)),
      action: resolveAction(footer.action, site),
      locations: section.content.locations,
    },
  };
}
export type HeaderProps = ReturnType<typeof createSiteShellProps>["header"];
export type FooterProps = ReturnType<typeof createSiteShellProps>["footer"];
