function looksLikeHTML(text: string): boolean {
  const head = text.trimStart().slice(0, 256).toLowerCase()
  return (
    head.startsWith("<!doctype html") ||
    head.startsWith("<html") ||
    (head.includes("<head") && head.includes("<body"))
  )
}

function isValidRobotsTxt(text: string): boolean {
  if (!text || looksLikeHTML(text)) return false
  return /(^|\n)\s*(user-agent|disallow|allow|sitemap)\s*:/i.test(text)
}

function isValidLlmsTxt(text: string): boolean {
  if (!text || looksLikeHTML(text)) return false
  return /^#\s+\S+/m.test(text) || text.length < 50_000
}

function isValidSitemapXml(text: string): boolean {
  if (!text || looksLikeHTML(text)) return false
  const head = text.trimStart().slice(0, 512).toLowerCase()
  return (
    head.startsWith("<?xml") ||
    head.includes("<urlset") ||
    head.includes("<sitemapindex")
  )
}

export async function scanGeo(url: string) {
  const origin = new URL(url).origin

  let robotsContent = ""
  let llmsContent = ""

  let robotsExists = false
  let llmsExists = false
  let sitemapExists = false

  try {
    const expected = `${origin}/robots.txt`
    const res = await fetch(expected)
    if (res.ok && res.url.endsWith("/robots.txt")) {
      const body = await res.text()
      if (isValidRobotsTxt(body)) {
        robotsExists = true
        robotsContent = body
      }
    }
  } catch {}

  try {
    const expected = `${origin}/llms.txt`
    const res = await fetch(expected)
    if (res.ok && res.url.endsWith("/llms.txt")) {
      const body = await res.text()
      if (isValidLlmsTxt(body)) {
        llmsExists = true
        llmsContent = body
      }
    }
  } catch {}

  try {
    const expected = `${origin}/sitemap.xml`
    const res = await fetch(expected)
    if (res.ok && res.url.endsWith("/sitemap.xml")) {
      const body = await res.text()
      if (isValidSitemapXml(body)) {
        sitemapExists = true
      }
    }
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