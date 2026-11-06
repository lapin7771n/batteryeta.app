import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import type { Lang } from "../src/content/types"

const root = path.resolve(import.meta.dirname, "..")
const PAGES: Record<Lang, string> = {
  uk: path.join(root, "dist/index.html"),
  en: path.join(root, "dist/en/index.html"),
}
const HEAD_MARKER = "<!--head-->"
const APP_MARKER = "<!--app-->"

const entry = (await import(
  pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href
)) as typeof import("../src/entry-server")

for (const lang of Object.keys(PAGES) as Lang[]) {
  const file = PAGES[lang]
  const template = await readFile(file, "utf8")
  for (const marker of [HEAD_MARKER, APP_MARKER]) {
    if (!template.includes(marker)) {
      throw new Error(`${path.relative(root, file)} has no ${marker}`)
    }
  }
  const { app, head } = entry.render(lang)
  await writeFile(
    file,
    template.replace(HEAD_MARKER, () => head).replace(APP_MARKER, () => app)
  )
  console.log(`prerendered ${path.relative(root, file)}`)
}
