import type { SiteDocument } from "./load-site";

export type ShellNavLink = { label: string; href: string };
export type ShellLocation = {
  id: string;
  name: string;
  street: string;
  city: string;
  hours: Array<{ time: string }>;
};

export type SiteShellProps = {
  navLinks: ShellNavLink[];
  locations: ShellLocation[];
  storeCount: number;
};

type Page = { id: string; path: string };
type HeaderContent = {
  navigation?: Array<{
    label: string;
    target?: { kind?: string; pageId?: string };
  }>;
};
type FooterContent = { navigation?: Array<{ label: string; href?: string }> };
type LocationContent = {
  locations?: Array<{
    id?: string;
    name?: string;
    address?: string;
    phone?: string;
    businessHours?: Array<{
      timePeriod?: Array<{ startTime?: string; endTime?: string }>;
    }>;
  }>;
};

function pagesOf(site: SiteDocument): Page[] {
  return Array.isArray(site.pages) ? (site.pages as Page[]) : [];
}

function pagePath(site: SiteDocument, pageId: string): string {
  const page = pagesOf(site).find((candidate) => candidate.id === pageId);
  if (!page) throw new Error(`SHELL_NAV_PAGE_UNKNOWN: ${pageId}`);
  return page.path;
}

function toTime(value?: string): string {
  if (!value) return "";
  const [hourValue, minute = "00"] = value.split(":");
  const hour = Number(hourValue);
  if (!Number.isFinite(hour)) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

function toLocation(
  location: NonNullable<LocationContent["locations"]>[number],
): ShellLocation {
  const address = typeof location.address === "string" ? location.address : "";
  const [street = "", ...cityParts] = address.split(",");
  const period = location.businessHours?.[0]?.timePeriod?.[0];
  const start = toTime(period?.startTime);
  const end = toTime(period?.endTime);
  return {
    id: location.id ?? "location",
    name: location.name ?? "Location",
    street: street.trim(),
    city: cityParts.join(",").trim(),
    hours: [{ time: start && end ? `${start} – ${end}` : "Open daily" }],
  };
}

export function createSiteShellProps(site: SiteDocument): SiteShellProps {
  const layout = site.layout as
    | {
        header?: { content?: HeaderContent };
        footer?: { content?: FooterContent };
      }
    | undefined;
  const headerNavigation = layout?.header?.content?.navigation ?? [];
  const navLinks = headerNavigation.map((link) => {
    if (link.target?.kind !== "page" || !link.target.pageId) {
      throw new Error(`SHELL_NAV_TARGET_INVALID: ${link.label}`);
    }
    return { label: link.label, href: pagePath(site, link.target.pageId) };
  });

  const footerNavigation = layout?.footer?.content?.navigation ?? [];
  const footerLinks = footerNavigation.filter(
    (link): link is { label: string; href: string } =>
      typeof link.href === "string",
  );
  const home = pagesOf(site).find((page) => page.id === "home");
  const locationSection = (
    home as
      | (Page & {
          sections?: Array<{
            type?: string;
            variant?: string;
            content?: LocationContent;
          }>;
        })
      | undefined
  )?.sections?.find(
    (section) => section.type === "locations" && section.variant === "map-list",
  );
  const locations = (locationSection?.content?.locations ?? []).map(toLocation);

  return {
    navLinks: navLinks.length ? navLinks : footerLinks,
    locations,
    storeCount: locations.length,
  };
}
