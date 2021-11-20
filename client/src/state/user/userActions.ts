import {Dispatch} from 'redux'

import {
  UserData,
  UserAction,
  user_login_start,
  user_login_success,
  user_login_error,
  user_logout
} from './userTypes'

export const logUserIn =
  (email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
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
      const data: UserData = await response.json()

      dispatch({type: user_login_success, payload: {user: data}})
    } catch (error: any) {
      const errorMessage =
        typeof error?.response?.data?.message === 'string'
          ? error.response.data.message
          : typeof error?.message === 'string'
          ? error.message
          : typeof error === 'string'
          ? error
          : 'Unknown user login error'

      dispatch({
        type: user_login_error,
        payload: {error: errorMessage}
      })
    }
  }

export const logUserOut = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({type: user_logout})
}
