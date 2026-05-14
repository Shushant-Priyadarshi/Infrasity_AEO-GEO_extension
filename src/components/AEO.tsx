import { motion } from "framer-motion"

import { stagger, staggerItem } from "~src/lib/motion"
import { useAuditStore } from "~src/store/auditStore"

import Collapse from "./Collapse"
import FreshnessCard from "./FreshnessCard"
import NumberedList from "./NumberedList"
import SectionHeader from "./SectionHeader"
import ServiceClarity from "./ServiceClarity"
import StatRow from "./StatRow"
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

  const useCaseItems = audit.visibility.useCase.matches.map((m) => m.text)

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-3.5">
      {/* AEO hero */}
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

      {/* Freshness */}
      <motion.div variants={staggerItem}>
        <FreshnessCard freshness={audit.visibility.freshness} />
      </motion.div>

      {/* Service Clarity */}
      <motion.div variants={staggerItem}>
        <ServiceClarity clarity={audit.visibility.serviceClarity} />
      </motion.div>

      {/* Use Case */}
      <motion.div variants={staggerItem}>
        <Collapse
          title="Use Case Statements"
          active={useCaseItems.length > 0}
          count={useCaseItems.length}>
          <NumberedList
            items={useCaseItems}
            emptyLabel="No clear audience statements detected"
          />
        </Collapse>
      </motion.div>

      {/* Citation signals */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <SectionHeader
          eyebrow="Citation Signals"
          title="Trustworthiness"
          subtitle="Cues AI systems weigh when citing a source"
        />
        <div className="mt-3 space-y-0">
          <StatRow
            label="Author declared"
            value={!!audit.geo.CitationWortiness.AuthorName}
          />
          <StatRow
            label="Published date"
            value={!!audit.geo.CitationWortiness.PublishedDates}
          />
          <StatRow
            label="Statistical data"
            value={audit.geo.CitationWortiness.Statisticaldata}
          />
          <StatRow
            label="Mentions research"
            value={audit.geo.CitationWortiness.ResearchDate}
          />
        </div>
      </motion.div>

      {/* FAQ questions */}
      <motion.div variants={staggerItem}>
        <Collapse
          title="FAQ Questions"
          active={audit.aeo.faqQuestions.length > 0}
          count={audit.aeo.faqQuestions.length}>
          <NumberedList items={audit.aeo.faqQuestions} />
        </Collapse>
      </motion.div>

      {/* H2 questions */}
      <motion.div variants={staggerItem}>
        <Collapse
          title="Question H2s"
          active={audit.aeo.h2Questions.length > 0}
          count={audit.aeo.h2Questions.length}>
          <NumberedList items={audit.aeo.h2Questions} />
        </Collapse>
      </motion.div>
    </motion.div>
  )
}
