# Capability catalog reference

The generated catalog at `src/site-schema/generated/capabilities.json` is the authoritative list of installed Section capabilities. It is derived from every local `src/sections/*/section.json`, not only Sections currently used by `current.json`.

Before composing a Page, inspect the selected descriptor and local `contract.schema.json`. Keep `type`, `variant`, `id`, and ordered `content` fields consistent with that Contract. A registered but unused capability can be selected without changing generated files.

If the capability is absent, create a complete local Section package with descriptor, Contract, Definition, View, and necessary Client Island. Run `schema:generate` followed by `schema:check` before adding a Page instance.

Verification layers:

- Content edit: `schema:check` and `validate:site`.
- Page composition: `schema:check`, `validate:site`, and build when routes change.
- New Section: `schema:generate`, `schema:check`, `validate:site`, typecheck, and build.
- SEO: verify canonical URL, sitemap inclusion/noindex exclusion, and robots sitemap URL all use `siteUrl`.
