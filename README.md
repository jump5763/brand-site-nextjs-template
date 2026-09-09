This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Content pages are rendered from `src/site-schema/current.json` through the single catch-all route described below. Component code lives under `src/components/` and `src/sections/`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Site Schema

This template uses its own Site Schema; v45 is only a structural and protocol reference. Keep `siteId`, `siteUrl`, `theme`, `layout`, and `pages` at the top level of `src/site-schema/current.json`; products, categories, locations, reviews, and media remain under the owning Page Section `content`. Page metadata belongs to `pages[].metadata`; shell content belongs to `layout.header/footer`. Do not add `resources` or `schemaVersion`.

All content pages use the single `src/app/[[...slug]]/page.tsx` route. The same validated document drives metadata, canonical URLs, `sitemap.xml`, and `robots.txt`. Select registered Section capabilities from `src/site-schema/generated/capabilities.json`.

Run `pnpm schema:check` and `pnpm validate:site src/site-schema/current.json` after content changes. Run `pnpm typecheck`, `pnpm lint`, and `pnpm build` when code, routing, or rendering changes. Project workflows are documented in `.agents/skills/edit-site-content/SKILL.md` and `.agents/skills/compose-page/SKILL.md`.

Default content belongs to this template’s original home page and Menu. v45 is only a structural/protocol reference, never the default business content. Reuse the original components and preserve their visuals, responsive layout, and interactions.

## Source layout

- `src/sections/<type>.<variant>/`: descriptor, Contract, Definition, actual View, and private components/models. Hero’s carousel and Menu’s filtering model stay with their respective Sections.
- `src/components/ui/`: shared primitives.
- `src/components/layout/`: Header, Footer, and their private presentation helpers.
- `src/components/shared/`: established shared UI patterns, with direct imports and descriptive filenames.
- `src/site-schema/runtime/`: validation, loaders, link/media adapters, and rendering orchestration.
- `src/lib/`: cross-owner pure utilities.

Start with local ownership. Before implementing UI, inspect related primitives and shared components. A new independent consumer prompts evaluation, not automatic extraction: share only matching responsibilities with natural props, common evolution, and no dependency on consumer-private code. See `AI_RULES.md` and `.agents/skills/create-section/references/section-format.md` for the workflow.
