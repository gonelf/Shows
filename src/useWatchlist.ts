import { useCallback, useEffect, useState } from 'react'

const KEY = 'tellie.watchlist'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/** Persisted set of saved show ids, shared across the app. */
export function useWatchlist() {
  const [ids, setIds] = useState<string[]>(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev],
    )
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, has }
}
