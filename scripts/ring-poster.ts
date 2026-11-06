import { spawn } from "node:child_process"
import { existsSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { createServer } from "vite"

const root = path.resolve(import.meta.dirname, "..")
const CHROME =
  process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const SIZE = 1280

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" })
    child.on("error", reject)
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`))
    )
  })
}

const server = await createServer({ root, logLevel: "error", server: { port: 0 } })
await server.listen()
const url = server.resolvedUrls?.local[0]
if (!url) throw new Error("vite has no local URL")

const work = mkdtempSync(path.join(tmpdir(), "ring-poster-"))
const png = path.join(work, "ring.png")
const small = path.join(work, "ring-640.png")
try {
  await run(CHROME, [
    "--headless=new",
    `--screenshot=${png}`,
    `--window-size=${SIZE},${SIZE}`,
    "--force-device-scale-factor=1",
    "--default-background-color=00000000",
    "--timeout=8000",
    "--hide-scrollbars",
    `${url}scripts/ring-poster.html`,
  ])
  if (!existsSync(png)) throw new Error("Chrome wrote no screenshot")
  await run("magick", [png, "-resize", "640x640", small])
  const img = path.join(root, "public/img")
  for (const [source, scale] of [[png, "2x"], [small, "1x"]]) {
    await run("cwebp", ["-quiet", "-q", "85", "-alpha_q", "90", source, "-o", path.join(img, `ring-empty@${scale}.webp`)])
    await run("avifenc", ["-q", "60", source, path.join(img, `ring-empty@${scale}.avif`)])
  }
  console.log("wrote public/img/ring-empty@{1x,2x}.{webp,avif}")
} finally {
  await server.close()
  rmSync(work, { recursive: true, force: true })
}
