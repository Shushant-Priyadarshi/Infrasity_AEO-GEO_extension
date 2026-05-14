import { FiCheck, FiX } from "react-icons/fi"

import SectionHeader from "./SectionHeader"

type Slot = { found: boolean; heading: string }

type Props = {
  clarity: {
    forWhom: Slot
    pricing: Slot
    workflow: Slot
    whyDifferent: Slot
  }
}

const TILES: { key: keyof Props["clarity"]; label: string; hint: string }[] = [
  { key: "forWhom", label: "For Whom", hint: "Target audience clarity" },
  { key: "pricing", label: "Pricing", hint: "Cost / plans surfaced" },
  { key: "workflow", label: "Workflow", hint: "How it works section" },
  {
    key: "whyDifferent",
    label: "Why Us",
    hint: "Differentiation / value prop"
  }
]

function Tile({
  label,
  hint,
  slot
}: {
  label: string
  hint: string
  slot: Slot
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-3 transition-colors duration-200 ease-swift ${
        slot.found
          ? "border-line bg-surface-raised"
          : "border-line bg-surface-muted/50"
      }`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-ink-900 leading-tight">
            {label}
          </p>
          <p className="mt-0.5 text-[10px] text-ink-300 tracking-wide">
            {hint}
          </p>
        </div>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full ring-1 shrink-0 ${
            slot.found
              ? "bg-success-soft text-success ring-success/15"
              : "bg-danger-soft text-danger ring-danger/15"
          }`}>
          {slot.found ? (
            <FiCheck className="h-3 w-3" strokeWidth={3.25} />
          ) : (
            <FiX className="h-3 w-3" strokeWidth={3.25} />
          )}
        </span>
      </div>
      {slot.found && slot.heading && (
        <p
          className="mt-2 text-[11px] text-ink-500 leading-5 truncate"
          title={slot.heading}>
          {slot.heading}
        </p>
      )}
    </div>
  )
}

export default function ServiceClarity({ clarity }: Props) {
  const foundCount = TILES.filter((t) => clarity[t.key].found).length

  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
      <SectionHeader
        eyebrow="Service Clarity"
        title="Marketing Section Coverage"
        subtitle="Sections AI looks for when summarizing a product"
        trailing={
          <div className="rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[10.5px] tabular font-medium text-ink-500">
            <span className="text-ink-900 font-semibold">{foundCount}</span>
            <span className="text-ink-300"> / {TILES.length}</span>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-2 mt-4">
        {TILES.map((t) => (
          <Tile
            key={t.key}
            label={t.label}
            hint={t.hint}
            slot={clarity[t.key]}
          />
        ))}
      </div>
    </div>
  )
}
