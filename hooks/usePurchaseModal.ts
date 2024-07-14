import { create } from "zustand"

interface PurchaseModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const usePurchaseModal = create<PurchaseModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default usePurchaseModal