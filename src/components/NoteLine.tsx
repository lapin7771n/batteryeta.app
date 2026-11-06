import type { NoteWithLink } from "@/content/types"

export function NoteLine({ note }: { note: NoteWithLink }) {
  return (
    <p className="mb-3 text-[15px] text-muted-foreground">
      {note.before}
      <a className="text-good" href={note.link.href}>
        {note.link.label}
      </a>
      {note.after}
    </p>
  )
}
