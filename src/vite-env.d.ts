/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** TMDB v4 read access token (Bearer). Optional — without it the app uses sample data. */
  readonly VITE_TMDB_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
