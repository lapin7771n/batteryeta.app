import { Section, SectionTitle } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { storeUrl } from "@/content/store"
import type { Copy } from "@/content/types"

export function Closing({ copy }: { copy: Copy }) {
  const { closing, lang } = copy
  return (
    <Section id="closing" className="text-center">
      <SectionTitle>{closing.title}</SectionTitle>
      <Button asChild size="lg" className="h-11 rounded-full px-6 text-base font-bold">
        <a data-ct href={storeUrl(lang, "end")}>
          {closing.linkLabel}
        </a>
      </Button>
    </Section>
  )
}
