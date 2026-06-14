import type { ReviewTier, Show, TimeRange } from '../types'

/**
 * The "current" date the whole app reasons about. Centralised here so the
 * dataset and the week/month filters stay in sync. In a production build this
 * would simply be `new Date()` and the catalogue would come from an API
 * (e.g. TMDB / Trakt) behind the same helpers exported below.
 */
export const TODAY = new Date('2026-06-14T00:00:00Z')

const DAY = 24 * 60 * 60 * 1000

/** Returns an ISO date string `n` days before TODAY. */
function daysAgo(n: number): string {
  return new Date(TODAY.getTime() - n * DAY).toISOString().slice(0, 10)
}

/**
 * Mock catalogue. Realistic shape, fully self-contained so the app runs with
 * no API keys or network access. Swap `SHOWS` for a fetch() in one place and
 * every view keeps working.
 */
export const SHOWS: Show[] = [
  {
    id: 'aurora-falls',
    title: 'Aurora Falls',
    blurb: 'A sleepy mountain town hides a fault line between two worlds.',
    genres: ['Mystery', 'Sci-Fi'],
    network: 'Nimbus+',
    releaseDate: daysAgo(2),
    rating: 9.1,
    reviewsWeek: 480,
    reviewsMonth: 480,
    socialWeek: 128_000,
    socialMonth: 132_000,
    seasons: 1,
    emoji: '🏔️',
  },
  {
    id: 'the-last-correspondent',
    title: 'The Last Correspondent',
    blurb: 'A war reporter chases one final story across a collapsing border.',
    genres: ['Drama', 'Thriller'],
    network: 'Helix',
    releaseDate: daysAgo(4),
    rating: 8.8,
    reviewsWeek: 312,
    reviewsMonth: 312,
    socialWeek: 74_500,
    socialMonth: 80_200,
    seasons: 1,
    emoji: '📰',
  },
  {
    id: 'midnight-cartography',
    title: 'Midnight Cartography',
    blurb: 'A grief-stricken mapmaker charts streets that only exist after dark.',
    genres: ['Fantasy', 'Drama'],
    network: 'Nimbus+',
    releaseDate: daysAgo(5),
    rating: 7.9,
    reviewsWeek: 201,
    reviewsMonth: 201,
    socialWeek: 41_300,
    socialMonth: 44_900,
    seasons: 1,
    emoji: '🗺️',
  },
  {
    id: 'salt-and-static',
    title: 'Salt & Static',
    blurb: 'Two rival radio hosts share one frequency and a buried secret.',
    genres: ['Comedy', 'Romance'],
    network: 'Banter',
    releaseDate: daysAgo(6),
    rating: 6.4,
    reviewsWeek: 158,
    reviewsMonth: 158,
    socialWeek: 22_800,
    socialMonth: 25_100,
    seasons: 1,
    emoji: '📻',
  },
  {
    id: 'glasshouse',
    title: 'Glasshouse',
    blurb: 'A botanist trapped in a luxury bunker learns the plants are watching.',
    genres: ['Horror', 'Sci-Fi'],
    network: 'Helix',
    releaseDate: daysAgo(1),
    rating: 4.2,
    reviewsWeek: 96,
    reviewsMonth: 96,
    socialWeek: 61_000,
    socialMonth: 61_000,
    seasons: 1,
    emoji: '🪴',
  },
  {
    id: 'tidewater-kings',
    title: 'Tidewater Kings',
    blurb: 'Three fishing dynasties wage a quiet war over a shrinking harbour.',
    genres: ['Drama', 'Crime'],
    network: 'Meridian',
    releaseDate: daysAgo(9),
    rating: 8.6,
    reviewsWeek: 140,
    reviewsMonth: 520,
    socialWeek: 33_000,
    socialMonth: 96_400,
    seasons: 2,
    emoji: '🦞',
  },
  {
    id: 'paper-moons',
    title: 'Paper Moons',
    blurb: 'A travelling carnival hides forgers, dreamers and one real magician.',
    genres: ['Fantasy', 'Drama'],
    network: 'Nimbus+',
    releaseDate: daysAgo(12),
    rating: 9.3,
    reviewsWeek: 188,
    reviewsMonth: 740,
    socialWeek: 88_000,
    socialMonth: 210_000,
    seasons: 2,
    emoji: '🎪',
  },
  {
    id: 'overclocked',
    title: 'Overclocked',
    blurb: 'Burnt-out engineers build an AI that starts fixing their lives — too well.',
    genres: ['Sci-Fi', 'Thriller'],
    network: 'Helix',
    releaseDate: daysAgo(15),
    rating: 7.4,
    reviewsWeek: 90,
    reviewsMonth: 410,
    socialWeek: 51_000,
    socialMonth: 188_000,
    seasons: 1,
    emoji: '🤖',
  },
  {
    id: 'the-quiet-hour',
    title: 'The Quiet Hour',
    blurb: 'A night-shift nurse becomes the only witness to impossible recoveries.',
    genres: ['Mystery', 'Drama'],
    network: 'Meridian',
    releaseDate: daysAgo(18),
    rating: 8.1,
    reviewsWeek: 70,
    reviewsMonth: 360,
    socialWeek: 19_400,
    socialMonth: 71_000,
    seasons: 1,
    emoji: '🕯️',
  },
  {
    id: 'sunday-gravy',
    title: 'Sunday Gravy',
    blurb: 'A chaotic Italian-American family runs the worst-rated restaurant in town.',
    genres: ['Comedy'],
    network: 'Banter',
    releaseDate: daysAgo(20),
    rating: 6.8,
    reviewsWeek: 60,
    reviewsMonth: 244,
    socialWeek: 14_000,
    socialMonth: 58_000,
    seasons: 3,
    emoji: '🍝',
  },
  {
    id: 'cold-orbit',
    title: 'Cold Orbit',
    blurb: 'A skeleton crew on a derelict station argues over who gets the last pod.',
    genres: ['Sci-Fi', 'Horror'],
    network: 'Helix',
    releaseDate: daysAgo(23),
    rating: 3.6,
    reviewsWeek: 40,
    reviewsMonth: 180,
    socialWeek: 9_800,
    socialMonth: 47_000,
    seasons: 1,
    emoji: '🛰️',
  },
  {
    id: 'velvet-district',
    title: 'Velvet District',
    blurb: 'A 1970s vice cop falls for the lounge singer he was sent to bring in.',
    genres: ['Crime', 'Romance'],
    network: 'Meridian',
    releaseDate: daysAgo(26),
    rating: 8.9,
    reviewsWeek: 55,
    reviewsMonth: 470,
    socialWeek: 27_000,
    socialMonth: 142_000,
    seasons: 2,
    emoji: '🎷',
  },
  {
    id: 'feral-county',
    title: 'Feral County',
    blurb: 'A wildlife ranger and a poacher are forced to survive a wildfire together.',
    genres: ['Adventure', 'Drama'],
    network: 'Meridian',
    releaseDate: daysAgo(28),
    rating: 7.1,
    reviewsWeek: 30,
    reviewsMonth: 150,
    socialWeek: 8_200,
    socialMonth: 39_500,
    seasons: 1,
    emoji: '🔥',
  },
  {
    id: 'the-understudy',
    title: 'The Understudy',
    blurb: 'On Broadway, second place is the most dangerous role of all.',
    genres: ['Drama', 'Thriller'],
    network: 'Nimbus+',
    releaseDate: daysAgo(33),
    rating: 9.0,
    reviewsWeek: 44,
    reviewsMonth: 388,
    socialWeek: 36_000,
    socialMonth: 165_000,
    seasons: 1,
    emoji: '🎭',
  },
  {
    id: 'low-tide-high-school',
    title: 'Low Tide High',
    blurb: 'Surf-town teens juggle finals, first loves and a vanishing coastline.',
    genres: ['Comedy', 'Romance'],
    network: 'Banter',
    releaseDate: daysAgo(38),
    rating: 5.9,
    reviewsWeek: 22,
    reviewsMonth: 132,
    socialWeek: 31_000,
    socialMonth: 119_000,
    seasons: 2,
    emoji: '🏄',
  },
  {
    id: 'ironwood',
    title: 'Ironwood',
    blurb: 'A blacksmith returns to a cursed forest that remembers her family name.',
    genres: ['Fantasy', 'Horror'],
    network: 'Helix',
    releaseDate: daysAgo(44),
    rating: 8.4,
    reviewsWeek: 18,
    reviewsMonth: 290,
    socialWeek: 12_500,
    socialMonth: 84_000,
    seasons: 1,
    emoji: '🌲',
  },
  {
    id: 'the-archivists',
    title: 'The Archivists',
    blurb: 'Librarians at a secret vault decide which histories the world keeps.',
    genres: ['Mystery', 'Sci-Fi'],
    network: 'Nimbus+',
    releaseDate: daysAgo(52),
    rating: 8.7,
    reviewsWeek: 14,
    reviewsMonth: 330,
    socialWeek: 16_000,
    socialMonth: 102_000,
    seasons: 2,
    emoji: '📚',
  },
  {
    id: 'pennywhistle-lane',
    title: 'Pennywhistle Lane',
    blurb: 'A feel-good street of misfit shopkeepers fights off a soulless developer.',
    genres: ['Comedy', 'Drama'],
    network: 'Banter',
    releaseDate: daysAgo(60),
    rating: 7.6,
    reviewsWeek: 10,
    reviewsMonth: 210,
    socialWeek: 6_400,
    socialMonth: 41_000,
    seasons: 3,
    emoji: '🪕',
  },
  {
    id: 'dead-air',
    title: 'Dead Air',
    blurb: 'A true-crime podcaster realises her latest case is hunting her back.',
    genres: ['Thriller', 'Horror'],
    network: 'Helix',
    releaseDate: daysAgo(70),
    rating: 4.7,
    reviewsWeek: 8,
    reviewsMonth: 160,
    socialWeek: 21_000,
    socialMonth: 73_000,
    seasons: 1,
    emoji: '🎙️',
  },
  {
    id: 'meridian-line',
    title: 'Meridian Line',
    blurb: 'Rival train conductors race a luxury express across a fracturing empire.',
    genres: ['Adventure', 'Drama'],
    network: 'Meridian',
    releaseDate: daysAgo(85),
    rating: 8.2,
    reviewsWeek: 6,
    reviewsMonth: 140,
    socialWeek: 5_100,
    socialMonth: 28_000,
    seasons: 2,
    emoji: '🚂',
  },
]

