import { motion } from "framer-motion"

import { stagger, staggerItem } from "~src/lib/motion"
import { useAuditStore } from "~src/store/auditStore"

import Collapse from "./Collapse"
import QuestionList from "./QuestionList"
import SectionHeader from "./SectionHeader"
import StatusPill from "./StatusPill"

function BigStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line-soft bg-surface-muted/40 px-3.5 py-3">
      <p className="text-[9.5px] uppercase tracking-eyebrow text-ink-300 font-medium">
        {label}
      </p>
      <p className="mt-1.5 text-[24px] font-semibold tracking-tight tabular text-ink-900 leading-none">
        {value}
      </p>
    </div>
  )
}

export default function AEO() {
  const { audit } = useAuditStore()

  if (!audit) return null

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-3.5">
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <SectionHeader
          eyebrow="AEO Signals"
          title="Answer Engine Optimization"
          subtitle="AI readability and semantic answer structure"
        />

        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <BigStat label="FAQ Count" value={audit.aeo.faqCount} />
          <BigStat label="Question H2" value={audit.aeo.questionH2Count} />
        </div>

        <div className="mt-4 pt-4 border-t border-line-whisper flex items-center justify-between">
          <p className="text-[12px] text-ink-500">FAQ Schema</p>
          <StatusPill
            tone={audit.aeo.hasFAQSchema ? "success" : "danger"}
            label={audit.aeo.hasFAQSchema ? "Present" : "Missing"}
          />
        </div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Collapse
          title="FAQ Questions"
          active={audit.aeo.faqQuestions.length > 0}
          count={audit.aeo.faqQuestions.length}>
          <QuestionList items={audit.aeo.faqQuestions} />
        </Collapse>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Collapse
          title="Question H2s"
          active={audit.aeo.h2Questions.length > 0}
          count={audit.aeo.h2Questions.length}>
          <QuestionList items={audit.aeo.h2Questions} />
        </Collapse>
      </motion.div>
    </motion.div>
  )
}
