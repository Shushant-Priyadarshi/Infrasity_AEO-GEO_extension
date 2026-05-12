import type { PlasmoMessaging } from "@plasmohq/messaging"

let latestAudit = null

const handler: PlasmoMessaging.MessageHandler =
  async (req, res) => {
    if (req.body?.data) {
      latestAudit = req.body.data

      return res.send({
        success: true
      })
    }

    return res.send({
      success: true,
      data: latestAudit
    })
  }

export default handler