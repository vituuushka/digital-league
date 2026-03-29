import { create } from 'zustand'

type Mode = 'brush' | 'eraser'

interface DrawStore {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const useDrawStore = create<DrawStore>((set) => ({
  mode: 'brush',
  setMode: (mode) => set({ mode }),
}))