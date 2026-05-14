import { motion } from "framer-motion"
import { useState } from "react"
import { FiCheck, FiImage, FiX } from "react-icons/fi"

import { stagger, staggerItem } from "~src/lib/motion"
import { useAuditStore } from "~src/store/auditStore"

import Collapse from "./Collapse"
import CrawlerAccess from "./CrawlerAccess"
import HeadingsBar from "./HeadingsBar"
import SectionHeader from "./SectionHeader"

function ReadinessTile({
  name,
  exists
}: {
  name: string
  exists: boolean
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-3 flex items-center gap-2.5 transition-colors duration-200 ease-swift ${
        exists
          ? "border-line bg-surface-raised hover:border-line-strong"
          : "border-line bg-surface-muted/50"
      }`}>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full ring-1 shrink-0 ${
          exists
            ? "bg-success-soft text-success ring-success/15"
            : "bg-danger-soft text-danger ring-danger/15"
        }`}>
        {exists ? (
          <FiCheck className="h-3 w-3" strokeWidth={3.25} />
        ) : (
          <FiX className="h-3 w-3" strokeWidth={3.25} />
        )}
      </span>
      <p className="text-[11.5px] font-mono text-ink-700 ">
        {name}
      </p>
    </div>
  )
}

function RobotsCodeBlock({ content }: { content: string }) {
  const lines = content.split("\n")
  return (
    <div className="-mx-4 -mb-4 mt-1 rounded-b-2xl bg-surface-muted/60 border-t border-line-whisper font-mono text-[11px] leading-6 text-ink-700 max-h-[280px] overflow-y-auto scrollbar-fine">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none w-9 shrink-0 text-right pr-3 py-0 text-ink-300 tabular border-r border-line-whisper bg-surface-sunken/50">
            {i + 1}
          </span>
          <span className="pl-3 pr-4 whitespace-pre-wrap break-all">
            {line || " "}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function GEO() {
  const { audit } = useAuditStore()
  const [showAllImages, setShowAllImages] = useState(false)

  if (!audit) return null

  const images = audit.metadata.images
  const visibleImages = showAllImages ? images : images.slice(0, 12)

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-3.5">
      {/* Readiness row */}
      <motion.div variants={staggerItem}>
        <div className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
          <SectionHeader
            eyebrow="GEO Signals"
            title="Crawler Readiness"
            subtitle="Discovery files AI systems look for first"
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            <ReadinessTile
              name="robots.txt"
              exists={audit.geo.robotsTxt.exists}
            />
            <ReadinessTile
              name="llms.txt"
              exists={audit.geo.llmsTxt.exists}
            />
            <ReadinessTile
              name="sitemap.xml"
              exists={audit.geo.sitemapXml.exists}
            />
          </div>
        </div>
      </motion.div>

      {/* Crawler access */}
      {/* <motion.div variants={staggerItem}>
        <CrawlerAccess access={audit.geo.aiCrawlerAccess} />
      </motion.div> */}

      {/* Headings hierarchy */}
      <motion.div variants={staggerItem}>
        <HeadingsBar counts={audit.geo.ContentExtractibilty} />
      </motion.div>

      {/* Content structure stats */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium mb-3">
          Content Structure
        </p>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-surface-muted/70">
            <p className="text-[12px] text-ink-500">Lists</p>
            <p className="text-[12.5px] font-semibold tabular text-ink-900">
              {audit.geo.ContentExtractibilty.listCount}
            </p>
          </div>
          <div className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-surface-muted/70">
            <p className="text-[12px] text-ink-500">Tables</p>
            <p className="text-[12.5px] font-semibold tabular text-ink-900">
              {audit.geo.ContentExtractibilty.tableCount}
            </p>
          </div>
          <div className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-surface-muted/70">
            <p className="text-[12px] text-ink-500">Words</p>
            <p className="text-[12.5px] font-semibold tabular text-ink-900">
              {audit.geo.ContentExtractibilty.wordCount}
            </p>
          </div>
          <div className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-surface-muted/70">
            <p className="text-[12px] text-ink-500">DOM size</p>
            <p className="text-[12.5px] font-semibold tabular text-ink-900">
              {audit.geo.ContentExtractibilty.domSize}
            </p>
          </div>
        </div>
      </motion.div>

      {/* robots.txt content */}
      <motion.div variants={staggerItem}>
        <Collapse
          title="robots.txt"
          active={audit.geo.robotsTxt.exists}
          variant="code">
          {audit.geo.robotsTxt.exists && audit.geo.robotsTxt.content ? (
            <RobotsCodeBlock content={audit.geo.robotsTxt.content} />
          ) : (
            "No robots.txt found"
          )}
        </Collapse>
      </motion.div>

      {/* llms.txt content */}
      {audit.geo.llmsTxt.exists && audit.geo.llmsTxt.content && (
        <motion.div variants={staggerItem}>
          <Collapse
            title="llms.txt"
            active={true}
            variant="code">
            {audit.geo.llmsTxt.content}
          </Collapse>
        </motion.div>
      )}

      {/* Detected bots */}
      {audit.geo.robotsTxt.exists && (
        <motion.div
          variants={staggerItem}
          className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
              Detected Bots
            </p>
            <span className="text-[10.5px] tabular text-ink-300">
              {audit.geo.robotsTxt.bots.length}
            </span>
          </div>
          {audit.geo.robotsTxt.bots.length === 0 ? (
            <p className="text-[12px] italic text-ink-300">None listed</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {audit.geo.robotsTxt.bots.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-full border border-line bg-surface-sunken px-2 py-0.5 text-[10.5px] font-mono text-ink-700">
                  {b}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Images grid */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <SectionHeader
          eyebrow="Assets"
          title="Images"
          subtitle="Visual assets detected on the page"
          trailing={
            <div className="rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[10.5px] tabular font-medium text-ink-500">
              {images.length}
            </div>
          }
        />

        {images.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-line bg-surface-muted/40 py-8 flex flex-col items-center gap-2 text-ink-300">
            <FiImage className="h-5 w-5" strokeWidth={1.5} />
            <p className="text-[11.5px] tracking-wide">No images detected</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {visibleImages.map((image, index) => (
                <a
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-line-soft bg-surface-muted aspect-square transition-all duration-200 ease-swift hover:border-line-strong hover:-translate-y-px hover:shadow-card">
                  <img
                    src={image}
                    loading="lazy"
                    className="w-full h-full object-contain p-3 transition duration-300 group-hover:scale-[1.04]"
                    alt=""
                  />
                </a>
              ))}
            </div>

            {images.length > 12 && (
              <button
                onClick={() => setShowAllImages((v) => !v)}
                className="mt-3 w-full rounded-lg border border-line bg-surface-raised py-2 text-[11px] font-medium text-ink-500 hover:text-ink-900 hover:border-line-strong transition-colors duration-200 ease-swift">
                {showAllImages
                  ? "Show fewer"
                  : `Show all (${images.length})`}
              </button>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
