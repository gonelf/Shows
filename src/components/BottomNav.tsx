export type Tab = 'home' | 'reviews' | 'social' | 'search' | 'watchlist'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Discover', icon: '🏠' },
  { id: 'reviews', label: 'Reviews', icon: '⭐' },
  { id: 'social', label: 'Buzz', icon: '🔥' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'watchlist', label: 'My List', icon: '🔖' },
]

export function BottomNav({
  active,
  onChange,
  watchlistCount,
}: {
  active: Tab
  onChange: (t: Tab) => void
  watchlistCount: number
}) {
  return (
    <nav className="bottom-nav">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={active === t.id ? 'active' : ''}
          onClick={() => onChange(t.id)}
          aria-current={active === t.id}
        >
          <span className="ic">{t.icon}</span>
          <span>
            {t.label}
            {t.id === 'watchlist' && watchlistCount > 0 ? ` (${watchlistCount})` : ''}
          </span>
        </button>
      ))}
    </nav>
  )
}
