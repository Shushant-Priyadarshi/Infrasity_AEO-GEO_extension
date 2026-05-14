import "./style.css"

import { useEffect, useState } from "react"
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
   useEffect(() => {
    const interval = setInterval(async () => {
      const res = await sendToBackground({
        name: "domain-audit"
      })

      if (res?.data) {
        setAudit(res.data)

        setLoading(false)

        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
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
  <div className="w-[400px] h-[500px] bg-[#050816] overflow-hidden flex flex-col text-white">
    <Header />

    <NavigationBar />

    <div className="flex-1 overflow-y-auto p-5 bg-[radial-gradient(circle_at_top,rgba(88,28,135,0.25),transparent_40%)]">
      {loading ? (
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-[#7C5CFF] animate-spin" />

          <p className="text-sm text-zinc-500">
            Scanning current page...
          </p>
        </div>
      ) : (
        renderPage()
      )}
    </div>
  </div>
)
  
}