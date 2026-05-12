export type RawAudit = {
  url: string;

  metadata: {
    title: string;
    description: string;
    author: string;
    publisher: string;
    canonical: string;
    lang: string;

    links: string[];
    images: string[];
    socialLinks: string[];
  };

  geo: {
    aiCrawlerAccess: {
      GPTBot: boolean;
      ClaudeBot: boolean;
      GoogleExtended: boolean;
      PerplexityBot: boolean;
      UserAgent: boolean;
    };

    llmsTxtPresent: boolean;

    CitationWortiness: {
      AuthorName: string;
      PublishedDates: string;
      Statisticaldata: boolean;
      ReserarchDate: boolean;
    };

    ContentExtractibilty: {
      h1Count: number;
      listCount: number;
      tableCount: number;
    };
  };

  aeo: {
    faqCount: number;
    questionH2Count: number;
    clearValuePurpose: number;
    answerBlocks: number;
    hasOgTitle: boolean;
    hasOgDescription: boolean;
    hasFAQSchema: boolean;
  };
};
