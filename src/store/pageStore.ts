import { create } from "zustand"

export type Page =
  | "Summary"
  | "GEO"
  | "AEO"

interface PageState {
  page: Page

  setPage: (p: Page) => void
}

export const usePageStore =
  create<PageState>((set) => ({
    page: "Summary",

    setPage: (p) => set({ page: p })
  }))