import { existsSync, readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import { COPY } from "../src/content"
import { SOON_DEVICES, SUPPORTED_DEVICE } from "../src/content/devices"
import { REGIONS } from "../src/content/regions"
import type { Lang } from "../src/content/types"
import { ORIGIN, PAGE_PATH } from "../src/head"
import { CT_MAX_LENGTH } from "../src/relabel"

const root = path.resolve(import.meta.dirname, "..")
const dist = path.join(root, "dist")

const PENDING_ASSETS: readonly string[] = []

const LANGS: readonly Lang[] = ["uk", "en"]
const failures: string[] = []
const fail = (lang: Lang | "both", message: string) =>
  failures.push(`[${lang}] ${message}`)

function pageFile(lang: Lang): string {
  return path.join(dist, PAGE_PATH[lang], "index.html")
}

function decode(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 10))
    )
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
}

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

function visibleText(html: string): string {
  return normalize(
    decode(
      html
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
        .replace(/<[^>]+>/g, " ")
    )
  )
}

function attributes(tag: string): Map<string, string> {
  const result = new Map<string, string>()
  for (const match of tag.matchAll(/([a-zA-Z:-]+)(?:="([^"]*)")?/g)) {
    result.set(match[1].toLowerCase(), decode(match[2] ?? ""))
  }
  return result
}

function tags(html: string, name: string): Map<string, string>[] {
  return Array.from(html.matchAll(new RegExp(`<${name}\\s[^>]*>`, "g"))).map(
    (match) => attributes(match[0].slice(name.length + 1, -1))
  )
}

function checkJsonLd(lang: Lang, html: string): void {
  const blocks = Array.from(
    html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
  )
  if (blocks.length === 0) fail(lang, "no JSON-LD block")
  blocks.forEach((block, index) => {
    try {
      JSON.parse(block[1])
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error)
      fail(lang, `JSON-LD block ${index + 1} does not parse: ${reason}`)
    }
  })
}

function hreflangSet(html: string): string[] {
  return tags(html, "link")
    .filter((link) => link.get("rel") === "alternate" && link.has("hreflang"))
    .map((link) => `${link.get("hreflang")} ${link.get("href")}`)
    .sort()
}

function checkStoreLinks(lang: Lang, html: string): void {
  const links = tags(html, "a").filter((link) => link.has("data-ct"))
  if (links.length === 0) fail(lang, "no store link with data-ct")
  for (const link of links) {
    const href = link.get("href") ?? ""
    const ct = new URL(href).searchParams.get("ct") ?? ""
    if (ct.length === 0 || ct.length > CT_MAX_LENGTH) {
      fail(lang, `store link ct "${ct}" is ${ct.length} chars, max ${CT_MAX_LENGTH}`)
    }
  }
}

function localPath(value: string): string | null {
  const stripped = value.startsWith(ORIGIN) ? value.slice(ORIGIN.length) : value
  if (!stripped.startsWith("/") || stripped.startsWith("//")) return null
  return stripped.split(/[?#]/)[0]
}

function referencedAssets(html: string): Set<string> {
  const found = new Set<string>()
  const add = (value: string) => {
    const local = localPath(value.trim())
    if (local) found.add(local)
  }
  for (const match of html.matchAll(/\s(?:src|href|content|poster)="([^"]*)"/g)) {
    add(decode(match[1]))
  }
  for (const match of html.matchAll(/\ssrcset="([^"]*)"/gi)) {
    for (const candidate of decode(match[1]).split(",")) {
      add(candidate.trim().split(/\s+/)[0])
    }
  }
  for (const match of html.matchAll(new RegExp(`${ORIGIN}(/[^"\\s<\\\\]*)`, "g"))) {
    add(match[1])
  }
  return found
}

