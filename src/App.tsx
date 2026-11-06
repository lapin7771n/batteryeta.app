import type { Copy } from "@/content/types"
import { Closing } from "@/sections/Closing"
import { Devices } from "@/sections/Devices"
import { Faq } from "@/sections/Faq"
import { Features } from "@/sections/Features"
import { Footer } from "@/sections/Footer"
import { Hero } from "@/sections/Hero"
import { Limits } from "@/sections/Limits"
import { Runtime } from "@/sections/Runtime"
import { Setup } from "@/sections/Setup"
import { UsefulFeatures } from "@/sections/UsefulFeatures"

export function App({ copy }: { copy: Copy }) {
  const { otherLang } = copy
  return (
    <div className="mx-auto max-w-[980px] px-5">
      <header className="flex items-center justify-between py-4">
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
        <a
          className="rounded-full border border-edge px-3 py-1.5 text-[15px] text-muted-foreground no-underline"
          href={otherLang.href}
          hrefLang={otherLang.lang}
          lang={otherLang.lang}
        >
          {otherLang.label}
        </a>
      </header>
      <main>
        <Hero copy={copy} />
        <Devices copy={copy} />
        <Features copy={copy} />
        <UsefulFeatures copy={copy} />
        <Runtime copy={copy} />
        <Setup copy={copy} />
        <Faq copy={copy} />
        <Closing copy={copy} />
        <Limits copy={copy} />
      </main>
      <Footer copy={copy} />
    </div>
  )
}
