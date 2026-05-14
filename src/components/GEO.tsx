import { motion } from "framer-motion"

import { useAuditStore } from "~src/store/auditStore"

import Collapse from "./Collapse"
import StatRow from "./StatRow"

export default function GEO() {
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
            GEO Signals
          </p>

          <h2 className="text-[18px] font-semibold tracking-tight text-[#111111]">
            Content Extractibility
          </h2>

          <p className="text-sm text-[#6D6D67] mt-2 leading-6">
            Structure quality and crawler accessibility for AI systems.
          </p>
        </div>

        <div className="space-y-1">
          <StatRow label="llms.txt" value={audit.geo.llmsTxt.exists} />

          <StatRow label="sitemap.xml" value={audit.geo.sitemapXml.exists} />

          <StatRow
            label="H1 Count"
            value={audit.geo.ContentExtractibilty.h1Count}
          />

          <StatRow
            label="H2 Count"
            value={audit.geo.ContentExtractibilty.h2Count}
          />

          <StatRow
            label="H3 Count"
            value={audit.geo.ContentExtractibilty.h3Count}
          />

          <StatRow
            label="H4 Count"
            value={audit.geo.ContentExtractibilty.h4Count}
          />

          <StatRow
            label="H5 Count"
            value={audit.geo.ContentExtractibilty.h5Count}
          />

          <StatRow
            label="H6 Count"
            value={audit.geo.ContentExtractibilty.h6Count}
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
      </motion.div>

      <Collapse
        title="robots.txt"
        children={audit.geo.robotsTxt.content}
        active={audit.geo.robotsTxt.exists}
      />

      <Collapse
        title={`Detected Bots (${audit.geo.robotsTxt.bots.length})`}
        active={audit.geo.robotsTxt.exists}>
        {audit.geo.robotsTxt.bots.join("\n")}
      </Collapse>

      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.05
        }}
        className="rounded-[28px] border border-[#E6E6E0] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8A83] mb-2">
              Assets
            </p>

            <h2 className="text-[18px] font-semibold tracking-tight text-[#111111]">
              Images
            </h2>

            <p className="text-sm text-[#6D6D67] mt-2">
              Website visual assets detected on the page.
            </p>
          </div>

          <div className="rounded-full border border-[#E8E8E2] bg-[#F6F6F2] px-3 py-1 text-xs font-medium text-[#55554F]">
            {audit.metadata.images.length}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {audit.metadata.images.slice(0, 18).map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[#ECECE7] bg-[#F8F8F5] aspect-square">
              <img
                src={image}
                loading="lazy"
                className="w-full h-full object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition duration-200">
                <p className="text-[10px] text-[#61615C] truncate">
                  {image.split("/").pop()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
