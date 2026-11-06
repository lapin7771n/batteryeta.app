import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { en } from "./content/en"
import { uk } from "./content/uk"

const copy = location.pathname.startsWith("/en") ? en : uk
document.documentElement.lang = copy.lang

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App copy={copy} />
  </StrictMode>
)
