import { create } from 'zustand'

interface SubscribeDialogStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSubscribeDialog = create<SubscribeDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
