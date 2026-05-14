import { FiClock } from "react-icons/fi"

import StatusPill from "./StatusPill"

type Rating = "fresh" | "recent" | "stale" | "outdated" | "unknown"

type Props = {
  freshness: {
    date: string
    source: string
    daysOld: number
    rating: Rating
  }
}

const RATING_TONE: Record<
  Rating,
  { tone: "success" | "neutral" | "warn" | "danger"; label: string }
> = {
  fresh: { tone: "success", label: "Fresh" },
  recent: { tone: "neutral", label: "Recent" },
  stale: { tone: "warn", label: "Stale" },
  outdated: { tone: "danger", label: "Outdated" },
  unknown: { tone: "neutral", label: "Unknown" }
}

function formatDate(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

function formatRelative(days: number) {
  if (days < 0) return "Date not declared"
  if (days === 0) return "Updated today"
  if (days === 1) return "Updated yesterday"
  if (days < 30) return `Updated ${days} days ago`
  if (days < 60) return "Updated a month ago"
  if (days < 365) return `Updated ${Math.round(days / 30)} months ago`
  const years = Math.round(days / 365)
  return years === 1 ? "Updated a year ago" : `Updated ${years} years ago`
}

export default function FreshnessCard({ freshness }: Props) {
  const meta = RATING_TONE[freshness.rating]
  const known = freshness.daysOld >= 0

  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-soft bg-surface-muted text-ink-500 shrink-0">
            <FiClock className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium mb-1">
              Freshness
            </p>
            <p className="text-[14.5px] font-semibold text-ink-900 leading-tight truncate">
              {formatRelative(freshness.daysOld)}
            </p>
            {known ? (
              <p className="mt-0.5 text-[11px] font-mono text-ink-400 truncate">
                {formatDate(freshness.date)} ·{" "}
                <span className="text-ink-300">{freshness.source}</span>
              </p>
            ) : (
              <p className="mt-0.5 text-[11.5px] italic text-ink-300">
                No published or modified date in metadata
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <StatusPill tone={meta.tone} label={meta.label} />
        </div>
      </div>
    </div>
  )
}
