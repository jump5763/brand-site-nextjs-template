# AI Development Rules

This document outlines the technology stack and specific library usage guidelines for this Next.js application. Adhering to these rules will help maintain consistency, improve collaboration, and ensure the AI assistant can effectively understand and modify the codebase.

## Tech Stack Overview

The application is built using the following core technologies:

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **UI Components**: Shadcn/UI - A collection of re-usable UI components built with Radix UI and Tailwind CSS.
*   **Styling**: Tailwind CSS - A utility-first CSS framework for rapid UI development.
*   **Icons**: Lucide React - A comprehensive library of simply beautiful SVG icons.
*   **Forms**: React Hook Form for managing form state and validation, typically with Zod for schema validation.
*   **State Management**: Primarily React Context API and built-in React hooks (`useState`, `useReducer`).
*   **Notifications/Toasts**: Sonner for displaying non-intrusive notifications.
*   **Charts**: Recharts for data visualization.
*   **Animation**: `tailwindcss-animate` and animation capabilities built into Radix UI components.

## Library Usage Guidelines

To ensure consistency and leverage the chosen stack effectively, please follow these rules:

1.  **UI Components**:
    *   **Primary Choice**: Always prioritize using components from the `src/components/ui/` directory (Shadcn/UI components).
    *   **Custom Components**: If a required component is not available in Shadcn/UI, create a new component in `src/components/` following Shadcn/UI's composition patterns (i.e., building on Radix UI primitives and styled with Tailwind CSS).
    *   **Avoid**: Introducing new, third-party UI component libraries without discussion.

2.  **Styling**:
    *   **Primary Choice**: Exclusively use Tailwind CSS utility classes for all styling.
    *   **Global Styles**: Reserve `src/app/globals.css` for base Tailwind directives, global CSS variable definitions, and minimal base styling. Avoid adding component-specific styles here.
    *   **CSS-in-JS**: Do not use CSS-in-JS libraries (e.g., Styled Components, Emotion).

3.  **Icons**:
    *   **Primary Choice**: Use icons from the `lucide-react` library.

4.  **Forms**:
    *   **Management**: Use `react-hook-form` for all form logic (state, validation, submission).
    *   **Validation**: Use `zod` for schema-based validation with `react-hook-form` via `@hookform/resolvers`.

5.  **State Management**:
    *   **Local State**: Use React's `useState` and `useReducer` hooks for component-level state.
    *   **Shared/Global State**: For state shared between multiple components, prefer React Context API.
    *   **Complex Global State**: If application state becomes significantly complex, discuss the potential introduction of a dedicated state management library (e.g., Zustand, Jotai) before implementing.

6.  **Routing**:
    *   Utilize the Next.js App Router (file-system based routing in the `src/app/` directory).

7.  **API Calls & Data Fetching**:
    *   **Client-Side**: Use the native `fetch` API or a simple wrapper around it.
    *   **Server-Side (Next.js)**: Leverage Next.js Route Handlers (in `src/app/api/`) or Server Actions for server-side logic and data fetching.

8.  **Animations**:
    *   Use `tailwindcss-animate` plugin and the animation utilities provided by Radix UI components.

9.  **Notifications/Toasts**:
    *   Use the `Sonner` component (from `src/components/ui/sonner.tsx`) for all toast notifications.

10. **Charts & Data Visualization**:
    *   Use `recharts` and its associated components (e.g., `src/components/ui/chart.tsx`) for displaying charts.

11. **Utility Functions**:
    *   General-purpose helper functions should be placed in `src/lib/utils.ts`.
    *   Ensure functions are well-typed and serve a clear, reusable purpose.

12. **Custom Hooks**:
    *   Custom React hooks should be placed in the `src/hooks/` directory (e.g., `src/hooks/use-mobile.tsx`).

13. **TypeScript**:
    *   Write all new code in TypeScript.
    *   Strive for strong typing and leverage TypeScript's features to improve code quality and maintainability. Avoid using `any` where possible.

By following these guidelines, we can build a more robust, maintainable, and consistent application.

## Site Schema contract

This template uses the Site Schema Site Schema as its content contract. Preserve the top-level `siteId`, `siteUrl`, `theme`, `layout`, and `pages` keys in `src/site-schema/current.json`. Product, category, location, review, metadata, and Section data stay under the owning Page Section `content`; never add top-level `resources` or `schemaVersion`.

All content pages render through the single `src/app/[[...slug]]/page.tsx` route. The validated document also supplies Page metadata, canonical URLs, `src/app/sitemap.ts`, and `src/app/robots.ts`. Use registered `type.variant` capabilities from `src/site-schema/generated/capabilities.json`.

Use only the controlled checks `schema:check`, `validate:site`, `typecheck`, and `build` when routing or rendering changes. Do not execute arbitrary shell from an Agent workflow or edit generated files by hand. Project workflows are documented in `.agents/skills/edit-site-content/SKILL.md` and `.agents/skills/compose-page/SKILL.md`.

## Section reuse and page acceptance

Reuse a Section only when its actual content structure, responsive layout, media, interactions, and action destinations satisfy the request. Brand consistency comes from shared design tokens, base components, and interaction conventions; it does not require identical page layouts. Repeat a Section when appropriate, without forcing unrelated content into its fields.

Follow `.agents/skills/compose-page/SKILL.md` to match requirements to capabilities. When a capability is missing, follow `.agents/skills/create-section/SKILL.md` to extend it compatibly or register a new Section before composition. Do not simplify explicit requirements to fit the current catalog or defer them as optional enhancements. Preserve existing page behavior when extending shared capabilities.

Before reporting completion, compare the page with the original requirements and attach relevant implementation and verification evidence. Valid JSON, successful rendering, or a completed tool call alone does not prove fulfillment. Report unmet requirements and failed or unavailable checks explicitly.
