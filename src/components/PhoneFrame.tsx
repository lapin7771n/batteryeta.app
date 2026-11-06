import type { ReactNode } from "react"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./screens/tokens"

const BEZEL = 10
const FRAME_WIDTH = SCREEN_WIDTH + BEZEL * 2
const FRAME_HEIGHT = SCREEN_HEIGHT + BEZEL * 2

export function PhoneFrame({
  label,
  className,
  width,
  children,
}: {
  label: string
  className?: string
  width?: number
  children: ReactNode
}) {
  return (
    <div
      className={`phone${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={label}
      style={{ aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`, width }}
    >
      <div
        className="phone-body"
        aria-hidden="true"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          boxSizing: "border-box",
          padding: BEZEL,
          borderRadius: 56,
          background: "linear-gradient(145deg, #2a2a2e, #101012 45%, #1c1c1f)",
          border: "1px solid var(--shot-card-border)",
          boxShadow: "var(--shot-card)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            borderRadius: 46,
            overflow: "hidden",
            background: "#000",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
