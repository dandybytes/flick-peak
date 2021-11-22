import {FC, ComponentType} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {isAuthenticated} from './auth'
import {RootState, UserData} from '../state'

type PrivateOnlyRouteProps = {
  component: ComponentType<any>
  path: string
}

const PrivateOnlyRoute: FC<PrivateOnlyRouteProps> = ({component: RouteComponent, path}) => {
  const userData: UserData | null = useSelector((state: RootState) => state?.user?.data)

  return (
    <Route
      path={path}
      render={routeProps =>
        isAuthenticated(userData) ? (
          // if logged in, show private routes
          <RouteComponent {...routeProps} />
        ) : (
          // else redirect user to login page instead
          <Redirect to={'/login'} />
        )
      }
    />
  )
}

export default PrivateOnlyRoute
