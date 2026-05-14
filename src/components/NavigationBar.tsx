import { motion } from "framer-motion"

import { usePageStore } from "~src/store/pageStore"

const pages = ["Summary", "GEO", "AEO"]

export default function NavigationBar() {
  const { page, setPage } = usePageStore()

  return (
    <div className="px-5 py-3 border-b border-[#E7E7E2] bg-[#F7F8F5]">
      <div className="flex gap-2">
        {pages.map((p) => {
          const active = page === p

          return (
            <button
              key={p}
              onClick={() => setPage(p as any)}
              className="relative">
              {active && (
                <motion.div
                  layoutId="tab"
                  className="absolute inset-0 rounded-full py-3 bg-[#111111]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}

              <span
                className={`relative z-10 px-10 py-10 rounded-full text-sm font-medium transition ${
                  active
                    ? "text-white"
                    : "text-[#6D6D67]"
                }`}>
                {p}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}