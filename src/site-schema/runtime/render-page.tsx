import React from "react";
import type { SiteDocument } from "./load-site";
import { renderSection } from "../generated";

export function resolvePage(site: SiteDocument, pathOrId: string) {
  const page = site.pages.find(
    (candidate) => candidate.id === pathOrId || candidate.path === pathOrId,
  );
  if (!page) throw new Error(`PAGE_UNKNOWN: ${pathOrId}`);
  return page;
}

export function renderPage(site: SiteDocument, pathOrId: string) {
  const page = resolvePage(site, pathOrId);
  return (
    <div data-page-id={page.id}>
      {page.sections.map((section) => (
        <React.Fragment key={section.id}>
          {renderSection(section, site)}
        </React.Fragment>
      ))}
    </div>
  );
}
