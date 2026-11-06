import type { Copy, Lang } from "@/content/types"

export const ORIGIN = "https://batteryeta.app"
export const APP_ID = "6822926943"
export const THEME_COLOR = "#000000"

export const PAGE_PATH: Record<Lang, string> = { uk: "/", en: "/en/" }
export const DEFAULT_LANG: Lang = "en"

const FONT_PRELOAD: Record<Lang, string> = {
  uk: "/fonts/onest-cyrillic-wght-normal.woff2",
  en: "/fonts/onest-latin-wght-normal.woff2",
}

const OG_IMAGE_SIZE = { width: 1200, height: 630 }

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function jsonLd(data: object): string {
  const json = JSON.stringify(data, null, 2).replaceAll("<", "\\u003c")
  return `<script type="application/ld+json">\n${json}\n</script>`
}

function meta(attr: "name" | "property", key: string, content: string): string {
  return `<meta ${attr}="${key}" content="${escapeHtml(content)}">`
}

export function pageUrl(lang: Lang): string {
  return `${ORIGIN}${PAGE_PATH[lang]}`
}

export function ogImagePath(lang: Lang): string {
  return `/og-${lang}.png`
}

export function renderHead(copy: Copy): string {
  const { lang, head } = copy
  const url = pageUrl(lang)
  const image = `${ORIGIN}${ogImagePath(lang)}`
  const software = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: copy.brand,
    alternateName: head.appAlternateName,
    description: head.appDescription,
    url,
    inLanguage: lang,
    operatingSystem: head.appOperatingSystem,
    applicationCategory: "UtilitiesApplication",
    image: `${ORIGIN}${ogImagePath(lang)}`,
    installUrl: head.appStoreUrl,
    sameAs: [head.appStoreUrl],
    author: { "@type": "Person", name: "Mykyta Lapin" },
  }
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    meta("name", "description", head.description),
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="uk" href="${pageUrl("uk")}">`,
    `<link rel="alternate" hreflang="en" href="${pageUrl("en")}">`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANG)}">`,
    meta("name", "apple-itunes-app", `app-id=${APP_ID}`),
    meta("name", "theme-color", THEME_COLOR),
    `<link rel="preload" href="${FONT_PRELOAD[lang]}" as="font" type="font/woff2" crossorigin>`,
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", copy.brand),
    meta("property", "og:locale", head.ogLocale),
    meta("property", "og:locale:alternate", head.ogLocaleAlternate),
    meta("property", "og:url", url),
    meta("property", "og:title", head.ogTitle),
    meta("property", "og:description", head.ogDescription),
    meta("property", "og:image", image),
    meta("property", "og:image:width", String(OG_IMAGE_SIZE.width)),
    meta("property", "og:image:height", String(OG_IMAGE_SIZE.height)),
    meta("property", "og:image:alt", head.ogImageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", head.ogTitle),
    meta("name", "twitter:description", head.ogDescription),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", head.ogImageAlt),
    jsonLd(software),
    jsonLd(faq),
  ].join("\n    ")
}
