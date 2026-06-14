import type { Show } from '../types'
import { posterGradient } from '../utils'
import { ScoreChip } from './ScoreChip'

interface Props {
  show: Show
  onOpen: (id: string) => void
  rank?: number
  /** Right-aligned trailing metric, e.g. social count. */
  trail?: { big: string; small: string }
}

export function ListRow({ show, onOpen, rank, trail }: Props) {
  return (
    <button className="row" onClick={() => onOpen(show.id)}>
      {rank != null && <span className="rank-n">{rank}</span>}
      <div className="thumb" style={{ background: posterGradient(show.id) }}>
        {show.emoji}
      </div>
      <div className="body">
        <p className="title">{show.title}</p>
        <p className="meta">
          {show.genres.join(' · ')} • {show.network}
        </p>
      </div>
      <div className="trail">
        {trail ? (
          <>
            <div className="big">{trail.big}</div>
            <div className="small">{trail.small}</div>
          </>
        ) : (
          <ScoreChip rating={show.rating} />
        )}
      </div>
    </button>
  )
}
