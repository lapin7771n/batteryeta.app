import { motionValue } from "motion/react"
import { createRoot } from "react-dom/client"
import RingScene from "@/three/Ring"

const progress = motionValue(0)
const root = document.getElementById("root")

if (root) {
  createRoot(root).render(
    <RingScene
      progress={progress}
      reduceMotion
      maxDpr={1}
      sparkles={false}
      onReady={() => document.body.setAttribute("data-ready", "")}
    />
  )
}
