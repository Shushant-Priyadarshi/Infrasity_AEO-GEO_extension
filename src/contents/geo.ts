export async function scanGeo(url: string) {
  const origin = new URL(url).origin

  let robotsText = ""
  let llmsText = ""

  let llmsTxtPresent = false

  try {
    const robots = await fetch(
      `${origin}/robots.txt`
    )

    robotsText = await robots.text()
  } catch {}

  try {
    const llms = await fetch(
      `${origin}/llms.txt`
    )

    llmsText = await llms.text()

    llmsTxtPresent = llms.ok
  } catch {}

  const aiCrawlerAccess = {
    GPTBot:
      robotsText.includes("GPTBot") &&
      robotsText.includes("Allow: /"),

    ClaudeBot:
      robotsText.includes("ClaudeBot") &&
      robotsText.includes("Allow: /"),

    GoogleExtended:
      robotsText.includes("Google-Extended") &&
      robotsText.includes("Allow: /"),

    PerplexityBot:
      robotsText.includes("PerplexityBot") &&
      robotsText.includes("Allow: /"),

    UserAgent:
      robotsText.includes("User-agent: *")
  }

  const bodyText = document.body.innerText

  const statisticalData = /\d+%/.test(bodyText)

  const researchData =
    bodyText.includes("research") ||
    bodyText.includes("study") ||
    bodyText.includes("survey") ||
    bodyText.includes("benchmark")


    return {
    aiCrawlerAccess,

    llmsTxtPresent,

    CitationWortiness: {
      AuthorName: "",

      PublishedDates:
        document
          .querySelector(
            'meta[property="article:published_time"]'
          )
          ?.getAttribute("content") || "",

      Statisticaldata: statisticalData,

      ReserarchDate: researchData
    },

    ContentExtractibilty: {
      h1Count:
        document.querySelectorAll("h1")
          .length,

      listCount:
        document.querySelectorAll("ul,ol")
          .length,

      tableCount:
        document.querySelectorAll("table")
          .length
    }
  }
}