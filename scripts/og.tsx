import { spawn } from "node:child_process"
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { createServer } from "node:http"
import path from "node:path"
import { renderToStaticMarkup } from "react-dom/server"
import { PhoneFrame } from "../src/components/PhoneFrame"
import { COPY } from "../src/content"
import type { Copy, Lang } from "../src/content/types"

const root = path.resolve(import.meta.dirname, "..")
const dist = path.join(root, "dist")
const publicDir = path.join(root, "public")
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const WIDTH = 1200
const HEIGHT = 630
const LANGS: readonly Lang[] = ["uk", "en"]
const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
}

const PHONE_WIDTH = 340
const PHONE_LEFT = 745
const PHONE_TOP = 92
const RING_SIZE = 590

function OgCard({ copy }: { copy: Copy }) {
  const phoneCenter = PHONE_LEFT + PHONE_WIDTH / 2
  const ringCenterY = 320
  return (
    <div
      style={{
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        overflow: "hidden",
        background:
          "radial-gradient(640px 520px at 78% 48%, var(--disc-good), transparent 70%), var(--bg)",
        color: "var(--ink)",
      }}
    >
      <img
        src="/img/ring-58@2x.webp"
        alt=""
        width={RING_SIZE}
        height={RING_SIZE}
        style={{
          position: "absolute",
          left: phoneCenter - RING_SIZE / 2,
          top: ringCenterY - RING_SIZE / 2,
          width: RING_SIZE,
          height: RING_SIZE,
        }}
      />
      <div style={{ position: "absolute", left: PHONE_LEFT, top: PHONE_TOP }}>
        <PhoneFrame
          copy={copy.screen}
          brand={copy.brand}
          width={PHONE_WIDTH}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 60,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        <img
          src="/icon.svg"
          alt=""
          width={52}
          height={52}
          style={{ borderRadius: "22.33%" }}
        />
        {copy.brand}
      </div>
      <h1
        style={{
          position: "absolute",
          left: 72,
          top: 190,
          width: 660,
          margin: 0,
          fontSize: 66,
          lineHeight: 1.06,
          fontWeight: 800,
          letterSpacing: "-0.028em",
        }}
      >
        {copy.og.line1}
        <span style={{ display: "block", color: "var(--good)" }}>{copy.og.line2}</span>
      </h1>
    </div>
  )
}

function pageHtml(copy: Copy, stylesheet: string): string {
  const body = renderToStaticMarkup(<OgCard copy={copy} />)
  return `<!doctype html><html lang="${copy.lang}"><head><meta charset="utf-8"><link rel="stylesheet" href="${stylesheet}"><style>html,body{margin:0;background:#000;overflow:hidden}</style></head><body>${body}</body></html>`
}

function builtStylesheet(): string {
  const dir = path.join(dist, "assets")
  const files = existsSync(dir)
    ? readdirSync(dir).filter((file) => file.endsWith(".css"))
    : []
  if (files.length === 0) throw new Error("no built CSS in dist/assets, run npm run build first")
  return `/assets/${files[0]}`
}

function staticFile(url: string): string | null {
  const clean = decodeURIComponent(url.split("?")[0])
  for (const base of [dist, publicDir]) {
    const file = path.join(base, clean)
    if (file.startsWith(base) && existsSync(file) && statSync(file).isFile()) return file
  }
  return null
}

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "ignore" })
    child.on("error", reject)
    child.on("close", () => resolve())
  })
}

const stylesheet = builtStylesheet()
const server = createServer((request, response) => {
  const url = request.url ?? "/"
  const card = /^\/__og\/(uk|en)$/.exec(url)
  if (card) {
    const lang = card[1] as Lang
    response.writeHead(200, { "content-type": MIME[".html"] })
    response.end(pageHtml(COPY[lang], stylesheet))
    return
  }
  const file = staticFile(url)
  if (!file) {
    response.writeHead(404)
    response.end()
    return
  }
  response.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" })
  response.end(readFileSync(file))
})

await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve))
const address = server.address()
if (address === null || typeof address === "string") throw new Error("server has no port")

let failed = false
for (const lang of LANGS) {
  const target = path.join(publicDir, `og-${lang}.png`)
  rmSync(target, { force: true })
  await run(
    CHROME,
    [
      "--headless=new",
      `--screenshot=${target}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      "--force-device-scale-factor=1",
      "--virtual-time-budget=3000",
      "--hide-scrollbars",
      `http://127.0.0.1:${address.port}/__og/${lang}`,
    ],
  )
  if (existsSync(target)) console.log(`wrote public/og-${lang}.png`)
  else {
    console.error(`Chrome wrote no file for ${lang}`)
    failed = true
  }
}
server.close()
if (failed) process.exit(1)
