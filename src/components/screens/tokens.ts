import type { CSSProperties } from "react"

export const GREEN = "#3DDC97"
export const AMBER = "#FFB547"
export const RED = "#FF6B5E"
export const LABEL = "#8E8E93"
export const ROW = "#1C1C1E"
export const CHIP = "#2C2C2E"
export const RULE = "#38383A"
export const PANEL = "#0F0F12"
export const EDGE = "#2A2A30"
export const TRACK = "#24242A"
export const SOFT = "#A3A3AD"

export const FONT =
  "ui-rounded, 'SF Pro Rounded', 'Nunito Variable', 'Nunito', system-ui, sans-serif"

export const SCREEN_WIDTH = 390
export const SCREEN_HEIGHT = 844

export const column = (gap: number): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  gap,
})
export const center: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
export const between: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}
export const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

export const screenBase = (background: string, padding: string): CSSProperties => ({
  ...column(16),
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  boxSizing: "border-box",
  padding,
  background,
  color: "#FFFFFF",
  fontFamily: FONT,
  lineHeight: "normal",
  overflow: "hidden",
  textAlign: "left",
})
