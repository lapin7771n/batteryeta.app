import { storeUrl } from "@/content/store"
import type { Copy } from "@/content/types"
import { PAIR_PATH } from "@/head"

function RingMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="11" fill="none" stroke="var(--chip)" strokeWidth="4" />
      <path
        d="M14 3a11 11 0 1 1-10.4 14.6"
        fill="none"
        stroke="var(--good)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PairApp({ copy }: { copy: Copy }) {
  const { brand, hero, homeHref, lang, otherLang, pair } = copy
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col gap-7 px-6 pt-8 pb-8 sm:justify-center sm:gap-8 sm:py-16">
      <header className="flex items-center justify-between gap-3">
        <a
          className="flex items-center gap-2.5 text-[17px] font-bold text-foreground no-underline"
          href={homeHref}
        >
          <RingMark />
          {brand}
        </a>
        <a
          className="rounded-full border border-edge px-3 py-1.5 text-[15px] text-muted-foreground no-underline"
          href={PAIR_PATH[otherLang.lang]}
          hrefLang={otherLang.lang}
          lang={otherLang.lang}
        >
          {otherLang.label}
        </a>
      </header>
      <main className="flex flex-col gap-7 sm:gap-8">
        <div className="flex flex-col gap-3.5">
          <h1 className="m-0 text-[30px] leading-[1.15] font-extrabold">{pair.title}</h1>
          <p className="m-0 text-[17px] leading-[1.45] text-ink-soft">{pair.lead}</p>
        </div>
        <ol className="m-0 flex list-decimal flex-col gap-3 rounded-[22px] bg-card py-[18px] pr-5 pl-10 text-base leading-[1.4]">
          {pair.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </main>
      <section className="mt-auto flex flex-col gap-3 sm:mt-0">
        <p className="m-0 text-[15px] text-muted-foreground">{pair.store.question}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <a className="inline-block leading-none" data-ct href={storeUrl(lang, "pair")}>
            <img
              className="h-12 w-auto"
              src={hero.badgeSrc}
              alt={hero.badgeAlt}
              width={144}
              height={48}
            />
          </a>
          <span className="text-[15px] text-muted-foreground">{pair.store.soon}</span>
        </div>
      </section>
    </div>
  )
}
