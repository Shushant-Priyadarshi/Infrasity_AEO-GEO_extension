import { FiCheck, FiX } from "react-icons/fi"

export default function StatRow({
  label,
  value
}: {
  label: string
  value: any
}) {
  const isBoolean = typeof value === "boolean"

  return (
    <div className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors duration-150 ease-swift hover:bg-surface-muted/70">
      <p className="text-[13px] text-ink-500">{label}</p>

      {isBoolean ? (
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
      ) : (
        <p className="text-[13px] font-semibold tabular text-ink-900">
          {value}
        </p>
      )}
    </div>
  )
}
