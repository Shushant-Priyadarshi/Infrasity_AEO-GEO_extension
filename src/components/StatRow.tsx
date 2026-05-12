export default function StatRow({
  label,
  value
}: {
  label: string
  value: any
}) {
  const isBoolean = typeof value === "boolean"

  return (
    <div className="flex items-center justify-between text-sm">
      <p className="text-zinc-500">{label}</p>

      {isBoolean ? (
        <div
          className={`h-2 w-2 rounded-full ${
            value ? "bg-emerald-500" : "bg-zinc-300"
          }`}
        />
      ) : (
        <p className="font-medium text-zinc-900">
          {value}
        </p>
      )}
    </div>
  )
}