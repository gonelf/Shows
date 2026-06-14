# Tellie — TV Shows Discovery (mobile-first)

A mobile-first web app for discovering what to watch. Built with **React +
TypeScript + Vite**, designed phone-first (bottom tab bar, horizontal rails,
swipe-up detail sheet). Runs on bundled sample data out of the box, or on
**live data from TMDB** (with real cover posters) when a token is provided.

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
- Real **TMDB cover posters** on every card, with generated gradient art as a
  stable per-show fallback (so the UI looks good with zero external images too).

## Data

The catalogue lives in `src/data/shows.ts` as a typed dataset, accessed only
through selector functions (`newShows`, `showsByTier`, `mostSocial`, …).

The app ships with a self-contained **sample catalogue** so it runs with zero
configuration. Provide a **TMDB v4 read access token** and it loads **live
shows with real cover posters** instead:

1. Get a free token at https://www.themoviedb.org/settings/api
2. Copy `.env.example` → `.env` and set `VITE_TMDB_TOKEN` (local dev).
3. On Vercel, add `VITE_TMDB_TOKEN` under **Project Settings → Environment
   Variables**, then redeploy.

`src/data/tmdb.ts` fetches recent premieres, top-rated and trending shows and
maps them onto the `Show` model, so every selector and view keeps working
unchanged. If the token is missing or the fetch fails, the sample catalogue is
used automatically.

> Note: TMDB has no time-windowed review/social counts, so those figures are
> derived from `vote_count` / `popularity` to keep the ranked views meaningful.

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
  data/shows.ts      sample catalogue + selectors + swappable store
  data/tmdb.ts       live TMDB fetch → Show mapping
  components/        PosterCard, ListRow, ShowSheet, BottomNav, …
  views/             HomeView, ReviewsView, SocialView, SearchView, WatchlistView
  App.tsx            shell: tabs + time range + detail sheet
  useShows.ts        loads live data on mount, falls back to sample
  useWatchlist.ts    localStorage-backed saved list
  utils.ts           formatting helpers, cover art
```
