import { useMemo, useState } from 'react'
import { allGenres, SHOWS, searchShows } from '../data/shows'
import { ListRow } from '../components/ListRow'
import { EmptyState, Section } from '../components/Section'

export function SearchView({ onOpen }: { onOpen: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<string | null>(null)

  const results = useMemo(() => {
    let list = query.trim() ? searchShows(query) : [...SHOWS]
    if (genre) list = list.filter((s) => s.genres.includes(genre))
    return list.sort((a, b) => b.rating - a.rating)
  }, [query, genre])

  const active = query.trim() !== '' || genre !== null

  return (
    <div className="view-pad">
      <div className="search-wrap">
        <input
          className="search-input"
          placeholder="Search shows, networks, genres…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="genre-chips">
        {allGenres().map((g) => (
          <button
            key={g}
            className={'pill' + (genre === g ? ' active' : '')}
            onClick={() => setGenre(genre === g ? null : g)}
          >
            {g}
          </button>
        ))}
      </div>

      <Section
        title={active ? 'Results' : 'Browse all'}
        count={`${results.length}`}
      >
        {results.length ? (
          <div className="rows">
            {results.map((s) => (
              <ListRow key={s.id} show={s} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <EmptyState icon="🔍" text="No shows match your search." />
        )}
      </Section>
    </div>
  )
}
