export type ReviewTier = 'bad' | 'good' | 'great' | 'excellent'

export type TimeRange = 'week' | 'month'

export interface Show {
  id: string
  title: string
  /** Short tagline / one-line synopsis. */
  blurb: string
  genres: string[]
  network: string
  /** ISO date the show premiered / was added to the catalogue. */
  releaseDate: string
  /** Critic + audience aggregate score on a 0–10 scale. */
  rating: number
  /** Reviews counted in the trailing week. */
  reviewsWeek: number
  /** Reviews counted in the trailing month. */
  reviewsMonth: number
  /** Social media mentions / comments in the trailing week. */
  socialWeek: number
  /** Social media mentions / comments in the trailing month. */
  socialMonth: number
  /** Number of seasons available. */
  seasons: number
  /** Emoji motif used to render the gradient poster artwork. */
  emoji: string
}
