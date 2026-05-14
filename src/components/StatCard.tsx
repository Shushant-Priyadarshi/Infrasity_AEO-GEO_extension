import { FiCheck, FiX } from "react-icons/fi"

export default function StatCard({
  label,
  value,
  needChars
}: {
  label: string
  value: any
  needChars: boolean
}) {
  const isBoolean = typeof value === "boolean"
  const isNumber = typeof value === "number"
  const isEmpty =
    !isBoolean && !isNumber && (value === undefined || value === null || value === "")

  return (
    <div className="group rounded-2xl border border-line bg-surface-raised p-4 shadow-card transition-colors duration-200 ease-swift hover:border-line-strong">
      <p className="text-[10px] uppercase tracking-eyebrow text-ink-300 font-medium">
        {label}
      </p>

      {isBoolean ? (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ring-1 ${
              value
                ? "bg-success-soft text-success ring-success/15"
                : "bg-danger-soft text-danger ring-danger/15"
            }`}>
            {value ? (
              <FiCheck className="h-3.5 w-3.5" strokeWidth={3} />
            ) : (
              <FiX className="h-3.5 w-3.5" strokeWidth={3} />
            )}
          </span>

          <span
            className={`text-[10.5px] uppercase tracking-eyebrow font-medium ${
              value ? "text-success" : "text-danger"
            }`}>
            {value ? "Present" : "Missing"}
          </span>
        </div>
      ) : isNumber ? (
        <p className="mt-2 text-[22px] font-semibold tracking-tight tabular text-ink-900 leading-none">
          {value}
        </p>
      ) : (
        <>
          {isEmpty ? (
            <p className="mt-2.5 text-[12px] italic text-ink-300 leading-5">
              Not set
            </p>
          ) : (
            <p className="mt-2.5 text-[12px] leading-5 text-ink-700 break-words">
              {value}
            </p>
          )}

          {needChars && !isEmpty && (
            <p className="mt-2 text-[10.5px] tabular text-ink-300">
              {String(value).length} chars
            </p>
          )}
        </>
      )}
    </div>
  )
}
