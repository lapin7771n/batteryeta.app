import { useEffect } from "react"
import { RingBackdrop } from "@/components/RingBackdrop"
import type { Copy } from "@/content/types"
import { Closing } from "@/sections/Closing"
import { Devices } from "@/sections/Devices"
import { Faq } from "@/sections/Faq"
import { Features } from "@/sections/Features"
import { Footer } from "@/sections/Footer"
import { Hero } from "@/sections/Hero"
import { Limits } from "@/sections/Limits"
import { Setup } from "@/sections/Setup"
import { UsefulFeatures } from "@/sections/UsefulFeatures"
import { relabelStoreLinks } from "@/relabel"

export function App({ copy }: { copy: Copy }) {
  const { otherLang } = copy
  useEffect(() => relabelStoreLinks(location.search, document), [])
  return (
    <>
      <div className="mx-auto max-w-[980px] px-5">
        <header className="flex items-center justify-between gap-3 py-4">
          <a
            className="flex items-center gap-2.5 text-lg font-bold text-foreground no-underline"
            href={copy.homeHref}
          >
            <img
              className="size-9 rounded-[22.33%]"
              src="/icon.svg"
              alt=""
              width={36}
              height={36}
            />
            {copy.brand}
          </a>
          <div className="flex items-center gap-3">
            <a
              className="rounded-full border border-edge px-3 py-1.5 text-[15px] text-muted-foreground no-underline"
              href={otherLang.href}
              hrefLang={otherLang.lang}
              lang={otherLang.lang}
            >
              {otherLang.label}
            </a>
          </div>
        </header>
        <main className="min-w-0">
          <Hero copy={copy} />
          <Devices copy={copy} />
          <Features copy={copy} />
          <UsefulFeatures copy={copy} />
          <Setup copy={copy} />
          <Faq copy={copy} />
          <Closing copy={copy} />
          <Limits copy={copy} />
        </main>
        <Footer copy={copy} />
      </div>
      <RingBackdrop />
    </>
  )
}
