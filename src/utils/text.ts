export const QUESTION_REGEX =
  /^(what|how|why|when|where|can|should|is|are|does|do)\b/i

export function isQuestion(text: string) {
  const clean = text.trim()

  return clean.endsWith("?") || QUESTION_REGEX.test(clean)
}

export function getText(el: Element | null) {
  return el?.textContent?.trim() || ""
}

export function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}