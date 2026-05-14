import { getText } from "~src/utils/text"

type Heading = { level: number; text: string }

function scanHeadings(): {
  items: Heading[]
  rating: "good" | "needs-work" | "broken"
  issues: string[]
} {
  const nodes = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  ) as HTMLElement[]

  const items: Heading[] = nodes.map((el) => ({
    level: Number(el.tagName.substring(1)),
    text: getText(el)
  }))

  const h1Count = items.filter((i) => i.level === 1).length
  const issues: string[] = []

  if (items.length === 0) {
    return { items, rating: "broken", issues: ["No headings found"] }
  }

  if (h1Count === 0) issues.push("No H1 tag found")
  else if (h1Count > 1) issues.push(`${h1Count} H1 tags (should be 1)`)

  const emptyCount = items.filter((i) => !i.text).length
  if (emptyCount > 0) issues.push(`${emptyCount} empty heading${emptyCount > 1 ? "s" : ""}`)

  let prev = 0
  const skips: string[] = []
  for (const item of items) {
    if (prev !== 0 && item.level > prev + 1) {
      skips.push(`H${prev} → H${item.level}`)
    }
    prev = item.level
  }
  if (skips.length > 0) {
    const unique = Array.from(new Set(skips))
    issues.push(`Skipped levels: ${unique.slice(0, 3).join(", ")}`)
  }

  let rating: "good" | "needs-work" | "broken"
  if (h1Count === 0 || issues.length >= 3) rating = "broken"
  else if (issues.length > 0) rating = "needs-work"
  else rating = "good"

  return { items, rating, issues }
}

function scanUseCase(): {
  matches: {
    type: "designed-for" | "ideal-for" | "for-audience"
    text: string
  }[]
} {
  const body = (document.body.innerText || "").slice(0, 8000)
  const results: {
    type: "designed-for" | "ideal-for" | "for-audience"
    text: string
  }[] = []

  const patterns: {
    type: "designed-for" | "ideal-for" | "for-audience"
    re: RegExp
  }[] = [
    {
      type: "designed-for",
      re: /\b(designed|built|made|crafted|tailored)\s+for\s+([^.\n]{4,80})/gi
    },
    {
      type: "ideal-for",
      re: /\b(ideal|perfect|best|great)\s+for\s+([^.\n]{4,80})/gi
    },
    {
      type: "for-audience",
      re: /\bfor\s+(developers|marketers|founders|engineers|designers|startups|enterprises|agencies|product\s+teams|growth\s+teams|teams)\b[^.\n]{0,80}/gi
    }
  ]

  const seen = new Set<string>()

  for (const { type, re } of patterns) {
    re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(body)) !== null) {
      const text = m[0].replace(/\s+/g, " ").trim()
      const key = text.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      results.push({ type, text })
      if (results.length >= 5) return { matches: results }
    }
  }

  return { matches: results }
}

function scanContentBlocks(): {
  bulletCount: number
  paragraphCount: number
  bullets: string[]
  paragraphs: string[]
} {
  const lis = Array.from(
    document.querySelectorAll("ul li, ol li")
  ) as HTMLElement[]
  const ps = Array.from(document.querySelectorAll("p")) as HTMLElement[]

  const bullets = lis
    .map((el) => getText(el))
    .filter((t) => t.length > 0 && t.length < 400)
    .slice(0, 25)

  const paragraphs = ps
    .map((el) => getText(el))
    .filter((t) => t.length > 0 && t.length < 1000)
    .slice(0, 12)

  return {
    bulletCount: lis.length,
    paragraphCount: ps.length,
    bullets,
    paragraphs
  }
}

function detectBrand(): string {
  const ogSite = document
    .querySelector('meta[property="og:site_name"]')
    ?.getAttribute("content")
  if (ogSite && ogSite.trim()) return ogSite.trim()

  const title = (document.title || "").trim()
  if (title) {
    const parts = title.split(/[|\-—–·]/).map((p) => p.trim()).filter(Boolean)
    if (parts.length > 1) {
      return parts[parts.length - 1]
    }
  }

  try {
    const host = window.location.hostname.replace(/^www\./, "")
    const root = host.split(".")[0]
    if (root) return root.charAt(0).toUpperCase() + root.slice(1)
  } catch {}

  return ""
}

