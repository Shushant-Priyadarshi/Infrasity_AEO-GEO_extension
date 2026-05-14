type Item = { level: number; text: string }

const LEVEL_TONE: Record<number, string> = {
  1: "text-ink-900 font-semibold",
  2: "text-ink-700 font-medium",
  3: "text-ink-700",
  4: "text-ink-500",
  5: "text-ink-500",
  6: "text-ink-400"
}

export default function HeadingsOutline({ items }: { items: Item[] }) {
  if (!items?.length) {
    return (
      <p className="text-[12px] italic text-ink-300">No headings detected</p>
    )
  }

  return (
    <ol className="relative -ml-1">
      {items.map((item, i) => {
        const indent = (item.level - 1) * 14
        const empty = !item.text
        return (
          <li
            key={i}
            className="relative flex items-start py-1.5"
            style={{ paddingLeft: `${indent}px` }}>
            <span className="font-mono text-[9.5px] tracking-wide tabular text-ink-300 mr-2.5 mt-0.5 pt-px rounded bg-surface-sunken/80 border border-line-soft px-1 select-none">
              H{item.level}
            </span>
            <span
              className={`text-[12.5px] leading-5 break-words ${
                empty
                  ? "italic text-ink-300"
                  : LEVEL_TONE[item.level] ?? "text-ink-500"
              }`}>
              {empty ? "(empty heading)" : item.text}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
