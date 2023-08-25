import { create } from 'zustand'

interface UploadDialogStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useUploadDialog = create<UploadDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
