# Tailwind CSS Best Practices

This document defines the Tailwind styling rules for `packages/keke-brand-site/**` and `packages/components/**`.

## 1. Core Principles

1. Compose Tailwind utilities directly in JSX by default.
2. Use tokens or component variants for reusable design values. Use arbitrary values only for one-off design facts.
3. Keep every Tailwind class as a complete, statically detectable source string.
4. Extract repeated UI styles into React components or CVA variants. Do not use `@apply` to imitate components.
5. Use the repository authorities for colors, typography, spacing, containers, z-index, and breakpoints.
6. Implement interaction, focus, disabled, and reduced-motion states with the base styles.

## 2. Styling Authorities

### Theme

Theme values follow this one-way chain:

```text
Site Schema Theme
  -> packages/keke-brand-site/src/site-runtime/theme.ts
  -> CSS variables
  -> packages/keke-brand-site/tailwind.config.mjs
  -> Tailwind utilities
  -> components
```

Components must not read Site Schema theme values directly or copy theme colors.

Prefer the existing authorities:

- semantic colors: `background`, `foreground`, `surface`, `border`, and `overlay`;
- brand scales: `primary-*`, `secondary-*`, `black-*`, and `white`;
- typography: `font-body` and `font-heading`;
- layout variables: `--site-container-max`, `--site-gutter`, and `--site-section-space-*`;
- z-index variables: `--z-header`, `--z-overlay`, and `--z-dialog`.

Shared components must not introduce fixed brand colors:

```tsx
// Bad
className="bg-[#f4f0ff] text-[#111827]"

// Good
className="bg-surface text-foreground"
```

A value that changes with the Site Theme must be a CSS variable exposed through a Tailwind token.

### Responsive model

The only breakpoint authority is `tooling/harness-sites/keke-brand-site.mjs`:

| Variant | Range |
| --- | --- |
| base | Shared styles; the primary current design range is `431px-768px` |
| `mobile-xs` | Compact mobile overrides at `<=430px` |
| `tablet` | `>=769px` |
| `desktop` | `>=1024px` |
| `wide` | `>=1440px` |

Rules:

- TSX must use registered variants instead of repeating equivalent arbitrary breakpoints.
- Use `mobile-xs:` only for properties that genuinely differ on compact mobile.
- Use `tablet:`, `desktop:`, and `wide:` for progressive enhancement. Do not restate the complete base style at every breakpoint.
- Do not use `min-[768px]:` in place of `tablet:`.
- A CSS Module may use a media query only when it matches the Site Adapter boundary and is protected by a breakpoint test.

## 3. Class Definitions

Never construct Tailwind class fragments dynamically:

```tsx
// Bad
className={`bg-${color}-500`}
```

Map values to complete class strings:

```tsx
// Good
const colorClasses = {
  primary: "bg-primary-500 text-black-900",
  inverse: "bg-black-900 text-white",
};
```

Use a ternary for a simple branch and `cn()` for multiple styling dimensions:

```tsx
className={cn(
  "rounded-xl border",
  active ? "border-primary-500 bg-primary-500" : "border-black-300 bg-white",
  className,
)}
```

Rules:

- A reusable component that accepts `className` must call `cn(defaultClasses, className)`.
- Consumer `className` must be last so override intent is explicit.
- Do not rely on the written order of class tokens to resolve conflicts. Use `cn()` or remove the conflict.
- Keep a stable class order: layout, sizing, spacing, typography, colors, states, then responsive overrides.

## 4. Component Variants

Use CVA for finite, stable visual axes such as Button, Typography, Link, and Section variants.

```tsx
const styles = cva("base classes", {
  variants: {
    size: {
      sm: "...",
      md: "...",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
```

Rules:

- Variant values must be finite, named, reusable visual choices.
- Use `compoundVariants` when styles depend on multiple variant values.
- Keep a single-file boolean branch in `cn()` instead of creating a premature CVA abstraction.
- Do not use CVA to model business workflows, content data, or unbounded state.

