import {getCategorySelector} from './movieListUtils'

import {
  MovieAction,
  MovieCategoryData,
  FetchMoviePageStartPayload,
  FetchMoviePageSuccessPayload,
  FetchMoviePageErrorPayload,
  FetchMovieByKeywordStartPayload,
  FetchMovieByKeywordSuccessPayload,
  FetchMovieByKeywordErrorPayload,
  MovieState,
  fetch_movie_page_start,
  fetch_movie_page_success,
  fetch_movie_page_error,
  fetch_movies_by_keyword_start,
  fetch_movies_by_keyword_success,
  fetch_movies_by_keyword_error
} from './movieListTypes'

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

export const movieListReducer = (state = initialState, action: MovieAction): MovieState => {
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
            fetching: false
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

    case fetch_movies_by_keyword_start: {
      const {query} = action.payload as FetchMovieByKeywordStartPayload

      const newState = {...state}
      if (!newState.search[query]) newState.search[query] = {...initialCategoryState}

      newState.search[query] = {...newState.search[query], fetching: true, error: ''}

      return newState
    }

    case fetch_movies_by_keyword_success: {
      const {
        query,
        movies: newMovies,
        fetchedPage,
        totalPages
      } = action.payload as FetchMovieByKeywordSuccessPayload

      const newState = {...state}
      if (!newState.search[query]) newState.search[query] = {...initialCategoryState}
      const lastPageDownloaded = state.search[query].lastPageDownloaded

      // catch cases when fetched movie lists are empty
      if (!newMovies?.length) {
        newState.search[query] = {
          ...newState.search[query],
          fetching: false,
          error: `the movie search for keyword "${query}" returned no movies`
        }

        return newState
      }

      // prevent duplication by adding the same page of movies repeatedly
      if (fetchedPage <= lastPageDownloaded) {
        newState.search[query] = {
          ...newState.search[query],
          fetching: false
        }

        return newState
      }

      newState.search[query] = {
        ...newState.search[query],
        fetching: false,
        error: '',
        movies: [...state.search[query].movies, ...newMovies],
        lastPageDownloaded: fetchedPage,
        totalPages: totalPages
      }

      return newState
    }

    case fetch_movies_by_keyword_error: {
      const {query, error} = action.payload as FetchMovieByKeywordErrorPayload

      const newState = {...state}
      if (!newState.search[query]) newState.search[query] = {...initialCategoryState}

      newState.search[query] = {
        ...newState.search[query],
        fetching: false,
        error: JSON.stringify(error)
      }

      return newState
    }

    default:
      return state
  }
}
