import {Dispatch} from 'redux'

import {
  UserAction,
  user_registration_start,
  user_registration_success,
  user_registration_error,
  user_login_start,
  user_login_success,
  user_login_error,
  user_logout
} from './userTypes'
import {NotificationAction, create_notification} from '..'
import {
  FPResponseError,
  FPUserLoginResponseData,
  FPUserRegistrationResponseData
} from '../../services/fpapi'
import {getErrorObjectMessage} from '../../utils'

export const logUserIn =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction | NotificationAction>) => {
    try {
      dispatch({type: user_login_start})

      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      if (!response.ok) {
        const parsedResponse: FPResponseError = await response.json()
        const errorMessage = parsedResponse?.message
          ? getErrorObjectMessage(parsedResponse.message, 'User login error')
          : response.statusText

        dispatch({
          type: user_login_error,
          payload: {error: errorMessage}
        })

        dispatch({
          type: create_notification,
          payload: {message: errorMessage, type: 'error', lifeSpan: 15000}
        })

        return
      }

      const parsedResponse: FPUserLoginResponseData = await response.json()
      dispatch({type: user_login_success, payload: {user: parsedResponse?.user}})
    } catch (error: any) {
      const errorMessage = getErrorObjectMessage(error, 'User login error')

      dispatch({
        type: user_login_error,
        payload: {error: errorMessage}
      })

      dispatch({
        type: create_notification,
        payload: {message: errorMessage, type: 'error', lifeSpan: 15000}
      })
    }
  }

export const logUserOut = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({type: user_logout})
}

export const registerUser =
  (email: string, password: string, name: string) =>
  async (dispatch: Dispatch<UserAction | NotificationAction>) => {
    try {
      dispatch({type: user_registration_start})

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name})
      })

      if (!response.ok) {
        const parsedResponse: FPResponseError = await response.json()
        const errorMessage = parsedResponse?.message
          ? getErrorObjectMessage(parsedResponse.message, 'User registration error')
          : response.statusText

        dispatch({
          type: user_registration_error,
          payload: {error: errorMessage}
        })

        dispatch({
          type: create_notification,
          payload: {message: errorMessage, type: 'error', lifeSpan: 15000}
        })

        return
      }

      const parsedResponse: FPUserRegistrationResponseData = await response.json()
      dispatch({type: user_registration_success, payload: {user: parsedResponse?.user}})
    } catch (error: any) {
      const errorMessage = getErrorObjectMessage(error, 'User registration error')

      dispatch({
        type: user_registration_error,
        payload: {error: errorMessage}
      })

      dispatch({
        type: create_notification,
        payload: {message: errorMessage, type: 'error', lifeSpan: 15000}
      })
    }
  }
