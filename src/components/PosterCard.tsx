import type { Show } from '../types'
import { coverArt, posterGradient, relativeDate } from '../utils'
import { ScoreChip } from './ScoreChip'

interface Props {
  show: Show
  onOpen: (id: string) => void
  /** Show release recency instead of rating in the meta line. */
  showDate?: boolean
  /** Optional 1-based rank badge. */
  rank?: number
  /** Wider landscape variant. */
  wide?: boolean
}

export function PosterCard({ show, onOpen, showDate, rank, wide }: Props) {
  return (
    <button
      className={'poster-card' + (wide ? ' wide' : '')}
      onClick={() => onOpen(show.id)}
      aria-label={`Open ${show.title}`}
    >
      <div className="poster" style={{ background: posterGradient(show.id) }}>
        <img className="art" src={coverArt(show)} alt="" loading="lazy" />
        {rank != null && <span className="rank">{rank}</span>}
        <span className="motif">{show.emoji}</span>
        <div className="info">
          <p className="title">{show.title}</p>
          <div className="meta">
            {showDate ? (
              <span>{relativeDate(show.releaseDate)}</span>
            ) : (
              <ScoreChip rating={show.rating} />
            )}
            <span>· {show.network}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
