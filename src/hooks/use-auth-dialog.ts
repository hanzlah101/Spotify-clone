import { create } from 'zustand'

interface AuthDialogStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAuthDialog = create<AuthDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
