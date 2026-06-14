import type { Show } from '../types'

/**
 * Live TMDB data source. Maps TMDB's TV objects onto the app's `Show` model so
 * every existing selector and view keeps working unchanged. Enabled by setting
 * `VITE_TMDB_TOKEN` (a TMDB v4 read access token); without it the app falls
 * back to the bundled sample catalogue in `shows.ts`.
 */

const BASE = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p/w500'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

/** True when a TMDB token is configured, so we should attempt a live fetch. */
export function tmdbConfigured(): boolean {
  return Boolean(TOKEN)
}

/** Maps TMDB TV genres to the emoji motif used by the generated poster art. */
const GENRE_EMOJI: Record<string, string> = {
  'Action & Adventure': '💥',
  Animation: '🎨',
  Comedy: '😂',
  Crime: '🔪',
  Documentary: '🎥',
  Drama: '🎭',
  Family: '👨‍👩‍👧',
  Kids: '🧸',
  Mystery: '🕵️',
  News: '📰',
  Reality: '📺',
  'Sci-Fi & Fantasy': '🚀',
  Soap: '💔',
  Talk: '🎙️',
  'War & Politics': '⚔️',
  Western: '🤠',
}

interface TmdbTv {
  id: number
  name: string
  overview: string
  genre_ids?: number[]
  genres?: { id: number; name: string }[]
  first_air_date?: string
  vote_average: number
  vote_count: number
  popularity: number
  poster_path: string | null
  networks?: { name: string }[]
  number_of_seasons?: number
}

async function tmdb<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const url = new URL(BASE + path)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v))
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${TOKEN}`, accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`TMDB ${path} → ${res.status}`)
  return (await res.json()) as T
}

const iso = (d: Date) => d.toISOString().slice(0, 10)

/**
 * Fetch a pool of real shows: recent premieres ("new"), top rated ("acclaimed")
 * and this week's trending ("buzz"). Details are fetched per show to fill in
 * network and season count, which the list endpoints omit.
 */
export async function fetchShows(): Promise<Show[]> {
  if (!TOKEN) throw new Error('VITE_TMDB_TOKEN not set')

  const today = new Date()
  const since = new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000)

  const genreList = await tmdb<{ genres: { id: number; name: string }[] }>(
    '/genre/tv/list',
    { language: 'en-US' },
  )
  const genreMap = new Map(genreList.genres.map((g) => [g.id, g.name]))

  const [fresh, top, trending] = await Promise.all([
    tmdb<{ results: TmdbTv[] }>('/discover/tv', {
      sort_by: 'first_air_date.desc',
      'first_air_date.gte': iso(since),
      'first_air_date.lte': iso(today),
      'vote_count.gte': 5,
      include_adult: 'false',
      language: 'en-US',
    }),
    tmdb<{ results: TmdbTv[] }>('/tv/top_rated', { language: 'en-US', page: 1 }),
    tmdb<{ results: TmdbTv[] }>('/trending/tv/week', { language: 'en-US' }),
  ])

  // Merge into a unique pool (a show may appear in several lists), capped to
  // keep the per-show detail fan-out reasonable.
  const pool = new Map<number, TmdbTv>()
  for (const t of [...fresh.results, ...top.results, ...trending.results]) {
    if (t.poster_path && !pool.has(t.id)) pool.set(t.id, t)
  }
  const items = [...pool.values()].slice(0, 40)

  const detailed = await Promise.all(
    items.map(async (t) => {
      try {
        return { ...t, ...(await tmdb<TmdbTv>(`/tv/${t.id}`, { language: 'en-US' })) }
      } catch {
        return t // fall back to list data if the detail call fails
      }
    }),
  )

  const todayIso = iso(today)

  return detailed
    .map((t): Show => {
      const genres = (
        t.genres?.map((g) => g.name) ??
        (t.genre_ids ?? [])
          .map((id) => genreMap.get(id))
          .filter((g): g is string => Boolean(g))
      ).slice(0, 3)
      const primary = genres[0] ?? ''
      const reviewsMonth = t.vote_count ?? 0
      const socialMonth = Math.round((t.popularity ?? 0) * 1000)

      return {
        id: String(t.id),
        title: t.name,
        blurb: t.overview?.trim() || 'No synopsis available yet.',
        genres: genres.length ? genres : ['Drama'],
        network: t.networks?.[0]?.name ?? 'Streaming',
        releaseDate: t.first_air_date || todayIso,
        rating: Math.round((t.vote_average ?? 0) * 10) / 10,
        // TMDB has no time-windowed review/social counts, so these are derived
        // from vote_count and popularity to keep the ranked views meaningful.
        reviewsWeek: Math.round(reviewsMonth * 0.2),
        reviewsMonth,
        socialWeek: Math.round(socialMonth * 0.28),
        socialMonth,
        seasons: t.number_of_seasons ?? 1,
        emoji: GENRE_EMOJI[primary] ?? '📺',
        cover: t.poster_path ? IMG + t.poster_path : undefined,
      }
    })
    .filter((s) => s.title)
}
