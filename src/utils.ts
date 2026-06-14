import { TODAY } from './data/shows'

/** Compact social counts: 132000 -> "132K", 1_200_000 -> "1.2M". */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return Math.round(n / 1_000) + 'K'
  return String(n)
}

/** "2 days ago", "Today", "3 weeks ago" relative to the app's TODAY. */
export function relativeDate(iso: string): string {
  const then = new Date(iso + 'T00:00:00Z').getTime()
  const days = Math.floor((TODAY.getTime() - then) / (24 * 60 * 60 * 1000))
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  const weeks = Math.round(days / 7)
  if (days < 30) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  const months = Math.round(days / 30)
  return `${months} month${months > 1 ? 's' : ''} ago`
}

/** Deterministic gradient per show, derived from its id so posters are stable. */
export function posterGradient(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  const h1 = Math.abs(hash) % 360
  const h2 = (h1 + 40 + (Math.abs(hash >> 3) % 80)) % 360
  return `linear-gradient(145deg, hsl(${h1} 65% 38%), hsl(${h2} 70% 22%))`
}
