import { Section, SectionTitle } from "@/components/Section"
import type { Copy } from "@/content/types"

export function Faq({ copy }: { copy: Copy }) {
  const { faq } = copy
  return (
    <Section id="faq">
      <SectionTitle>{faq.title}</SectionTitle>
      <div className="grid gap-2">
        {faq.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-[18px] bg-card/60 backdrop-blur-md px-4 open:ring-1 open:ring-foreground/10"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-[650] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="m-0 pb-3.5 text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
