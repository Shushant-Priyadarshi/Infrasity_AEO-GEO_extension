import { motion } from "framer-motion"

import { swift } from "~src/lib/motion"

type Counts = {
  h1Count: number
  h2Count: number
  h3Count: number
  h4Count: number
  h5Count: number
  h6Count: number
}

export default function HeadingsBar({ counts }: { counts: Counts }) {
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

  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
          Heading Hierarchy
        </p>
        <p className="text-[11px] tabular text-ink-500">
          <span className="font-semibold text-ink-900">{total}</span>{" "}
          <span className="text-ink-300">total</span>
        </p>
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
                  animate={{ height: `${isEmpty ? 4 : Math.max(heightPct, 8)}%` }}
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
    </div>
  )
}
