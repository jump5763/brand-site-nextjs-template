# Site Content Contract

For Schema data and contract edits. The editable document is [current.json](../../src/site-schema/current.json). Supported fields come from the [core contract](../../src/site-schema/contracts/site-schema.schema.json) and each Section's local contract.

## Ownership

| Change | Location |
| --- | --- |
| SEO title, description, canonical, robots, OpenGraph, JSON-LD | `pages[].metadata` |
| Section copy, products, categories, locations, reviews, media | `pages[].sections[].content` |
| Shared navigation and footer | `layout.header.content` / `layout.footer.content` |
| Fonts and colors | `theme` |
| Page paths or Section composition | `compose-page` workflow |

- Preserve the top-level `siteId`, `siteUrl`, `theme`, `layout`, and `pages` shape. Do not serialize resources registries, schemaVersion, runtime indexes, executable paths/functions, or undeclared presentation props.
- A **capability ID** is the descriptor's `type.variant`, e.g. `story.split`. A **Section instance ID**, e.g. `about-story`, is unique within its Page. Preserve identities during content edits.
- Page IDs and normalized paths are site-unique. Authorized identity/path changes must update dependent links. RootLayout currently relies on the `home` Page ID.
- Content Pages use [the catch-all route](../../src/app/[[...slug]]/page.tsx). Do not create fixed content routes or duplicate View defaults. Header/Footer remain outside Page Sections.

## Metadata and links

- Metadata requires title, description, and canonicalPath. The validator requires `canonicalPath === page.path`; metadata does not supply a visible h1.
- Paths start with `/`. Except `/` itself, reject trailing slashes, queries, fragments, whitespace, traversal segments, and application-reserved paths. See [validator.mjs](../../src/site-schema/runtime/validator.mjs) for exact rules.
- Internal actions use `{kind: "page", pageId, fragment?}`; external actions follow the declared target contract and [resolver](../../src/site-schema/runtime/resolve-link.ts).
- [link-policy.mjs](../../src/site-schema/runtime/link-policy.mjs) permits `top`, the footer anchor, Section instance IDs, and catalog category IDs as fragments. A DOM heading ID is not automatically a Schema link target.
- `metadata.robots.index: false` excludes a Page from sitemap, not through a robots disallow. Canonical and sitemap URLs derive from siteUrl.

## Products and media

- Repeated product IDs must have identical definitions. Update their copies within task scope; inconsistent copies fail with `PRODUCT_DEFINITION_CONFLICT`. Keep data under Section ownership rather than introducing a global registry.
- Catalog category IDs are unique; `all` is reserved. Products belong to their containing category; `limited` is a virtual filter, not an owning category.
- Current media objects are images with kind/path/alt. Another media kind needs a contract extension.
- `/media/...` must resolve to an existing file inside public/media, without traversal or escaping symlinks. Remote images require credential-free HTTPS on the [media allowlist](../../src/site-schema/runtime/media-policy.mjs).
- URL validity does not prove remote availability. Verify loading and appropriate alt text where relevant; do not invent media or business facts.

## Generated output

[schema:generate](../../scripts/generate-site-schema.mjs) scans **all local Section packages**, including unused capabilities, and generates contracts, types, Registry, and catalog. Never hand-edit these outputs or maintain another registry. The [loader](../../src/site-schema/runtime/load-site.ts) and CLI share the document Validator.

Use the [validation matrix](validation.md); composition and heading-affecting changes also follow the [heading standard](html-heading-hierarchy-standard.md).
