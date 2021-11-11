import {FC, useEffect, useMemo} from 'react'
import {Redirect, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './MovieListPage.scss'

import {RootState, fetchMoviePageByKeyword, fetchMoviePageByCategory} from '../../state/'
import {ITMDBMovieData, MovieCategory, movieCategoryList} from '../../services/tmdbapi'

import PageContainer from './PageContainer'
import LoadingIndicator from '../common/LoadingIndicator'
import MovieHero from '../MovieHero'
import MovieBoard from '../MovieBoard'
import {OutlineButton} from '../common/Button'

const searchKey = 'search'

const MovieListPage: FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const {hash, search} = location
  const queryParamObj = useMemo(() => new URLSearchParams(search), [search])
  const movieQueryParam = queryParamObj.get(searchKey)

  const categoryFromHash = hash?.slice(1)
  const isValidMovieCategory = movieCategoryList.includes(categoryFromHash as MovieCategory)
  const categoryToShow = isValidMovieCategory
    ? (categoryFromHash as MovieCategory)
    : movieCategoryList[0]

  const fetching: boolean = useSelector((state: RootState) =>
    movieQueryParam?.length
      ? state.lists.search?.[movieQueryParam]?.fetching
      : state.lists[categoryToShow].fetching
  )
  const error: string = useSelector((state: RootState) =>
    movieQueryParam?.length
      ? state.lists.search?.[movieQueryParam]?.error
      : state.lists[categoryToShow].error
  )
  const movieList: ITMDBMovieData[] = useSelector((state: RootState) =>
    movieQueryParam?.length
      ? state.lists.search?.[movieQueryParam]?.movies
      : state.lists[categoryToShow].movies
  )
  const lastPageDownloaded: number = useSelector((state: RootState) =>
    movieQueryParam?.length
      ? state.lists.search?.[movieQueryParam]?.lastPageDownloaded
      : state.lists[categoryToShow].lastPageDownloaded
  )
  const totalPages: number = useSelector((state: RootState) =>
    movieQueryParam?.length
      ? state.lists.search?.[movieQueryParam]?.totalPages
      : state.lists[categoryToShow].totalPages
  )

  const errorMessageToDisplay = typeof error === 'string' ? error : JSON.stringify(error)

  useEffect(() => {
    if (!movieList?.length && movieQueryParam != null) {
      dispatch(fetchMoviePageByKeyword(movieQueryParam, 1))
    } else if (!movieList?.length && isValidMovieCategory) {
      dispatch(fetchMoviePageByCategory(categoryFromHash as MovieCategory, 1))
    }
  }, [movieQueryParam, categoryFromHash, movieList?.length, isValidMovieCategory, dispatch])

  const handleLoadMore = () => {
    if (lastPageDownloaded >= totalPages) return

    if (movieQueryParam != null) {
      dispatch(fetchMoviePageByKeyword(movieQueryParam, lastPageDownloaded + 1))
    } else if (isValidMovieCategory) {
      dispatch(fetchMoviePageByCategory(categoryFromHash as MovieCategory, lastPageDownloaded + 1))
    }
  }

  if (movieQueryParam == null && !isValidMovieCategory)
    return <Redirect to={`${location.pathname}#${movieCategoryList[0]}`} />

  return (
    <PageContainer classNames='movie-list-page'>
      <MovieHero movieList={movieList} />

      {movieList?.length && <MovieBoard movieList={movieList} />}

      {fetching ? (
        <LoadingIndicator />
      ) : errorMessageToDisplay?.length ? (
        <>
          <div className='error-message-box'>{errorMessageToDisplay}</div>
          <section className='movie-load'>
            <OutlineButton onClick={handleLoadMore}>Try Again</OutlineButton>
          </section>
        </>
      ) : !movieList?.length ? (
        <div className='error-message-box'>There are no movies to display</div>
      ) : (
        ((movieQueryParam ?? '').length || isValidMovieCategory) && (
          <section className='movie-load'>
            <OutlineButton onClick={handleLoadMore}>Load More</OutlineButton>
          </section>
        )
      )}
    </PageContainer>
  )
}

export default MovieListPage
