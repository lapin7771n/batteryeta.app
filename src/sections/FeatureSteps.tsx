import { useEffect, useRef, useState, type RefObject } from "react"
import { PhoneStage } from "@/components/PhoneStage"
import { Tilt } from "@/components/Tilt"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { regionsText } from "@/content/regions"
import { storeUrl } from "@/content/store"
import type { Copy, ScreenId } from "@/content/types"
import { DESKTOP_QUERY } from "@/lib/media"

const BAND_DESKTOP = "-45% 0px -45% 0px"
const BAND_MOBILE = "-1% 0px -98% 0px"

function useActiveStep(rootRef: RefObject<HTMLElement | null>): number {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const query = window.matchMedia(DESKTOP_QUERY)
    let observer: IntersectionObserver | undefined
    const observe = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(Number(entry.target.getAttribute("data-step")))
            }
          }
        },
        { rootMargin: query.matches ? BAND_DESKTOP : BAND_MOBILE }
      )
      root.querySelectorAll("[data-step]").forEach((step) => observer?.observe(step))
    }
    observe()
    query.addEventListener("change", observe)
    return () => {
      query.removeEventListener("change", observe)
      observer?.disconnect()
    }
  }, [rootRef])
  return active
}

export function FeatureSteps({ copy }: { copy: Copy }) {
  const { hero, lang, features } = copy
  const rootRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const active = useActiveStep(rootRef)
  const activeScreen: ScreenId =
    active === 0 ? "home" : (features.steps[active - 1]?.screen ?? "home")

  return (
    <section
      id="features"
      ref={rootRef}
      className="pt-6 max-lg:overflow-x-clip lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-14"
    >
      <div
        ref={heroRef}
        data-step="0"
        className="relative z-10 pb-8 lg:static lg:z-auto lg:col-start-1 lg:row-start-1 lg:flex lg:min-h-[85vh] lg:flex-col lg:justify-center lg:pb-0"
      >
        <h1 className="mb-4 text-[clamp(34px,6vw,54px)] leading-[1.06] font-extrabold tracking-[-0.028em]">
          {hero.titleBefore}
          <span className="text-good">{hero.titleHighlight}</span>
          {hero.titleAfter}
        </h1>
        <p className="mb-6 text-[19px] text-ink-soft">{hero.lead}</p>
        <a
          className="my-3 inline-block self-start leading-none"
          data-ct
          href={storeUrl(lang, "badge")}
        >
          <img
            className="h-12 w-auto"
            src={hero.badgeSrc}
            alt={hero.badgeAlt}
            width={144}
            height={48}
          />
        </a>
      </div>
      <div className="phone-stage">
        <Tilt
          axis="rotateY"
          desktopOnly
          from={[-18, 0]}
          target={heroRef}
          offset={["start start", "end start"]}
        >
          <PhoneStage copy={copy} active={activeScreen} />
        </Tilt>
      </div>
      <div className="max-lg:-mt-[30svh] lg:col-start-1 lg:row-start-2">
        {features.steps.map((step, index) => (
          <article
            key={step.title}
            data-step={index + 1}
            className="relative z-10 pt-[65svh] pb-6 lg:static lg:z-auto lg:flex lg:min-h-[80vh] lg:items-center lg:justify-center lg:py-0"
          >
            <Card className="w-full bg-card/85 [--card-spacing:--spacing(7)] lg:bg-card/60">
              <CardHeader>
                <CardTitle className="text-[clamp(26px,3vw,38px)] leading-[1.1] font-extrabold tracking-[-0.02em]">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-[clamp(18px,1.5vw,21px)] leading-[1.5] text-ink-soft">
                <p className="m-0">{step.body}</p>
                {step.regionsLead ? (
                  <p className="m-0 text-base leading-[1.6]">
                    <span className="font-semibold text-foreground">
                      {step.regionsLead}
                    </span>{" "}
                    {regionsText(lang)}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}
