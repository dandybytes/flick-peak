import {ITMDBMovieData, MovieCategory} from '../../services/tmdbapi'

export const fetch_movie_page_start = 'fetch_movie_page_start'
export const fetch_movie_page_success = 'fetch_movie_page_success'
export const fetch_movie_page_error = 'fetch_movie_page_error'

export const fetch_movies_by_keyword_start = 'fetch_movies_by_keyword_start'
export const fetch_movies_by_keyword_success = 'fetch_movies_by_keyword_success'
export const fetch_movies_by_keyword_error = 'fetch_movies_by_keyword_error'

export type CategorySelector = 'popular' | 'current' | 'top'

export interface MovieCategoryData {
  fetching: boolean
  error: string
  movies: ITMDBMovieData[]
  lastPageDownloaded: number
  totalPages: number
}

export interface MovieState {
  ['current']: MovieCategoryData
  ['popular']: MovieCategoryData
  ['top']: MovieCategoryData
  search: Record<string, MovieCategoryData>
}

export interface FetchMoviePageStartPayload {
  category: MovieCategory
}

interface FetchMoviePageStartAction {
  type: typeof fetch_movie_page_start
  payload: FetchMoviePageStartPayload
}

export interface FetchMoviePageSuccessPayload {
  category: MovieCategory
  movies: ITMDBMovieData[]
  fetchedPage: number
  totalPages: number
}

interface FetchMoviePageSuccessAction {
  type: typeof fetch_movie_page_success
  payload: FetchMoviePageSuccessPayload
}

export interface FetchMoviePageErrorPayload {
  category: MovieCategory
  error: string
}

interface FetchMoviePageErrorAction {
  type: typeof fetch_movie_page_error
  payload: FetchMoviePageErrorPayload
}

export interface FetchMovieByKeywordStartPayload {
  query: string
}

interface FetchMovieByKeywordStartAction {
  type: typeof fetch_movies_by_keyword_start
  payload: FetchMovieByKeywordStartPayload
}

export interface FetchMovieByKeywordSuccessPayload {
  query: string
  movies: ITMDBMovieData[]
  fetchedPage: number
  totalPages: number
}

interface FetchMovieByKeywordSuccessAction {
  type: typeof fetch_movies_by_keyword_success
  payload: FetchMovieByKeywordSuccessPayload
}

export interface FetchMovieByKeywordErrorPayload {
  query: string
  error: string
}

interface FetchMovieByKeywordErrorAction {
  type: typeof fetch_movies_by_keyword_error
  payload: FetchMovieByKeywordErrorPayload
}

export type MovieAction =
  | FetchMoviePageStartAction
  | FetchMoviePageSuccessAction
  | FetchMoviePageErrorAction
  | FetchMovieByKeywordStartAction
  | FetchMovieByKeywordSuccessAction
  | FetchMovieByKeywordErrorAction
