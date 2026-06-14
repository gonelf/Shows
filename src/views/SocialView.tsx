import type { TimeRange } from '../types'
import { mostSocial, socialIn } from '../data/shows'
import { formatCount } from '../utils'
import { ListRow } from '../components/ListRow'
import { Section } from '../components/Section'

export function SocialView({
  range,
  onOpen,
}: {
  range: TimeRange
  onOpen: (id: string) => void
}) {
  const shows = mostSocial(range, 20)
  const rangeLabel = range === 'week' ? 'this week' : 'this month'
  const total = shows.reduce((sum, s) => sum + socialIn(s, range), 0)

  return (
    <div className="view-pad">
      <Section
        title="Most talked about"
        lead={`Comments & mentions across social media ${rangeLabel}`}
        count={`${formatCount(total)} total`}
      >
        <div className="rows">
          {shows.map((s, i) => (
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
    </div>
  )
}
