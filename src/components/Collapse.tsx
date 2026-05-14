import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FiCheck, FiChevronDown, FiX } from "react-icons/fi"

import { swift } from "~src/lib/motion"

export default function Collapse({
  title,
  children,
  active,
  needChars,
  variant = "prose",
  count
}: {
  title: string
  children: React.ReactNode
  active?: boolean
  needChars?: boolean
  variant?: "prose" | "code"
  count?: number
}) {
  const [open, setOpen] = useState(false)
  const hasActiveProp = active !== undefined

  return (
    <motion.div
      initial={false}
      animate={{ y: 0 }}
      className={`rounded-2xl border bg-surface-raised shadow-card overflow-hidden transition-colors duration-200 ease-swift ${
        open ? "border-line-strong" : "border-line"
      }`}>
      <button
        onClick={() => setOpen(!open)}
        className={`group w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-150 ease-swift hover:bg-surface-muted/40 ${
          open ? "bg-surface-muted/40" : ""
        }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          {hasActiveProp && (
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ring-1 shrink-0 ${
                active
                  ? "bg-success-soft text-success ring-success/15"
                  : "bg-danger-soft text-danger ring-danger/15"
              }`}>
              {active ? (
                <FiCheck className="h-3 w-3" strokeWidth={3.25} />
              ) : (
                <FiX className="h-3 w-3" strokeWidth={3.25} />
              )}
            </span>
          )}

          <p className="text-[13px] font-medium text-ink-900 truncate">
            {title}
          </p>

          {typeof count === "number" && (
            <span className="text-[10.5px] tabular font-medium text-ink-300 bg-surface-sunken rounded-full px-1.5 py-0.5 shrink-0">
              {count}
            </span>
          )}
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: swift }}
          className="text-ink-300 group-hover:text-ink-500 shrink-0">
          <FiChevronDown className="h-4 w-4" strokeWidth={2.25} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: swift }}
            className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-line-whisper">
              <div
                className={`pt-3.5 break-words ${
                  variant === "code"
                    ? "font-mono text-[11.5px] leading-6 text-ink-700"
                    : "text-[12.5px] leading-6 text-ink-500"
                } whitespace-pre-wrap`}>
                {children}
              </div>

              {active && needChars && typeof children === "string" && (
                <p className="mt-3 text-[10.5px] tabular text-ink-300">
                  {String(children).length} chars
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
