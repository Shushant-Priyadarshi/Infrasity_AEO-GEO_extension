export type RawAudit = {
  url: string;

  metadata: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    publisher: string;
    canonical: string;
    lang: string;
    charset: string;
    viewport: string;
    favicon: string;
    metaRobots: string;

    openGraph: {
      title: string;
      description: string;
      image: string;
    };

    twitterCard: {
      card: string;
      image: string;
    };

    links: string[];
    internalLinks: string[];
    socialLinks: string[];
    images: string[];
  };

  geo: {
    robotsTxt: {
      exists: boolean;
      content: string;
      bots: string[];
    };

    llmsTxt: {
      exists: boolean;
      content: string;
    };

    sitemapXml: {
      exists: boolean;
    };

    aiCrawlerAccess: {
      GPTBot: boolean;
      ClaudeBot: boolean;
      GoogleExtended: boolean;
      PerplexityBot: boolean;
      UserAgent: boolean;
    };

    CitationWortiness: {
      AuthorName: string;
      PublishedDates: string;
      Statisticaldata: boolean;
      ReserarchDate: boolean;
    };

    ContentExtractibilty: {
      h1Count: number;
      h2Count: number;
      h3Count: number;
      h4Count: number;
      h5Count: number;
      h6Count: number;

      listCount: number;
      tableCount: number;
      wordCount: number;
      domSize: number;
    };
  };

  aeo: {
    faqCount: number;
    questionH2Count: number;

    faqQuestions: string[];
    h2Questions: string[];

    clearValuePurpose: number;
    answerBlocks: number;

    ogTitle: {
      exists: boolean;
      value: string;
    };

    ogDescription: {
      exists: boolean;
      value: string;
    };

    hasFAQSchema: boolean;
  };
};
