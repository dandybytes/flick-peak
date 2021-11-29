import {Dispatch} from 'redux'

import {FPFavoritesResponseData, FPResponseError} from '../../services/fpapi'

import {NotificationAction, create_notification} from '..'

import {
  FavoriteMovieAction,
  fetch_favorite_movie_list_start,
  fetch_favorite_movie_list_success,
  fetch_favorite_movie_list_error,
  set_favorite_movie_list
} from './favoriteTypes'
import {getErrorObjectMessage} from '../../utils'

export const fetchFavoriteMovies =
  (token: string) => async (dispatch: Dispatch<FavoriteMovieAction | NotificationAction>) => {
    try {
      dispatch({type: fetch_favorite_movie_list_start})

      const response = await fetch('/api/favorites', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const parsedResponse: FPResponseError = await response.json()
        const errorMessage = parsedResponse?.message
          ? getErrorObjectMessage(parsedResponse.message, 'Fetching favorite movies failed.')
          : response.statusText

        dispatch({
          type: fetch_favorite_movie_list_error,
          payload: {error: errorMessage}
        })

        dispatch({
          type: create_notification,
          payload: {message: errorMessage, type: 'error', lifeSpan: 10000}
        })

        return
      }

      const parsedResponse: FPFavoritesResponseData = await response.json()
      if (parsedResponse == null) throw new Error(`Fetching favorite movies failed.`)
      const {favorites} = parsedResponse

      dispatch({
        type: fetch_favorite_movie_list_success,
        payload: {data: favorites}
      })
    } catch (error) {
      const errorMessage = getErrorObjectMessage(error, 'Favorite movie fetch error.')

      dispatch({
        type: fetch_favorite_movie_list_error,
        payload: {error: errorMessage}
      })

      dispatch({
        type: create_notification,
        payload: {message: errorMessage, type: 'error', lifeSpan: 10000}
      })
    }
  }

export const addMovieToFavorites =
  (id: string, token: string) =>
  async (dispatch: Dispatch<FavoriteMovieAction | NotificationAction>) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({movieId: id})
      })

      if (!response.ok) {
        const parsedResponse: FPResponseError = await response.json()
        const errorMessage = parsedResponse?.message
          ? getErrorObjectMessage(
              parsedResponse.message,
              `Adding movie ${id} to favorites has failed.`
            )
          : response.statusText

        dispatch({
          type: create_notification,
          payload: {message: errorMessage, type: 'error', lifeSpan: 10000}
        })

        return
      }

      const parsedResponse: FPFavoritesResponseData = await response.json()
      if (parsedResponse == null) throw new Error(`Adding movie ${id} to favorites has failed.`)

      const {favorites} = parsedResponse
      if (favorites?.length) {
        dispatch({
          type: set_favorite_movie_list,
          payload: {data: favorites}
        })
      }
    } catch (error) {
      const errorMessage = getErrorObjectMessage(
        error,
        `Adding movie ${id} to favorites has failed.`
      )

      dispatch({
        type: create_notification,
        payload: {message: errorMessage, type: 'error', lifeSpan: 15000}
      })
    }
  }

export const removeMovieFromFavorites =
  (id: string, token: string) =>
  async (dispatch: Dispatch<FavoriteMovieAction | NotificationAction>) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({movieId: id})
      })

      if (!response.ok) {
        const parsedResponse: FPResponseError = await response.json()
        const errorMessage = parsedResponse?.message
          ? getErrorObjectMessage(
              parsedResponse.message,
              `Removing movie ${id} from favorites has failed.`
            )
          : response.statusText

        dispatch({
          type: create_notification,
          payload: {message: errorMessage, type: 'error', lifeSpan: 10000}
        })

        return
      }

      const parsedResponse: FPFavoritesResponseData = await response.json()
      if (parsedResponse == null) throw new Error(`Removing movie ${id} from favorites has failed.`)

      const {favorites} = parsedResponse
      if (favorites == null) return

      dispatch({
        type: set_favorite_movie_list,
        payload: {data: favorites}
      })
    } catch (error) {
      const errorMessage = getErrorObjectMessage(
        error,
        `Removing movie ${id} from favorites has failed.`
      )

      dispatch({
        type: create_notification,
        payload: {message: errorMessage, type: 'error', lifeSpan: 15000}
      })
    }
  }
