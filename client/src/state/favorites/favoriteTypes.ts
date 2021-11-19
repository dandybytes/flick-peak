import {ITMDBMovieData, ITMDBMovieDetails} from '../../services/tmdbapi'

export const add_movie_to_favorites = 'add_movie_to_favorites'
export const remove_movie_from_favorites = 'remove_movie_from_favorites'

export type FavoriteMovieState = Record<string, ITMDBMovieData | ITMDBMovieDetails>

export interface AddMovieToFavoritesActionPayload {
  movie: ITMDBMovieData | ITMDBMovieDetails
}

export interface AddMovieToFavoritesAction {
  type: typeof add_movie_to_favorites
  payload: AddMovieToFavoritesActionPayload
}

export interface RemoveMovieFromFavoritesActionPayload {
  id: number
}

export interface RemoveMovieFromFavoritesAction {
  type: typeof remove_movie_from_favorites
  payload: RemoveMovieFromFavoritesActionPayload
}

export type FavoriteMovieAction = AddMovieToFavoritesAction | RemoveMovieFromFavoritesAction
