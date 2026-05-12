import { create } from "zustand"

import type { RawAudit } from "~src/types/audit"

interface AuditState {
  audit: RawAudit | null

  setAudit: (audit: RawAudit) => void
}

export const useAuditStore =
  create<AuditState>((set) => ({
    audit: null,

    setAudit: (audit) => set({ audit })
  }))