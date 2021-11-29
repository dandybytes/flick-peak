import {
  FavoriteMovieState,
  FavoriteMovieAction,
  set_favorite_movie_list,
  fetch_favorite_movie_list_start,
  fetch_favorite_movie_list_success,
  fetch_favorite_movie_list_error,
  SetFavoriteMovieListPayload,
  FetchFavoriteMovieListErrorPayload,
  FetchFavoriteMovieListSuccessPayload
} from './favoriteTypes'

const initialState: FavoriteMovieState = {
  fetching: false,
  error: '',
  data: []
}

export const favoriteReducer = (
  state = initialState,
  action: FavoriteMovieAction
): FavoriteMovieState => {
  switch (action.type) {
    case set_favorite_movie_list: {
      const {data} = action.payload as SetFavoriteMovieListPayload
      return {...state, data, error: '', fetching: false}
    }

    case fetch_favorite_movie_list_start: {
      return {...state, fetching: true, error: ''}
    }

    case fetch_favorite_movie_list_success: {
      const {data} = action.payload as FetchFavoriteMovieListSuccessPayload
      return {fetching: false, error: '', data}
    }

    case fetch_favorite_movie_list_error: {
      const {error} = action.payload as FetchFavoriteMovieListErrorPayload
      return {...state, fetching: false, error}
    }

    default:
      return state
  }
}
