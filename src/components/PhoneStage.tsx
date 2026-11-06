import { PhoneFrame } from "@/components/PhoneFrame"
import { Home } from "@/components/screens/Home"
import { Lock } from "@/components/screens/Lock"
import { Week } from "@/components/screens/Week"
import { SCREEN_IDS } from "@/content/screen-ids"
import type { Copy, ScreenId } from "@/content/types"
import { cn } from "@/lib/utils"

function Screen({ id, copy }: { id: ScreenId; copy: Copy }) {
  const { screens, brand } = copy
  switch (id) {
    case "home":
      return <Home copy={screens.home} variant="lasts" brand={brand} />
    case "charging":
      return <Home copy={screens.home} variant="charging" brand={brand} focus="summary" />
    case "verdict":
      return <Home copy={screens.home} variant="short" brand={brand} focus="verdict" />
    case "activity":
      return <Lock copy={screens.lock} show="activity" />
    case "notification":
      return <Lock copy={screens.lock} show="notification" />
    case "week":
      return <Week copy={screens.week} brand={brand} />
  }
}

export function PhoneStage({ copy, active }: { copy: Copy; active: ScreenId }) {
  return (
    <PhoneFrame
      className="w-(--phone-w)"
      label={copy.screens.descriptions[active]}
    >
      {SCREEN_IDS.map((id) => (
        <div
          key={id}
          data-screen={id}
          aria-hidden={id === active ? undefined : true}
          className={cn(
            "absolute inset-0 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none",
            id === active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          )}
        >
          <Screen id={id} copy={copy} />
        </div>
      ))}
    </PhoneFrame>
  )
}
