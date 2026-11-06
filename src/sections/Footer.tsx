import type { Copy } from "@/content/types"

export function Footer({ copy }: { copy: Copy }) {
  const { footer, otherLang } = copy
  return (
    <footer className="border-t border-rule pt-8 pb-12 text-sm text-muted-foreground">
      <nav className="mb-3 flex flex-wrap gap-4">
        <a href={footer.support.href}>{footer.support.label}</a>
        <a href={footer.privacy.href}>{footer.privacy.label}</a>
        <a href={otherLang.href} hrefLang={otherLang.lang} lang={otherLang.lang}>
          {otherLang.label}
        </a>
      </nav>
      <p className="mb-3">{footer.author}</p>
      <p className="mb-3">{footer.disclaimer}</p>
    </footer>
  )
}
