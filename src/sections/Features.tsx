import { Section, SectionTitle } from "@/components/Section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Copy } from "@/content/types"

export function Features({ copy }: { copy: Copy }) {
  const { features } = copy
  return (
    <Section id="features">
      <SectionTitle>{features.title}</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {features.cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="text-lg font-bold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-ink-soft">
              {card.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
