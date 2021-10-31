import {Dispatch} from 'redux'

import {fetchMovieRecommendations} from '../../services/tmdbapi'

import {
  MovieRecommendationAction,
  fetch_recommendations_by_movie_id_start,
  fetch_recommendations_by_movie_id_success,
  fetch_recommendations_by_movie_id_error
} from './recommendationTypes'

export const fetchRecommendationsByMovieId =
  (movieId: number, pageNum?: number) => async (dispatch: Dispatch<MovieRecommendationAction>) => {
    const pageNumber = pageNum ?? 1
    try {
      dispatch({
        type: fetch_recommendations_by_movie_id_start,
        payload: {id: movieId}
      })

      const response = await fetchMovieRecommendations(movieId, pageNumber)
      if (response == null)
        throw new Error(
          `fetching page ${pageNumber} of recommendations for the movie with ID ${movieId} has failed`
        )
      const {page, results, total_pages} = response
      if (page == null || results == null || total_pages == null)
        throw new Error(
          `invalid format of response received when fetching recommendations for the movie with ID ${movieId}`
        )

      dispatch({
        type: fetch_recommendations_by_movie_id_success,
        payload: {
          id: movieId,
          recommendations: results,
          fetchedPage: page,
          totalPages: total_pages
        }
      })
    } catch (error) {
      let stringError = 'unknown error'
      if (typeof error === 'string') stringError = error
      if (typeof (error as Error)?.message === 'string') stringError = (error as Error)?.message

      dispatch({
        type: fetch_recommendations_by_movie_id_error,
        payload: {
          id: movieId,
          error: stringError
        }
      })
    }
  }