function cssAssets(): Set<string> {
  const found = new Set<string>()
  const dir = path.join(dist, "assets")
  if (!existsSync(dir)) return found
  for (const name of readdirSync(dir).filter((file) => file.endsWith(".css"))) {
    const css = readFileSync(path.join(dir, name), "utf8")
    for (const match of css.matchAll(/url\(["']?(\/[^)"']+)/g)) {
      const local = localPath(match[1])
      if (local) found.add(local)
    }
  }
  return found
}

function assetExists(asset: string): boolean {
  return existsSync(
    path.join(dist, asset.endsWith("/") ? `${asset}index.html` : asset)
  )
}

function sectionHtml(html: string, id: string): string | null {
  const match = html.match(
    new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`)
  )
  return match ? match[0] : null
}

function checkContent(lang: Lang, html: string): void {
  const copy = COPY[lang]
  const text = visibleText(html)
  const needIn = (where: string, haystack: string, label: string, expected: string) => {
    if (!haystack.includes(normalize(expected))) {
      fail(lang, `${label} missing from ${where}: "${expected.slice(0, 60)}"`)
    }
  }
  const need = (label: string, expected: string) =>
    needIn("prerendered HTML", text, label, expected)
  const needInSection = (id: string, label: string, expected: readonly string[]) => {
    const section = sectionHtml(html, id)
    if (section === null) {
      fail(lang, `<section id="${id}"> missing from prerendered HTML`)
      return
    }
    const sectionText = visibleText(section)
    for (const value of expected) {
      needIn(`<section id="${id}">`, sectionText, label, value)
    }
  }

  const h1 = html.match(/<h1[\s>][\s\S]*?<\/h1>/)
  if (!h1 || visibleText(h1[0]).length === 0) {
    fail(lang, "<h1> missing from prerendered HTML")
  }
  needInSection("useful", "region", REGIONS.map((region) => region[lang]))
  needInSection("devices", "device", [SUPPORTED_DEVICE, ...SOON_DEVICES])
  copy.faq.items.forEach((item, index) => {
    need(`FAQ question ${index + 1}`, item.q)
    need(`FAQ answer ${index + 1}`, item.a)
  })
}

const PAGE_URL: Record<Lang, string> = {
  uk: "https://batteryeta.app/",
  en: "https://batteryeta.app/en/",
}
const EXPECTED_HREFLANG = [
  `en ${PAGE_URL.en}`,
  `uk ${PAGE_URL.uk}`,
  `x-default ${PAGE_URL.en}`,
].sort()

function checkHead(lang: Lang, html: string): void {
  const htmlLang = html.match(/<html\s[^>]*>/)
  const declared = htmlLang ? attributes(htmlLang[0].slice(5, -1)).get("lang") : undefined
  if (declared !== lang) fail(lang, `<html lang="${declared ?? ""}">, expected "${lang}"`)

  const canonicals = tags(html, "link").filter((link) => link.get("rel") === "canonical")
  const canonical = canonicals.map((link) => link.get("href") ?? "")
  if (canonical.length !== 1 || canonical[0] !== PAGE_URL[lang]) {
    fail(lang, `canonical [${canonical.join(", ")}], expected ${PAGE_URL[lang]}`)
  }

  const hreflang = hreflangSet(html)
  if (hreflang.join("\n") !== EXPECTED_HREFLANG.join("\n")) {
    fail(
      lang,
      `hreflang [${hreflang.join(", ")}], expected [${EXPECTED_HREFLANG.join(", ")}]`
    )
  }
}

const pages = new Map<Lang, string>()
for (const lang of LANGS) {
  const file = pageFile(lang)
  if (!existsSync(file)) {
    fail(lang, `${path.relative(root, file)} not found, run npm run build first`)
    continue
  }
  pages.set(lang, readFileSync(file, "utf8"))
}

for (const [lang, html] of pages) {
  checkJsonLd(lang, html)
  checkHead(lang, html)
  checkStoreLinks(lang, html)
  checkContent(lang, html)
}

const referenced = new Set<string>(cssAssets())
for (const html of pages.values()) {
  for (const asset of referencedAssets(html)) referenced.add(asset)
}
const pending: string[] = []
for (const asset of [...referenced].sort()) {
  if (assetExists(asset)) continue
  if (PENDING_ASSETS.includes(asset)) pending.push(asset)
  else fail("both", `referenced asset missing from dist: ${asset}`)
}
for (const asset of PENDING_ASSETS) {
  if (assetExists(asset)) {
    console.log(`note: ${asset} exists now, remove it from PENDING_ASSETS`)
  }
}

for (const asset of pending) console.log(`pending asset: ${asset}`)
if (failures.length > 0) {
  for (const message of failures) console.error(`FAIL ${message}`)
  console.error(`check failed: ${failures.length} problem(s)`)
  process.exit(1)
}
console.log(`check passed (${pending.length} pending assets)`)
