# CLAUDE.md

Landing site for Battery ETA (https://batteryeta.app). Vite, React 19, Tailwind 4, shadcn/ui, `motion`. Dark theme only. npm, Node 26.

## Commands

`npm run dev` · `npm run build` (typecheck + Vite build) · `npm run lint` · `npx tsc -b`

## Rules

- All copy lives in `src/content/uk.ts` and `src/content/en.ts`, typed by `src/content/types.ts`. Components and sections never hold text. A copy change goes to both files.
- The outage regions live once in `src/content/regions.ts`. The supported and coming-soon devices live once in `src/content/devices.ts`.
- No price, no provider names (YASNO, oblenergo) on the page.
- Theme tokens are CSS variables in `src/index.css`, mapped from the Battery ETA design system in the `marstek_analytics` repo (`docs/marketing/posts/ds/tokens.css`).
- `src/components/ui/` is shadcn output. Add components with `npx shadcn@latest add <name>`.
- No `any` or `unknown`. Run `npx tsc -b` after each change.
