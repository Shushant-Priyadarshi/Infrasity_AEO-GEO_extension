export async function scanGeo(url: string) {
  const origin = new URL(url).origin

  let robotsContent = ""
  let llmsContent = ""

  let robotsExists = false
  let llmsExists = false
  let sitemapExists = false

  try {
    const robots = await fetch(
      `${origin}/robots.txt`
    )

    robotsExists = robots.ok

    robotsContent = await robots.text()
  } catch {}

  try {
    const llms = await fetch(
      `${origin}/llms.txt`
    )

    llmsExists = llms.ok

    llmsContent = await llms.text()
  } catch {}

  try {
    const sitemap = await fetch(
      `${origin}/sitemap.xml`
    )

    sitemapExists = sitemap.ok
  } catch {}

  const bots =
    robotsContent.match(
      /User-agent:\s?(.*)/gi
    ) || []

  const bodyText =
    document.body.innerText || ""

  return {
    robotsTxt: {
      exists: robotsExists,
      content: robotsContent,
      bots
    },

    llmsTxt: {
      exists: llmsExists,
      content: llmsContent
    },

    sitemapXml: {
      exists: sitemapExists
    },

    aiCrawlerAccess: {
      GPTBot:
        robotsContent.includes("GPTBot"),

      ClaudeBot:
        robotsContent.includes("ClaudeBot"),

      GoogleExtended:
        robotsContent.includes(
          "Google-Extended"
        ),

      PerplexityBot:
        robotsContent.includes(
          "PerplexityBot"
        ),

      UserAgent:
        robotsContent.includes(
          "User-agent: *"
        )
    },

    CitationWortiness: {
      AuthorName:
        document
          .querySelector('meta[name="author"]')
          ?.getAttribute("content") || "",

      PublishedDates:
        document
          .querySelector(
            'meta[property="article:published_time"]'
          )
          ?.getAttribute("content") || "",

      Statisticaldata:
        /\d+%/.test(bodyText),

      ResearchDate:
        bodyText.includes("research") ||
        bodyText.includes("study")
    },

    ContentExtractibilty: {
      h1Count:
        document.querySelectorAll("h1")
          .length,

      h2Count:
        document.querySelectorAll("h2")
          .length,

      h3Count:
        document.querySelectorAll("h3")
          .length,

      h4Count:
        document.querySelectorAll("h4")
          .length,

      h5Count:
        document.querySelectorAll("h5")
          .length,

      h6Count:
        document.querySelectorAll("h6")
          .length,

      listCount:
        document.querySelectorAll("ul,ol")
          .length,

      tableCount:
        document.querySelectorAll("table")
          .length,

      wordCount:
        bodyText.split(/\s+/).length,

      domSize:
        document.querySelectorAll("*")
          .length
    }
  }
}