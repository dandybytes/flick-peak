import React, {FC, useEffect} from 'react'
import {Redirect, useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './MovieListPage.scss'

import {AiFillHeart} from 'react-icons/ai'
import {BsStarFill} from 'react-icons/bs'
import {RiMovie2Fill} from 'react-icons/ri'

import {RootState, fetchMoviePage, getCategorySelector} from '../../state/'
import {MovieCategories, movieCategoryList} from '../../services/tmdbapi'

import TabBar from '../common/tabs/TabBar'
import LoadingIndicator from '../common/LoadingIndicator'
import MovieHero from '../MovieHero'
import MovieBoard from '../MovieBoard'

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

const MovieListPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const categoryFromHash = location?.hash?.slice(1)
  const isValidMovieCategory = movieCategoryList.includes(categoryFromHash as MovieCategories)
  const categorySelector = getCategorySelector(categoryFromHash)

  const fetching = useSelector((state: RootState) => state.movies[categorySelector].fetching)
  const error = useSelector((state: RootState) => state.movies[categorySelector].error)
  const movieList = useSelector((state: RootState) => state.movies[categorySelector].movies)
  // const numLastPageAvailable = useSelector((state: RootState) => state.movies.lastPageDownloaded)

  const errorMessageToDisplay = typeof error === 'string' ? error : JSON.stringify(error)

  useEffect(() => {
    if (movieList?.length === 0 && isValidMovieCategory)
      dispatch(fetchMoviePage(categoryFromHash as MovieCategories, 1))
  }, [categoryFromHash, dispatch, isValidMovieCategory, movieList?.length])

  const onTabClick = (tabId: string): void => {
    history.push(`#${tabId}`)
  }

  if (!isValidMovieCategory)
    return <Redirect to={`${location.pathname}#${movieCategoryTabs[0].id}`} />

  return (
    <div className='movie-list-page'>
      {fetching ? (
        <LoadingIndicator />
      ) : errorMessageToDisplay?.length ? (
        <div className='error-message-box'>{errorMessageToDisplay}</div>
      ) : (
        movieList?.length && (
          <>
            <MovieHero movieList={movieList} />

            <div className='movies'>
              <TabBar
                tabs={movieCategoryTabs}
                activeTabId={categoryFromHash}
                onTabClick={onTabClick}
              />

              <MovieBoard movieList={movieList} />
            </div>
          </>
        )
      )}
    </div>
  )
}

export default MovieListPage
