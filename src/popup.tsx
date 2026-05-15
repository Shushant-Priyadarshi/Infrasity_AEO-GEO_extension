import "./style.css"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import AEO from "./components/AEO"
import GEO from "./components/GEO"
import Header from "./components/Header"
import NavigationBar from "./components/NavigationBar"
import Summary from "./components/Summary"
import { swift } from "./lib/motion"
import { useAuditStore } from "./store/auditStore"
import { usePageStore } from "./store/pageStore"
import Footer from "./components/Footer"

const LOADER_STEPS = [
  "Reading metadata",
  "Probing crawlers",
  "Analyzing structure"
]

function BrandedLoader() {
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStepIdx((i) => (i + 1) % LOADER_STEPS.length)
    }, 900)
    return () => clearInterval(id)
  }, [])

  const word = "Infrasity"

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: swift }}
      className="h-full flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-2.5">
        <svg
          width="22"
          height="22"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true">
          <motion.rect
            x="1"
            y="1"
            width="16"
            height="16"
            rx="4.5"
            stroke="#111111"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: swift }}
          />
          <motion.rect
            x="5"
            y="5"
            width="8"
            height="8"
            rx="2.25"
            fill="#111111"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.92, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: swift }}
            style={{ transformOrigin: "center" }}
          />
        </svg>

        <div className="flex">
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut"
              }}
              className="text-[15px] font-semibold tracking-tight text-ink-900">
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <div className="relative h-4 overflow-hidden w-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: swift }}
              className="absolute text-[11.5px] uppercase tracking-eyebrow text-ink-400 font-medium">
              {LOADER_STEPS[stepIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative h-px w-[180px] overflow-hidden rounded-full bg-line-soft">
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-ink-700/50 to-transparent animate-shimmer"
            style={{ left: "-33%" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Popup() {
  const { page } = usePageStore()
  const { setAudit } = useAuditStore()
  const [loading, setLoading] = useState(true)

  const getDataFromBackground = async () => {
    setLoading(true)

    const tab = await sendToBackground({
      name: "get-current-tab"
    })

    if (!tab?.tabId) return

    await chrome.tabs.sendMessage(tab.tabId, {
      type: "RUN_AUDIT"
    })

    setTimeout(async () => {
      const res = await sendToBackground({
        name: "domain-audit"
      })

      if (res?.data) {
        setAudit(res.data)
        setLoading(false)
      }
    }, 300)
  }

  useEffect(() => {
    getDataFromBackground()
  }, [])

  const renderPage = () => {
    switch (page) {
      case "GEO":
        return <GEO />
      case "AEO":
        return <AEO />
      default:
        return <Summary />
    }
  }

  return (
    <div className="w-[450px] h-[600px] overflow-hidden flex flex-col text-ink-900 bg-[radial-gradient(120%_100%_at_50%_0%,#FBFBF8_0%,#F4F5F0_100%)]">
      <Header />
      <NavigationBar />

      <div className="flex-1 overflow-y-auto scrollbar-fine px-4 py-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <BrandedLoader key="loader" />
          ) : (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: swift }}>
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>

     
      </div>
         <Footer/>
    </div>
  )
}
