import {Dispatch} from 'redux'

import {fetchMovieDetails} from '../../services/tmdbapi'

import {
  MovieDetailAction,
  fetch_movie_by_id_start,
  fetch_movie_by_id_success,
  fetch_movie_by_id_error
} from './movieDetailTypes'

export const fetchMovieById = (id: number) => async (dispatch: Dispatch<MovieDetailAction>) => {
  try {
    dispatch({
      type: fetch_movie_by_id_start,
      payload: {id}
    })

    const response = await fetchMovieDetails(id)
    if (response == null) throw new Error(`fetching details for movie with ID "${id}" failed`)

    dispatch({
      type: fetch_movie_by_id_success,
      payload: {
        id,
        details: response
      }
    })
  } catch (error) {
    let stringError = 'unknown error'
    if (typeof error === 'string') stringError = error
    if (typeof (error as Error)?.message === 'string') stringError = (error as Error)?.message

    dispatch({
      type: fetch_movie_by_id_error,
      payload: {
        id,
        error: stringError
      }
    })
  }
}
