# batteryeta.app

Landing site for Battery ETA, the iPhone app that shows how long a Marstek home battery lasts. Two pages, Ukrainian at `/` and English at `/en/`, built with Vite, React, Tailwind and shadcn/ui.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server |
| `npm run build` | Typecheck, client build, SSR build, then prerender both pages into `dist/` |
| `npm run check` | Check `dist/` (JSON-LD, hreflang, store link `ct`, assets, prerendered text). Run after `build` |
| `npm run lint` | Run oxlint |
