import { createContext, useContext } from 'react'
import type { Lang, L } from './types'

export interface AppState {
  lang: Lang
  t: (v: L) => string
  favs: string[]
  toggleFav: (id: string) => void
  counts: Record<string, number>
  setCount: (id: string, n: number) => void
  go: (page: string, param?: string) => void
}

export const AppContext = createContext<AppState | null>(null)

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppContext.Provider')
  return ctx
}
