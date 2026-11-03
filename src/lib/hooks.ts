import { useCallback, useEffect, useState } from 'react'

/** useState that survives reloads. Storage can be blocked (private mode), so every access is guarded. */
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore */
    }
  }, [key, value])
  return [value, setValue] as const
}

export interface Route {
  page: string
  param?: string
}

const parse = (): Route => {
  const [page, param] = window.location.hash.replace(/^#\/?/, '').split('/')
  return { page: page || 'home', param: param || undefined }
}

/** Tiny hash router so the browser Back button and shared links work on any static host. */
export function useRoute() {
  const [route, setRoute] = useState<Route>(parse)
  useEffect(() => {
    const on = () => setRoute(parse())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const go = useCallback((page: string, param?: string) => {
    window.location.hash = page === 'home' ? '' : `/${page}${param ? `/${param}` : ''}`
  }, [])
  return [route, go] as const
}
