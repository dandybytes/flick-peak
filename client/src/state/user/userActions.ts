import {Dispatch} from 'redux'

import {
  UserAction,
  user_login_start,
  user_login_success,
  user_login_error,
  user_logout
} from './userTypes'
import {NotificationAction, create_notification} from '..'
import {FPResponseError, FPUserLoginResponseData} from '../../services/fpapi'
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