/* ------------------------------------------------------------------ */
/* Selectors — the only place views touch the raw data.               */
/* ------------------------------------------------------------------ */

export const TIME_RANGE_DAYS: Record<TimeRange, number> = {
  week: 7,
  month: 30,
}

export function tierOf(rating: number): ReviewTier {
  if (rating >= 8.5) return 'excellent'
  if (rating >= 7) return 'great'
  if (rating >= 5) return 'good'
  return 'bad'
}

export const TIER_META: Record<
  ReviewTier,
  { label: string; range: string; accent: string }
> = {
  excellent: { label: 'Excellent', range: '8.5 – 10', accent: '#34d399' },
  great: { label: 'Great', range: '7.0 – 8.4', accent: '#60a5fa' },
  good: { label: 'Good', range: '5.0 – 6.9', accent: '#fbbf24' },
  bad: { label: 'Bad', range: 'below 5.0', accent: '#f87171' },
}

export const TIER_ORDER: ReviewTier[] = ['excellent', 'great', 'good', 'bad']

function daysSinceRelease(show: Show): number {
  const released = new Date(show.releaseDate + 'T00:00:00Z')
  return Math.floor((TODAY.getTime() - released.getTime()) / DAY)
}

/** Shows that premiered within the selected window, newest first. */
export function newShows(range: TimeRange): Show[] {
  const limit = TIME_RANGE_DAYS[range]
  return SHOWS.filter((s) => daysSinceRelease(s) <= limit).sort(
    (a, b) => daysSinceRelease(a) - daysSinceRelease(b),
  )
}

