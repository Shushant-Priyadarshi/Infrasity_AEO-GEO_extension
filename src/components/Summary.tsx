import { useMemo } from "react"

import { useAuditStore } from "~src/store/auditStore"

export default function Summary() {
  const { audit } = useAuditStore()

  if (!audit) return null

  const score = useMemo(() => {
    let geo = 0
    let aeo = 0

    if (audit.geo.aiCrawlerAccess.GPTBot) geo += 2
    if (audit.geo.aiCrawlerAccess.ClaudeBot) geo += 2
    if (audit.geo.aiCrawlerAccess.GoogleExtended) geo += 2
    if (audit.geo.aiCrawlerAccess.PerplexityBot) geo += 2
    if (audit.geo.llmsTxtPresent) geo += 2

    if (audit.aeo.faqCount > 0) aeo += 4
    if (audit.aeo.questionH2Count > 0) aeo += 4
    if (audit.aeo.answerBlocks > 0) aeo += 4
    if (audit.aeo.ogTitle.exists) aeo += 4
    if (audit.aeo.ogDescription.exists) aeo += 2
    if (audit.aeo.hasFAQSchema) aeo += 2

    return {
      geo,
      aeo,
      overall: geo + aeo
    }
  }, [audit])

  return (
    <div className="space-y-5">
      {/* Overall */}
      <div className="bg-[#0B1120] border border-white/10 backdrop-blur-xl rounded-3xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-zinc-400 mb-2">
              Overall Score
            </p>

            <div className="flex items-end gap-1">
            <h2 className="text-5xl font-semibold tracking-tight text-white">
                {score.overall}
              </h2>

              <span className="text-sm text-zinc-400 mb-1">
                /30
              </span>
            </div>
          </div>

          {/* <div className="px-2.5 py-1 rounded-full bg-zinc-100 text-[11px] text-zinc-600">
            Active
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <MiniCard
            title="GEO"
            value={`${score.geo}/10`}
          />

          <MiniCard
            title="AEO"
            value={`${score.aeo}/20`}
          />
        </div>
           </div>

      {/* Metadata */}
      <div className="bg-[#0B1120] border border-white/10 backdrop-blur-xl rounded-3xl p-5 space-y-4">
        <div>
          <p className="text-xs text-zinc-400 mb-1">
            Title
          </p>

          <h3 className="text-sm font-medium leading-6">
            {audit.metadata.title || "Not found"}
          </h3>
        </div>

        <div>
          <p className="text-xs text-zinc-400 mb-1">
            Description
          </p>

          <p className="text-sm text-zinc-300 leading-6">
            {audit.metadata.description ||
              "No meta description found"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <MetaCard
            label="Author"
            value={audit.metadata.author}
          />

          <MetaCard
            label="Publisher"
            value={audit.metadata.publisher}
          />
            <MetaCard
            label="Language"
            value={audit.metadata.lang}
          />

          <MetaCard
            label="Canonical"
            value={audit.metadata.canonical}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-[#0B1120] border border-white/10 backdrop-blur-xl rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">
            Social Links
          </h3>

          <span className="text-xs text-zinc-400">
            {audit.metadata.socialLinks.length}
          </span>
        </div>

        <div className="space-y-2 max-h-[140px] overflow-y-auto">
          {audit.metadata.socialLinks.length > 0 ? (
            audit.metadata.socialLinks.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                className="block text-xs text-blue-600 break-all hover:underline">
                {link}
              </a>
            ))
          ) : (

             <p className="text-sm text-zinc-400">
              No social links detected
            </p>
          )}
        </div>
      </div>

      {/* Images */}
      <div className="bg-[#0B1120] border border-white/10 backdrop-blur-xl rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">
            Images
          </h3>

          <span className="text-xs text-zinc-400">
            {audit.metadata.images.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {audit.metadata.images.slice(0, 6).map((img) => (
            <a
              key={img}
              href={img}
              target="_blank"
              className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-zinc-100">
              <img
                src={img}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>

 {/* Links */}
      <div className="bg-[#0B1120] border border-white/10 backdrop-blur-xl rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">
            Internal Links
          </h3>

          <span className="text-xs text-zinc-400">
            {audit.metadata.links.length}
          </span>
        </div>

        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
          {audit.metadata.links.slice(0, 20).map((link) => (
            <a
              key={link}
              href={link}
              target="_blank"
              className="block text-xs text-zinc-300 break-all hover:text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}


function MiniCard({
  title,
  value
}: {
  title: string
  value: string
}) {
  return (
   <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
      <p className="text-[11px] text-zinc-400 mb-1">
        {title}
      </p>

      <h4 className="text-lg font-semibold tracking-tight">
        {value}
      </h4>
    </div>
  )
}

function MetaCard({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] text-zinc-400 mb-1">
        {label}
      </p>

      <p className="text-sm font-medium break-all line-clamp-2">
        {value || "N/A"}
      </p>
    </div>
  )
}