import { useReducedMotion, useScroll, useTransform } from "motion/react"
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { CssRing, RingStill } from "@/components/RingFace"
import { cn } from "@/lib/utils"
import { clamp01, SWEEP_DEG } from "@/three/ring-spec"

const RingScene = lazy(() => import("@/three/Ring"))

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

function RingLayer() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion() ?? false
  const [webgl, setWebgl] = useState(false)
  const [ready, setReady] = useState(false)
  const degrees = useTransform(scrollYProgress, (value) => clamp01(value) * SWEEP_DEG)

  useEffect(() => {
    if (!hasWebGl()) return
    return afterFirstPaint(() => setWebgl(true))
  }, [])

  return (
    <div
      aria-hidden="true"
      className="ring-backdrop pointer-events-none fixed -z-10"
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
                maxDpr={1}
                onReady={() => setReady(true)}
              />
            </div>
          </Suspense>
        </RingBoundary>
      )}
    </div>
  )
}

function subscribeNothing(): () => void {
  return () => {}
}

export function RingBackdrop() {
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
  return mounted ? <RingLayer /> : null
}
