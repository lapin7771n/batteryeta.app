export type Lang = "uk" | "en"

export type Link = { label: string; href: string }

export type NoteWithLink = { before: string; link: Link; after: string }

export type TextCard = { title: string; body: string }

export type Faq = { q: string; a: string }

export type ScreenTotal = { label: string; value: string; unit?: string }

export type ScreenId =
  | "home"
  | "charging"
  | "verdict"
  | "activity"
  | "notification"
  | "week"

export type HomeVerdict = {
  tone: "good" | "bad"
  label: string
  text: string
  cut?: string
}

export type HomeVariant = {
  statusTime: string
  percent: number
  label: string
  hours: number
  minutes: number
  power: string
  updated: string
  verdict: HomeVerdict | null
  schedule: string
}

export type HomeScreenCopy = {
  hoursUnit: string
  minutesUnit: string
  change: string
  today: string
  week: string
  range: string
  axisStart: string
  axisMiddle: string
  axisNow: string
  totals: ScreenTotal[]
  lasts: HomeVariant
  charging: HomeVariant
  short: HomeVariant
}

export type LockScreenCopy = {
  date: string
  time: string
  app: string
  code: string
  emptyLabel: string
  emptyTime: string
  usage: string
  grid: string
  notificationTitle: string
  notificationTime: string
  notificationBody: string
}

export type WeekRow = { day: string; charged: string; used: string }

export type WeekScreenCopy = {
  statusTime: string
  now: string
  today: string
  week: string
  charged: string
  used: string
  days: string[]
  totals: ScreenTotal[]
  rows: WeekRow[]
}

export type ScreensCopy = {
  descriptions: Record<ScreenId, string>
  home: HomeScreenCopy
  lock: LockScreenCopy
  week: WeekScreenCopy
}

export type FeatureStep = TextCard & { screen: ScreenId; regionsLead?: string }

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
  screens: ScreensCopy
  og: { line1: string; line2: string }
  devices: {
    title: string
    supportedNote: string
    soonBadge: string
  }
  features: {
    steps: FeatureStep[]
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
    developer: { label: string; link: Link }
    disclaimer: string
  }
}
