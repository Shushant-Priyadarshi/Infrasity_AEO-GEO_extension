import { useAuditStore } from "~src/store/auditStore"

import StatRow from "./StatRow"

export default function GEO() {
  const { audit } = useAuditStore()

  if (!audit) return null

  return (
    <div className="space-y-4">
      <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-5">
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white">
            AI Crawler Access
          </h2>

          <p className="text-xs text-zinc-500 mt-1">
            AI crawler permissions from robots.txt
          </p>
        </div>

        <div className="space-y-1">
          <StatRow
            label="GPTBot"
            value={audit.geo.aiCrawlerAccess.GPTBot}
          />

          <StatRow
            label="ClaudeBot"
            value={audit.geo.aiCrawlerAccess.ClaudeBot}
          />

          <StatRow
            label="Google Extended"
            value={
              audit.geo.aiCrawlerAccess
                .GoogleExtended
            }
          />

          <StatRow
            label="PerplexityBot"
            value={
              audit.geo.aiCrawlerAccess
                .PerplexityBot
            }
          />
        </div>
      </div>

      <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-5">
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white">
            Content Extractibility
          </h2>

          <p className="text-xs text-zinc-500 mt-1">
            Structure quality for AI parsing
          </p>
        </div>

        <div className="space-y-1">
          <StatRow
            label="H1 Count"
            value={
              audit.geo.ContentExtractibilty
                .h1Count
            }
          />

          <StatRow
            label="Lists"
            value={
              audit.geo.ContentExtractibilty
                .listCount
            }
          />

          <StatRow
            label="Tables"
            value={
              audit.geo.ContentExtractibilty
                .tableCount
            }
          />
        </div>
      </div>
    </div>
  )
}