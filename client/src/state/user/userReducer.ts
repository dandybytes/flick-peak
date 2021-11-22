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
  data: null,
  fetching: false,
  error: ''
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case user_login_start: {
      return {data: null, fetching: true, error: ''}
    }

    case user_login_success: {
      const {user} = action.payload as UserLoginSuccessPayload

      if (user == null) return {data: null, fetching: false, error: ''}
      return {data: user, fetching: false, error: ''}
    }

    case user_login_error: {
      const {error} = action.payload as UserLoginErrorPayload

      return {data: null, fetching: false, error}
    }

    case user_logout: {
      return {data: null, fetching: false, error: ''}
    }

    default:
      return state
  }
}
