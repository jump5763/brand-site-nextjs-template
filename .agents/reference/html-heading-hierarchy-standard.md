# HTML Heading Hierarchy

Required for Page composition and heading-affecting edits. The single-h1, main-first, and no-downward-skip rules are project conventions, not universal HTML syntax restrictions.

## Page outline

- In normal reading state, `main#main-content` has exactly one meaningfully named native h1, first among its headings in DOM reading order.
- Metadata, JSON field names, component names, and font sizes do not establish heading semantics. Inspect actual Definition/View output.
- Page-level groups use h2; nested groups advance one level, through h6. Returning upward may skip levels, e.g. h4 to h2. Equal ranks must represent equal responsibilities, not merely pass a numeric sequence check.
- Section/SiteContainer and native section/article wrappers do not choose or reset heading levels. Nesting wrappers does not demote h1.
- Headings introduce content groups. Prices, authors, ratings, descriptions, labels, and control text do not become headings just to look prominent.

## Composition and reuse

Record the Page path, h1 provider, Section root levels, and children in existing composition notes; no extra artifact or approval step is required. Verify these current facts against selected Views:

- Hero and Menu Catalog each emit fixed h1. Combining them unchanged or repeating Hero on one Page duplicates h1. Current `/` and `/about` use Hero; `/menu` uses Catalog.
- Products, Locations, Story, Reviews, and CTA use SectionHeader's default h2. Products/Locations also have h3 items; adapting nesting requires checking both root and children.
- Features uses non-heading labels. It cannot supply a missing h1 or a parent for later h3 content. Section and SiteContainer emit no headings.
- Display always renders h1. Heading separates `level` from `variant`; SectionHeader separates `headingLevel` from `headingClassName`. Body defaults to a paragraph.

The composition layer owns the outline; Definition/View passes typed context to components reused at multiple depths. Do not infer levels from pathname, content, index, or visual style. JSON has no generic headingLevel/titleLevel field: adapt a supported capability first.

If an optional parent heading disappears, determine children from the remaining ancestor. A parent with heading children cannot accept level 6; reorganize rather than generate h7 or clamp levels. Keep styling independent of semantics. Native headings may remain when shared presets do not fit; do not substitute neutral nodes or role=heading to avoid native semantics.

## Names and IDs

- Exposed headings need non-empty accessible names; whitespace/placeholders do not count. Do not hide the real Page title to fix duplicate h1 output.
- Derive IDs from instances, e.g. `${id}-heading` or `${id}-${item.id}-heading`, never a repeated capability ID such as `story.split-heading`.
- SectionHeader requires headingId; the caller supplies matching aria-labelledby to the owning Section. Check unique IDs and update associations when conditional headings disappear.
- aria-label may name a region but does not replace a required content heading. DOM heading IDs are not automatically [Schema fragments](content-contract.md).
- Concrete component usage follows the [Section standard](section-components-standard.md).

## Shell and accessible states

- Header/Footer cannot supply or duplicate the Page h1. Check their grouping outside the main sequence; current Footer contact content uses h2.
- Inspect Dialog/Sheet portals separately, usually rooted in DialogTitle/SheetTitle h2. Check normal Page and open-modal states; a modal hiding its background does not mean the Page lost its h1.
- Determine exposure from the accessibility tree and ancestor state. hidden/display:none/visibility:hidden/aria-hidden/inert content excluded from that tree is not in the exposed outline.
- `.sr-only` usually remains accessible. Opacity-zero Reveal content and off-screen carousel items are not automatically hidden from assistive technology. Screenshots, dimensions, or offsetParent alone cannot decide this.
- Responsive alternatives and decorative clones must not expose duplicate hierarchy. Preserve real content. Check relevant optional-title, filter/empty, and overlay states; error-page headings belong to their actual fallback state.

## Acceptance

With browser tools, inspect each affected route and relevant viewport/state for the correct h1, meaningful nesting, names, unique IDs, associations, accessible exposure, and intended typography/layout. Record the h1 provider and a representative outline using the [validation matrix](validation.md).

Schema/type/lint/build success does not prove DOM hierarchy. Browser heading counts are an initial check, not complete semantic/accessibility evidence. Fix violations within scope; label unavailable runtime checks unverified.

References: [WAI headings](https://www.w3.org/WAI/tutorials/page-structure/headings/), [G141](https://www.w3.org/WAI/WCAG22/Techniques/general/G141.html), [HTML sections](https://html.spec.whatwg.org/dev/sections.html).
