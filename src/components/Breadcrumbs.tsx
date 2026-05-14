import { FiChevronRight } from "react-icons/fi"

import SectionHeader from "./SectionHeader"
import StatusPill from "./StatusPill"

type Props = {
  data: {
    exists: boolean
    items: string[]
    source: "aria" | "ol" | "json-ld" | "none"
  }
}

const SOURCE_LABEL: Record<Props["data"]["source"], string> = {
  aria: "aria-label",
  ol: "list markup",
  "json-ld": "JSON-LD",
  none: "—"
}

export default function Breadcrumbs({ data }: Props) {
  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-4 shadow-card">
      <SectionHeader
        eyebrow="Navigation"
        title="Breadcrumbs"
        subtitle="Helps AI place this page within site hierarchy"
        trailing={
          <StatusPill
            tone={data.exists ? "success" : "neutral"}
            label={data.exists ? "Detected" : "Not found"}
          />
        }
      />

      {data.exists && data.items.length > 0 ? (
        <>
          <div className="mt-4 flex items-center gap-1.5 flex-wrap">
            {data.items.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <span
                  className={`text-[11.5px] truncate max-w-[140px] ${
                    i === data.items.length - 1
                      ? "text-ink-900 font-medium"
                      : "text-ink-500"
                  }`}>
                  {item}
                </span>
                {i < data.items.length - 1 && (
                  <FiChevronRight
                    className="h-3 w-3 text-ink-300"
                    strokeWidth={2}
                  />
                )}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-eyebrow text-ink-300">
            Source ·{" "}
            <span className="font-mono normal-case tracking-normal text-ink-400">
              {SOURCE_LABEL[data.source]}
            </span>
          </p>
        </>
      ) : (
        <p className="mt-3 text-[12px] italic text-ink-300">
          No breadcrumb nav detected
        </p>
      )}
    </div>
  )
}
