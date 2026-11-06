import { useLayoutEffect, useRef } from "react"
import { PhoneFrame } from "@/components/PhoneFrame"
import { Home } from "@/components/screens/Home"
import { Lock } from "@/components/screens/Lock"
import { Week } from "@/components/screens/Week"
import { SCREEN_IDS } from "@/content/screen-ids"
import type { Copy, ScreenId } from "@/content/types"
import { cn } from "@/lib/utils"

function Screen({ id, copy }: { id: ScreenId; copy: Copy }) {
  const { screens, brand } = copy
  switch (id) {
    case "home":
      return <Home copy={screens.home} variant="lasts" brand={brand} />
    case "charging":
      return <Home copy={screens.home} variant="charging" brand={brand} focus="summary" />
    case "verdict":
      return <Home copy={screens.home} variant="short" brand={brand} focus="verdict" />
    case "activity":
      return <Lock copy={screens.lock} show="activity" />
    case "notification":
      return <Lock copy={screens.lock} show="notification" />
    case "week":
      return <Week copy={screens.week} brand={brand} />
  }
}

type Zoom = { part: string; scale: number }

const ZOOM: Record<ScreenId, Zoom | null> = {
  home: null,
  charging: { part: "summary", scale: 1.55 },
  verdict: { part: "verdict", scale: 1.5 },
  activity: { part: "activity", scale: 1.45 },
  notification: { part: "notification", scale: 1.45 },
  week: { part: "week", scale: 1.3 },
}

function zoomTransform(
  stage: HTMLElement,
  active: ScreenId,
  keepLeftEdge: boolean,
  fitWidth = Infinity
): string {
  const zoom = ZOOM[active]
  if (!zoom) return ""
  const part = stage.querySelector<HTMLElement>(
    `:is([data-screen="${active}"], [data-shot-screen="${active}"]) [data-part="${zoom.part}"]`
  )
  if (!part) return ""
  const outer = stage.getBoundingClientRect()
  if (outer.width === 0 || outer.height === 0) return ""
  const inner = part.getBoundingClientRect()
  const x = (inner.left + inner.width / 2 - outer.left) / outer.width
  const y = (inner.top + inner.height / 2 - outer.top) / outer.height
  const partWidth = (inner.width * stage.offsetWidth) / outer.width
  const scale = Math.min(zoom.scale, fitWidth / partWidth)
  const dx = keepLeftEdge ? ((scale - 1) / 2) * 100 : (0.5 - x) * scale * 100
  const dy = (0.5 - y) * scale * 100
  return `translate(${dx}%, ${dy}%) scale(${scale})`
}

export function PhoneStage({ copy, active }: { copy: Copy; active: ScreenId }) {
  const stage = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = stage.current
    if (!element) return
    const desktop = window.matchMedia("(min-width: 1024px)").matches
    element.style.transform = zoomTransform(element, active, desktop)
  }, [active])
  return (
    <div
      ref={stage}
      className="transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
    >
      <PhoneFrame
        className="w-(--phone-w)"
        label={copy.screens.descriptions[active]}
      >
        {SCREEN_IDS.map((id) => (
          <div
            key={id}
            data-screen={id}
            aria-hidden={id === active ? undefined : true}
            className={cn(
              "absolute inset-0 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none",
              id === active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            )}
          >
            <Screen id={id} copy={copy} />
          </div>
        ))}
      </PhoneFrame>
    </div>
  )
}

const SHOT_WIDTH = "w-[min(300px,72vw)]"

export function PhoneHero({ copy }: { copy: Copy }) {
  return (
    <div aria-hidden="true" className="mt-8 flex justify-center lg:hidden">
      <PhoneFrame className={SHOT_WIDTH} label={copy.screens.descriptions.home}>
        <Screen id="home" copy={copy} />
      </PhoneFrame>
    </div>
  )
}

export function PhoneShot({ copy, id }: { copy: Copy; id: ScreenId }) {
  const target = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = target.current
    if (!element) return
    const frame = element.parentElement?.clientWidth ?? 0
    element.style.transform = zoomTransform(element, id, false, frame * 0.92)
  }, [id])
  return (
    <div
      data-shot
      aria-hidden="true"
      className={cn(
        "mt-4 flex aspect-[4/3] w-full justify-center overflow-clip rounded-[28px] border border-rule lg:hidden",
        ZOOM[id] ? "items-center" : "items-start"
      )}
    >
      <div ref={target} data-shot-screen={id} className="shrink-0">
        <PhoneFrame className={SHOT_WIDTH} label={copy.screens.descriptions[id]}>
          <Screen id={id} copy={copy} />
        </PhoneFrame>
      </div>
    </div>
  )
}
