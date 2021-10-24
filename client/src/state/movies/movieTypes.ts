import {ITMDBMovieData} from '../../services/tmdbapi'

export const fetch_movie_page_start = 'fetch_movie_page_start'
export const fetch_movie_page_success = 'fetch_movie_page_success'
export const fetch_movie_page_error = 'fetch_movie_page_error'

export interface MovieCategoryData {
  movies: ITMDBMovieData[]
  lastPageDownloaded: number
  totalPages: number
}

export interface MoviePagePayload {
  movies: ITMDBMovieData[]
  fetchedPage: number
  totalPages: number
}

export interface MovieState {
  fetching: boolean
  error: string
  movies: ITMDBMovieData[]
  lastPageDownloaded: number
  totalPages: number
  current: MovieCategoryData
  popular: MovieCategoryData
  top: MovieCategoryData
  search: Record<string, MovieCategoryData>
}

interface FetchMoviePageStartAction {
  type: typeof fetch_movie_page_start
}

interface FetchMoviePageSuccessAction {
  type: typeof fetch_movie_page_success
  payload: MoviePagePayload
}

interface FetchMoviePageErrorAction {
  type: typeof fetch_movie_page_error
  payload: string
}

export type MovieAction =
  | FetchMoviePageStartAction
  | FetchMoviePageSuccessAction
  | FetchMoviePageErrorAction
