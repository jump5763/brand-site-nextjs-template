# Next.js Site Schema Template

Content pages render from `src/site-schema/current.json` through `src/app/[[...slug]]/page.tsx`. The same validated document drives Page metadata, canonical URLs, sitemap, and robots. Component implementations live under `src/sections` and `src/components`.

## Getting started

Use Node.js 20.9 or newer and the exact dependency versions in [package.json](package.json).

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by the development server. VS Code should use the workspace TypeScript version; restart its TypeScript server after dependency changes if stale diagnostics remain.

Both dev and build explicitly use Webpack. The development component tagger supplies CodeForma's source-location attributes; migrating the bundler requires verifying that integration. Production builds omit the attributes. Next.js 16 build does not run lint.

`.npmrc` keeps new dependencies exact, while `pnpm-lock.yaml` locks transitive resolution. Commit manifest and lockfile changes together.

## Authoring and implementation

Start with [AI_RULES.md](AI_RULES.md) and choose the content-editing, Page-composition, or Section-development Skill. The template's maintained references are:

- [Content contract](.agents/reference/content-contract.md): ownership, identities, links, products, media, and generation.
- [Shared Section components](.agents/reference/section-components-standard.md): Section, SiteContainer, SectionHeader, Eyebrow, and Body.
- [Heading hierarchy](.agents/reference/html-heading-hierarchy-standard.md): Page and nested semantics, IDs, accessible states, and acceptance.
- [Styling rules](.agents/reference/tailwind-css-best-practices.md): project tokens, breakpoints, and CSS boundaries.
- [Validation matrix](.agents/reference/validation.md): checks by change type and their practical limits.

Use the existing Schema as the content source. Shared layout helpers do not introduce new JSON fields or registered Section capabilities. Keep real Views and private logic beside their Section; Header/Footer belong to `src/components/layout`. Full ownership and scaffolding rules are in [Section package format](.agents/skills/create-section/references/section-format.md).

For framework and hosting details, consult the [Next.js documentation](https://nextjs.org/docs).
