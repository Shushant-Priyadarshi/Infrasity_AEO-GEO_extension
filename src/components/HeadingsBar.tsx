import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FiChevronDown } from "react-icons/fi"

import { swift } from "~src/lib/motion"

import HeadingsOutline from "./HeadingsOutline"
import StatusPill from "./StatusPill"

type Counts = {
  h1Count: number
  h2Count: number
  h3Count: number
  h4Count: number
  h5Count: number
  h6Count: number
}

type Rating = "good" | "needs-work" | "broken"

const RATING_TONE: Record<
  Rating,
  { tone: "success" | "warn" | "danger"; label: string }
> = {
  good: { tone: "success", label: "Good" },
  "needs-work": { tone: "warn", label: "Needs work" },
  broken: { tone: "danger", label: "Broken" }
}

type Props = {
  counts: Counts
  hierarchy?: {
    items: { level: number; text: string }[]
    rating: Rating
    issues: string[]
  }
}

export default function HeadingsBar({ counts, hierarchy }: Props) {
  const [open, setOpen] = useState(false)

  const values = [
    { label: "H1", count: counts.h1Count },
    { label: "H2", count: counts.h2Count },
    { label: "H3", count: counts.h3Count },
    { label: "H4", count: counts.h4Count },
    { label: "H5", count: counts.h5Count },
    { label: "H6", count: counts.h6Count }
  ]

  const max = Math.max(...values.map((v) => v.count), 1)
  const total = values.reduce((acc, v) => acc + v.count, 0)
  const ratingMeta = hierarchy ? RATING_TONE[hierarchy.rating] : null

  return (
    <div className="rounded-2xl border border-line bg-surface-raised shadow-card overflow-hidden">
      <div className="p-4">
        <div className="flex items-baseline justify-between mb-4 gap-3">
          <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
            Heading Hierarchy
          </p>
          <div className="flex items-center gap-2">
            {ratingMeta && (
              <StatusPill tone={ratingMeta.tone} label={ratingMeta.label} dense />
            )}
            <p className="text-[11px] tabular text-ink-500">
              <span className="font-semibold text-ink-900">{total}</span>{" "}
              <span className="text-ink-300">total</span>
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2 h-[72px] px-0.5">
          {values.map((v, i) => {
            const heightPct = (v.count / max) * 100
            const isEmpty = v.count === 0
            return (
              <div
                key={v.label}
                className="flex-1 flex flex-col items-center gap-1.5 group">
                <p
                  className={`text-[10.5px] tabular font-semibold ${
                    isEmpty ? "text-ink-200" : "text-ink-900"
                  }`}>
                  {v.count}
                </p>

                <div className="relative w-full h-[40px] flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${isEmpty ? 4 : Math.max(heightPct, 8)}%`
                    }}
                    transition={{
                      duration: 0.5,
                      ease: swift,
                      delay: 0.06 * i
                    }}
                    className={`w-full rounded-md transition-colors ${
                      isEmpty
                        ? "bg-line-soft"
                        : "bg-ink-900 group-hover:bg-ink-700"
                    }`}
                  />
                </div>

                <p
                  className={`text-[10px] tabular tracking-wide ${
                    isEmpty ? "text-ink-300" : "text-ink-500"
                  }`}>
                  {v.label}
                </p>
              </div>
            )
          })}
        </div>

        {hierarchy && hierarchy.issues.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {hierarchy.issues.map((issue, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[11.5px] text-ink-500">
                <span
                  className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${
                    hierarchy.rating === "broken"
                      ? "bg-danger"
                      : "bg-warn"
                  }`}
                />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {hierarchy && hierarchy.items.length > 0 && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className={`group w-full flex items-center justify-between px-4 py-3 border-t border-line-whisper text-left transition-colors duration-150 ease-swift hover:bg-surface-muted/40 ${
              open ? "bg-surface-muted/40" : ""
            }`}>
            <p className="text-[12px] font-medium text-ink-700">
              View Full Outline
              <span className="ml-1.5 text-[10.5px] tabular text-ink-300">
                ({hierarchy.items.length})
              </span>
            </p>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.28, ease: swift }}
              className="text-ink-300 group-hover:text-ink-500">
              <FiChevronDown className="h-4 w-4" strokeWidth={2.25} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="outline"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: swift }}
                className="overflow-hidden">
                <div className="px-4 pb-4 pt-3 border-t border-line-whisper">
                  <HeadingsOutline items={hierarchy.items} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
