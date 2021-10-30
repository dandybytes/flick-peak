import {
  MovieDetailState,
  MovieDetailAction,
  fetch_movie_by_id_start,
  fetch_movie_by_id_success,
  fetch_movie_by_id_error,
  FetchMovieByIdStartPayload,
  FetchMovieByIdSuccessPayload,
  FetchMovieByIdErrorPayload
} from './movieDetailTypes'

const initialState: MovieDetailState = {}

export const movieDetailReducer = (
  state = initialState,
  action: MovieDetailAction
): MovieDetailState => {
  switch (action.type) {
    case fetch_movie_by_id_start: {
      const {id} = action.payload as FetchMovieByIdStartPayload

      // if (state[id].details != null) return state

      const newState = {...state}
      newState[id] = {fetching: true, error: '', details: null}
      return newState
    }

    case fetch_movie_by_id_success: {
      const {id, details} = action.payload as FetchMovieByIdSuccessPayload

      // if (state[id].details != null) return state

      const newState = {...state}

      // catch cases when fetched movie details are empty
      if (details == null) {
        newState[id] = {
          fetching: false,
          error: `fetching details for the movie with ID "${id}" returned no data`,
          details: null
        }

        return newState
      }

      newState[id] = {fetching: false, error: '', details}
      return newState
    }

    case fetch_movie_by_id_error: {
      const {id, error} = action.payload as FetchMovieByIdErrorPayload

      const newState = {...state}
      newState[id] = {
        fetching: false,
        error: JSON.stringify(error),
        details: null
      }

      return newState
    }

    default:
      return state
  }
}
