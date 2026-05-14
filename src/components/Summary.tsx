import { motion } from "framer-motion"
import { useState } from "react"
import type { IconType } from "react-icons"
import {
  FiCopy,
  FiFacebook,
  FiGithub,
  FiGlobe,
  FiInstagram,
  FiLink,
  FiLinkedin,
  FiTwitter,
  FiYoutube
} from "react-icons/fi"

import { stagger, staggerItem } from "~src/lib/motion"
import { useAuditStore } from "~src/store/auditStore"

import OpenGraphPreview from "./OpenGraphPreview"
import StatCard from "./StatCard"

type LengthRange = { min: number; max: number }

function LengthIndicator({
  value,
  range
}: {
  value: number
  range: LengthRange
}) {
  const status: "under" | "good" | "over" =
    value === 0 || value < range.min
      ? "under"
      : value > range.max
        ? "over"
        : "good"

  const ceiling = Math.max(range.max + 20, value + 10)
  const tickLeft = Math.min((value / ceiling) * 100, 100)

  return (
    <div className="mt-3">
      <div className="relative h-1.5 rounded-full bg-surface-sunken overflow-hidden">
        <div
          className="absolute inset-y-0 bg-warn/50"
          style={{
            left: 0,
            width: `${(range.min / ceiling) * 100}%`
          }}
        />
        <div
          className="absolute inset-y-0 bg-success/60"
          style={{
            left: `${(range.min / ceiling) * 100}%`,
            width: `${((range.max - range.min) / ceiling) * 100}%`
          }}
        />
        <div
          className="absolute inset-y-0 bg-danger/40"
          style={{
            left: `${(range.max / ceiling) * 100}%`,
            right: 0
          }}
        />
        {value > 0 && (
          <div
            className="absolute top-[-2px] bottom-[-2px] w-[2px] rounded-full bg-ink-900"
            style={{ left: `calc(${tickLeft}% - 1px)` }}
          />
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10.5px] tabular">
        <span className="text-ink-300">
          ideal {range.min}–{range.max}
        </span>
        <span
          className={
            status === "good"
              ? "text-success font-semibold"
              : status === "over"
                ? "text-danger font-semibold"
                : "text-warn font-semibold"
          }>
          {value} chars
        </span>
      </div>
    </div>
  )
}

function detectSocial(url: string): {
  name: string
  Icon: IconType
} {
  const u = url.toLowerCase()
  if (u.includes("twitter.com") || u.includes("x.com"))
    return { name: "Twitter / X", Icon: FiTwitter }
  if (u.includes("linkedin.com"))
    return { name: "LinkedIn", Icon: FiLinkedin }
  if (u.includes("github.com")) return { name: "GitHub", Icon: FiGithub }
  if (u.includes("instagram.com"))
    return { name: "Instagram", Icon: FiInstagram }
  if (u.includes("youtube.com") || u.includes("youtu.be"))
    return { name: "YouTube", Icon: FiYoutube }
  if (u.includes("facebook.com") || u.includes("fb.com"))
    return { name: "Facebook", Icon: FiFacebook }
  return { name: "Link", Icon: FiLink }
}

export default function Summary() {
  const { audit } = useAuditStore()
  const [copied, setCopied] = useState(false)

  if (!audit) return null

  let host = ""
  let path = ""
  try {
    const u = new URL(audit.url)
    host = u.hostname.replace(/^www\./, "")
    path = u.pathname + u.search
  } catch {
    host = audit.url
    path = ""
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(audit.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {}
  }

  const titleVal = audit.metadata.title || ""
  const descVal = audit.metadata.description || ""

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-3.5">
      {/* URL / Identity */}
      <motion.div
        variants={staggerItem}
        className="group relative rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <div className="flex items-start gap-3.5">
          <div className="h-12 w-12 rounded-xl border border-line-soft bg-surface-muted flex items-center justify-center overflow-hidden shrink-0 shadow-inset">
            {audit.metadata.favicon ? (
              <img
                className="h-7 w-7 object-contain"
                src={audit.metadata.favicon}
                alt=""
              />
            ) : (
              <FiGlobe
                className="h-5 w-5 text-ink-300"
                strokeWidth={1.5}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium mb-1">
              Current Page
            </p>

            <h2
              title={host}
              className="text-[14.5px] font-semibold text-ink-900 truncate">
              {host || "—"}
            </h2>

            {path && (
              <p className="mt-0.5 text-[11px] font-mono text-ink-400 truncate">
                {path}
              </p>
            )}
          </div>

          <button
            onClick={copy}
            title="Copy URL"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-swift shrink-0 h-7 w-7 rounded-lg border border-line bg-surface-raised hover:bg-surface-muted flex items-center justify-center text-ink-400 hover:text-ink-700">
            <FiCopy className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
        </div>
        

        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-3 top-2 text-[10px] uppercase tracking-eyebrow text-success font-semibold">
            Copied
          </motion.span>
        )}
      </motion.div>

      {/* Title hero */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
          Title
        </p>
        {titleVal ? (
          <p className="mt-2 text-[13.5px] font-semibold leading-6 text-ink-900 break-words">
            {titleVal}
          </p>
        ) : (
          <p className="mt-2 text-[12.5px] italic text-ink-300">
            No title tag found
          </p>
        )}
        <LengthIndicator
          value={titleVal.length}
          range={{ min: 50, max: 60 }}
        />
      </motion.div>

      {/* Description hero */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
          Description
        </p>
        {descVal ? (
          <p className="mt-2 text-[12.5px] leading-6 text-ink-700 break-words">
            {descVal}
          </p>
        ) : (
          <p className="mt-2 text-[12.5px] italic text-ink-300">
            No meta description found
          </p>
        )}
        <LengthIndicator
          value={descVal.length}
          range={{ min: 150, max: 160 }}
        />
      </motion.div>

      {/* OG Preview */}
      <motion.div variants={staggerItem}>
        <OpenGraphPreview
          title={
            audit.metadata.openGraph.title ||
            audit.aeo.ogTitle.value ||
            ""
          }
          description={
            audit.metadata.openGraph.description ||
            audit.aeo.ogDescription.value ||
            ""
          }
          image={audit.metadata.openGraph.image || ""}
          host={host}
        />
      </motion.div>

      {/* Secondary meta grid */}
      <motion.div
        variants={staggerItem}
        className="grid grid-cols-2 gap-2.5">
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
          label="Robots Tag"
          value={audit.metadata.metaRobots}
          needChars={false}
        />
        <StatCard
          label="Viewport"
          value={audit.metadata.viewport}
          needChars={false}
        />
        <StatCard
          label="Charset"
          value={audit.metadata.charset}
          needChars={false}
        />
      </motion.div>

      {/* Social links */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
            Social Links
          </p>
          <span className="text-[10.5px] tabular text-ink-300">
            {audit.metadata.socialLinks.length}
          </span>
        </div>

        {audit.metadata.socialLinks.length === 0 ? (
          <p className="text-[12px] italic text-ink-300 py-1">
            No social links detected
          </p>
        ) : (
          <div className="-mx-2">
            {audit.metadata.socialLinks.map((link) => {
              const { name, Icon } = detectSocial(link)
              return (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-150 ease-swift hover:bg-surface-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface-muted text-ink-700 shrink-0 group-hover:bg-surface-raised">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-ink-900">
                      {name}
                    </p>
                    <p className="text-[10.5px] text-ink-400 truncate font-mono">
                      {link.replace(/^https?:\/\//, "")}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
