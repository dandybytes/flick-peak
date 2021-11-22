import {UserData} from './../state/user/userTypes'
/**
 * TODO: Update auth verification!
 */
export const isAuthenticated = (userData: UserData | null | undefined): boolean => {
  // temporarily consider authenticated if JWT token present in state
  return !!userData?.token
}
