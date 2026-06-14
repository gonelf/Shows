import { useState } from 'react'
import type { TimeRange } from './types'
import { getShow } from './data/shows'
import { useWatchlist } from './useWatchlist'
import { BottomNav, type Tab } from './components/BottomNav'
import { TimeToggle } from './components/TimeToggle'
import { ShowSheet } from './components/ShowSheet'
import { HomeView } from './views/HomeView'
import { ReviewsView } from './views/ReviewsView'
import { SocialView } from './views/SocialView'
import { SearchView } from './views/SearchView'
import { WatchlistView } from './views/WatchlistView'

const TITLES: Record<Tab, string> = {
  home: 'Tellie',
  reviews: 'Reviews',
  social: 'Social Buzz',
  search: 'Search',
  watchlist: 'My List',
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [range, setRange] = useState<TimeRange>('week')
  const [openId, setOpenId] = useState<string | null>(null)
  const watchlist = useWatchlist()

  const openShow = getShow(openId ?? '')
  // The week/month toggle only applies to time-based views.
  const showToggle = tab === 'home' || tab === 'reviews' || tab === 'social'

  return (
    <div className="app">
      <header className="appbar">
        <div className="brand">
          <span className="dot" />
          <div>
            <h1>{TITLES[tab]}</h1>
            {tab === 'home' && <div className="sub">What to watch, right now</div>}
          </div>
        </div>
        {showToggle && <TimeToggle value={range} onChange={setRange} />}
      </header>

      {tab === 'home' && <HomeView range={range} onOpen={setOpenId} />}
      {tab === 'reviews' && <ReviewsView range={range} onOpen={setOpenId} />}
      {tab === 'social' && <SocialView range={range} onOpen={setOpenId} />}
      {tab === 'search' && <SearchView onOpen={setOpenId} />}
      {tab === 'watchlist' && <WatchlistView ids={watchlist.ids} onOpen={setOpenId} />}

      <BottomNav active={tab} onChange={setTab} watchlistCount={watchlist.ids.length} />

      {openShow && (
        <ShowSheet
          show={openShow}
          saved={watchlist.has(openShow.id)}
          onToggleSave={watchlist.toggle}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}
