import { create } from "zustand";

interface LinkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLinkModal = create<LinkModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLinkModal;
