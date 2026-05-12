import { useAuditStore } from "~src/store/auditStore"

import StatRow from "./StatRow"

export default function AEO() {
  const { audit } = useAuditStore()

  if (!audit) return null

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4">
        <StatRow
          label="FAQ Count"
          value={audit.aeo.faqCount}
        />

        <StatRow
          label="Question H2"
          value={audit.aeo.questionH2Count}
        />

        <StatRow
          label="Answer Blocks"
          value={audit.aeo.answerBlocks}
        />

        <StatRow
          label="OG Title"
          value={audit.aeo.hasOgTitle}
        />

        <StatRow
          label="OG Description"
          value={audit.aeo.hasOgDescription}
        />
 <StatRow
          label="FAQ Schema"
          value={audit.aeo.hasFAQSchema}
        />
      </div>
    </div>
  )
}