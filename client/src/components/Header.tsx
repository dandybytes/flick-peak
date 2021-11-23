import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Tooltip from 'rc-tooltip'

import {FaUserCircle} from 'react-icons/fa'
import {ImExit} from 'react-icons/im'

import './Header.scss'

import {logUserOut, RootState, UserData} from '../state'
import {isAuthenticated} from '../routes/auth'

import Logo from './Logo'
import NavBar from './NavBar'

const Header: React.FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userData: UserData | null = useSelector((state: RootState) => state?.user?.data)

  const isLoggedIn = isAuthenticated(userData)

  return (
    <header className='header'>
      <Logo />

      <NavBar />

      <div className='user'>
        <Tooltip overlay={<p>{isLoggedIn ? 'log out' : 'log in'}</p>} placement='bottom'>
          <div
            className='user-icon'
            onClick={() => {
              if (isLoggedIn) {
                dispatch(logUserOut())
              } else {
                history.push('/login')
              }
            }}
          >
            {isLoggedIn ? <ImExit /> : <FaUserCircle />}
          </div>
        </Tooltip>
      </div>
    </header>
  )
}

export default Header
