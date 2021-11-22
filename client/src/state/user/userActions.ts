import {Dispatch} from 'redux'

import {
  UserData,
  UserAction,
  user_login_start,
  user_login_success,
  user_login_error,
  user_logout
} from './userTypes'
import {NotificationAction, create_notification} from '..'
import {FPResponseError} from '../../services/fpapi'
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
        const data: FPResponseError = await response.json()
        // console.error(`Error ${response.status} (${response.statusText}): ${data?.message}`)
        throw new Error(data?.message ? data.message : response.statusText)
      }

      const data: UserData = await response.json()
      dispatch({type: user_login_success, payload: {user: data}})
    } catch (error: any) {
      const errorMessage = getErrorObjectMessage(error, 'Unknown user login error')

      dispatch({
        type: user_login_error,
        payload: {error: errorMessage}
      })

      dispatch({
        type: create_notification,
        payload: {message: errorMessage, type: 'error', lifeSpan: 10000}
      })
    }
  }

export const logUserOut = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({type: user_logout})
}
