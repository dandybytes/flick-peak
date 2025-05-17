export const user_login_start = 'user_login_start'
export const user_login_success = 'user_login_success'
export const user_login_error = 'user_login_error'
export const user_logout = 'user_logout'
export const user_registration_start = 'user_registration_start'
export const user_registration_success = 'user_registration_success'
export const user_registration_error = 'user_registration_error'

export type UserData = {
  id: string
  name: string
  email: string
  token: string
}

export type UserState = {
  data: UserData | null
  login: {
    fetching: boolean
    error: string
  }
  registration: {
    fetching: boolean
    error: string
  }
}

export interface UserRegistrationStartAction {
  type: typeof user_registration_start
}

export interface UserRegistrationSuccessPayload {
  user: UserData
}

export interface UserRegistrationSuccessAction {
  type: typeof user_registration_success
  payload: UserRegistrationSuccessPayload
}

export interface UserRegistrationErrorPayload {
  error: string
}

export interface UserRegistrationErrorAction {
  type: typeof user_registration_error
  payload: UserRegistrationErrorPayload
}

export interface UserLoginStartAction {
  type: typeof user_login_start
}

export interface UserLoginSuccessPayload {
  user: UserData
}

export interface UserLoginSuccessAction {
  type: typeof user_login_success
  payload: UserLoginSuccessPayload
}

export interface UserLoginErrorPayload {
  error: string
}

export interface UserLoginErrorAction {
  type: typeof user_login_error
  payload: UserLoginErrorPayload
}

export interface UserLogoutAction {
  type: typeof user_logout
}

export type UserAction =
  | UserLoginStartAction
  | UserLoginSuccessAction
  | UserLoginErrorAction
  | UserLogoutAction
  | UserRegistrationStartAction
  | UserRegistrationSuccessAction
  | UserRegistrationErrorAction
