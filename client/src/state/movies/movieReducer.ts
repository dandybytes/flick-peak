import {
  MovieAction,
  MovieCategoryData,
  MoviePagePayload,
  MovieState,
  fetch_movie_page_start,
  fetch_movie_page_success,
  fetch_movie_page_error
} from './movieTypes'

const initialState: MovieState = {
  fetching: false,
  error: '',
  movies: [],
  lastPageDownloaded: 0,
  totalPages: 0,
  current: {
    movies: [],
    lastPageDownloaded: 0,
    totalPages: 0
  },
  popular: {
    movies: [],
    lastPageDownloaded: 0,
    totalPages: 0
  },
  top: {
    movies: [],
    lastPageDownloaded: 0,
    totalPages: 0
  },
  search: {} as Record<string, MovieCategoryData>
}

export const movieReducer = (state = initialState, action: MovieAction): MovieState => {
  switch (action.type) {
    case fetch_movie_page_start: {
      return {
        ...state,
        fetching: true,
        error: ''
      }
    }

    case fetch_movie_page_success: {
      const {movies: previousMovies, lastPageDownloaded} = state
      const {movies: newMovies, fetchedPage, totalPages} = action.payload as MoviePagePayload

      // prevent duplication by adding the same page of movies repeatedly
      if (!newMovies?.length || fetchedPage <= lastPageDownloaded) {
        console.error(
          `fetched page ${fetchedPage}, which has already been added to the list of movies`
        )

        return {
          ...state,
          fetching: false,
          error: `fetched page ${fetchedPage}, which has already been added to the list of movies`
        }
      }

      return {
        ...state,
        fetching: false,
        error: '',
        movies: [...previousMovies, ...newMovies],
        lastPageDownloaded: fetchedPage,
        totalPages: totalPages
      }
    }

    case fetch_movie_page_error: {
      return {
        ...state,
        fetching: false,
        error: JSON.stringify(action.payload)
      }
    }

    default:
      return state
  }
}
