import { RingHeroAnchor } from "@/components/RingDock"
import { Tilt } from "@/components/Tilt"
import { storeUrl } from "@/content/store"
import type { Copy } from "@/content/types"

export function Hero({ copy }: { copy: Copy }) {
  const { hero, lang } = copy
  return (
    <div className="grid items-center gap-6 bg-[radial-gradient(600px_420px_at_85%_20%,var(--disc-good),transparent_70%)] pt-6 pb-12 md:grid-cols-[1.15fr_0.85fr] *:min-w-0">
      <div>
        <h1 className="mb-4 text-[clamp(34px,6vw,54px)] leading-[1.06] font-extrabold tracking-[-0.028em]">
          {hero.titleBefore}
          <span className="text-good">{hero.titleHighlight}</span>
          {hero.titleAfter}
        </h1>
        <p className="mb-6 text-[19px] text-ink-soft">{hero.lead}</p>
        <a
          className="my-3 inline-block leading-none"
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
        <RingHeroAnchor />
      </div>
      <div className="relative justify-self-center">
        <Tilt axis="rotateY" from={[-18, 18]}>
          <figure className="m-0 w-[min(300px,80vw)] overflow-hidden rounded-[40px] border border-[var(--shot-card-border)] shadow-[var(--shot-card)]">
            <img
              className="block h-auto w-full"
              src={hero.shotSrc}
              alt={hero.shotAlt}
              width={506}
              height={1100}
              fetchPriority="high"
            />
          </figure>
        </Tilt>
      </div>
    </div>
  )
}
