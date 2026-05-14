import { useState } from "react"

import { useAuditStore } from "~src/store/auditStore"

import StatRow from "./StatRow"

export default function AEO() {
  const { audit } = useAuditStore()

  const [openOgTitle, setOpenOgTitle] =
    useState(false)

  const [openOgDescription, setOpenOgDescription] =
    useState(false)

  if (!audit) return null

  return (
    <div className="space-y-4">
      <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
        <div className="space-y-1 mb-5">
          <h2 className="text-white text-sm font-semibold">
            Answer Engine Optimization
          </h2>

          <p className="text-xs text-zinc-500">
            AI readability + answer structure
          </p>
        </div>

        <div className="space-y-1">
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
            label="FAQ Schema"
            value={audit.aeo.hasFAQSchema}
          />
        </div>

        {/* OG TITLE */}
        <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <button
            onClick={() =>
              setOpenOgTitle(!openOgTitle)
            }
            className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  audit.aeo.ogTitle.exists
                    ? "bg-emerald-400"
                    : "bg-zinc-600"
                }`}
              />

              <p className="text-sm text-white">
                OG Title
              </p>
            </div>

            <p className="text-zinc-500 text-xs">
              {openOgTitle ? "Hide" : "View"}
            </p>
          </button>

          {openOgTitle && (
            <div className="px-4 pb-4">
              <div className="rounded-xl bg-black/20 border border-white/5 p-3">
                <p className="text-xs text-zinc-300 leading-6">
                  {audit.aeo.ogTitle.value ||
                    "No OG title found"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* OG DESCRIPTION */}
        <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <button
            onClick={() =>
              setOpenOgDescription(
                !openOgDescription
              )
            }
            className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  audit.aeo.ogDescription.exists
                    ? "bg-emerald-400"
                    : "bg-zinc-600"
                }`}
              />

              <p className="text-sm text-white">
                OG Description
              </p>
            </div>

            <p className="text-zinc-500 text-xs">
              {openOgDescription
                ? "Hide"
                : "View"}
            </p>
          </button>

          {openOgDescription && (
            <div className="px-4 pb-4">
              <div className="rounded-xl bg-black/20 border border-white/5 p-3">
                <p className="text-xs text-zinc-300 leading-6">
                  {audit.aeo.ogDescription.value ||
                    "No OG description found"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}