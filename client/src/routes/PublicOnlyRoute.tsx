import {FC, ComponentType} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {isAuthenticated} from './auth'
import {RootState, UserData} from '../state'

type PublicOnlyRouteProps = {
  component: ComponentType<any>
  path: string
}

const PublicOnlyRoute: FC<PublicOnlyRouteProps> = ({component: RouteComponent, path}) => {
  const userData: UserData | null = useSelector((state: RootState) => state?.user?.data)

  return (
    <Route
      path={path}
      render={routeProps =>
        // if already logged in, redirect from sign(up/in) to home
        isAuthenticated(userData) ? (
          <Redirect to={'/'} />
        ) : (
          // otherwise show the sign(up/in) page
          <RouteComponent {...routeProps} />
        )
      }
    />
  )
}

export default PublicOnlyRoute
