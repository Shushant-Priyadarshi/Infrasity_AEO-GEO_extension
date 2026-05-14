import { motion } from "framer-motion"

import { useAuditStore } from "~src/store/auditStore"

import Collapse from "./Collapse"
import StatRow from "./StatRow"
import StatCard from "./StatCard"

export default function AEO() {
  const { audit } = useAuditStore()

  if (!audit) return null

  return (
    <div className="space-y-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="rounded-[28px] border border-[#E6E6E0] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8A83] mb-2">
            AEO Signals
          </p>

          <h2 className="text-[18px] font-semibold tracking-tight text-[#111111]">
            Answer Engine Optimization
          </h2>

          <p className="text-sm text-[#6D6D67] mt-2 leading-6">
            AI readability, answer formatting, and semantic discoverability.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatCard
            label="FAQ Count"
            value={audit.aeo.faqCount}
            needChars={false}
          />

          <StatCard
            label="Question H2"
            value={audit.aeo.questionH2Count}
            needChars={false}
          />
        </div>

        <div className="space-y-1">
          <StatRow
            label="FAQ Schema"
            value={audit.aeo.hasFAQSchema}
          />

          {/* <StatRow
            label="Answer Blocks"
            value={audit.aeo.answerBlocks}
          />

          <StatRow
            label="Clear Purpose"
            value={audit.aeo.clearValuePurpose}
          /> */}
        </div>
      </motion.div>

      <Collapse
        title={`FAQ Questions (${audit.aeo.faqQuestions.length})`}
        active={
          audit.aeo.faqQuestions.length > 0
        }>
        {audit.aeo.faqQuestions.join(
          "\n\n"
        )}
      </Collapse>

      <Collapse
        title={`Question H2 (${audit.aeo.h2Questions.length})`}
        active={
          audit.aeo.h2Questions.length > 0
        }>
        {audit.aeo.h2Questions.join(
          "\n\n"
        )}
      </Collapse>

      <Collapse
        title="OG Title"
        active={
          !!audit.aeo.ogTitle.exists
        }
        needChars>
        {audit.aeo.ogTitle.value}
      </Collapse>

      <Collapse
        title="OG Description"
        active={
          !!audit.aeo.ogDescription
            .exists
        }
        needChars>
        {
          audit.aeo.ogDescription
            .value
        }
      </Collapse>
    </div>
  )
}