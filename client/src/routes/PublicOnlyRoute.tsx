import {Redirect, Route, RouteProps, useLocation} from 'react-router'
import {useSelector} from 'react-redux'

import {isAuthenticated} from './auth'
import {RootState, UserData} from '../state'

interface StateType {
  referrer: {
    pathname: string
    search: string
    hash: string
  }
}

const PublicOnlyRoute = ({...routeProps}: RouteProps) => {
  const location = useLocation<StateType>()
  const userData: UserData | null = useSelector((state: RootState) => state?.user?.data)
  const currentReferrer = location?.state?.referrer

  if (isAuthenticated(userData))
    return (
      <Redirect
        to={{
          pathname: currentReferrer?.pathname ?? '/',
          state: {referrer: currentReferrer ?? location}
        }}
      />
    )

  return <Route {...routeProps} />
}

export default PublicOnlyRoute
