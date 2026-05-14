export default function Header() {
  return (
    <div className="px-5 py-4 border-b border-white/10 bg-[#070B14]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold tracking-tight text-white">
            Infrasity
          </h1>

          <p className="text-xs text-zinc-400 mt-1">
            GEO + AEO Scanner
          </p>
        </div>

        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
      </div>
    </div>
  )
}