import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { App } from "./App"
import { COPY } from "./content"
import type { Lang } from "./content/types"
import { PairApp } from "./PairApp"
import { renderHead, renderPairHead } from "./head"

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

export function renderPair(lang: Lang): { app: string; head: string } {
  const copy = COPY[lang]
  return {
    app: renderToString(<PairApp copy={copy} />),
    head: renderPairHead(copy),
  }
}
