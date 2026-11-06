import type { Lang } from "./types"

export type StorePlacement = "badge" | "end"

export function storeUrl(lang: Lang, placement: StorePlacement): string {
  return `https://apps.apple.com/app/apple-store/id6822926943?pt=122193121&ct=web_${lang}_${placement}&mt=8`
}
