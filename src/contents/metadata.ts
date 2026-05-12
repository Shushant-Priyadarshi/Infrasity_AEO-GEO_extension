export function scanMetadata() {
  const title = document.title || ""

  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") || ""

  const author =
    document
      .querySelector('meta[name="author"]')
      ?.getAttribute("content") || ""

  const publisher =
    document
      .querySelector(
        'meta[property="og:site_name"]'
      )
      ?.getAttribute("content") || ""

  const canonical =
    document
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href") || ""

  const lang =
    document.documentElement.getAttribute("lang") ||
    ""

  const links = Array.from(
    document.querySelectorAll("a[href]")
  )
    .map((a) => a.getAttribute("href") || "")
    .filter(Boolean)
    .slice(0, 50)


    const images = Array.from(
    document.querySelectorAll("img")
  )
    .map((img) => img.src)
    .filter(Boolean)
    .slice(0, 20)

  const socialLinks = links.filter(
    (link) =>
      link.toLocaleLowerCase().includes("twitter") ||
      link.toLocaleLowerCase().includes("linkedin") ||
      link.toLocaleLowerCase().includes("github") ||
      link.toLocaleLowerCase().includes("instagram") ||
      link.toLocaleLowerCase().includes("youtube")
  )

  return {
    title,
    description,
    author,
    publisher,
    canonical,
    lang,
    links,
    images,
    socialLinks
  }
}