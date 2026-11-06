import type { CSSProperties } from "react"
import type { HomeScreenCopy } from "../../content/types"
import { AMBER, between, center, CHIP, column, EDGE, GREEN, LABEL, PANEL, RED, ROW, RULE, screenBase, stroke, TRACK } from "./tokens"
import { StatusBar } from "./chrome"

const GAUGE_RADIUS = 50
const GAUGE_LENGTH = 2 * Math.PI * GAUGE_RADIUS
const GAUGE_SWEEP = 0.75

const unit: CSSProperties = { fontSize: 18, color: "#8E8E97" }
const roundButton: CSSProperties = {
  ...center,
  width: 44,
  height: 44,
  border: 0,
  borderRadius: 22,
  background: ROW,
  color: GREEN,
  padding: 0,
}

const LINE_PATH = "M0,58 L72.9,60 L145.8,64 L218.7,17 L291.6,23 L326,41"

const BARS: readonly { x: number; y: number; width: number; height: number; rx: number; color: string }[] = [
  { x: 3, y: 28, width: 18, height: 5, rx: 2, color: AMBER },
  { x: 27.3, y: 28, width: 18, height: 5, rx: 2, color: AMBER },
  { x: 51.6, y: 28, width: 18, height: 5, rx: 2, color: AMBER },
  { x: 75.9, y: 28, width: 18, height: 5, rx: 2, color: AMBER },
  { x: 100.2, y: 28, width: 18, height: 5, rx: 2, color: AMBER },
  { x: 124.5, y: 28, width: 18, height: 5, rx: 2, color: AMBER },
  { x: 148.8, y: 2.4, width: 18, height: 25.6, rx: 2, color: GREEN },
  { x: 173.1, y: 2.4, width: 18, height: 25.6, rx: 2, color: GREEN },
  { x: 197.4, y: 2.4, width: 18, height: 25.6, rx: 2, color: GREEN },
  { x: 221.7, y: 28, width: 18, height: 3.2, rx: 1.5, color: AMBER },
  { x: 246, y: 28, width: 18, height: 3.2, rx: 1.5, color: AMBER },
  { x: 270.3, y: 28, width: 18, height: 3.2, rx: 1.5, color: AMBER },
  { x: 294.6, y: 28, width: 18, height: 20.6, rx: 2, color: AMBER },
  { x: 315, y: 28, width: 10, height: 26, rx: 2, color: AMBER },
]

export type HomeVariantId = "lasts" | "charging" | "short"
export type HomeFocus = "summary" | "verdict"

