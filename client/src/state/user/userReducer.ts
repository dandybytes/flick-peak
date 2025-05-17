import {
  UserState,
  UserAction,
  user_registration_start,
  user_registration_success,
  user_registration_error,
  user_login_start,
  user_login_success,
  user_login_error,
  user_logout,
  UserLoginSuccessPayload,
  UserLoginErrorPayload,
  UserRegistrationSuccessPayload,
  UserRegistrationErrorPayload
} from './userTypes'

const initialState: UserState = {
  data: null,
  login: {
    fetching: false,
    error: ''
  },
  registration: {
    fetching: false,
    error: ''
  }
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case user_registration_start: {
      return {...state, data: null, registration: {fetching: true, error: ''}}
    }

    case user_registration_success: {
      const {user} = action.payload as UserRegistrationSuccessPayload

      return {...state, data: user, registration: {fetching: false, error: ''}}
    }

    case user_registration_error: {
      const {error} = action.payload as UserRegistrationErrorPayload

      return {...state, data: null, registration: {fetching: false, error}}
    }

    case user_login_start: {
      return {...state, data: null, login: {fetching: true, error: ''}}
    }

    case user_login_success: {
      const {user} = action.payload as UserLoginSuccessPayload

      return {...state, data: user, login: {fetching: false, error: ''}}
    }

    case user_login_error: {
      const {error} = action.payload as UserLoginErrorPayload

      return {...state, data: null, login: {fetching: false, error}}
    }

    case user_logout: {
      return {...initialState}
    }

    default:
      return state
  }
}
