import {ITMDBMovieData, MovieCategories} from '../../services/tmdbapi'

export const fetch_movie_page_start = 'fetch_movie_page_start'
export const fetch_movie_page_success = 'fetch_movie_page_success'
export const fetch_movie_page_error = 'fetch_movie_page_error'

export type CategorySelector = 'popular' | 'current' | 'top'

export interface MovieCategoryData {
  fetching: boolean
  error: string
  movies: ITMDBMovieData[]
  lastPageDownloaded: number
  totalPages: number
}

export interface FetchMoviePageStartPayload {
  category: MovieCategories
}

export interface FetchMoviePageSuccessPayload {
  category: MovieCategories
  movies: ITMDBMovieData[]
  fetchedPage: number
  totalPages: number
}

export interface FetchMoviePageErrorPayload {
  category: MovieCategories
  error: string
}

export interface MovieState {
  current: MovieCategoryData
  popular: MovieCategoryData
  top: MovieCategoryData
  search: Record<string, MovieCategoryData>
}

interface FetchMoviePageStartAction {
  type: typeof fetch_movie_page_start
  payload: FetchMoviePageStartPayload
}

interface FetchMoviePageSuccessAction {
  type: typeof fetch_movie_page_success
  payload: FetchMoviePageSuccessPayload
}

interface FetchMoviePageErrorAction {
  type: typeof fetch_movie_page_error
  payload: FetchMoviePageErrorPayload
}

export type MovieAction =
  | FetchMoviePageStartAction
  | FetchMoviePageSuccessAction
  | FetchMoviePageErrorAction
