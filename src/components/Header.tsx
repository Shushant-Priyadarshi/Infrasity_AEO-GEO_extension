export default function Header() {
  return (
    <div className="px-5 py-4 border-b border-zinc-200 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold tracking-tight">
            Infrasity
          </h1>

          <p className="text-xs text-zinc-500 mt-1">
            GEO + AEO Scanner
          </p>
        </div>

        <div className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>
    </div>
  )
}