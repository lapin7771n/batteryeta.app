export const SRC_PARAM = "src"
export const SRC_PATTERN = /^[a-z0-9_]{1,28}$/
export const CT_MAX_LENGTH = 30

export function relabelStoreLinks(search: string, root: ParentNode): void {
  const src = new URLSearchParams(search).get(SRC_PARAM)
  if (!src || !SRC_PATTERN.test(src)) return
  root.querySelectorAll<HTMLAnchorElement>("a[data-ct]").forEach((link) => {
    const url = new URL(link.href)
    url.searchParams.set("ct", `w_${src}`.slice(0, CT_MAX_LENGTH))
    link.href = url.toString()
  })
}
