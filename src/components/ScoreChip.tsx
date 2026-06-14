import { TIER_META, tierOf } from '../data/shows'

export function ScoreChip({ rating, large }: { rating: number; large?: boolean }) {
  const accent = TIER_META[tierOf(rating)].accent
  return (
    <span className={'score' + (large ? ' lg' : '')} style={{ background: accent }}>
      ★ {rating.toFixed(1)}
    </span>
  )
}
