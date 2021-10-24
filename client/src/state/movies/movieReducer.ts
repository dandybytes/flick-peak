import {getCategorySelector} from './movieUtils'

import {
  MovieAction,
  MovieCategoryData,
  FetchMoviePageStartPayload,
  FetchMoviePageSuccessPayload,
  FetchMoviePageErrorPayload,
  MovieState,
  fetch_movie_page_start,
  fetch_movie_page_success,
  fetch_movie_page_error
} from './movieTypes'

const initialCategoryState: MovieCategoryData = {
  fetching: false,
  error: '',
  movies: [],
  lastPageDownloaded: 0,
  totalPages: 0
}

const initialState: MovieState = {
  current: initialCategoryState,
  popular: initialCategoryState,
  top: initialCategoryState,
  search: {} as Record<string, MovieCategoryData>
}

export const movieReducer = (state = initialState, action: MovieAction): MovieState => {
  switch (action.type) {
    case fetch_movie_page_start: {
      const {category} = action.payload as FetchMoviePageStartPayload
      const categorySelector = getCategorySelector(category)

      return {
        ...state,
        [categorySelector]: {
          ...state[categorySelector],
          fetching: true,
          error: ''
        }
      }
    }

    case fetch_movie_page_success: {
      const {
        category,
        movies: newMovies,
        fetchedPage,
        totalPages
      } = action.payload as FetchMoviePageSuccessPayload
      const categorySelector = getCategorySelector(category)
      const {movies: previousMovies, lastPageDownloaded} = state[categorySelector]

      // catch cases when fetched movie lists are empty
      if (!newMovies?.length) {
        return {
          ...state,
          [categorySelector]: {
            ...state[categorySelector],
            fetching: false,
            error: `${category} movie page ${fetchedPage} returned no movies`
          }
        }
      }

      // prevent duplication by adding the same page of movies repeatedly
      if (fetchedPage <= lastPageDownloaded) {
        return {
          ...state,
          [categorySelector]: {
            ...state[categorySelector],
            fetching: false,
            error: `fetched ${category} movie page ${fetchedPage} has already been added to the list of movies`
          }
        }
      }

      return {
        ...state,
        [categorySelector]: {
          ...state[categorySelector],
          fetching: false,
          error: '',
          movies: [...previousMovies, ...newMovies],
          lastPageDownloaded: fetchedPage,
          totalPages: totalPages
        }
      }
    }

    case fetch_movie_page_error: {
      const {category, error} = action.payload as FetchMoviePageErrorPayload
      const categorySelector = getCategorySelector(category)

      return {
        ...state,
        [categorySelector]: {
          ...state[categorySelector],
          fetching: false,
          error: JSON.stringify(error)
        }
      }
    }

    default:
      return state
  }
}
