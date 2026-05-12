import { countWords, getText, isQuestion } from "~src/utils/text"

export function scanAEO() {
  const headings = Array.from(
    document.querySelectorAll(`
      h1,
      h2,
      h3,
      .collapse-title,
      [role="button"],
      button,
      summary
    `)
  )

  const faqElements = headings.filter((el) =>
    isQuestion(getText(el))
  )

  const faqCount = faqElements.length

  const questionH2Count = Array.from(
    document.querySelectorAll("h2")
  ).filter((h2) => isQuestion(getText(h2))).length

  let answerBlocks = 0

  headings.forEach((heading) => {
    if (!isQuestion(getText(heading))) return

    const next = heading.nextElementSibling

    if (!next) return

    const words = countWords(getText(next))

    if (words >= 20 && words <= 120) {
      answerBlocks++
    }
  })


  const hasOgTitle = Boolean(
    document.querySelector(
      'meta[property="og:title"]'
    )
  )

  const hasOgDescription = Boolean(
    document.querySelector(
      'meta[property="og:description"]'
    )
  )

  const schemaScripts = Array.from(
    document.querySelectorAll(
      'script[type="application/ld+json"]'
    )
  )

  let hasFAQSchema = false

  schemaScripts.forEach((script) => {
    try {
      const json = JSON.parse(
        script.textContent || "{}"
      )

      const asString = JSON.stringify(json)

      if (asString.includes("FAQPage") || asString.includes("FAQ")) {
        hasFAQSchema = true
      }
    } catch {}
  })

  let clearValuePurpose = 0


  const firstParagraphs = Array.from(
    document.querySelectorAll("p")
  )
    .slice(0, 5)
    .map((p) => p.textContent?.toLowerCase() || "")

  const keywords = [
    "help",
    "platform",
    "service",
    "tool",
    "developer",
    "marketing",
    "agency"
  ]

  firstParagraphs.forEach((p) => {
    keywords.forEach((keyword) => {
      if (p.includes(keyword)) {
        clearValuePurpose++
      }
    })
  })

  return {
    faqCount,
    questionH2Count,
    clearValuePurpose,
    answerBlocks,
    hasOgTitle,
    hasOgDescription,
    hasFAQSchema
  }
}