interface AuthModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

import { create } from "zustand"

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Modal is being opened");
    set({ isOpen: true })
  },
  onClose: () => {
    console.log("Modal is being closed");
    set({ isOpen: false })
  },
}))

export default useAuthModal
