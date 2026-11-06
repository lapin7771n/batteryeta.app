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
  keepLeftEdge: boolean
): string {
  const zoom = ZOOM[active]
  if (!zoom) return ""
  const part = stage.querySelector<HTMLElement>(
    `[data-screen="${active}"] [data-part="${zoom.part}"]`
  )
  if (!part) return ""
  const outer = stage.getBoundingClientRect()
  const inner = part.getBoundingClientRect()
  const x = (inner.left + inner.width / 2 - outer.left) / outer.width
  const y = (inner.top + inner.height / 2 - outer.top) / outer.height
  const dx = keepLeftEdge ? ((zoom.scale - 1) / 2) * 100 : (0.5 - x) * zoom.scale * 100
  const dy = (0.5 - y) * zoom.scale * 100
  return `translate(${dx}%, ${dy}%) scale(${zoom.scale})`
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
