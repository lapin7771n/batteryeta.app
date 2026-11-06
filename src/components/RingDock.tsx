import {
  motion,
  motionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { CssRing, RingStill } from "@/components/RingFace"
import { cn } from "@/lib/utils"
import { clamp01, SWEEP_DEG } from "@/three/ring-spec"

const RingScene = lazy(() => import("@/three/Ring"))

const HERO = "hero"
const DOCK = "dock"
const MIN_TRAVEL_PX = 240
const EMPTY_DEGREES = motionValue(0)

export function RingHeroAnchor() {
  return (
    <div
      data-ring-anchor={HERO}
      aria-hidden="true"
      className="relative mx-auto mt-8 aspect-square w-[min(320px,70vw)] md:mx-0"
    >
      <div className="absolute inset-0 [[data-ring=live]_&]:invisible">
        <CssRing degrees={EMPTY_DEGREES} />
        <RingStill />
      </div>
    </div>
  )
}

export function RingDockAnchor({ className }: { className?: string }) {
  return (
    <div
      data-ring-anchor={DOCK}
      aria-hidden="true"
      className={cn("shrink-0", className)}
    />
  )
}

class RingBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function hasWebGl(): boolean {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl")
  context?.getExtension("WEBGL_lose_context")?.loseContext()
  return context !== null
}

function afterFirstPaint(task: () => void): () => void {
  if (typeof requestIdleCallback === "function") {
    const id = requestIdleCallback(task, { timeout: 1500 })
    return () => cancelIdleCallback(id)
  }
  const id = window.setTimeout(task, 300)
  return () => window.clearTimeout(id)
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value)
}

function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount
}

function RingLayer() {
  const layer = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion() ?? false
  const [webgl, setWebgl] = useState(false)
  const [ready, setReady] = useState(false)
  const degrees = useTransform(scrollYProgress, (value) => clamp01(value) * SWEEP_DEG)
  const percent = useTransform(
    scrollYProgress,
    (value) => `${Math.round(clamp01(value) * 100)}%`
  )

  useLayoutEffect(() => {
    const element = layer.current
    const hero = document.querySelector<HTMLElement>(`[data-ring-anchor="${HERO}"]`)
    const docks = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-ring-anchor="${DOCK}"]`)
    )
    if (!element || !hero) return

    const place = () => {
      const dock = docks.find((candidate) => candidate.offsetParent !== null)
      const heroBox = hero.getBoundingClientRect()
      if (!dock || heroBox.width === 0) return
      const dockBox = dock.getBoundingClientRect()
      const size = heroBox.width
      element.style.width = `${size}px`
      element.style.height = `${size}px`
      const travel = Math.max(MIN_TRAVEL_PX, heroBox.top + window.scrollY)
      const amount = smoothstep(clamp01(window.scrollY / travel))
      const x = lerp(heroBox.left, dockBox.left, amount)
      const y = lerp(heroBox.top, dockBox.top, amount)
      const scale = lerp(1, dockBox.width / size, amount)
      element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    }

    document.documentElement.dataset.ring = "live"
    place()
    element.style.visibility = "visible"
    const stopScroll = scrollY.on("change", place)
    const observer = new ResizeObserver(place)
    observer.observe(document.body)
    window.addEventListener("resize", place)
    return () => {
      stopScroll()
      observer.disconnect()
      window.removeEventListener("resize", place)
      delete document.documentElement.dataset.ring
    }
  }, [scrollY])

  useEffect(() => {
    if (!hasWebGl()) return
    return afterFirstPaint(() => setWebgl(true))
  }, [])

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 origin-top-left [container-type:size]"
      style={{ visibility: "hidden", willChange: "transform" }}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          ready && "opacity-0"
        )}
      >
        <CssRing degrees={degrees} />
        <RingStill />
      </div>
      {webgl && (
        <RingBoundary>
          <Suspense fallback={null}>
            <div className="absolute inset-0 [mask-image:radial-gradient(closest-side,#000_70%,transparent_100%)]">
              <RingScene
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
                onReady={() => setReady(true)}
              />
            </div>
          </Suspense>
        </RingBoundary>
      )}
      <motion.span className="absolute inset-0 grid place-items-center text-[17cqw] leading-none font-bold tabular-nums text-foreground">
        {percent}
      </motion.span>
    </div>
  )
}

function subscribeNothing(): () => void {
  return () => {}
}

export function RingDock() {
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
  return mounted ? <RingLayer /> : null
}
