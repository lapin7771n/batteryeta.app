export const RING_RADIUS = 1
export const START_DEG = 225
export const SWEEP_DEG = 270
export const GLASS_RADIUS = 0.14
export const TRACK_RADIUS = 0.09
export const LIQUID_RADIUS = 0.096
export const GREEN = "#3DDC97"
export const TRACK = "#24242A"
export const GLASS_ROUGHNESS = 0.035

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}
