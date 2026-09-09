---
name: compose-page
description: Compose Site Schema pages by matching requested content, layout, and interactions to Section capabilities, extending missing capabilities before composition.
---

# Compose a page

Use this Skill when adding a Page, changing Section order, or selecting an existing Section capability for a restaurant content page.

## Contract

- Keep the Site Schema top-level `siteId`, `siteUrl`, `theme`, `layout`, and `pages` shape.
- A Page has a stable `id`, normalized `path`, `metadata`, and ordered `sections`.
- Each Section uses a registered `type.variant` from `src/site-schema/generated/capabilities.json` and its local Contract.
- Do not add top-level `resources` or `schemaVersion`, or create a new fixed content route.
- All content pages render through `src/app/[[...slug]]/page.tsx`; sitemap and robots derive from the same loader.

## Workflow

1. Extract the requested modules and their acceptance criteria, including content structure, responsive layout, media, interactions, and action destinations. Keep the checklist proportional to the change.
2. Read [capability-catalog](references/capability-catalog.md) and apply its fit criteria. Inspect `src/site-schema/contracts/site-schema.schema.json` and each candidate's descriptor, local `contract.schema.json`, Definition, and View. Record the relevant requirement, selected capability, and any gap before editing.
3. Reuse capabilities that satisfy the request. For gaps, use `create-section` to extend a compatible capability or register a new one before composition. A missing capability is implementation work within the requested page, not an optional future enhancement.
4. Add or reorder Page and Section instances in `src/site-schema/current.json`. Preserve Section IDs, content ownership, and normalized internal links.
5. Run `schema:check` and `validate:site`; also run `typecheck` and `build` when routing/rendering changes. Verify requested layouts and interactions in the browser at the relevant viewport sizes when browser tools are available.
6. Reconcile the original acceptance criteria with the implementation and verification evidence. Report unmet or unverified items explicitly; successful rendering or valid JSON alone does not establish page completion. A completed tool call with a failing check is not a passed validation.

If no registered capability fits, use the Section creation workflow. Do not invent component paths in page JSON or execute arbitrary shell commands.

Default content belongs to this template’s original home page and Menu. v45 is only a structural/protocol reference, never the default business content. Keep brand consistency through shared design tokens, base components, and interaction conventions; preserve existing pages while allowing new page layouts that fulfill the request.
