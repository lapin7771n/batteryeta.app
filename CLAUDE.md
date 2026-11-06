# CLAUDE.md

Landing site for Battery ETA (https://batteryeta.app). Vite, React 19, Tailwind 4, shadcn/ui, `motion`. Dark theme only. npm, Node 26.

## Commands

`npm run dev` · `npm run build` (typecheck + client build + SSR build + prerender) · `npm run check` (checks `dist/`, run after build) · `npm run og` (renders `public/og-{uk,en}.png` with headless Chrome from `dist/`, run after build, commit the PNGs) · `npm run lint` · `npx tsc -b`

## Rules

- All copy lives in `src/content/uk.ts` and `src/content/en.ts`, typed by `src/content/types.ts`. Components and sections never hold text. A copy change goes to both files.
- The outage regions live once in `src/content/regions.ts`. The supported and coming-soon devices live once in `src/content/devices.ts`.
- No price, no provider names (YASNO, oblenergo) on the page.
- Theme tokens are CSS variables in `src/index.css`, mapped from the Battery ETA design system in the `marstek_analytics` repo (`docs/marketing/posts/ds/tokens.css`).
- `src/components/ui/` is shadcn output. Add components with `npx shadcn@latest add <name>`.
- No `any` or `unknown`. Run `npx tsc -b` after each change.
- Both pages are prerendered by `scripts/prerender.ts` from `src/entry-server.tsx`; `src/entry-client.tsx` hydrates them. Markup must not differ between server and client on first render.
- Head tags come from `src/head.ts` and the `head` block of each copy file. The origin `https://batteryeta.app` is the `ORIGIN` constant there (`public/robots.txt` and `public/sitemap.xml` repeat it).
- The 3D ring lives in `src/three/` and loads through `React.lazy` in `src/components/RingDock.tsx`. Keep `three` imports out of the main chunk.
- No app screenshots on the site or in previews. `src/components/screens/{Home,Lock,Week}.tsx` draw the phone screens in HTML (copy in `screens` of each copy file; uk strings come from the app's `ios/Shared/Localizable.xcstrings`; no provider names) and `PhoneFrame.tsx` frames them. `PhoneStage.tsx` stacks all six screens in one sticky phone and zooms onto the active feature's card; `sections/FeatureSteps.tsx` (hero plus `features.steps`, one `data-step` each) picks the active step from an IntersectionObserver. From 1024 px the phone sits beside the steps; below it pins under the header and the step cards slide over its lower half. Step 0 must be the active one on the server and on the first client render.
- `scripts/check.ts` lists assets that do not exist yet in `PENDING_ASSETS`. Remove an entry when the file lands in `public/`.
- `public/img/ring-empty@*` is the ring backdrop's first frame, rendered from the WebGL scene by `npm run ring-poster` (needs Chrome, `magick`, `cwebp`, `avifenc`). Re-run it after changing `src/three/`.
