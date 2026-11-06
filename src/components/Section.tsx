import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export function Section({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("border-t border-rule py-10", className)}
      {...props}
    />
  )
}

export function SectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mb-4 text-[clamp(24px,4vw,32px)] leading-[1.15] font-[750] tracking-[-0.02em]",
        className
      )}
      {...props}
    />
  )
}
