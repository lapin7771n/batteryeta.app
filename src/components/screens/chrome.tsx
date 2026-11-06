import { FONT, stroke } from "./tokens"

export function Bolt({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={2.5} aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  )
}

function StatusGlyphs() {
  return (
    <svg width="68" height="14" viewBox="0 0 68 14" fill="#fff" aria-hidden="true">
      <rect x="0" y="9" width="3.4" height="4" rx="1" />
      <rect x="5" y="6.5" width="3.4" height="6.5" rx="1" />
      <rect x="10" y="4" width="3.4" height="9" rx="1" />
      <rect x="15" y="1" width="3.4" height="12" rx="1" />
      <path d="M31.5 3.2c2.6 0 5 1 6.800 2.700l-1.200 1.200a7.700 7.700 0 0 0-5.600-2.300 7.700 7.700 0 0 0-5.600 2.300l-1.200-1.200a9.800 9.800 0 0 1 6.800-2.700zm0 3.700c1.600 0 3 .6 4.100 1.700l-1.300 1.300a4.300 4.300 0 0 0-5.600 0l-1.300-1.300a5.800 5.800 0 0 1 4.100-1.700zm0 3.600c.7 0 1.300.3 1.800.7l-1.800 1.800-1.800-1.800c.5-.4 1.100-.7 1.800-.7z" />
      <rect x="43.500" y="1.500" width="21" height="11" rx="3.300" fill="none" stroke="#fff" strokeOpacity="0.45" />
      <rect x="45.200" y="3.200" width="17.600" height="7.600" rx="2" />
      <path d="M66 5v4c.8-.3 1.400-1.100 1.400-2s-.6-1.700-1.400-2z" fill="#fff" fillOpacity="0.5" />
    </svg>
  )
}

export function StatusBar({ time }: { time?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: time ? "space-between" : "flex-end",
        padding: "6px 34px 0 42px",
        color: "#fff",
        fontFamily: FONT,
        fontSize: 17,
        fontWeight: 700,
      }}
    >
      {time ? <span>{time}</span> : null}
      <StatusGlyphs />
    </div>
  )
}
