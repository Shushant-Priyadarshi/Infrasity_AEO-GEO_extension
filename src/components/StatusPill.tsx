type Tone = "success" | "danger" | "warn" | "neutral"

const TONE: Record<
  Tone,
  { bg: string; text: string; dot: string; ring: string }
> = {
  success: {
    bg: "bg-success-soft",
    text: "text-success",
    dot: "bg-success",
    ring: "ring-success/15"
  },
  danger: {
    bg: "bg-danger-soft",
    text: "text-danger",
    dot: "bg-danger",
    ring: "ring-danger/15"
  },
  warn: {
    bg: "bg-warn-soft",
    text: "text-warn",
    dot: "bg-warn",
    ring: "ring-warn/15"
  },
  neutral: {
    bg: "bg-surface-sunken",
    text: "text-ink-500",
    dot: "bg-ink-300",
    ring: "ring-ink-200/40"
  }
}

export default function StatusPill({
  tone = "neutral",
  label,
  dense
}: {
  tone?: Tone
  label: string
  dense?: boolean
}) {
  const t = TONE[tone]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ${t.bg} ${t.text} ${t.ring} ${
        dense
          ? "px-2 py-0.5 text-[10.5px]"
          : "px-2.5 py-1 text-[11px]"
      }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
      {label}
    </span>
  )
}
