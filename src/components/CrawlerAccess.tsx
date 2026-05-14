import { FiCheck, FiX } from "react-icons/fi"

import SectionHeader from "./SectionHeader"

type Access = {
  GPTBot: boolean
  ClaudeBot: boolean
  GoogleExtended: boolean
  PerplexityBot: boolean
  UserAgent: boolean
}

const CRAWLERS: { key: keyof Access; label: string; sub: string }[] = [
  { key: "GPTBot", label: "GPTBot", sub: "OpenAI" },
  { key: "ClaudeBot", label: "ClaudeBot", sub: "Anthropic" },
  { key: "GoogleExtended", label: "Google-Extended", sub: "Google" },
  { key: "PerplexityBot", label: "PerplexityBot", sub: "Perplexity" }
]

export default function CrawlerAccess({ access }: { access: Access }) {
  const allowedCount = CRAWLERS.filter((c) => access[c.key]).length

  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
      <SectionHeader
        eyebrow="AI Crawlers"
        title="Access Policy"
        subtitle="How major AI systems can read this site"
        trailing={
          <div className="rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[10.5px] tabular font-medium text-ink-500">
            <span className="text-ink-900 font-semibold">{allowedCount}</span>
            <span className="text-ink-300"> / {CRAWLERS.length} allowed</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-2 mt-4">
        {CRAWLERS.map((c) => {
          const allowed = access[c.key]
          return (
            <div
              key={c.key}
              className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 transition-colors duration-200 ease-swift ${
                allowed
                  ? "border-line bg-surface-raised hover:border-line-strong"
                  : "border-line bg-surface-muted/50"
              }`}>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-ink-900 truncate">
                  {c.label}
                </p>
                <p className="text-[10px] text-ink-300 tracking-wide">
                  {c.sub}
                </p>
              </div>

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ring-1 shrink-0 ${
                  allowed
                    ? "bg-success-soft text-success ring-success/15"
                    : "bg-danger-soft text-danger ring-danger/15"
                }`}>
                {allowed ? (
                  <FiCheck className="h-3 w-3" strokeWidth={3.25} />
                ) : (
                  <FiX className="h-3 w-3" strokeWidth={3.25} />
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