## 5. Typography

Prefer the shared typography components:

- `Body`
- `Heading`
- `Display`

Rules:

- Repeated font-size, line-height, and weight combinations must become Typography variants.
- Consumers must not repeatedly override a complete existing Typography combination.
- A unique Hero, Display, or editorial heading may use a one-off `clamp()` or arbitrary font size.
- Regular components must not hardcode font family names.

## 6. Layout and Spacing

Pages and Sections should reuse:

- `SectionFrame`
- `SiteContainer`
- Section spacing profiles
- Site spacing and container CSS variables

Rules:

- Express Section outer spacing through `SectionFrame` or Site spacing tokens.
- Promote repeated container widths, control heights, and spacing values into tokens or component variants.
- Prefer repository z-index variables. Small local stacks may use values such as `z-10` and `z-20`.
- Do not copy the same screenshot-derived pixel set across multiple components.

## 7. Arbitrary Values

Use an arbitrary value only for a one-off design fact that project tokens cannot express.

Allowed cases:

- the exact position of a single decorative element;
- a specific media aspect ratio;
- `calc()`, `min()`, `max()`, or `clamp()`;
- a CSS variable bridge;
- a CSS property with no suitable Tailwind utility.

```tsx
// Good: runtime token
className="px-[var(--site-section-space-x)]"

// Good: unique geometry
className="grid-cols-[minmax(0,640px)_1fr]"
```

Promote the value to a token or variant when:

- it repeats across files;
- the same Typography combination repeats;
- it must change with the theme;
- it starts representing component state or business meaning.

## 8. Custom CSS

A CSS Module is appropriate for:

- keyframes and continuous animation;
- `prefers-reduced-motion` behavior;
- third-party DOM structures;
- selectors or layout algorithms that are materially clearer than an equivalent utility list.

Rules:

- CSS Modules must still use repository color, spacing, and z-index tokens.
- CSS Modules must not define breakpoints that conflict with the Site Adapter.
- Keep styles in JSX when a small utility list expresses them clearly.
- Every animation must provide reduced-motion behavior.
- Do not use `@apply` to extract React component styles.

## 9. Interaction States

Interactive components must define the applicable states together:

- `hover:`;
- `focus-visible:`;
- `disabled:`;
- `open:`, `group-open:`, or `data-[state=...]`;
- `motion-reduce:`.

Rules:

- Removing the native outline requires a clear `focus-visible` replacement.
- Focus indication must not depend on a subtle color change alone.
- A disabled state must prevent interaction and communicate the state visually.
- Animations and transforms must provide a reduced-motion fallback.
- Keep state styles beside the component or variant instead of scattering them across page consumers.

## 10. Content Scanning

Tailwind `content` must precisely cover the site source and shared component source.

- Do not use broad globs that scan the complete workspace or `node_modules`.
- Do not scan generated CSS.
- Update `content` when adding a new source extension that contains Tailwind classes.
- Use `safelist` only for content that cannot be scanned statically. Never use it to compensate for dynamic class construction.

## 11. Agent Implementation Checklist

Before completing a styling change, the Agent must confirm:

- [ ] Every class is a complete, statically detectable string.
- [ ] Conditional styles use a ternary, `cn()`, or CVA.
- [ ] Colors, typography, spacing, and z-index use repository tokens.
- [ ] Shared components introduce no fixed brand colors.
- [ ] Repeated values have become tokens or variants.
- [ ] Every arbitrary value represents a one-off design fact.
- [ ] Responsive styles use registered variants.
- [ ] `mobile-xs` is limited to compact-mobile overrides.
- [ ] Focus-visible, disabled, and reduced-motion states are complete.
- [ ] A changed component capability has a corresponding Storybook Story update.
- [ ] Site `check`, relevant tests, and required Storybook verification have run.