function countBrandMentions(brand: string, text: string): number {
  if (!brand) return 0
  const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const re = new RegExp("\\b" + escaped + "\\b", "gi")
  const matches = text.match(re)
  return matches ? matches.length : 0
}

function findPricingLink(): {
  exists: boolean
  url: string
  label: string
} {
  const anchors = Array.from(
    document.querySelectorAll("a[href]")
  ) as HTMLAnchorElement[]

  const hrefRe = /\/(pricing|plans|subscribe)(\/|$|\?|#)/i
  const textRe = /^(pricing|plans|see pricing|view pricing|our pricing)$/i

  for (const a of anchors) {
    const href = a.getAttribute("href") || ""
    if (!href) continue
    if (hrefRe.test(href)) {
      try {
        const url = new URL(href, location.origin).href
        return {
          exists: true,
          url,
          label: getText(a) || "Pricing"
        }
      } catch {}
    }
  }

  for (const a of anchors) {
    const label = getText(a)
    if (label && textRe.test(label.trim())) {
      const href = a.getAttribute("href") || ""
      try {
        const url = new URL(href, location.origin).href
        return { exists: true, url, label: label.trim() }
      } catch {}
    }
  }

  return { exists: false, url: "", label: "" }
}

function scanServiceClarity(brand: string) {
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4")
  ) as HTMLElement[]

  const items = headings.map((el) => ({
    text: getText(el),
    lower: getText(el).toLowerCase()
  }))

  const brandLower = brand.toLowerCase()
  const brandPattern = brandLower
    ? brandLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    : ""

  const match = (re: RegExp) => {
    for (const i of items) {
      if (re.test(i.lower)) return i.text
    }
    return ""
  }

  const forWhomHeading = match(
    /who('?s| is) (this|it) for|for whom|built for|made for|who uses|who it'?s for/i
  )
  const pricingHeading = match(/^pricing\b|^plans\b|how much|\bcost\b/i)
  const workflowHeading = match(
    /how it works|workflow|process|step\s?\d|getting started|how (it|we) work/i
  )
  const whyDifferentRe = brandPattern
    ? new RegExp(
        `why (us|choose|${brandPattern})|what makes (us|.+?) different|why we|our advantage|what'?s different`,
        "i"
      )
    : /why (us|choose)|what makes (us|.+?) different|why we|our advantage|what'?s different/i
  const whyDifferentHeading = match(whyDifferentRe)

  return {
    forWhom: { found: !!forWhomHeading, heading: forWhomHeading },
    pricing: { found: !!pricingHeading, heading: pricingHeading },
    workflow: { found: !!workflowHeading, heading: workflowHeading },
    whyDifferent: {
      found: !!whyDifferentHeading,
      heading: whyDifferentHeading
    }
  }
}

function scanBreadcrumbs(): {
  exists: boolean
  items: string[]
  source: "aria" | "ol" | "json-ld" | "none"
} {
  const ariaNav = document.querySelector(
    'nav[aria-label*="breadcrumb" i], [role="navigation"][aria-label*="breadcrumb" i]'
  )
  if (ariaNav) {
    const items = Array.from(ariaNav.querySelectorAll("a, span, li"))
      .map((el) => getText(el))
      .filter((t) => t.length > 0 && t.length < 80)
    const deduped = Array.from(new Set(items))
    if (deduped.length > 0)
      return { exists: true, items: deduped, source: "aria" }
  }

  const classedList = document.querySelector(
    'ol.breadcrumb, ul.breadcrumb, ol.breadcrumbs, ul.breadcrumbs, [class*="breadcrumb"]'
  )
  if (classedList) {
    const items = Array.from(classedList.querySelectorAll("a, span, li"))
      .map((el) => getText(el))
      .filter((t) => t.length > 0 && t.length < 80)
    const deduped = Array.from(new Set(items))
    if (deduped.length > 0)
      return { exists: true, items: deduped, source: "ol" }
  }

  const scripts = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]')
  )
  for (const s of scripts) {
    try {
      const raw = s.textContent || ""
      const parsed = JSON.parse(raw)
      const candidates = Array.isArray(parsed) ? parsed : [parsed]
      for (const c of candidates) {
        if (!c) continue
        const arr =
          c["@type"] === "BreadcrumbList"
            ? [c]
            : Array.isArray(c["@graph"])
              ? c["@graph"].filter(
                  (g: any) => g && g["@type"] === "BreadcrumbList"
                )
              : []
        for (const bl of arr) {
          const list = bl.itemListElement
          if (!Array.isArray(list)) continue
          const items = list
            .map((item: any) =>
              typeof item?.name === "string"
                ? item.name
                : typeof item?.item?.name === "string"
                  ? item.item.name
                  : ""
            )
            .filter((t: string) => !!t)
          if (items.length > 0)
            return { exists: true, items, source: "json-ld" }
        }
      }
    } catch {}
  }

  return { exists: false, items: [], source: "none" }
}

