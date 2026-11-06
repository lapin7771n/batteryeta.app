import { Section, SectionTitle } from "@/components/Section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { regionsText } from "@/content/regions"
import type { Copy } from "@/content/types"

export function UsefulFeatures({ copy }: { copy: Copy }) {
  const { useful, lang } = copy
  return (
    <Section id="useful">
      <SectionTitle>{useful.title}</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              {useful.outage.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-base text-ink-soft">
            <p className="m-0">{useful.outage.body}</p>
            <p className="m-0">
              <span className="font-semibold text-foreground">
                {useful.outage.regionsLead}
              </span>{" "}
              {regionsText(lang)}
            </p>
          </CardContent>
        </Card>
        {[useful.notifications, useful.liveActivity].map((card) => (
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
