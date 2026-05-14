import { motion } from "framer-motion"

import { useAuditStore } from "~src/store/auditStore"

import Collapse from "./Collapse"
import StatCard from "./StatCard"

export default function Summary() {
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
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl border border-[#ECECE6] bg-[#F6F6F2] flex items-center justify-center overflow-hidden shrink-0">
            {audit.metadata.favicon ? (
              <img
                className="w-8 h-8 object-contain"
                src={audit.metadata.favicon}
              />
            ) : (
              <div className="h-3 w-3 rounded-full bg-[#D2D2CC]" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8A83] mb-2">
              Current Page
            </p>

            <h2 className="text-[15px] leading-7 font-semibold break-words text-[#111111]">
              {audit.url}
            </h2>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Title"
          value={audit.metadata.title}
          needChars
        />

        <StatCard
          label="Canonical"
          value={audit.metadata.canonical}
          needChars={false}
        />

        <StatCard
          label="Author"
          value={audit.metadata.author}
          needChars={false}
        />

        <StatCard
          label="Publisher"
          value={audit.metadata.publisher}
          needChars={false}
        />

         <StatCard
          label="Robot Tag"
          value={audit.metadata.metaRobots}
          needChars={false}
        />

         <StatCard
          label="View Port"
          value={audit.metadata.viewport}
          needChars={false}
        />

          <StatCard
          label="Char Set"
          value={audit.metadata.charset}
          needChars={false}
        />
      </div>

      <Collapse
        title="Description"
        active={!!audit.metadata.description}
        needChars>
        {audit.metadata.description}
      </Collapse>

      <Collapse
        title="Open Graph Title"
        active={!!audit.aeo.ogTitle.exists}
        needChars>
        {audit.aeo.ogTitle.value}
      </Collapse>

      <Collapse
        title="Open Graph Description"
        active={
          !!audit.aeo.ogDescription.exists
        }
        needChars>
        {audit.aeo.ogDescription.value}
      </Collapse>

            

      <div className="rounded-3xl border border-[#E6E6E0] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8A83] mb-4">
          Social Links
        </p>

        <div className="space-y-3">
          {audit.metadata.socialLinks.map(
            (link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                className="block text-sm text-[#4E4E49] break-all hover:text-black transition">
                {link}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  )
}