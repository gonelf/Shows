import { useState } from 'react'
import type { ReviewTier, TimeRange } from '../types'
import { TIER_META, TIER_ORDER, reviewsIn, showsByTier } from '../data/shows'
import { formatCount } from '../utils'
import { ListRow } from '../components/ListRow'
import { EmptyState, Section } from '../components/Section'

export function ReviewsView({
  range,
  onOpen,
}: {
  range: TimeRange
  onOpen: (id: string) => void
}) {
  const [tier, setTier] = useState<ReviewTier>('excellent')
  const shows = showsByTier(tier, range)
  const meta = TIER_META[tier]
  const rangeLabel = range === 'week' ? 'this week' : 'this month'

  return (
    <div className="view-pad">
      <div className="tier-tabs">
        {TIER_ORDER.map((t) => {
          const m = TIER_META[t]
          return (
            <button
              key={t}
              className={'tier-chip' + (tier === t ? ' active' : '')}
              style={{ color: m.accent }}
              onClick={() => setTier(t)}
            >
              <span className="t-label">{m.label}</span>
              <span className="t-sub">{m.range}</span>
            </button>
          )
        })}
      </div>

      <Section
        title={`${meta.label} reviews`}
        lead={`Shows rated ${meta.range} ${rangeLabel}, by review volume`}
        count={`${shows.length} title${shows.length === 1 ? '' : 's'}`}
      >
        {shows.length ? (
          <div className="rows">
            {shows.map((s, i) => (
              <ListRow
                key={s.id}
                show={s}
                onOpen={onOpen}
                rank={i + 1}
                trail={{ big: formatCount(reviewsIn(s, range)), small: 'reviews' }}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon="📝" text={`No ${meta.label.toLowerCase()} shows ${rangeLabel}.`} />
        )}
      </Section>
    </div>
  )
}