export function reviewsIn(show: Show, range: TimeRange): number {
  return range === 'week' ? show.reviewsWeek : show.reviewsMonth
}

export function socialIn(show: Show, range: TimeRange): number {
  return range === 'week' ? show.socialWeek : show.socialMonth
}

/** Shows of a given review tier that were reviewed in the window, busiest first. */
export function showsByTier(tier: ReviewTier, range: TimeRange): Show[] {
  return SHOWS.filter((s) => tierOf(s.rating) === tier && reviewsIn(s, range) > 0).sort(
    (a, b) => reviewsIn(b, range) - reviewsIn(a, range),
  )
}

/** Most-talked-about shows on social media in the window, loudest first. */
export function mostSocial(range: TimeRange, limit = 10): Show[] {
  return [...SHOWS]
    .filter((s) => socialIn(s, range) > 0)
    .sort((a, b) => socialIn(b, range) - socialIn(a, range))
    .slice(0, limit)
}

/** Highest-rated shows overall, for the editorial "Top Rated" rail. */
export function topRated(limit = 10): Show[] {
  return [...SHOWS].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function getShow(id: string): Show | undefined {
  return SHOWS.find((s) => s.id === id)
}

export function searchShows(query: string): Show[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return SHOWS.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.network.toLowerCase().includes(q) ||
      s.genres.some((g) => g.toLowerCase().includes(q)),
  )
}

export const ALL_GENRES = Array.from(
  new Set(SHOWS.flatMap((s) => s.genres)),
).sort()
