import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (_, res) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  res.send({
    tabId: tab?.id,
    url: tab?.url,
  });
};

export default handler;
