import {
  FavoriteMovieState,
  FavoriteMovieAction,
  add_movie_to_favorites,
  remove_movie_from_favorites,
  AddMovieToFavoritesActionPayload,
  RemoveMovieFromFavoritesActionPayload
} from './favoriteTypes'

const initialState: FavoriteMovieState = {}

export const favoriteReducer = (
  state = initialState,
  action: FavoriteMovieAction
): FavoriteMovieState => {
  switch (action.type) {
    case add_movie_to_favorites: {
      const {movie} = action.payload as AddMovieToFavoritesActionPayload

      const newState = {...state}
      newState[String(movie.id)] = movie
      return newState
    }

    case remove_movie_from_favorites: {
      const {id} = action.payload as RemoveMovieFromFavoritesActionPayload

      if (state[id] == null) return state
      return Object.entries(state).reduce(
        (acc, [key, value]) => (key === String(id) ? acc : {...acc, [key]: value}),
        {}
      )
    }

    default:
      return state
  }
}
