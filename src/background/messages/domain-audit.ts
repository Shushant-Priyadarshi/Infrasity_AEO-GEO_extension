import type { PlasmoMessaging } from "@plasmohq/messaging";

//get sitemap url
async function getSitemapUrls(origin: string) {
  try {
    const response = await fetch(`${origin}/sitemap.xml`);

    const xml = await response.text();

    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => match[1]
    );

    console.log("====================================");
    console.log(urls);
    console.log("====================================");

    return urls;
  } catch (error) {
    console.error("Failed to fetch sitemap", error);

    return [];
  }
}

let latestAudit = null;

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (req.body?.data) {
    console.log(req.body);
    latestAudit = req.body.data;
    return res.send({
      success: true,
    });
  }
 
  

  // POPUP requesting audit
  return res.send({
    success: true,
    data: latestAudit,
  });
};

export default handler;
