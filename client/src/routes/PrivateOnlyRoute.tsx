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

const PrivateOnlyRoute = ({...routeProps}: RouteProps) => {
  const location = useLocation<StateType>()
  const userData: UserData | null = useSelector((state: RootState) => state?.user?.data)

  if (isAuthenticated(userData)) return <Route {...routeProps} />

  const currentReferrer = location?.state?.referrer

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: {referrer: currentReferrer ?? location}
      }}
    />
  )
}

export default PrivateOnlyRoute
