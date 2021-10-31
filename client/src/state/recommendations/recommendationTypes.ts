import {ITMDBRecommendationMovieData} from '../../services/tmdbapi'

export const fetch_recommendations_by_movie_id_start = 'fetch_recommendations_by_movie_id_start'
export const fetch_recommendations_by_movie_id_success = 'fetch_recommendations_by_movie_id_success'
export const fetch_recommendations_by_movie_id_error = 'fetch_recommendations_by_movie_id_error'

export interface MovieRecommendationData {
  fetching: boolean
  error: string
  recommendations: ITMDBRecommendationMovieData[] | null
  lastFetchedPage: number
  totalPages: number
}

export type MovieRecommendationState = Record<string, MovieRecommendationData>

export interface FetchRecommendationsByMovieIdStartPayload {
  id: number
}

interface FetchRecommendationByMovieIdStartAction {
  type: typeof fetch_recommendations_by_movie_id_start
  payload: FetchRecommendationsByMovieIdStartPayload
}

export interface FetchRecommendationByMovieIdSuccessPayload {
  id: number
  recommendations: ITMDBRecommendationMovieData[]
  fetchedPage: number
  totalPages: number
}

interface FetchRecommendationByMovieIdSuccessAction {
  type: typeof fetch_recommendations_by_movie_id_success
  payload: FetchRecommendationByMovieIdSuccessPayload
}

export interface FetchRecommendationByMovieIdErrorPayload {
  id: number
  error: string
}

interface FetchRecommendationByMovieIdErrorAction {
  type: typeof fetch_recommendations_by_movie_id_error
  payload: FetchRecommendationByMovieIdErrorPayload
}

export type MovieRecommendationAction =
  | FetchRecommendationByMovieIdStartAction
  | FetchRecommendationByMovieIdSuccessAction
  | FetchRecommendationByMovieIdErrorAction
