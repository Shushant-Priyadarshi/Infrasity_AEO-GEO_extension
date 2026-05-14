export const QUESTION_REGEX =
  /^(what|how|why|when|where|can|should|is|are|does|do|will|who)\b/i

export function isQuestion(text: string) {
  const clean = text.trim()

  if (clean.length < 15) return false

  // must end with question mark
  if (clean.endsWith("?")) return true

  // must start with question word
  // AND contain at least 4 words
  const words = clean.split(/\s+/)

  return (
    QUESTION_REGEX.test(clean) &&
    words.length >= 4
  )
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