function scanFreshness(): {
  date: string
  source: string
  daysOld: number
  rating: "fresh" | "recent" | "stale" | "outdated" | "unknown"
} {
  type Candidate = { date: string; source: string }
  const candidates: Candidate[] = []

  const scripts = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]')
  )
  for (const s of scripts) {
    try {
      const parsed = JSON.parse(s.textContent || "")
      const nodes = Array.isArray(parsed) ? parsed : [parsed]
      for (const n of nodes) {
        if (!n) continue
        if (typeof n.dateModified === "string")
          candidates.push({ date: n.dateModified, source: "json-ld:dateModified" })
        if (typeof n.datePublished === "string")
          candidates.push({
            date: n.datePublished,
            source: "json-ld:datePublished"
          })
        if (Array.isArray(n["@graph"])) {
          for (const g of n["@graph"]) {
            if (typeof g?.dateModified === "string")
              candidates.push({
                date: g.dateModified,
                source: "json-ld:dateModified"
              })
            if (typeof g?.datePublished === "string")
              candidates.push({
                date: g.datePublished,
                source: "json-ld:datePublished"
              })
          }
        }
      }
    } catch {}
  }

  const metaPriorities: { selector: string; source: string }[] = [
    {
      selector: 'meta[property="article:modified_time"]',
      source: "article:modified_time"
    },
    {
      selector: 'meta[property="og:updated_time"]',
      source: "og:updated_time"
    },
    {
      selector: 'meta[property="article:published_time"]',
      source: "article:published_time"
    }
  ]
  for (const m of metaPriorities) {
    const value = document
      .querySelector(m.selector)
      ?.getAttribute("content")
    if (value) candidates.push({ date: value, source: m.source })
  }

  const timeEl = document.querySelector(
    "time[datetime]"
  ) as HTMLTimeElement | null
  if (timeEl) {
    const dt = timeEl.getAttribute("datetime")
    if (dt) candidates.push({ date: dt, source: "time[datetime]" })
  }

  const priority = [
    "json-ld:dateModified",
    "article:modified_time",
    "og:updated_time",
    "json-ld:datePublished",
    "article:published_time",
    "time[datetime]"
  ]

  let chosen: Candidate | null = null
  for (const src of priority) {
    const found = candidates.find((c) => c.source === src && c.date)
    if (found) {
      chosen = found
      break
    }
  }

  if (!chosen) {
    return { date: "", source: "", daysOld: -1, rating: "unknown" }
  }

  const parsed = new Date(chosen.date)
  if (isNaN(parsed.getTime())) {
    return {
      date: chosen.date,
      source: chosen.source,
      daysOld: -1,
      rating: "unknown"
    }
  }

  const daysOld = Math.floor(
    (Date.now() - parsed.getTime()) / 86400000
  )

  const rating: "fresh" | "recent" | "stale" | "outdated" =
    daysOld < 30
      ? "fresh"
      : daysOld < 180
        ? "recent"
        : daysOld < 365
          ? "stale"
          : "outdated"

  return {
    date: parsed.toISOString(),
    source: chosen.source,
    daysOld,
    rating
  }
}

export function scanVisibility() {
  const brand = detectBrand()
  const bodyText = document.body.innerText || ""

  return {
    headingHierarchy: scanHeadings(),
    useCase: scanUseCase(),
    contentBlocks: scanContentBlocks(),
    brand: {
      name: brand,
      mentions: countBrandMentions(brand, bodyText)
    },
    pricingLink: findPricingLink(),
    serviceClarity: scanServiceClarity(brand),
    breadcrumbs: scanBreadcrumbs(),
    freshness: scanFreshness()
  }
}
