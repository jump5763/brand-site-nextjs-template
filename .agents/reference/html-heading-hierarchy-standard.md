# HTML Heading Hierarchy Standard

Status: normative

This document defines how Agents and humans must author and validate HTML heading hierarchy in rendered web pages and reusable UI components.

The words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are normative.

## Purpose

`h1` through `h6` communicate document hierarchy. Their level must describe the relationship between a page, its sections, and nested sections. Font size, weight, spacing, color, and visual prominence are separate presentation concerns.

## Page hierarchy

- The primary content of each rendered page MUST contain exactly one non-empty `h1`.
- The first heading in the primary content MUST be that `h1`.
- A top-level section below the page title MUST use `h2`. A nested section MUST use the next heading level relative to its parent section.
- Heading levels MUST NOT increase by more than one between consecutive headings in document order. Moving from a deeper level back to an ancestor level MAY skip levels.
- Content excluded from the accessibility tree MUST NOT contribute headings to the accessible page hierarchy.
- A heading MUST name the page or introduce a content section. Content that does not introduce a page or section MUST use an appropriate non-heading element.
- A page or section title MUST use a native heading element. A visually styled neutral element MUST NOT replace a native heading solely to avoid choosing the correct level.

## Semantic level and visual style

- Heading level MUST be selected from document hierarchy, never from the desired appearance.
- Visual style MUST be controlled independently from heading level.
- Changing a heading level MUST NOT implicitly change its visual style.
- Changing a visual style MUST NOT change the rendered heading element.
- Shared typography APIs that render headings MUST expose semantic level and visual style as separate inputs.

```tsx
<Heading level={2} variant="display-md">
  Section title
</Heading>
```

The example renders an `h2`; `display-md` controls presentation only.

## Reusable component responsibility

- The composition layer that knows a component's position in the page hierarchy MUST select the component's root heading level.
- A reusable component used at more than one hierarchy depth MUST receive its root heading level through an explicit, typed input. It MUST NOT infer that level from a route, pathname, visual variant, or content value.
- A component MAY derive nested heading levels from its root level when the relationship is structurally fixed.
- A nested heading MUST advance exactly one level from a rendered parent heading.
- When an optional parent heading is not rendered, its child headings MUST NOT advance as though that parent existed.
- A component that does not introduce a page or section MUST NOT emit a heading element.

```tsx
type ParentHeadingLevel = 1 | 2 | 3 | 4 | 5;

type ContentGroupProps = {
  title?: string;
  titleLevel: ParentHeadingLevel;
};

function nextHeadingLevel(level: ParentHeadingLevel): HeadingLevel {
  return (level + 1) as HeadingLevel;
}

function ContentGroup({title, titleLevel}: ContentGroupProps) {
  const itemTitleLevel = title
    ? nextHeadingLevel(titleLevel)
    : titleLevel;

  return (
    <section>
      {title ? (
        <Heading level={titleLevel} variant="display-md">
          {title}
        </Heading>
      ) : null}
      <Heading level={itemTitleLevel} variant="title-sm">
        Nested section title
      </Heading>
    </section>
  );
}
```

## Validation requirements

Component-level validation SHOULD prove that:

- semantic level selects the rendered `h1` through `h6` element;
- visual style can change without changing that element;
- semantic level can change without changing the selected visual style; and
- reusable components produce the expected parent and child levels for every supported nesting context.

Route-level browser validation SHOULD inspect the final rendered primary content and prove that:

- exactly one non-empty `h1` exists;
- the first heading is `h1`;
- every heading contains an accessible name;
- no downward heading-level jump exceeds one; and
- hidden or duplicated presentation content does not pollute the accessible hierarchy.

Changes to shared heading primitives or reusable components SHOULD validate every affected route and supported viewport. Visual verification SHOULD confirm that semantic corrections do not unintentionally change presentation.

## Review checklist

- Does every heading introduce the page or a section?
- Is each level determined by document hierarchy rather than appearance?
- Does the page contain exactly one `h1`?
- Are semantic level and visual style independent?
- Does the composition layer provide reusable components with enough hierarchy context?
- Do optional headings preserve a valid hierarchy when omitted?
- Do component and route tests verify the final rendered elements?
