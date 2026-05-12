import type { PlasmoCSConfig } from "plasmo";
import type { RawAudit } from "~src/types/audit";
import { sendToBackground } from "@plasmohq/messaging";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

// -----------------------------
// HELPERS
// -----------------------------

const QUESTION_REGEX =
  /^(what|how|why|when|where|can|should|is|are|does|do)\b/i;

function isQuestion(text: string) {
  const clean = text.trim();

  return clean.endsWith("?") || QUESTION_REGEX.test(clean);
}

function getText(el: Element | null) {
  return el?.textContent?.trim() || "";
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// -----------------------------
// GEO SCAN
// -----------------------------

export function scanGeo() {
  const hasH1 = document.querySelectorAll("h1").length > 0;

  const h2Count = document.querySelectorAll("h2").length;

  const listCount = document.querySelectorAll("ul, ol").length;

  const tableCount = document.querySelectorAll("table").length;

  return {
    hasH1,
    h2Count,
    listCount,
    tableCount,
  };
}

// -----------------------------
// AEO SCAN
// -----------------------------

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

  // QUESTION H2s
  const questionH2Count = Array.from(document.querySelectorAll("h2")).filter(
    (h2) => isQuestion(getText(h2))
  ).length;

  // FAQ COUNT
  let faqCount = 0;

  headings.forEach((heading) => {
    const text = getText(heading);

    if (!isQuestion(text)) return;

    const next = heading.nextElementSibling;

    if (!next) return;

    const answerText = getText(next);

    if (countWords(answerText) >= 15) {
      faqCount++;
    }
  });

  // DIRECT ANSWER BLOCKS
  let answerBlocks = 0;

  headings.forEach((heading) => {
    if (!isQuestion(getText(heading))) return;

    const next = heading.nextElementSibling;

    if (!next) return;

    const words = countWords(getText(next));

    // Ideal answer size
    if (words >= 20 && words <= 120) {
      answerBlocks++;
    }
  });

  // OG TAGS
  const hasOgTitle = Boolean(
    document.querySelector('meta[property="og:title"]')
  );

  const hasOgDescription = Boolean(
    document.querySelector('meta[property="og:description"]')
  );

  // FAQ SCHEMA
  const schemaScripts = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]')
  );

  let hasFAQSchema = false;

  schemaScripts.forEach((script) => {
    try {
      const json = JSON.parse(script.textContent || "{}");

      const asString = JSON.stringify(json);

      if (asString.includes('"FAQPage"')) {
        hasFAQSchema = true;
      }
    } catch {
      // ignore invalid schema
    }
  });

  return {
    faqCount,
    questionH2Count,
    answerBlocks,
    hasOgTitle,
    hasOgDescription,
    hasFAQSchema,
  };
}

// -----------------------------
// TECHNICAL SCAN
// -----------------------------

export function scanTechnical() {
  const hasCanonical = Boolean(document.querySelector('link[rel="canonical"]'));

  const hasLang = Boolean(document.documentElement.getAttribute("lang"));

  return {
    hasCanonical,
    hasLang,
  };
}

// -----------------------------
// MAIN SCAN
// -----------------------------

function runAudit(): RawAudit {
  let url = window.location.href
  return {
    geo: scanGeo(),
    aeo: scanAEO(),
    technical: scanTechnical(),
    url:url
  };
}

async function sendAudit() {
  const result = runAudit();
  await sendToBackground({
    name: "domain-audit",
    body: {
      success: true,
      data: result,
    },
  });
}



  sendAudit()



