import {Dispatch} from 'redux'
import {ITMDBMovieData, ITMDBMovieDetails} from '../../services/tmdbapi'

import {
  AddMovieToFavoritesAction,
  RemoveMovieFromFavoritesAction,
  add_movie_to_favorites,
  remove_movie_from_favorites
} from './favoriteTypes'

export const addMovieToFavorites =
  (movie: ITMDBMovieData | ITMDBMovieDetails) =>
  async (dispatch: Dispatch<AddMovieToFavoritesAction>) => {
    try {
      dispatch({
        type: add_movie_to_favorites,
        payload: {movie}
      })
    } catch (error) {
      console.error(`Adding movie ${movie.id} to favorites has failed:`, error)
    }
  }

export const removeMovieFromFavorites =
  (movieID: number) => async (dispatch: Dispatch<RemoveMovieFromFavoritesAction>) => {
    try {
      dispatch({
        type: remove_movie_from_favorites,
        payload: {id: movieID}
      })
    } catch (error) {
      console.error(`Removing movie ${movieID} from favorites has failed:`, error)
    }
  }
