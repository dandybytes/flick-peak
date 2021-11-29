export const set_favorite_movie_list = 'set_favorite_movie_list'
export const fetch_favorite_movie_list_start = 'fetch_favorite_movie_list_start'
export const fetch_favorite_movie_list_success = 'fetch_favorite_movie_list_success'
export const fetch_favorite_movie_list_error = 'fetch_favorite_movie_list_error'
export const add_movie_to_favorites = 'add_movie_to_favorites'
export const remove_movie_from_favorites = 'remove_movie_from_favorites'

export type FavoriteMovieState = {
  fetching: boolean
  error: string
  data: string[]
}

export interface SetFavoriteMovieListPayload {
  data: string[]
}

interface SetFavoriteMovieListAction {
  type: typeof set_favorite_movie_list
  payload: FetchFavoriteMovieListSuccessPayload
}

interface FetchFavoriteMovieListStartAction {
  type: typeof fetch_favorite_movie_list_start
}

export interface FetchFavoriteMovieListSuccessPayload {
  data: string[]
}

interface FetchFavoriteMovieListSuccessAction {
  type: typeof fetch_favorite_movie_list_success
  payload: FetchFavoriteMovieListSuccessPayload
}

export interface FetchFavoriteMovieListErrorPayload {
  error: string
}

interface FetchFavoriteMovieListErrorAction {
  type: typeof fetch_favorite_movie_list_error
  payload: FetchFavoriteMovieListErrorPayload
}

export interface AddMovieToFavoritesActionPayload {
  id: string
}

export interface AddMovieToFavoritesAction {
  type: typeof add_movie_to_favorites
  payload: AddMovieToFavoritesActionPayload
}

export interface RemoveMovieFromFavoritesActionPayload {
  id: string
}

export interface RemoveMovieFromFavoritesAction {
  type: typeof remove_movie_from_favorites
  payload: RemoveMovieFromFavoritesActionPayload
}

export type FavoriteMovieAction =
  | SetFavoriteMovieListAction
  | FetchFavoriteMovieListStartAction
  | FetchFavoriteMovieListSuccessAction
  | FetchFavoriteMovieListErrorAction
  | AddMovieToFavoritesAction
  | RemoveMovieFromFavoritesAction
