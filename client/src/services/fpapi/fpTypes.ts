export type FPResponseError = {
  success: boolean
  message: string
}

export type FPUserData = {
  id: string
  name: string
  email: string
  token: string
}

export type FPUserLoginResponseData = {
  success: boolean
  message: string
  user: FPUserData
}

export type FPUserRegistrationResponseData = FPUserLoginResponseData
