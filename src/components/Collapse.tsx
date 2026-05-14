import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FaRegCheckCircle } from "react-icons/fa"
import { RxCrossCircled } from "react-icons/rx";

export default function Collapse({
  title,
  children,
  active,
  needChars
}: {
  title: string
  children: React.ReactNode
  active?: boolean
  needChars?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-3xl border border-[#E6E6E0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {active ? <FaRegCheckCircle className="text-green-500" /> : <RxCrossCircled className="text-red-500"/>}

          <p className="text-sm font-medium text-[#151515]">{title}</p>
        </div>

        <p className="text-xs text-[#8B8B84]">{open ? "Hide" : "View"}</p>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: "auto",
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-[#F1F1ED]">
              <div className="pt-4 whitespace-pre-wrap break-words text-[13px] leading-7 text-[#5F5F58]">
                {children}
              </div>

              {active && needChars && (
                <p className="mt-4 text-[11px] text-[#8B8B84]">
                  {String(children).length} chars
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
