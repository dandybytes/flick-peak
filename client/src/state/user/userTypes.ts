export const user_login_start = 'user_login_start'
export const user_login_success = 'user_login_success'
export const user_login_error = 'user_login_error'
export const user_logout = 'user_logout'

export type UserData = {
  name: string
  email: string
  isAdmin: boolean
}

export type UserState = {
  user: UserData | null
  fetching: boolean
  error: string
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
