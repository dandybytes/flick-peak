import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Tooltip from 'rc-tooltip'

import {FaUserCircle} from 'react-icons/fa'
import {ImExit} from 'react-icons/im'

import './Header.scss'

import {logUserOut, RootState, set_favorite_movie_list, UserData} from '../state'
import {isAuthenticated} from '../routes/auth'

import Logo from './Logo'
import NavBar from './NavBar'

const Header: React.FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userData: UserData | null = useSelector((state: RootState) => state?.user?.data)

  const isLoggedIn = isAuthenticated(userData)

  const handleLogout = () => {
    /**
     * At this point, only user data and favorites must be cleared on logout.
     * If state grows to encompass more data that will need to be deleted on logout,
     * a full state reset solution might make more sense, as in the example below:
     * https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
     */
    dispatch({
      type: set_favorite_movie_list,
      payload: {data: []}
    })
    dispatch(logUserOut())
  }

  return (
    <header className='header'>
      <Logo />

      <NavBar />

      <div className='user'>
        <div className='user-name'>
          {isLoggedIn ? userData?.name ?? userData?.email ?? 'Anonymous' : null}
        </div>

        <Tooltip overlay={<p>{isLoggedIn ? 'log out' : 'log in'}</p>} placement='bottom'>
          <button
            className='user-icon'
            onClick={() => {
              if (isLoggedIn) {
                handleLogout()
              } else {
                history.push('/login')
              }
            }}
          >
            {isLoggedIn ? <ImExit /> : <FaUserCircle />}
          </button>
        </Tooltip>
      </div>
    </header>
  )
}

export default Header
