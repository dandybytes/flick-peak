import {FC, useCallback, useMemo} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

// import {AiFillHome} from 'react-icons/ai'
import {RiMovie2Fill} from 'react-icons/ri'
import {AiFillHeart} from 'react-icons/ai'
import {BsStarFill} from 'react-icons/bs'
// import {RiInformationFill} from 'react-icons/ri'

import './NavBar.scss'

import SearchBar from './common/SearchBar'
import NavTab from './NavTab'

const searchKey = 'search'

const NavBar: FC = () => {
  const history = useHistory()
  const location = useLocation()

  const {hash, pathname, search} = location
  const queryParamObj = useMemo(() => new URLSearchParams(search), [search])
  const movieQueryParam = queryParamObj.get(searchKey)

  const categoryFromHash = hash?.slice(1)

  const setMovieQuery = useCallback(
    (value: string): void => {
      queryParamObj.set(searchKey, value)
      history.push({pathname: '/movies/', search: queryParamObj.toString()})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history, pathname, queryParamObj.toString()]
  )

  return (
    <nav className='navigation-tabs'>
      <ul className='tab-list' role='tablist'>
        {/* <NavTab
          label='Home'
          icon={<AiFillHome />}
          isActive={pathname === '/'}
          onClick={() => history.push('/')}
        /> */}
        <NavTab
          label='In Theaters'
          icon={<RiMovie2Fill />}
          color='#67bb67'
          isActive={categoryFromHash === 'current'}
          onClick={() => history.push('/movies/#current')}
        />
        <NavTab
          label='Popular'
          icon={<AiFillHeart />}
          color='#f56868'
          isActive={categoryFromHash === 'popular'}
          onClick={() => history.push('/movies/#popular')}
        />
        <NavTab
          label='Top Rated'
          icon={<BsStarFill />}
          isActive={categoryFromHash === 'top'}
          onClick={() => history.push('/movies/#top')}
        />
        {/* <NavTab
          label='About'
          icon={<RiInformationFill />}
          isActive={pathname === '/about'}
          onClick={() => history.push('/about')}
        /> */}

        <SearchBar
          query={movieQueryParam}
          setQuery={setMovieQuery}
          debounceDuration={400}
          placeholder='movie title...'
        />
      </ul>
    </nav>
  )
}

export default NavBar
