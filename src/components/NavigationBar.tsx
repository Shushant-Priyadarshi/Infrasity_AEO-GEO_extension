import { usePageStore } from "~src/store/pageStore"

const pages = ["Summary", "GEO", "AEO"]

export default function NavigationBar() {
  const { page, setPage } = usePageStore()

  return (
    <div className="px-4 py-3 flex gap-2 border-b border-zinc-200 bg-white overflow-x-auto">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p as any)}
          className={`px-3 py-1.5 rounded-full text-xs transition ${
            page === p
              ? "bg-zinc-900 text-white"
              : "bg-zinc-100 text-zinc-600"
          }`}>
          {p}
        </button>
      ))}
    </div>
  )
}