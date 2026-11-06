export type Lang = "uk" | "en"

export type Link = { label: string; href: string }

export type NoteWithLink = { before: string; link: Link; after: string }

export type TextCard = { title: string; body: string }

export type RuntimeRow = { load: string; full: string; half: string }

export type Faq = { q: string; a: string }

export type Copy = {
  lang: Lang
  homeHref: string
  otherLang: { label: string; href: string; lang: Lang }
  brand: string
  hero: {
    titleBefore: string
    titleHighlight: string
    titleAfter: string
    lead: string
    badgeAlt: string
    shotAlt: string
    shotSrc: string
    badgeSrc: string
  }
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
    more: NoteWithLink
  }
  footer: {
    support: Link
    privacy: Link
    author: string
    disclaimer: string
  }
}
