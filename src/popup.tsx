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
    <div className="w-[400px] h-[500px] bg-zinc-50 overflow-hidden flex flex-col">
      <Header />

      <NavigationBar />

      <div className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-zinc-200 border-t-zinc-900 animate-spin" />
          </div>
        ) : (
          renderPage()
        )}
      </div>
    </div>
  )
}