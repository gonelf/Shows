import { getShow } from '../data/shows'
import { ListRow } from '../components/ListRow'
import { EmptyState, Section } from '../components/Section'

export function WatchlistView({
  ids,
  onOpen,
}: {
  ids: string[]
  onOpen: (id: string) => void
}) {
  const shows = ids.map(getShow).filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <div className="view-pad">
      <Section
        title="My List"
        lead="Shows you've saved to watch later"
        count={`${shows.length}`}
      >
        {shows.length ? (
          <div className="rows">
            {shows.map((s) => (
              <ListRow key={s.id} show={s} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🔖"
            text="Nothing saved yet. Tap any show and add it to your list."
          />
        )}
      </Section>
    </div>
  )
}
