# Site Schema Standard

Status: normative

This document is the current Harness development standard for Agents and humans who author, validate, and build a registered Site's Site Schema. The selected Site's `CONTEXT.md` defines domain language but does not replace this standard.

The words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are normative.

## Authority and strategy

- One Site Schema MUST describe exactly one independently built Site.
- One ordinary Site Build MUST consume the Schema currently selected by that Site's Schema Source.
- JSON Schema MUST be the sole editable data Contract authority. TypeScript data types, deterministic validation, and other machine views MUST derive from the composed Site Schema Contract.
- The shared Harness at the workspace root remains the only task control plane. A Site package MUST NOT create a second Harness runtime or policy tree.

## Schema update target and design input

Before authoring a Site Schema change, the user MUST explicitly provide exactly one Schema Update Target:

- an existing Page identified by stable Page ID; or
- a new Page identified by its intended Page Path.

The Agent MUST NOT infer the target from a Figma frame name, visible copy, route resemblance, or file name. If a Figma target and written requirement materially conflict for the same Page, the Agent MUST describe the conflict and wait for the user's decision; it MUST NOT assign an implicit source priority or add an automatic conflict detector.

The Page Authoring Agent runs as an external interactive workflow. The Site runtime MUST NOT expose embedded AI authoring, background authoring jobs, or automatic Figma synchronization.

## Page Authoring workflow and artifacts

Page Authoring MUST use two ordered interactions:

1. research the explicit Page target, inspect the Section Capability Catalog, decompose semantic responsibilities, and write a Page Blueprint;
2. produce the Media Plan, formal Schema Draft, Draft Overlay, and promotion inputs.

The Page Blueprint is mandatory. Direct reuse of existing Section Definitions MUST continue without an extra approval pause. The Agent MUST pause only when Catalog evidence shows that a Section Extension is required, and MUST wait for explicit confirmation of that named Extension Proposal.

The following files are task-local JSON authority under `.agents/artifacts/<task-id>/`:

- `page-blueprint.json`;
- `media-plan.json`;
- `schema-draft.json`;
- `draft-overlay.json`;
- `validation-report.json`; and
- `schema-diff.json`.
- When strict Figma visual acceptance is explicitly enabled, the `figmaDesignEvidence` embedded in `page-blueprint.json` is the authoritative design fact, and the task-local `figma-mapping.json` may only be projected from the READY Blueprint's Structured Roles.

They MUST NOT be written under runtime source, immutable version, or public directories. Markdown MAY explain an artifact but MUST NOT replace its JSON identity or data.

Figma Design Evidence MUST be completed before Section Capability Match. It records Scope, Design Regions, Semantic Roles, per-viewport visibility, Figma Nodes, Evidence Channels, independent behavior, responsive behavior, uncertainties, and auditable exclusions. It MUST NOT contain component, Catalog, Definition, DOM Selector, CSS Class, or Match Decision fields. A strict Mapping MUST use version `4.0`, bind the current Blueprint digest and Structured Role Fingerprint, and contain exactly one target per projected Role and confirmed viewport. There is no independent Inventory or Coverage artifact.

The current Draft Overlay MAY record field-level Authoring Placeholders only. Page, Section, order, `type`, `variant`, Layout, or other structural changes MUST remain in the Schema Draft and Candidate flow. A Placeholder MUST NOT enter a Candidate Schema Version, Page response, or `/api/schema` response.

## Site Schema and Candidate rules

The complete Site Schema Contract MUST compose core Site, Theme, Layout, Page, Metadata, Link, and Media JSON Schemas with the discriminated union of independent Section Content Contracts.

Every Candidate Schema Version MUST be an immutable, complete Site description containing:

- `siteId` and `siteUrl`;
- the Site Theme values for renderer-owned semantic Theme Tokens;
- one Site Layout with shared Header and Footer configuration; and
- every Page with stable Page ID, normalized unique Page Path, Page Metadata, and ordered Sections.

Candidate authoring MUST NOT mutate an immutable version or `current.json`. Page IDs MUST remain stable when paths change. Internal links MUST identify the target Page by Page ID and MAY add a fragment; external links MUST remain explicit URLs. Missing Page Metadata MUST be deterministically derived into the Candidate without a separate approval step.

Header and Footer belong to Site Layout, not Page Sections. Layout and Section Media remain inline in the owning Contract. The Site Schema MUST NOT contain arbitrary component names, arbitrary CSS, unregistered Theme Tokens, a global media registry, Section Set, Generated Registry, Harness task paths, or Draft Overlay metadata.

## Section Contracts, Catalog, Definitions, and extensions

- Each Section `type + variant` MUST own one independent standard JSON Schema as its Section Content Contract.
- The Section Capability Catalog MUST be pure serializable evidence describing responsibility, supported behavior, responsive behavior, fit, and exclusion rules. It MUST NOT import React or decide matches automatically.
- Each registered `type + variant` MUST map to one Site-owned Section Definition that binds its Content Contract, Catalog identity, and Renderer Adapter.
- Renderer Adapters MUST directly import their shared Section component source and MUST NOT depend on a shared barrel or an all-Sections module.
- The Section Set MUST be the unique set of Definitions referenced by the Schema currently selected for an ordinary Site Build.
- The Generated Section Registry MUST statically import only that Section Set. Missing or duplicate Definitions MUST block the local build before a partial Registry is written.
- Runtime resolution MUST use a Generated Section Registry and MUST NOT discover or download arbitrary Section code at request time.

