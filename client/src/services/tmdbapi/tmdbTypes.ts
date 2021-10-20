export interface ITMDBMovieData {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ITMDBMovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  budget: number
  genres: Array<{id: number; name: string}>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<{id: number; logo_path: string; name: string; origin_country: string}>
  production_countries: Array<{iso_3166_1: string; name: string}>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<{english_name: string; iso_639_1: string; name: string}>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ITMDBMovieListResponse {
  page: number
  results: ITMDBMovieData[]
  total_pages: number
  total_results: number
}

export interface ITMDBNowPlayingMovieResponse extends ITMDBMovieListResponse {
  dates: {
    maximum: string
    minimum: string
  }
}
