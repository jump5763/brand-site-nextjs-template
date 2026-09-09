---
name: edit-site-content
description: Edit existing v45 Site Schema Page and Section content while preserving identity, ownership, and controlled validation boundaries.
---

# Edit site content

Use this Skill for copy, media, metadata, links, products, categories, locations, reviews, or other data owned by an existing Page Section.

## Contract

- Preserve the v45 top-level `siteId`, `siteUrl`, `theme`, `layout`, and `pages` keys in `src/site-schema/current.json`.
- Keep each value under its owning Page Section `content`. Do not add top-level `resources` or `schemaVersion`.
- Preserve Page `id`/`path` and Section `id`/`type`/`variant` unless the task explicitly changes composition.
- Content pages render through `src/app/[[...slug]]/page.tsx`; do not create a fixed route for a content edit.

## Workflow

1. Inspect the target Page and Section and read [content-contract](references/content-contract.md).
   Inspect `src/site-schema/contracts/site-schema.schema.json` and the selected `src/sections/<type>.<variant>/contract.schema.json` for the data contract.
2. Edit only the required `content` fields.
3. Run the controlled checks described in the reference.
4. Report changed Page/Section IDs and evidence.

The controlled entry points are `schema:check`, `validate:site`, `typecheck`, and `build` when routing or rendering changes.

Do not execute arbitrary shell commands, modify generated files by hand, or change client state such as filters and shopping-bag quantities through Site Schema.
