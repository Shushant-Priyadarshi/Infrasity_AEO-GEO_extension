export default function StatRow({
  label,
  value
}: {
  label: string
  value: any
}) {
  const isBoolean = typeof value === "boolean"

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-none">
      <p className="text-sm text-zinc-400">
        {label}
      </p>

      {isBoolean ? (
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            value
              ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              : "bg-zinc-600"
          }`}
        />
      ) : (
        <p className="text-sm font-medium text-white">
          {value}
        </p>
      )}
    </div>
  )
}