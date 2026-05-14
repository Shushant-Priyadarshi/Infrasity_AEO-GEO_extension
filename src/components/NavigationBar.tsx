import { usePageStore } from "~src/store/pageStore"

const pages = ["Summary", "GEO", "AEO"]

export default function NavigationBar() {
  const { page, setPage } = usePageStore()

  return (
    <div className="px-4 py-3 flex gap-2 border-b border-white/10 bg-[#070B14]">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p as any)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            page === p
              ? "bg-gradient-to-r from-[#3563FF] to-[#B833FF] text-white shadow-lg"
              : "bg-white/5 text-zinc-400 hover:bg-white/10"
          }`}>
          {p}
        </button>
      ))}
    </div>
  )
}