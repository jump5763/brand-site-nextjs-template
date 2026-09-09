# Content contract reference

The source of truth is `src/site-schema/current.json`. Its structure is defined by `src/site-schema/contracts/site-schema.schema.json` and each Section’s local `contract.schema.json`.

`pages[].metadata` owns title, description, canonical path, robots, OpenGraph, and JSON-LD. `pages[].sections[].content` owns section copy, media, links, products, categories, locations, and reviews. `layout.header.content` and `layout.footer.content` own shell navigation and contact data. `theme.fonts` and `theme.colors` use the v45 theme contract.

There is no top-level `resources` collection and no `schemaVersion`. Repeated data remains in Section content; runtime indexes are derived and never written back to JSON.

Use only these controlled checks as appropriate:

```text
schema:check
validate:site src/site-schema/current.json
typecheck (when renderer or adapter code changes)
build (when routing or rendering changes)
```

Sitemap and robots use the same validated document. Pages with `metadata.robots.index === false` are excluded from the sitemap; noindex is not converted into a robots disallow rule.