When existing capabilities cannot express a Blueprint responsibility, a confirmed Section Extension MUST include one independent Section Content Contract, Catalog and Definition Index entries, a Section Definition and Renderer Adapter, a reusable shared component when appropriate, a typed colocated Storybook story, deterministic tests, Review, and Harness Final PASS.

A non-serving Candidate MAY reference a confirmed Extension after its Contract, Catalog, Definition, Adapter, Storybook, and tests are complete, but the repository MUST NOT create a Candidate-specific Build, Artifact, or isolated Runtime.

## Media and Figma assets

- Image and video descriptions MUST remain inline in the Section that owns them.
- Each media object MUST carry one Media Location and content semantics such as image alt text or video title. Width and height SHOULD be included when known.
- A Media Location MUST be either a Site Media Path under `/media/` or an explicit HTTPS URL. HTTP and non-web URL schemes MUST NOT enter a Candidate or Serving Schema.
- Newly authored Site-owned media MUST live under the selected Site package's `public` directory and use content-addressed names such as `/media/<content-hash>.webp`. Legacy unchanged Site Media Paths MAY remain non-content-addressed.
- Externally-hosted media MAY use an explicit HTTPS URL. Its URL identifies a mutable external reference and MUST NOT be treated as byte-level content identity by Schema Digest, Build, or rollback.
- One Media URL Resolver MUST resolve Site Media Paths and preserve explicit HTTPS URLs for both images and videos.
- A shared React Icon is an implementation asset, not a media object. Its source SVG MUST be rendered as inline JSX in `packages/components/src/shared/icons/<Name>.tsx`; it MUST NOT be copied to a Site `public/media` directory, receive a Site Media Path, or appear in a Media Plan or Site Schema.
- This boundary does not apply to formal content media that happens to use SVG. If an authored Section needs an addressable SVG location, it remains an `image` media object and follows the Media Location rules above.
- Figma export of formal Site media MUST bind output to the task Media Plan and MUST NOT write directly to a Candidate or selected Contract. Component Icon export is component implementation work and is outside the Media Plan.
- Missing or unauthorized formal media MUST remain an explicit blocking Media Plan fact. The Agent MUST NOT search, guess, generate, or substitute media without user authority.

## Deterministic authoring validation

One current Site Schema Validator MUST enforce deterministic Contract shape, registered `type + variant`, Page and Section identities, normalized unique paths, Link Targets, Metadata, media semantics and availability, zero unresolved Placeholders, and Contract-to-Definition consistency.

Draft promotion and Candidate promotion MUST call the same current Site Schema Validator. A Validation Report MUST bind the Candidate content hash, Contract digest, Validator version, and applicable Media Plan digest; any change makes the report stale.

Editorial quality, Page decomposition judgment, Section reuse semantics, visual fidelity, and brand expression MUST remain human review concerns. The Validator MUST NOT become an automatic taste, quality, or Section matching engine. Alternative Validator versions MUST NOT be loaded to bypass the current authoring Contract.

Runtime Page readers and `/api/schema` MUST directly read the currently selected Contract without running the complete authoring Validator. They MUST NOT fall back to an older version or inject an Authoring Placeholder, default media, or other fallback content.

## Normal selected-Schema Build

- `pnpm schema:registry` MUST generate the Section Set and Generated Section Registry from the Schema currently selected by `current.json` in the configured Schema Source directory.
- Static parameters, Page Metadata, Section Set, Generated Section Registry, rendered HTML, and `/api/schema` build state MUST derive from that selected Schema input.
- `generateStaticParams` MUST enumerate every Page in that input. Dynamic parameters MAY remain enabled for runtime ISR behavior.
- The root Layout MUST render exactly one shared Header before Page content and one shared Footer after it.
- Schema Route, metadata, Route Handlers, ISR readers, and build readers MUST use the same server-side Schema Source Adapter. Server rendering MUST NOT call the Site's own API over HTTP.
- `pnpm build` and `pnpm start` are ordinary Site commands. They MUST NOT accept a Candidate ID, create a Candidate Artifact, start an isolated Candidate Runtime, or modify `current.json`.

The Schema Structure Fingerprint MAY classify differences and support diagnostics. It MUST NOT create an isolated Candidate Build path.

## Completion checklists

### Page Authoring

- Confirm the explicit Page target and resolve input conflicts.
- Write the Page Blueprint before the Schema Draft.
- Record Catalog reuse/exclusion evidence and pause only for a required Extension.
- Keep all Page Authoring JSON artifacts task-local.
- Resolve every Placeholder and formal media dependency before promotion.
- Promote only a complete immutable Candidate with current Validation Report and Schema Diff.

### Section Extension and normal Build

- Require explicit confirmation of the named Extension Proposal.
- Add Contract, Catalog, Definition, Adapter, Storybook story, and tests as one capability.
- Regenerate types and the Section Set Registry from the Schema selected for the ordinary Build.
