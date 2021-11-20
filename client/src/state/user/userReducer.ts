import {
  UserState,
  UserAction,
  user_login_start,
  user_login_success,
  user_login_error,
  user_logout,
  UserLoginSuccessPayload,
  UserLoginErrorPayload
} from './userTypes'

const initialState: UserState = {
  user: null,
  fetching: false,
  error: ''
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case user_login_start: {
      return {user: null, fetching: true, error: ''}
    }

    case user_login_success: {
      const {user} = action.payload as UserLoginSuccessPayload

      if (user == null) return {user: null, fetching: false, error: ''}
      return {user, fetching: false, error: ''}
    }

    case user_login_error: {
      const {error} = action.payload as UserLoginErrorPayload

      return {user: null, fetching: false, error}
    }

    case user_logout: {
      return {user: null, fetching: false, error: ''}
    }

    default:
      return state
  }
}
