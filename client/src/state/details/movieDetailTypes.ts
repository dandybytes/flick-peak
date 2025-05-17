import {ITMDBMovieDetails} from '../../services/tmdbapi'

export const fetch_movie_by_id_start = 'fetch_movie_by_id_start'
export const fetch_movie_by_id_success = 'fetch_movie_by_id_success'
export const fetch_movie_by_id_error = 'fetch_movie_by_id_error'

export interface MovieDetailData {
  fetching: boolean
  error: string
  details: ITMDBMovieDetails | null
}

export type MovieDetailState = Record<string, MovieDetailData>

export interface FetchMovieByIdStartPayload {
  id: number
}

interface FetchMovieByIdStartAction {
  type: typeof fetch_movie_by_id_start
  payload: FetchMovieByIdStartPayload
}

export interface FetchMovieByIdSuccessPayload {
  id: number
  details: ITMDBMovieDetails
}

interface FetchMovieByIdSuccessAction {
  type: typeof fetch_movie_by_id_success
  payload: FetchMovieByIdSuccessPayload
}

export interface FetchMovieByIdErrorPayload {
  id: number
  error: string
}

interface FetchMovieByIdErrorAction {
  type: typeof fetch_movie_by_id_error
  payload: FetchMovieByIdErrorPayload
}

export type MovieDetailAction =
  | FetchMovieByIdStartAction
  | FetchMovieByIdSuccessAction
  | FetchMovieByIdErrorAction
