import React, {FC, useEffect, useState} from 'react'
import {Redirect, useHistory, useLocation} from 'react-router-dom'

import './MovieListPage.scss'

import {AiFillHeart} from 'react-icons/ai'
import {BsStarFill} from 'react-icons/bs'
import {RiMovie2Fill} from 'react-icons/ri'

import {
  // fetchMovieDetails,
  // fetchMoviesByKeyword,
  // fetchNowPlayingMovies,
  fetchPopularMovies,
  // fetchTopRatedMovies,
  ITMDBMovieData
} from '../../services/tmdbapi'

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

  const [movieList, setMovieList] = useState<ITMDBMovieData[]>([])

  const category = location?.hash?.slice(1)

  const onTabClick = (tabId: string): void => {
    history.push(`#${tabId}`)
  }

  useEffect(() => {
    fetchPopularMovies()
      // fetchNowPlayingMovies()
      // fetchTopRatedMovies()
      // fetchMoviesByKeyword('dune')
      // fetchMovieDetails(438631)
      .then(response => {
        // console.log(response)
        if (response?.results != null) setMovieList(response.results)
      })
      .catch(err => console.error(err))
  }, [])

  if (!category?.length) return <Redirect to={`${location.pathname}#${movieCategoryTabs[0].id}`} />

  return (
    <div className='movie-list-page'>
      {movieList?.length ? (
        <>
          <MovieHero movieList={movieList} />

          <div className='movies'>
            <TabBar tabs={movieCategoryTabs} activeTabId={category} onTabClick={onTabClick} />

            <MovieBoard movieList={movieList} />
          </div>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  )
}

export default MovieListPage
