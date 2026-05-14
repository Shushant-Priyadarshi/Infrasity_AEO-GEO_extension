export default function Header() {
  return (
    <div className="px-5 py-5 border-b border-[#E7E7E2] bg-[#F7F8F5]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8A83] mb-2">
            Infrasity
          </p>

          <h1 className="text-[22px] leading-none font-semibold tracking-tight text-[#111111]">
            GEO / AEO
          </h1>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#E5E5DE] bg-white px-3 py-1.5 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />

          <p className="text-xs text-[#5F5F58] font-medium">
            Live
          </p>
        </div>
      </div>
    </div>
  )
}