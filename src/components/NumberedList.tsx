export default function NumberedList({
  items,
  emptyLabel = "Nothing detected"
}: {
  items: string[]
  emptyLabel?: string
}) {
  if (!items?.length) {
    return (
      <p className="text-[12px] italic text-ink-300">{emptyLabel}</p>
    )
  }

  return (
    <ol className="space-y-0">
      {items.map((q, i) => (
        <li
          key={i}
          className="flex items-start gap-3 py-2.5 border-b border-line-whisper last:border-none">
          <span className="text-[10.5px] font-mono tabular text-ink-300 pt-0.5 shrink-0 select-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-[12.5px] leading-6 text-ink-700 break-words">
            {q}
          </p>
        </li>
      ))}
    </ol>
  )
}
