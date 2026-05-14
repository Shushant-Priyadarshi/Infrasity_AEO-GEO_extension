import { motion } from "framer-motion"

import { usePageStore } from "~src/store/pageStore"

const pages = ["Summary", "GEO", "AEO"] as const

export default function NavigationBar() {
  const { page, setPage } = usePageStore()

  return (
    <div className="px-5 pt-3 pb-3 border-b border-line bg-surface-canvas/80">
      <div className="inline-flex items-center gap-0.5 p-1 rounded-full border border-line bg-surface-sunken/70">
        {pages.map((p) => {
          const active = page === p
          return (
            <button
              key={p}
              onClick={() => setPage(p as any)}
              className="relative outline-none focus-visible:ring-2 focus-visible:ring-ink-900/10 rounded-full">
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-surface-raised border border-line shadow-card"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32
                  }}
                />
              )}

              <span
                className={`relative z-10 inline-block px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-colors duration-200 ease-swift ${
                  active
                    ? "text-ink-900"
                    : "text-ink-400 hover:text-ink-700"
                }`}>
                {p}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
