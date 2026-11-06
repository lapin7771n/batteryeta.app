import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { COPY } from "./content"
import { relabelStoreLinks } from "./relabel"

const copy = COPY[document.documentElement.lang === "en" ? "en" : "uk"]
const root = document.getElementById("root")!
const app = (
  <StrictMode>
    <App copy={copy} />
  </StrictMode>
)

if (root.childElementCount > 0) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}

relabelStoreLinks(location.search, document)
