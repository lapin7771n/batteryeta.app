import type { LockScreenCopy } from "../../content/types"
import { AMBER, between, center, column, EDGE, GREEN, PANEL, RED, screenBase, SOFT } from "./tokens"
import { Bolt, StatusBar } from "./chrome"

export type LockShow = "activity" | "notification"

const CARD = "rgba(28,28,30,0.92)"

function AppBadge({ size, radius, bolt }: { size: number; radius: number; bolt: number }) {
  return (
    <div
      style={{
        ...center,
        width: size,
        height: size,
        borderRadius: radius,
        background: PANEL,
        border: `1px solid ${EDGE}`,
        color: GREEN,
        flexShrink: 0,
      }}
    >
      <Bolt size={bolt} />
    </div>
  )
}

export function Lock({ copy, show }: { copy: LockScreenCopy; show: LockShow }) {
  return (
    <div style={{ ...screenBase("#14181F", "70px 12px 0"), gap: 12 }}>
      <StatusBar />
      <div style={{ ...column(0), alignItems: "center", marginBottom: 150 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#D8DCE3" }}>{copy.date}</div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>{copy.time}</div>
      </div>

      {show === "activity" ? (
        <div style={{ ...column(10), padding: "14px 16px", background: CARD, borderRadius: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AppBadge size={22} radius={6} bolt={14} />
            <span style={{ fontSize: 13, color: SOFT, flexGrow: 1 }}>{copy.app}</span>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: RED }}>{copy.code}</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 15, color: SOFT }}>{copy.emptyLabel}</span>
              <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{copy.emptyTime}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: AMBER }}>{copy.usage}</div>
          </div>
          <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: "#2C2C2E" }}>
            <div style={{ width: "28.3%", background: "#6E6E76" }} />
            <div style={{ width: "59.7%", background: AMBER }} />
            <div style={{ width: "12%", background: RED }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 13, fontWeight: 700, color: SOFT }}>
            {copy.grid}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10, padding: "12px 14px", background: CARD, borderRadius: 20 }}>
          <AppBadge size={38} radius={9} bolt={20} />
          <div style={{ ...column(2), minWidth: 0 }}>
            <div style={{ ...between, alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 800 }}>{copy.notificationTitle}</span>
              <span style={{ fontSize: 13, color: SOFT, flexShrink: 0 }}>{copy.notificationTime}</span>
            </div>
            <div style={{ fontSize: 15, color: "#E5E5EA", lineHeight: 1.3 }}>{copy.notificationBody}</div>
          </div>
        </div>
      )}
    </div>
  )
}
