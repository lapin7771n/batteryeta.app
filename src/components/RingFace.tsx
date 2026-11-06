import { motion, useMotionTemplate, type MotionValue } from "motion/react"
import { GREEN, START_DEG, SWEEP_DEG, TRACK } from "@/three/ring-spec"

const BAND_MASK = "radial-gradient(farthest-side, transparent 81%, #000 82%)"

export function CssRing({ degrees }: { degrees: MotionValue<number> }) {
  const background = useMotionTemplate`conic-gradient(from ${START_DEG}deg, ${GREEN} 0deg ${degrees}deg, ${TRACK} ${degrees}deg ${SWEEP_DEG}deg, transparent ${SWEEP_DEG}deg)`
  return (
    <motion.div
      className="absolute inset-[23%] rounded-full"
      style={{ background, maskImage: BAND_MASK, WebkitMaskImage: BAND_MASK }}
    />
  )
}

function hide(image: HTMLImageElement): void {
  image.style.display = "none"
}

export function RingStill() {
  return (
    <img
      ref={(image) => {
        if (image?.complete && image.naturalWidth === 0) hide(image)
      }}
      onError={(event) => hide(event.currentTarget)}
      className="absolute inset-0 size-full object-contain"
      src="/img/ring-empty@1x.webp"
      srcSet="/img/ring-empty@1x.webp 1x, /img/ring-empty@2x.webp 2x"
      alt=""
      width={640}
      height={640}
      decoding="async"
    />
  )
}
