// Page sections, catalog groups, and the shared shell expose these anchors.
export function pageAnchors(site, page) {
  const anchors = new Set(["top"]);
  const footerId = site.layout?.footer?.content?.anchorId;
  if (footerId) anchors.add(footerId);
  for (const section of page.sections ?? []) {
    anchors.add(section.id);
    if (section.type === "menu" && section.variant === "catalog")
      for (const category of section.content.categories ?? [])
        anchors.add(category.id);
  }
  return anchors;
}
export function linkTargetError(site, target) {
  if (target.kind !== "page") return null;
  const page = site.pages.find((page) => page.id === target.pageId);
  if (!page) return "Unknown page id";
  if (
    target.fragment !== undefined &&
    (typeof target.fragment !== "string" ||
      !/^[A-Za-z0-9_-]+$/.test(target.fragment) ||
      !pageAnchors(site, page).has(target.fragment))
  )
    return "Unknown or invalid page anchor";
  return null;
}
