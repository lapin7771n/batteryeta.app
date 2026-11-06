import type { WeekScreenCopy } from "../../content/types"
import { AMBER, between, column, EDGE, GREEN, LABEL, PANEL, ROW, RULE, screenBase } from "./tokens"
import { StatusBar } from "./chrome"

const COLUMN_X = [12.3, 58.9, 105.5, 152.1, 198.7, 245.3, 291.9]
const CHARGED: readonly { y: number; height: number }[] = [
  { y: 17.5, height: 52.5 },
  { y: 25, height: 45 },
  { y: 10, height: 60 },
  { y: 33.8, height: 36.2 },
  { y: 18.8, height: 51.2 },
  { y: 27.5, height: 42.5 },
  { y: 40, height: 30 },
]
const USED: readonly number[] = [48.8, 51.3, 55, 40, 47.5, 45, 26.3]

export function Week({ copy, brand }: { copy: WeekScreenCopy; brand: string }) {
  return (
    <div style={screenBase("#000000", "56px 16px 0")}>
      <StatusBar time={copy.statusTime} />
      <div style={between}>
        <div style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{brand}</div>
        <div style={{ display: "flex", alignItems: "center", height: 44, fontSize: 17, fontWeight: 700, color: GREEN }}>
          {copy.now}
        </div>
      </div>

      <div
        style={{
          ...column(12),
          padding: 14,
          background: PANEL,
          border: `0.5px solid ${EDGE}`,
          borderRadius: 22,
        }}
      >
        <div style={between}>
          <div style={{ display: "flex", padding: 2, background: ROW, borderRadius: 9 }}>
            <span style={{ padding: "5px 14px", borderRadius: 7, fontSize: 13, fontWeight: 700, color: LABEL }}>
              {copy.today}
            </span>
            <span style={{ padding: "5px 14px", borderRadius: 7, background: "#3A3A3C", fontSize: 13, fontWeight: 700 }}>
              {copy.week}
            </span>
          </div>
          <span style={{ fontSize: 13 }}>
            <span style={{ color: GREEN }}>{copy.charged}</span>
            <span style={{ color: LABEL }}> · </span>
            <span style={{ color: AMBER }}>{copy.used}</span>
          </span>
        </div>
        <svg width="326" height="140" viewBox="0 0 326 140" aria-hidden="true">
          {COLUMN_X.map((x, index) => {
            const last = index === COLUMN_X.length - 1
            return (
              <g key={x} opacity={last ? 0.55 : 1}>
                <rect x={x} y={CHARGED[index].y} width="22" height={CHARGED[index].height} rx="3" fill={GREEN} />
                <rect x={x} y="70" width="22" height={USED[index]} rx="3" fill={AMBER} />
              </g>
            )
          })}
          <line x1="0" y1="70" x2="326" y2="70" stroke={RULE} />
        </svg>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            fontSize: 12,
            color: LABEL,
            textAlign: "center",
          }}
        >
          {copy.days.map((day, index) => (
            <span
              key={day}
              style={index === copy.days.length - 1 ? { color: "#FFFFFF", fontWeight: 700 } : undefined}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          background: ROW,
          borderRadius: 18,
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

      <div style={{ background: ROW, borderRadius: 18, padding: "0 16px" }}>
        {copy.rows.map((row, index) => (
          <div
            key={row.day}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              columnGap: 16,
              alignItems: "center",
              height: 46,
              fontSize: 15,
              borderBottom: index === copy.rows.length - 1 ? undefined : `0.5px solid ${RULE}`,
            }}
          >
            <span>{row.day}</span>
            <span style={{ color: GREEN }}>{row.charged}</span>
            <span style={{ color: AMBER }}>{row.used}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
