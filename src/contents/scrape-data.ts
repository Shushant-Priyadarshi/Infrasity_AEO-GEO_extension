import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

import type { RawAudit } from "~src/types/audit"

import { scanAEO } from "./aeo"
import { scanGeo } from "./geo"
import { scanMetadata } from "./metadata"
import { scanVisibility } from "./visibility"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

async function runAudit(): Promise<RawAudit> {
  const url = window.location.href

  return {
    url,

    metadata: scanMetadata(),

    geo: await scanGeo(url),

    aeo: scanAEO(),

    visibility: scanVisibility()
  }
}

async function sendAudit() {
  const result = await runAudit()
  

  await sendToBackground({
    name: "domain-audit",
    body: {
      data: result
    }
  })
}

chrome.runtime.onMessage.addListener(
  async (message) => {
    if (message.type === "RUN_AUDIT") {
      await sendAudit()
    }
  }
)