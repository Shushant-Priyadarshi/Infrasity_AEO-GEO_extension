import { useAuditStore } from "~src/store/auditStore"

import StatRow from "./StatRow"

export default function GEO() {
  const { audit } = useAuditStore()

  if (!audit) return null

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4">
        <h2 className="text-sm font-semibold">
          AI Crawler Access
        </h2>

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
          value={audit.geo.aiCrawlerAccess.GoogleExtended}
        />

        <StatRow
          label="PerplexityBot"
          value={audit.geo.aiCrawlerAccess.PerplexityBot}
        />
      </div>
       <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4">
        <h2 className="text-sm font-semibold">
          Content Extractibility
        </h2>

        <StatRow
          label="H1 Count"
          value={audit.geo.ContentExtractibilty.h1Count}
        />

        <StatRow
          label="Lists"
          value={audit.geo.ContentExtractibilty.listCount}
        />

        <StatRow
          label="Tables"
          value={audit.geo.ContentExtractibilty.tableCount}
        />
      </div>
    </div>
  )
}