import { motion } from "framer-motion"

import { useAuditStore } from "~src/store/auditStore"

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="16"
        height="16"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="5"
        y="5"
        width="8"
        height="8"
        rx="2.25"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  )
}

export default function Header() {
  const { audit } = useAuditStore()
  const connected = !!audit

  let host = ""
  try {
    if (audit?.url) host = new URL(audit.url).hostname.replace(/^www\./, "")
  } catch {
    host = ""
  }

  return (
    <div className="px-5 pt-4 pb-3.5 border-b border-line bg-surface-canvas/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-ink-900">
            <LogoMark />
          </span>

          <span className="text-[12px] uppercase tracking-eyebrow font-semibold text-ink-900">
            Boomers
          </span>

          <span className="h-3 w-px bg-line-strong/70" aria-hidden />

          <span className="text-[11.5px] uppercase tracking-eyebrow text-ink-400 font-medium">
            GEO / AEO
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-line bg-surface-raised pl-2 pr-2.5 py-1 shadow-card">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <motion.span
              animate={
                connected
                  ? { scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }
                  : { scale: 1, opacity: 0 }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className={`absolute inset-0 rounded-full ${
                connected ? "bg-success/40" : "bg-ink-300/40"
              }`}
            />
            <span
              className={`h-2 w-2 rounded-full ${
                connected ? "bg-success" : "bg-ink-300"
              }`}
            />
          </div>

          <p className="text-[10.5px] font-medium uppercase tracking-eyebrow text-ink-500">
            {connected ? "Connected" : "Scanning"}
          </p>
        </div>
      </div>

      {host && (
        <p className="mt-2 text-[10.5px] font-mono text-ink-300 truncate">
          {host}
        </p>
      )}
    </div>
  )
}
