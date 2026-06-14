import { useEffect, useState } from 'react'
import { setShows } from './data/shows'
import { fetchShows, tmdbConfigured } from './data/tmdb'

export type ShowsStatus = 'sample' | 'loading' | 'live'

/**
 * Loads the live TMDB catalogue once on mount when a token is configured,
 * swaps it into the shared `SHOWS` store, and forces a re-render so every
 * view picks up the new data. Falls back to the bundled sample catalogue
 * when no token is set or the fetch fails.
 */
export function useShows(): ShowsStatus {
  const [status, setStatus] = useState<ShowsStatus>(
    tmdbConfigured() ? 'loading' : 'sample',
  )

  useEffect(() => {
    if (!tmdbConfigured()) return
    let cancelled = false

    fetchShows()
      .then((shows) => {
        if (cancelled) return
        if (shows.length) {
          setShows(shows)
          setStatus('live')
        } else {
          setStatus('sample')
        }
      })
      .catch((err) => {
        if (cancelled) return
        console.warn('TMDB load failed, using sample data:', err)
        setStatus('sample')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return status
}
