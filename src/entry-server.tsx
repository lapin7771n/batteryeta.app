import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { App } from "./App"
import { COPY } from "./content"
import type { Lang } from "./content/types"
import { renderHead } from "./head"

export function render(lang: Lang): { app: string; head: string } {
  const copy = COPY[lang]
  return {
    app: renderToString(
      <StrictMode>
        <App copy={copy} />
      </StrictMode>
    ),
    head: renderHead(copy),
  }
}
