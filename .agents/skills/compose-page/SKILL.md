---
name: compose-page
description: Compose v45 Site Schema content pages from registered Section capabilities using the single catch-all route and controlled validation.
---

# Compose a page

Use this Skill when adding a Page, changing Section order, or selecting an existing Section capability for a restaurant content page.

## Contract

- Keep the v45 top-level `siteId`, `siteUrl`, `theme`, `layout`, and `pages` shape.
- A Page has a stable `id`, normalized `path`, `metadata`, and ordered `sections`.
- Each Section uses a registered `type.variant` from `src/site-schema/generated/capabilities.json` and its local Contract.
- Do not add top-level `resources` or `schemaVersion`, or create a new fixed content route.
- All content pages render through `src/app/[[...slug]]/page.tsx`; sitemap and robots derive from the same loader.

## Workflow

1. Read [capability-catalog](references/capability-catalog.md) and select an installed Section.
   Inspect `src/site-schema/contracts/site-schema.schema.json` and the selected Section’s local `contract.schema.json` before changing Page structure.
2. Add or reorder a Page and Section instances in `src/site-schema/current.json`.
3. Preserve Section IDs, content ownership, and normalized internal links.
4. Run `schema:check`, `validate:site`, `typecheck`, and `build` when routing/rendering changes.

If no registered capability fits, use the Section creation workflow. Do not invent component paths in page JSON or execute arbitrary shell commands.
