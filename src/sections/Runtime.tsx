import { Section, SectionTitle } from "@/components/Section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Copy } from "@/content/types"

export function Runtime({ copy }: { copy: Copy }) {
  const { runtime } = copy
  return (
    <Section id="runtime">
      <SectionTitle>{runtime.title}</SectionTitle>
      <p className="mb-3">{runtime.intro}</p>
      <Table className="mb-3 text-base tabular-nums">
        <TableHeader>
          <TableRow>
            <TableHead>{runtime.headers.load}</TableHead>
            <TableHead>{runtime.headers.full}</TableHead>
            <TableHead>{runtime.headers.half}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runtime.rows.map((row) => (
            <TableRow key={row.load}>
              <TableCell className="whitespace-normal">{row.load}</TableCell>
              <TableCell>{row.full}</TableCell>
              <TableCell>{row.half}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mb-3 text-[15px] text-muted-foreground">{runtime.note}</p>
    </Section>
  )
}
