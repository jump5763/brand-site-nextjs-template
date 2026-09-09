# Capability catalog reference

The generated catalog at `src/site-schema/generated/capabilities.json` is the authoritative list of installed Section capabilities. It is derived from every local `src/sections/*/section.json`, not only Sections currently used by `current.json`.

Before composing a Page, inspect the selected descriptor, local `contract.schema.json`, Definition, and View. Keep `type`, `variant`, `id`, and ordered `content` fields consistent with that Contract. A registered but unused capability can be selected without changing generated files.

## Capability fit

- Compare the request with the actual rendered content structure, desktop/tablet/mobile layout, media arrangement, interactions, and required actions. Check `useWhen` and `avoidWhen`; a conflicting restriction is a capability gap until resolved in the implementation and descriptor.
- Being able to store the copy in existing fields is insufficient. For example, a three-column process with step imagery cannot be replaced by a two-column story with a checklist; decorative badges cannot replace a requested secondary link.
- Repeating a Section type is allowed when each instance fits its purpose and the overall page meets the requested arrangement. Do not impose a repetition quota, force unrelated content into required fields, or invent facts to fill a template.
- Keep brand consistency through shared tokens, typography, containers, buttons, and interaction conventions. It does not require every page to repeat the same Section layouts.
- Reuse a fitting capability unchanged. Extend it compatibly when its meaning remains the same; introduce a variant or Section when the content structure or layout meaning differs. Preserve existing instances and update descriptors to match actual capabilities.

For a new capability, create a complete local Section package with descriptor, Contract, Definition, View, and necessary Client Island. For an extension, update the existing package consistently. Follow `create-section`, running `schema:generate` followed by `schema:check` before composing instances that use the changed capability. Never reduce explicit requirements merely to stay within the current catalog.

Verification layers:

- Content edit: `schema:check` and `validate:site`.
- Page composition: `schema:check`, `validate:site`, and typecheck/build when routing or rendering changes.
- New or extended Section: `schema:generate`, `schema:check`, `validate:site`, typecheck, and build; check affected existing instances for regressions.
- SEO: verify canonical URL, sitemap inclusion/noindex exclusion, and robots sitemap URL all use `siteUrl`.

Schema and build checks validate structural and technical properties, not fulfillment of the design brief. Compare the final page against the original requirements, using browser evidence for layout and interaction when available. Keep unmet requirements, unavailable checks, and failed checks visible in the final report instead of reclassifying them as optional follow-up work.

Implementation lives in each `src/sections/<type>.<variant>/view.tsx` and its private files. The shell lives in `src/components/layout`; primitives and shared UI live in `src/components/ui` and `src/components/shared`. Follow `create-section` for reuse discovery and extraction criteria instead of importing another Section’s private implementation.
