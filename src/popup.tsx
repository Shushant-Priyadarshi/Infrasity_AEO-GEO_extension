import "./style.css"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { sendToBackground } from "@plasmohq/messaging"

import { usePageStore } from "./store/pageStore"
import { useAuditStore } from "./store/auditStore"

import Header from "./components/Header"
import NavigationBar from "./components/NavigationBar"

import Summary from "./components/Summary"
import GEO from "./components/GEO"
import AEO from "./components/AEO"



export default function Popup() {
  const { page } = usePageStore()

  const { setAudit } = useAuditStore()

  const [loading, setLoading] = useState(true)

  //   const getDataFromBackground = async () => {
  //   setLoading(true)

    

  //   const res = await sendToBackground({
  //     name: "domain-audit"
  //   })

  //   if (res?.data) {
  //     setAudit(res.data)

  //     setLoading(false)
  //   }
  // }

  const getDataFromBackground = async () => {
  setLoading(true)

  const tab = await sendToBackground({
    name:"get-current-tab"
  })

  if (!tab?.tabId) return

  await chrome.tabs.sendMessage(
    tab.tabId,
    {
      type: "RUN_AUDIT"
    }
  )

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
    <div className="w-[420px] h-[600px] overflow-hidden flex flex-col bg-[#F7F8F5] text-[#111111]">
      <Header />

      <NavigationBar />

      {/* <div onClick={() => getDataFromBackground()}>Reload</div> */}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center gap-5">
              <div className="relative">
                <div className="h-11 w-11 rounded-full border border-[#D8D8D2]" />

                <div className="absolute inset-0 rounded-full border border-transparent border-t-[#111111] animate-spin" />
              </div>

              <p className="text-sm text-[#7A7A73]">
                Scanning current page...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={page}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.25
              }}>
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}