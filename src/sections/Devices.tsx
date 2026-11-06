import { Tilt } from "@/components/Tilt"
import { Section, SectionTitle } from "@/components/Section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SOON_DEVICES, SUPPORTED_DEVICE } from "@/content/devices"
import type { Copy } from "@/content/types"

export function Devices({ copy }: { copy: Copy }) {
  const { devices } = copy
  return (
    <Section id="devices">
      <SectionTitle>{devices.title}</SectionTitle>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 md:grid-cols-3">
        <li className="sm:col-span-2 md:col-span-3">
          <Tilt axis="rotateX" from={[12, 0]}>
            <Card className="ring-good/40">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Marstek {SUPPORTED_DEVICE}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-ink-soft">
                {devices.supportedNote}
              </CardContent>
            </Card>
          </Tilt>
        </li>
        {SOON_DEVICES.map((name) => (
          <li key={name}>
            <Tilt axis="rotateX" from={[12, 0]}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-lg font-bold">
                    Marstek {name}
                    <Badge variant="secondary">{devices.soonBadge}</Badge>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Tilt>
          </li>
        ))}
      </ul>
    </Section>
  )
}
