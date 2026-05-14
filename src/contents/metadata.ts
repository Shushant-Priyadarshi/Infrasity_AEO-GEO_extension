export function scanMetadata() {
  const title = document.title || "";

  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") || "";

  const keywords =
    document.querySelector('meta[name="keywords"]')?.getAttribute("content") ||
    "";

  const author =
    document.querySelector('meta[name="author"]')?.getAttribute("content") ||
    "";

  const publisher =
    document
      .querySelector('meta[property="og:site_name"]')
      ?.getAttribute("content") || "";

  const canonical =
    document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";

  const lang = document.documentElement.getAttribute("lang") || "";

  const charset = document.characterSet || "";

  const viewport =
    document.querySelector('meta[name="viewport"]')?.getAttribute("content") ||
    "";

  const faviconElement = document.querySelector(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
  ) as HTMLLinkElement | null;

  let favicon = "";

  if (faviconElement?.href) {
    favicon = faviconElement.href;
  } else {
    favicon = `${window.location.origin}/favicon.ico`;
  }

  const metaRobots =
    document.querySelector('meta[name="robots"]')?.getAttribute("content") ||
    "";

  const ogTitle =
    document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content") || "";

  const ogDescription =
    document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content") || "";

  const ogImage =
    document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content") || "";

  const twitterCard =
    document
      .querySelector('meta[name="twitter:card"]')
      ?.getAttribute("content") || "";

  const twitterImage =
    document
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute("content") || "";

  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("a[href]")
  )
    .map((a) => a.href)
    .filter(Boolean);

  const internalLinks = links.filter((link) =>
    link.includes(location.hostname)
  );

  const socialLinks = links.filter(
    (link) =>
      link.includes("twitter") ||
      link.includes("linkedin") ||
      link.includes("github") ||
      link.includes("youtube") ||
      link.includes("instagram")
  );

  const images = Array.from(document.querySelectorAll("img"))
    .map((img) => img.src)
    .filter(Boolean);

  return {
    title,
    description,
    keywords,
    author,
    publisher,
    canonical,
    lang,
    charset,
    viewport,
    favicon,
    metaRobots,

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
    },

    twitterCard: {
      card: twitterCard,
      image: twitterImage,
    },

    links,
    internalLinks,
    socialLinks,
    images,
  };
}
