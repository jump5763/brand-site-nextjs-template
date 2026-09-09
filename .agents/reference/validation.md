# Validation and Acceptance

Apply checks to the actual change. Do not repeat full builds at every intermediate step.

## Matrix

| Change | Checks | Browser acceptance when available |
| --- | --- | --- |
| Content, metadata, media, shell, or theme data | schema:check, validate:site | Changed output, links/media, affected headings |
| Page paths or Section composition | schema:check, validate:site, final build | Affected routes, headings, layout, navigation |
| View, styling, shared component, renderer | typecheck, lint, final build; data checks if also changed | Affected consumers and relevant viewports/interactions |
| New Section, descriptor, contract, Definition identity | schema:generate, schema:check, validate:site, typecheck, lint, final build | An actual changed-capability instance and affected existing instances |
| Documentation or Skill only | References, source accuracy, Skill metadata, changed template examples | Only when needed to establish a disputed runtime fact |

Use package scripts: `pnpm schema:generate`, `pnpm schema:check`, `pnpm validate:site src/site-schema/current.json`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.

## Sequence and limits

- Generate when inputs to generated output change, before using new types. Text/CSS edits alone do not require regeneration.
- After structural/code checks, compose the intended instance and build the final result. Compiling an unused capability does not exercise its rendering. Extra builds need a concrete integration reason.
- Keep typecheck/build serial because build rewrites `.next/types`. For missing Next types, run `pnpm exec next typegen` before standalone typechecking; do not patch declarations.
- Preserve the Webpack scripts and phase-guarded development tagger unless migrating that integration. Next.js 16 build does not run lint. Reproducible installation uses exact dependencies and `pnpm install --frozen-lockfile`.

| Check | Scope |
| --- | --- |
| schema:check | Descriptor/contract/file-reference validity and generated-file consistency; not View behavior |
| validate:site | Data shape, identities, page/link/product rules, local files and remote host policy; not remote loading or DOM headings |
| typecheck / lint | Types and configured static rules; not appearance or interactions |
| build | Production compilation and current-route rendering; not visual acceptance or all interactive/unused-capability states |

## Evidence

- Compare output with the request at relevant breakpoints/states. Check changed media and controls; avoid unrelated viewport/control combinations.
- Apply the [heading standard](html-heading-hierarchy-standard.md) for composition or heading changes. Two distinct Hero instances can pass Schema validation while rendering two h1 elements.
- When Section boundaries change, verify IDs, heading associations, development source markers, and affected interactions.
- Report paths/instance IDs, checked viewports/states, outcomes, and limitations. Distinguish passed, failed, and unverified. Fix task-scope violations before claiming acceptance; unavailable browser checks remain unverified.
