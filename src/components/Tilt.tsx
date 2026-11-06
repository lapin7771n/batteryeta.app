import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, useSyncExternalStore, type ReactNode } from "react"

type TiltProps = {
  axis: "rotateX" | "rotateY"
  from: [number, number]
  className?: string
  children: ReactNode
}

function subscribeNothing(): () => void {
  return () => {}
}

export function Tilt({ axis, from, className, children }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
  const reduce = useReducedMotion() === true
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], mounted && reduce ? [0, 0] : from)
  const style = axis === "rotateX" ? { rotateX: rotate } : { rotateY: rotate }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={style}>{children}</motion.div>
    </div>
  )
}
