import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, useSyncExternalStore, type ReactNode, type RefObject } from "react"

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"]

type TiltProps = {
  axis: "rotateX" | "rotateY"
  from: [number, number]
  target?: RefObject<HTMLElement | null>
  offset?: ScrollOffset
  desktopOnly?: boolean
  className?: string
  children: ReactNode
}

function subscribeNothing(): () => void {
  return () => {}
}

export function Tilt({ axis, from, target, offset, desktopOnly, className, children }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
  const reduce = useReducedMotion() === true
  const { scrollYProgress } = useScroll({
    target: target ?? ref,
    offset: offset ?? ["start end", "end start"],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], mounted && reduce ? [0, 0] : from)
  const style = axis === "rotateX" ? { rotateX: rotate } : { rotateY: rotate }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={style} data-tilt-desktop={desktopOnly ? "" : undefined}>
        {children}
      </motion.div>
    </div>
  )
}
