import {
  MovieRecommendationData,
  MovieRecommendationState,
  MovieRecommendationAction,
  fetch_recommendations_by_movie_id_start,
  fetch_recommendations_by_movie_id_success,
  fetch_recommendations_by_movie_id_error,
  FetchRecommendationsByMovieIdStartPayload,
  FetchRecommendationByMovieIdSuccessPayload,
  FetchRecommendationByMovieIdErrorPayload
} from './recommendationTypes'

const initialRecommendationData: MovieRecommendationData = {
  fetching: false,
  error: '',
  recommendations: null,
  lastFetchedPage: 0,
  totalPages: 0
}

const initialState: MovieRecommendationState = {}

export const movieRecommendationReducer = (
  state = initialState,
  action: MovieRecommendationAction
): MovieRecommendationState => {
  switch (action.type) {
    case fetch_recommendations_by_movie_id_start: {
      const {id} = action.payload as FetchRecommendationsByMovieIdStartPayload

      const newState = {...state}
      if (newState[id] == null) newState[id] = {...initialRecommendationData}
      newState[id] = {...newState[id], fetching: true, error: '', recommendations: null}
      return newState
    }

    case fetch_recommendations_by_movie_id_success: {
      const {id, recommendations, fetchedPage, totalPages} =
        action.payload as FetchRecommendationByMovieIdSuccessPayload

      const newState = {...state}
      if (newState[id] == null) newState[id] = {...initialRecommendationData}

      // catch cases when fetched movie recommendation lists are empty
      if (recommendations == null) {
        newState[id] = {
          ...newState[id],
          fetching: false,
          error: `fetching recommendations for the movie with ID "${id}" returned no data`
        }
        return newState
      }

      // prevent duplication by adding the same page of recommendations repeatedly
      if (fetchedPage <= state?.[id]?.lastFetchedPage) {
        console.error(
          `page ${fetchedPage} of recommendations for movie ${id} is already stored in state`
        )
        newState[id] = {
          ...newState[id],
          fetching: false
        }
        return newState
      }

      newState[id] = {
        fetching: false,
        error: '',
        recommendations,
        lastFetchedPage: fetchedPage,
        totalPages
      }
      return newState
    }

    case fetch_recommendations_by_movie_id_error: {
      const {id, error} = action.payload as FetchRecommendationByMovieIdErrorPayload

      const newState = {...state}
      if (newState[id] == null) newState[id] = {...initialRecommendationData}
      newState[id] = {
        ...newState[id],
        fetching: false,
        error: JSON.stringify(error)
      }

      return newState
    }

    default:
      return state
  }
}
