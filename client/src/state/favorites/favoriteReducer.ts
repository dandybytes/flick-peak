import {
  FavoriteMovieState,
  FavoriteMovieAction,
  set_favorite_movie_list,
  add_movie_to_favorites,
  remove_movie_from_favorites,
  fetch_favorite_movie_list_start,
  fetch_favorite_movie_list_success,
  fetch_favorite_movie_list_error,
  SetFavoriteMovieListPayload,
  AddMovieToFavoritesActionPayload,
  RemoveMovieFromFavoritesActionPayload,
  FetchFavoriteMovieListErrorPayload,
  FetchFavoriteMovieListSuccessPayload
} from './favoriteTypes'

const initialState: FavoriteMovieState = {
  fetching: false,
  error: '',
  data: null
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

    case add_movie_to_favorites: {
      const {id} = action.payload as AddMovieToFavoritesActionPayload
      return {...state, data: [...(state.data ?? []), id]}
    }

    case remove_movie_from_favorites: {
      const {id} = action.payload as RemoveMovieFromFavoritesActionPayload
      if (!(state.data ?? []).includes(id)) return state
      return {...state, data: (state.data ?? []).filter(movieID => movieID !== id)}
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
