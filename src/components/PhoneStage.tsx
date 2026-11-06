import { useLayoutEffect, useRef } from "react"
import { PhoneFrame } from "@/components/PhoneFrame"
import { Home } from "@/components/screens/Home"
import { Lock } from "@/components/screens/Lock"
import { Week } from "@/components/screens/Week"
import { SCREEN_IDS } from "@/content/screen-ids"
import type { Copy, ScreenId } from "@/content/types"
import { DESKTOP_QUERY } from "@/lib/media"
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

const MOBILE_FOCUS_Y = 0.275
const MOBILE_SIDE_INSET = 16
const CARD_BOTTOM_GAP = 24
const FOCUS_FIT_HEIGHT = 0.9

function cardFocus(step: number, freeTop: number): { y: number; maxHeight: number } | null {
  const card = document.querySelector<HTMLElement>(`[data-step="${step}"] [data-slot="card"]`)
  if (!card) return null
  const cardTop = window.innerHeight - CARD_BOTTOM_GAP - card.offsetHeight
  if (cardTop <= freeTop) return null
  return { y: (freeTop + cardTop) / 2, maxHeight: (cardTop - freeTop) * FOCUS_FIT_HEIGHT }
}

function zoomTransform(
  stage: HTMLElement,
  active: ScreenId,
  desktop: boolean,
  step: number
): string {
  const zoom = ZOOM[active]
  if (!zoom) return ""
  const part = stage.querySelector<HTMLElement>(
    `[data-screen="${active}"] [data-part="${zoom.part}"]`
  )
  if (!part) return ""
  const outer = stage.getBoundingClientRect()
  if (outer.width === 0 || outer.height === 0) return ""
  const inner = part.getBoundingClientRect()
  const x = (inner.left + inner.width / 2 - outer.left) / outer.width
  const y = (inner.top + inner.height / 2 - outer.top) / outer.height
  if (desktop) {
    const dx = ((zoom.scale - 1) / 2) * 100
    const dy = (0.5 - y) * zoom.scale * 100
    return `translate(${dx}%, ${dy}%) scale(${zoom.scale})`
  }
  const width = stage.offsetWidth
  const height = stage.offsetHeight
  const partHeight = (inner.height * height) / outer.height
  const frame = stage.parentElement?.getBoundingClientRect()
  const pinned = stage.closest<HTMLElement>(".phone-stage")
  if (!frame || !pinned) return ""
  const left = frame.left
  const top = parseFloat(getComputedStyle(pinned).top)
  const focus = cardFocus(step, top)
  const fit = Math.min(zoom.scale, (pinned.clientWidth - 2 * MOBILE_SIDE_INSET) / width)
  const scale = focus ? Math.min(fit, focus.maxHeight / partHeight) : fit
  const focusY = focus ? focus.y : window.innerHeight * MOBILE_FOCUS_Y
  const dx = window.innerWidth / 2 - (left + width / 2) - scale * (x - 0.5) * width
  const dy = focusY - (top + height / 2) - scale * (y - 0.5) * height
  return `translate(${dx}px, ${dy}px) scale(${scale})`
}

export function PhoneStage({
  copy,
  active,
  step,
}: {
  copy: Copy
  active: ScreenId
  step: number
}) {
  const stage = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = stage.current
    if (!element) return
    const apply = () => {
      const desktop = window.matchMedia(DESKTOP_QUERY).matches
      element.style.transform = zoomTransform(element, active, desktop, step)
    }
    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [active, step])
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
