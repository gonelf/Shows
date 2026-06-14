import type { TimeRange } from '../types'
import { mostSocial, newShows, showsByTier, socialIn, topRated } from '../data/shows'
import { formatCount } from '../utils'
import { PosterCard } from '../components/PosterCard'
import { ListRow } from '../components/ListRow'
import { EmptyState, Section } from '../components/Section'

export function HomeView({
  range,
  onOpen,
}: {
  range: TimeRange
  onOpen: (id: string) => void
}) {
  const fresh = newShows(range)
  const buzz = mostSocial(range, 5)
  const top = topRated(10)
  const excellent = showsByTier('excellent', range)
  const rangeLabel = range === 'week' ? 'this week' : 'this month'

  return (
    <div className="view-pad">
      <Section
        title={`New ${rangeLabel}`}
        lead="Fresh premieres just added to the catalogue"
        count={`${fresh.length} title${fresh.length === 1 ? '' : 's'}`}
      >
        {fresh.length ? (
          <div className="rail">
            {fresh.map((s) => (
              <PosterCard key={s.id} show={s} onOpen={onOpen} showDate />
            ))}
          </div>
        ) : (
          <EmptyState icon="📭" text={`No new premieres ${rangeLabel}.`} />
        )}
      </Section>

      <Section
        title="Critically acclaimed"
        lead={`Excellent reviews ${rangeLabel} (8.5+)`}
        count={`${excellent.length}`}
      >
        {excellent.length ? (
          <div className="rail">
            {excellent.map((s) => (
              <PosterCard key={s.id} show={s} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <EmptyState icon="🎬" text="Nothing in this tier yet." />
        )}
      </Section>

      <Section title="Trending on social" lead={`Most talked about ${rangeLabel}`}>
        <div className="rows">
          {buzz.map((s, i) => (
            <ListRow
              key={s.id}
              show={s}
              onOpen={onOpen}
              rank={i + 1}
              trail={{ big: formatCount(socialIn(s, range)), small: 'mentions' }}
            />
          ))}
        </div>
      </Section>

      <Section title="Top rated of all time" lead="The catalogue's highest scores">
        <div className="rail">
          {top.map((s, i) => (
            <PosterCard key={s.id} show={s} onOpen={onOpen} rank={i + 1} wide />
          ))}
        </div>
      </Section>
    </div>
  )
}
