import {Dispatch} from 'redux'

import {fetchPopularMovies} from '../../services/tmdbapi'

import {
  MovieAction,
  fetch_movie_page_start,
  fetch_movie_page_success,
  fetch_movie_page_error
} from './movieTypes'

export const fetchMoviePage = (pageNum?: number) => async (dispatch: Dispatch<MovieAction>) => {
  try {
    dispatch({
      type: fetch_movie_page_start
    })

    const response = await fetchPopularMovies(pageNum ?? 1)
    if (response == null) throw new Error('fetching popular music failed')

    const {page, results, total_pages} = response

    dispatch({
      type: fetch_movie_page_success,
      payload: {
        movies: results,
        fetchedPage: page,
        totalPages: total_pages
      }
    })
  } catch (error) {
    let stringError = 'unknown error'
    if (typeof error === 'string') stringError = error
    if (typeof (error as Error)?.message === 'string') stringError = (error as Error)?.message

    dispatch({
      type: fetch_movie_page_error,
      payload: stringError
    })
  }
}
