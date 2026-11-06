import { NoteLine } from "@/components/NoteLine"
import { Section, SectionTitle } from "@/components/Section"
import type { Copy } from "@/content/types"

export function Limits({ copy }: { copy: Copy }) {
  const { limits } = copy
  return (
    <Section id="limits">
      <SectionTitle>{limits.title}</SectionTitle>
      <ul className="m-0 mb-3 grid list-none gap-2 p-0">
        {limits.items.map((item) => (
          <li
            key={item}
            className="rounded-[18px] border-l-[3px] border-warn bg-card px-4 py-3"
          >
            {item}
          </li>
        ))}
      </ul>
      <NoteLine note={limits.more} />
    </Section>
  )
}
