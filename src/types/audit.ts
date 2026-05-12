export type RawAudit = {

  url:string,

  geo: {
    hasH1: boolean
    h2Count: number
    listCount: number
    tableCount: number
  },

  aeo: {
    faqCount: number
    questionH2Count: number
    answerBlocks: number
    hasOgTitle: boolean
    hasOgDescription: boolean
    hasFAQSchema: boolean
  },

  technical: {
    hasCanonical: boolean
    hasLang: boolean
  }


}