export function Home({
  copy,
  variant,
  brand,
  focus,
}: {
  copy: HomeScreenCopy
  variant: HomeVariantId
  brand: string
  focus?: HomeFocus
}) {
  const data = copy[variant]
  const charging = variant === "charging"
  const accent = charging ? GREEN : AMBER
  const filled = data.percent / 100
  const trackLength = GAUGE_LENGTH * GAUGE_SWEEP
  const dash = (length: number) => `${length.toFixed(1)} ${GAUGE_LENGTH.toFixed(1)}`
  const dim = (part: HomeFocus | "other"): CSSProperties => ({
    opacity: focus === undefined || focus === part ? 1 : 0.4,
  })
  const verdict = data.verdict
  const verdictColor = verdict?.tone === "bad" ? RED : GREEN

  return (
    <div style={screenBase("#000000", "56px 16px 0")}>
      <StatusBar time={data.statusTime} />
      <div className="screen-fade" style={{ ...between, ...dim("other") }}>
        <div style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{brand}</div>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={roundButton}>
            <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <div style={roundButton}>
            <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
            </svg>
          </div>
        </div>
      </div>

      <div
        className="screen-fade"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: 16,
          background: PANEL,
          border: `0.5px solid ${EDGE}`,
          borderRadius: 22,
          ...dim("summary"),
        }}
      >
        <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            <circle
              cx="60"
              cy="60"
              r={GAUGE_RADIUS}
              fill="none"
              stroke={TRACK}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={dash(trackLength)}
              transform="rotate(135 60 60)"
            />
            <circle
              cx="60"
              cy="60"
              r={GAUGE_RADIUS}
              fill="none"
              stroke={accent}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={dash(trackLength * filled)}
              transform="rotate(135 60 60)"
            />
          </svg>
          <div
            style={{
              ...center,
              position: "absolute",
              inset: 0,
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            {data.percent}
            <span style={{ fontSize: 18, color: "#8E8E97", fontWeight: 700 }}>%</span>
          </div>
        </div>
        <div style={{ ...column(4), minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.6, color: LABEL }}>
            {data.label}
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.05 }}>
            {data.hours}
            <span style={unit}> {copy.hoursUnit} </span>
            {data.minutes}
            <span style={unit}> {copy.minutesUnit}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: accent }}>{data.power}</div>
          <div style={{ fontSize: 13, color: LABEL }}>{data.updated}</div>
        </div>
      </div>

      <div
        className="screen-fade"
        style={{
          ...column(12),
          padding: "14px 16px",
          background: ROW,
          borderRadius: 18,
          ...dim("verdict"),
        }}
      >
        {verdict ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  ...center,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  background: verdict.tone === "bad" ? "rgba(255,107,94,0.16)" : "rgba(61,220,151,0.16)",
                  color: verdictColor,
                  flexShrink: 0,
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                {verdict.tone === "bad" ? (
                  "!"
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} strokeWidth={2.6} aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
              </div>
              <div style={column(2)}>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: verdictColor }}>
                  {verdict.label}
                </div>
                <div style={{ fontSize: 15 }}>{verdict.text}</div>
              </div>
            </div>
            {verdict.cut ? (
              <div style={{ fontSize: 14, padding: "10px 12px", background: CHIP, borderRadius: 12 }}>
                {verdict.cut}
              </div>
            ) : null}
          </>
        ) : null}
        <div
          style={{
            ...between,
            borderTop: verdict ? `0.5px solid ${RULE}` : undefined,
            paddingTop: verdict ? 10 : 0,
          }}
        >
          <span style={{ fontSize: 13, color: LABEL }}>{data.schedule}</span>
          <div
            style={{
              ...center,
              height: 32,
              padding: "0 12px",
              borderRadius: 8,
              background: CHIP,
              color: GREEN,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {copy.change}
          </div>
        </div>
      </div>

      <div
        className="screen-fade"
        style={{
          ...column(10),
          padding: "14px 16px 12px",
          background: PANEL,
          border: `0.5px solid ${EDGE}`,
          borderRadius: 22,
          ...dim("other"),
        }}
      >
        <div style={between}>
          <div style={{ display: "flex", padding: 2, background: ROW, borderRadius: 9 }}>
            <span
              style={{
                padding: "5px 14px",
                borderRadius: 7,
                background: "#3A3A3C",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {copy.today}
            </span>
            <span
              style={{
                padding: "5px 14px",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 700,
                color: LABEL,
              }}
            >
              {copy.week}
            </span>
          </div>
          <span style={{ fontSize: 13, color: LABEL }}>{copy.range}</span>
        </div>
        <svg width="326" height="110" viewBox="0 0 326 110" aria-hidden="true">
          <line x1="0" y1="5" x2="326" y2="5" stroke={TRACK} />
          <line x1="0" y1="55" x2="326" y2="55" stroke={TRACK} />
          <line x1="0" y1="105" x2="326" y2="105" stroke={TRACK} />
          <rect x="291.6" y="0" width="34.4" height="110" fill={RED} opacity="0.1" />
          <path
            d={LINE_PATH}
            fill="none"
            stroke={GREEN}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="322" cy="41" r="5" fill={GREEN} />
        </svg>
        <svg width="326" height="56" viewBox="0 0 326 56" aria-hidden="true">
          {BARS.map((bar) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx={bar.rx}
              fill={bar.color}
            />
          ))}
          <line x1="0" y1="28" x2="326" y2="28" stroke={RULE} />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: LABEL }}>
          <span>{copy.axisStart}</span>
          <span style={{ marginLeft: 120 }}>{copy.axisMiddle}</span>
          <span style={{ marginLeft: "auto" }}>{copy.axisNow}</span>
        </div>
      </div>

      <div
        className="screen-fade"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          background: ROW,
          borderRadius: 18,
          ...dim("other"),
        }}
      >
        {copy.totals.map((total, index) => (
          <div
            key={total.label}
            style={{
              ...column(2),
              padding: "12px 14px",
              borderLeft: index === 0 ? undefined : `0.5px solid ${RULE}`,
            }}
          >
            <span style={{ fontSize: 13, color: LABEL }}>{total.label}</span>
            <span style={{ fontSize: 19, fontWeight: 800, whiteSpace: "nowrap" }}>
              {total.value}
              {total.unit ? (
                <span style={{ fontSize: 13, fontWeight: 700, color: LABEL }}> {total.unit}</span>
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
