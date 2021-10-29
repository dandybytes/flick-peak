import React, {FC, useCallback, useEffect, useMemo} from 'react'
import {Redirect, useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {AiFillHeart} from 'react-icons/ai'
import {BsStarFill} from 'react-icons/bs'
import {RiMovie2Fill} from 'react-icons/ri'

import './MovieListPage.scss'

import {
  RootState,
  fetchMoviePageByKeyword,
  fetchMoviePageByCategory,
  getCategorySelector
} from '../../state/'
import {ITMDBMovieData, MovieCategories, movieCategoryList} from '../../services/tmdbapi'

import TabBar from '../common/tabs/TabBar'
import LoadingIndicator from '../common/LoadingIndicator'
import MovieHero from '../MovieHero'
import MovieBoard from '../MovieBoard'
import SearchBar from '../common/SearchBar'
import {OutlineButton} from '../common/Button'

const movieCategoryTabs = [
  {
    label: 'In Theaters',
    id: 'now-playing',
    icon: <RiMovie2Fill />,
    color: '#67bb67'
  },
  {
    label: 'Popular',
    id: 'popular',
    icon: <AiFillHeart />,
    color: '#f56868'
  },
  {
    label: 'Top Rated',
    id: 'top-rated',
    icon: <BsStarFill />,
    color: '#63a7c7'
  }
]

const searchKey = 'search'

const MovieListPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const {hash, pathname, search} = location
  const queryParamObj = useMemo(() => new URLSearchParams(search), [search])
  const movieQueryParam = queryParamObj.get(searchKey)

  const categoryFromHash = hash?.slice(1)
  const isValidMovieCategory = movieCategoryList.includes(categoryFromHash as MovieCategories)
  const categorySelector = getCategorySelector(categoryFromHash)

  const fetching: boolean = useSelector((state: RootState) =>
    movieQueryParam
      ? state.lists.search?.[movieQueryParam]?.fetching
      : state.lists[categorySelector].fetching
  )
  const error: string = useSelector((state: RootState) =>
    movieQueryParam
      ? state.lists.search?.[movieQueryParam]?.error
      : state.lists[categorySelector].error
  )
  const movieList: ITMDBMovieData[] = useSelector((state: RootState) =>
    movieQueryParam != null
      ? state.lists.search?.[movieQueryParam]?.movies
      : state.lists[categorySelector].movies
  )
  const lastPageDownloaded: number = useSelector((state: RootState) =>
    movieQueryParam
      ? state.lists.search?.[movieQueryParam]?.lastPageDownloaded
      : state.lists[categorySelector].lastPageDownloaded
  )
  const totalPages: number = useSelector((state: RootState) =>
    movieQueryParam
      ? state.lists.search?.[movieQueryParam]?.totalPages
      : state.lists[categorySelector].totalPages
  )

  const errorMessageToDisplay = typeof error === 'string' ? error : JSON.stringify(error)

  useEffect(() => {
    if (!movieList?.length && movieQueryParam != null) {
      dispatch(fetchMoviePageByKeyword(movieQueryParam, 1))
    } else if (!movieList?.length && isValidMovieCategory) {
      dispatch(fetchMoviePageByCategory(categoryFromHash as MovieCategories, 1))
    }
  }, [movieQueryParam, categoryFromHash])

  const setMovieQuery = useCallback(
    (value: string): void => {
      queryParamObj.set(searchKey, value)
      history.push({pathname, search: queryParamObj.toString()})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history, pathname, queryParamObj.toString()]
  )

  const onTabClick = (tabId: string): void => {
    history.push(`#${tabId}`)
  }

  const handleLoadMore = () => {
    if (lastPageDownloaded >= totalPages) return

    if (movieQueryParam != null) {
      dispatch(fetchMoviePageByKeyword(movieQueryParam, lastPageDownloaded + 1))
    } else if (isValidMovieCategory) {
      dispatch(
        fetchMoviePageByCategory(categoryFromHash as MovieCategories, lastPageDownloaded + 1)
      )
    }
  }

  if (!movieQueryParam && !isValidMovieCategory)
    return <Redirect to={`${location.pathname}#${movieCategoryList[0]}`} />

  // if (fetching) {
  //   return (
  //     <div className='movie-list-page'>
  //       <LoadingIndicator />
  //     </div>
  //   )
  // }

  if (errorMessageToDisplay?.length) {
    return (
      <div className='movie-list-page'>
        <div className='error-message-box'>{errorMessageToDisplay}</div>
      </div>
    )
  }

  if (!movieList?.length) {
    return (
      <div className='movie-list-page'>
        <div className='error-message-box'>There are no movies to display</div>
      </div>
    )
  }

  return (
    <div className='movie-list-page'>
      <MovieHero movieList={movieList} />

      <TabBar tabs={movieCategoryTabs} activeTabId={categoryFromHash} onTabClick={onTabClick} />

      <SearchBar query={movieQueryParam ?? ''} setQuery={setMovieQuery} debounceDuration={400} />

      <MovieBoard movieList={movieList} />

      <section className='movie-load'>
        <OutlineButton onClick={handleLoadMore}>
          {fetching ? <LoadingIndicator /> : 'Load more'}
        </OutlineButton>
      </section>
    </div>
  )
}

export default MovieListPage
