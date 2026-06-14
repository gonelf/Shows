# Tellie — TV Shows Discovery (mobile-first)

A mobile-first web app for discovering what to watch. Built with **React +
TypeScript + Vite**, designed phone-first (bottom tab bar, horizontal rails,
swipe-up detail sheet) and works fully offline — no API keys required.

## Features

Required:

- **New this week / this month** — fresh premieres, filtered by the global
  time-range toggle.
- **Reviews by tier** — browse shows with **Bad / Good / Great / Excellent**
  reviews this week or month, ranked by review volume.
- **Social buzz** — shows with the most comments & mentions on social media,
  this week or month.

Extras added on top:

- 🏠 **Discover** home that combines new releases, critically acclaimed,
  trending, and all-time top rated rails.
- 🔍 **Search & filter** by title, network, or genre.
- 🔖 **Watchlist** — save shows locally (persisted in `localStorage`).
- A bottom-sheet **show detail** with score, tier, stats and synopsis.
- Generated gradient poster art (stable per show) so the UI looks good with
  zero external image dependencies.

## Data

The catalogue lives in `src/data/shows.ts` as a typed mock dataset, accessed
only through selector functions (`newShows`, `showsByTier`, `mostSocial`, …).
To go live, replace `SHOWS` with a `fetch()` to a real API (e.g. TMDB / Trakt)
and set `TODAY = new Date()` — every view keeps working unchanged.

## Run

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  data/shows.ts      mock catalogue + selectors
  components/        PosterCard, ListRow, ShowSheet, BottomNav, …
  views/             HomeView, ReviewsView, SocialView, SearchView, WatchlistView
  App.tsx            shell: tabs + time range + detail sheet
  useWatchlist.ts    localStorage-backed saved list
  utils.ts           formatting helpers
```
