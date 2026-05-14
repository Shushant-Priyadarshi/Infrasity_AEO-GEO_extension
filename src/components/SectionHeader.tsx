export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  trailing
}: {
  eyebrow: string
  title: string
  subtitle?: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[10.5px] uppercase tracking-eyebrow text-ink-300 mb-1.5 font-medium">
          {eyebrow}
        </p>

        <h2 className="text-[17px] font-semibold tracking-tight text-ink-900 leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="text-[12.5px] text-ink-400 mt-1.5 leading-5">
            {subtitle}
          </p>
        )}
      </div>

      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  )
}
