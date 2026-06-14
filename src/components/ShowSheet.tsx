import { useEffect } from 'react'
import type { Show } from '../types'
import { TIER_META, tierOf } from '../data/shows'
import { coverArt, formatCount, posterGradient, relativeDate } from '../utils'
import { ScoreChip } from './ScoreChip'

interface Props {
  show: Show
  saved: boolean
  onToggleSave: (id: string) => void
  onClose: () => void
}

export function ShowSheet({ show, saved, onToggleSave, onClose }: Props) {
  // Lock body scroll + close on Escape while the sheet is open.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const tier = TIER_META[tierOf(show.rating)]

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        <div className="grip" />
        <div className="hero" style={{ background: posterGradient(show.id) }}>
          <img className="art" src={coverArt(show)} alt="" loading="lazy" />
          <span className="motif">{show.emoji}</span>
        </div>
        <div className="body">
          <h2>{show.title}</h2>
          <div className="meta-row">
            <ScoreChip rating={show.rating} large />
            <span className="pill" style={{ color: tier.accent }}>
              {tier.label}
            </span>
            <span className="pill">{show.network}</span>
            <span className="pill">{show.seasons} season{show.seasons > 1 ? 's' : ''}</span>
          </div>
          <p className="blurb">{show.blurb}</p>

          <div className="stats">
            <div className="stat">
              <div className="v">{relativeDate(show.releaseDate)}</div>
              <div className="l">Premiered</div>
            </div>
            <div className="stat">
              <div className="v">{formatCount(show.reviewsMonth)}</div>
              <div className="l">Reviews / mo</div>
            </div>
            <div className="stat">
              <div className="v">{formatCount(show.socialMonth)}</div>
              <div className="l">Social / mo</div>
            </div>
          </div>

          <div className="genres">
            {show.genres.map((g) => (
              <span key={g} className="pill">
                {g}
              </span>
            ))}
          </div>

          <button
            className={'watch-btn' + (saved ? ' on' : '')}
            onClick={() => onToggleSave(show.id)}
          >
            {saved ? '✓ On your list' : '+ Add to My List'}
          </button>
        </div>
      </div>
    </div>
  )
}
