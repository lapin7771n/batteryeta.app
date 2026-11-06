export type Lang = "uk" | "en"

export type Link = { label: string; href: string }

export type NoteWithLink = { before: string; link: Link; after: string }

export type TextCard = { title: string; body: string }

export type RuntimeRow = { load: string; full: string; half: string }

export type Faq = { q: string; a: string }

export type ScreenTotal = { label: string; value: string; unit?: string }

export type ScreenCopy = {
  description: string
  statusTime: string
  percent: number
  emptyIn: string
  hours: number
  minutes: number
  hoursUnit: string
  minutesUnit: string
  power: string
  updated: string
  verdictLabel: string
  verdict: string
  schedule: string
  change: string
  today: string
  week: string
  range: string
  axisStart: string
  axisMiddle: string
  axisNow: string
  totals: ScreenTotal[]
}

export type HeadCopy = {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImageAlt: string
  ogLocale: string
  ogLocaleAlternate: string
  appAlternateName: string
  appDescription: string
  appOperatingSystem: string
  appStoreUrl: string
}

export type Copy = {
  lang: Lang
  head: HeadCopy
  homeHref: string
  otherLang: { label: string; href: string; lang: Lang }
  brand: string
  hero: {
    titleBefore: string
    titleHighlight: string
    titleAfter: string
    lead: string
    badgeAlt: string
    badgeSrc: string
  }
  screen: ScreenCopy
  og: { line1: string; line2: string }
  devices: {
    title: string
    supportedNote: string
    soonBadge: string
  }
  features: {
    title: string
    cards: TextCard[]
  }
  useful: {
    title: string
    outage: TextCard & { regionsLead: string }
    notifications: TextCard
    liveActivity: TextCard
  }
  runtime: {
    title: string
    intro: string
    headers: { load: string; full: string; half: string }
    rows: RuntimeRow[]
    note: string
  }
  setup: {
    title: string
    steps: string[]
    note: NoteWithLink
  }
  faq: {
    title: string
    items: Faq[]
  }
  closing: {
    title: string
    linkLabel: string
  }
  limits: {
    title: string
    items: string[]
  }
  footer: {
    support: Link
    privacy: Link
    author: string
    disclaimer: string
  }
}
