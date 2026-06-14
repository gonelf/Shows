import type { Show } from './types'
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

/** Stable 32-bit hash for a seed string, used to derive poster art. */
function seedHash(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Deterministic gradient per show, derived from its id so posters are stable. */
export function posterGradient(seed: string): string {
  const hash = seedHash(seed)
  const h1 = hash % 360
  const h2 = (h1 + 40 + ((hash >> 3) % 80)) % 360
  return `linear-gradient(145deg, hsl(${h1} 65% 38%), hsl(${h2} 70% 22%))`
}

/**
 * Cover image for a show. Returns the real `cover` URL when present, otherwise
 * a deterministic, self-contained SVG "poster" (stable per id) so every card
 * shows distinct cover art with zero network dependencies.
 */
export function coverArt(show: Show): string {
  if (show.cover) return show.cover

  const h = seedHash(show.id)
  const h1 = h % 360
  const h2 = (h1 + 40 + ((h >> 3) % 80)) % 360
  const h3 = (h1 + 175 + ((h >> 5) % 60)) % 360
  const bx = 60 + (h % 180)
  const by = 60 + ((h >> 2) % 180)
  const bx2 = 60 + ((h >> 4) % 180)
  const by2 = 180 + ((h >> 6) % 180)
  const rot = (h % 70) - 35

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 420' preserveAspectRatio='xMidYMid slice'>` +
    `<defs>` +
    `<linearGradient id='g' x1='0' y1='0' x2='0.4' y2='1'>` +
    `<stop offset='0' stop-color='hsl(${h1} 66% 40%)'/>` +
    `<stop offset='1' stop-color='hsl(${h2} 70% 18%)'/>` +
    `</linearGradient>` +
    `<filter id='b'><feGaussianBlur stdDeviation='34'/></filter>` +
    `</defs>` +
    `<rect width='300' height='420' fill='url(#g)'/>` +
    `<g filter='url(#b)' opacity='0.55'>` +
    `<circle cx='${bx}' cy='${by}' r='95' fill='hsl(${h3} 82% 60%)'/>` +
    `<circle cx='${bx2}' cy='${by2}' r='80' fill='hsl(${h1} 76% 56%)'/>` +
    `</g>` +
    `<g transform='rotate(${rot} 150 210)' fill='#fff' opacity='0.10'>` +
    `<rect x='-220' y='70' width='740' height='12'/>` +
    `<rect x='-220' y='118' width='740' height='6'/>` +
    `<rect x='-220' y='150' width='740' height='18'/>` +
    `</g>` +
    `</svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
