import {Dispatch} from 'redux'

import {
  fetchMoviesByKeyword,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  ITMDBMovieListResponse,
  MovieCategories,
  movieCategoryList
} from '../../services/tmdbapi'

import {
  MovieAction,
  fetch_movie_page_start,
  fetch_movie_page_success,
  fetch_movie_page_error,
  fetch_movies_by_keyword_start,
  fetch_movies_by_keyword_success,
  fetch_movies_by_keyword_error
} from './movieListTypes'

export const fetchMoviePageByCategory =
  (category: MovieCategories | '', pageNum?: number) => async (dispatch: Dispatch<MovieAction>) => {
    const validatedCategory = movieCategoryList.includes(category as MovieCategories)
      ? category
      : 'now-playing'

    try {
      dispatch({
        type: fetch_movie_page_start,
        payload: {
          category: validatedCategory as MovieCategories
        }
      })

      // fetch 'now-playing' movies by default, if invalid category provided
      let fetchMovieFn: (pageNum?: number) => Promise<ITMDBMovieListResponse> =
        fetchNowPlayingMovies
      if (category === 'top-rated') fetchMovieFn = fetchTopRatedMovies
      if (category === 'popular') fetchMovieFn = fetchPopularMovies

      const response = await fetchMovieFn(pageNum ?? 1)
      if (response == null)
        throw new Error(`fetching movie page content for category "${category}" failed`)
      const {page, results, total_pages} = response

      dispatch({
        type: fetch_movie_page_success,
        payload: {
          category: validatedCategory as MovieCategories,
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
        payload: {
          category: validatedCategory as MovieCategories,
          error: stringError
        }
      })
    }
  }

export const fetchMoviePageByKeyword =
  (searchQuery: string, pageNum?: number) => async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: fetch_movies_by_keyword_start,
        payload: {
          query: searchQuery
        }
      })

      const response = await fetchMoviesByKeyword(searchQuery, pageNum ?? 1)
      if (response == null)
        throw new Error(`fetching movie page content for keyword(s) "${searchQuery}" failed`)
      const {page, results, total_pages} = response

      dispatch({
        type: fetch_movies_by_keyword_success,
        payload: {
          query: searchQuery,
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
        type: fetch_movies_by_keyword_error,
        payload: {
          query: searchQuery,
          error: stringError
        }
      })
    }
  }
