import { RingDock, RingDockAnchor } from "@/components/RingDock"
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
    <>
      <div className="mx-auto max-w-[980px] px-5 lg:max-w-[1180px]">
        <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between gap-3 bg-background/80 px-5 py-2 backdrop-blur lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-4 lg:backdrop-blur-none">
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
            <RingDockAnchor className="size-[60px] lg:hidden" />
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
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10">
          <main className="min-w-0">
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
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <RingDockAnchor className="size-[240px]" />
            </div>
          </aside>
        </div>
        <Footer copy={copy} />
      </div>
      <RingDock />
    </>
  )
}
