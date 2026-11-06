import { NoteLine } from "@/components/NoteLine"
import { Section, SectionTitle } from "@/components/Section"
import type { Copy } from "@/content/types"

export function Setup({ copy }: { copy: Copy }) {
  const { setup } = copy
  return (
    <Section id="setup">
      <SectionTitle>{setup.title}</SectionTitle>
      <div className="rounded-[22px] bg-card/60 px-6 pt-5 pb-2 backdrop-blur-md">
        <ol className="m-0 mb-3 grid list-decimal gap-2 pl-[1.3em]">
          {setup.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <NoteLine note={setup.note} />
      </div>
    </Section>
  )
}
