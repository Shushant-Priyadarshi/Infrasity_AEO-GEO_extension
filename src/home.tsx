import { useEffect, useMemo, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import type { RawAudit } from "./types/audit"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [audit, setAudit] = useState<RawAudit | null>(null)

  const getAuditAnalytics = async () => {
    const res = await sendToBackground({
      name: "domain-audit"
    })

    if (res.success) {
      setAudit(res.data)
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
      setLoading(false)
    }
  }

  useEffect(() => {
    getAuditAnalytics()
  }, [])

  const stats = useMemo(() => {
    if (!audit)
      return {
        geo: 0,
        aeo: 0,
        technical: 0,
        overall: 0
      }

    let geo = 0
    let aeo = 0
    let technical = 0

    // GEO
    if (audit.geo.hasH1) geo += 3
    if (audit.geo.h2Count >= 2) geo += 4
    if (audit.geo.listCount > 0) geo += 4
    if (audit.geo.tableCount > 0) geo += 4

    // AEO
    if (audit.aeo.faqCount > 0) aeo += 4
    if (audit.aeo.questionH2Count > 0) aeo += 4
    if (audit.aeo.answerBlocks > 0) aeo += 4
    if (audit.aeo.hasOgTitle) aeo += 4
    if (audit.aeo.hasOgDescription) aeo += 2
    if (audit.aeo.hasFAQSchema) aeo += 2

    // Technical
    if (audit.technical.hasCanonical) technical += 3
    if (audit.technical.hasLang) technical += 2

    return {
      geo,
      aeo,
      technical,
      overall: geo + aeo + technical
    }
  }, [audit])

  return (
    <div className="w-[380px] min-h-[520px] bg-zinc-50 text-zinc-900 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[15px] font-semibold tracking-tight">
            Infrasity Extension
          </h1>

          <p className="text-xs text-zinc-500 mt-0.5">
            Checking for: {audit?.url}
          </p>
        </div>

        <div className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="h-[420px] flex flex-col items-center justify-center">
          <div className="h-9 w-9 rounded-full border-2 border-zinc-200 border-t-zinc-800 animate-spin" />

          <p className="text-xs text-zinc-500 mt-4">
            Scanning current page...
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && audit && (
        <div className="space-y-4">
          {/* Overall */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-zinc-500 mb-2">
                  Overall Score
                </p>

                <div className="flex items-end gap-1">
                  <h2 className="text-4xl font-semibold tracking-tight">
                    {stats.overall}
                  </h2>

                  <span className="text-sm text-zinc-400 mb-1">
                    /40
                  </span>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-zinc-100 text-[11px] text-zinc-600">
                Good
              </div>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-2 mt-5">
              <MiniCard
                title="GEO"
                value={`${stats.geo}/15`}
              />

              <MiniCard
                title="AEO"
                value={`${stats.aeo}/20`}
              />

              <MiniCard
                title="Tech"
                value={`${stats.technical}/5`}
              />
            </div>
          </div>

          {/* GEO */}
          <Section title="GEO">
            <Item
              label="H1 Present"
              value={audit.geo.hasH1}
            />

            <Item
              label="H2 Count"
              value={audit.geo.h2Count}
            />

            <Item
              label="Lists"
              value={audit.geo.listCount}
            />

            <Item
              label="Tables"
              value={audit.geo.tableCount}
            />
          </Section>

          {/* AEO */}
          <Section title="AEO">
            <Item
              label="FAQ Count"
              value={audit.aeo.faqCount}
            />

            <Item
              label="Question H2s"
              value={audit.aeo.questionH2Count}
            />

            <Item
              label="Answer Blocks"
              value={audit.aeo.answerBlocks}
            />

            <Item
              label="OG Title"
              value={audit.aeo.hasOgTitle}
            />

            <Item
              label="OG Description"
              value={audit.aeo.hasOgDescription}
            />

            <Item
              label="FAQ Schema"
              value={audit.aeo.hasFAQSchema}
            />
          </Section>

          {/* Technical */}
          <Section title="Technical">
            <Item
              label="Canonical"
              value={audit.technical.hasCanonical}
            />

            <Item
              label="Lang Attribute"
              value={audit.technical.hasLang}
            />
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium tracking-tight">
          {title}
        </h3>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Item({
  label,
  value
}: {
  label: string
  value: string | number | boolean
}) {
  const isBoolean = typeof value === "boolean"

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      {isBoolean ? (
        <div
          className={`h-2 w-2 rounded-full ${
            value
              ? "bg-emerald-500"
              : "bg-zinc-300"
          }`}
        />
      ) : (
        <p className="text-sm font-medium text-zinc-900">
          {value}
        </p>
      )}
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
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
      <p className="text-[11px] text-zinc-500 mb-1">
        {title}
      </p>

      <h4 className="text-base font-semibold tracking-tight">
        {value}
      </h4>
    </div>
  )
}