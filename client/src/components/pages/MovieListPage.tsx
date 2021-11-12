import {FC, useEffect, useMemo} from 'react'
import {Redirect, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './MovieListPage.scss'

import {RootState, fetchMoviePageByKeyword, fetchMoviePageByCategory} from '../../state/'
import {
  ITMDBMovieData,
  MovieCategory,
  movieCategoryList,
  url_img_poster
} from '../../services/tmdbapi'

import PageContainer from './PageContainer'
import LoadingIndicator from '../common/LoadingIndicator'
import MovieHero from '../MovieHero'
import InfiniteGrid from '../common/infinite-grid/InfiniteGrid'
import {OutlineButton} from '../common/Button'
import MovieCard from '../MovieCard'

const searchKey = 'search'

const movieCardRenderer = (movie: ITMDBMovieData) => (
  <MovieCard
    key={movie.id}
    id={movie.id}
    imgURL={movie.poster_path ? url_img_poster + movie.poster_path : ''}
    title={movie.title}
    date={movie.release_date}
    rating={movie.vote_average}
  />
)

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
  const fallbackMovieList: ITMDBMovieData[] = useSelector(
    (state: RootState) => state.lists.current.movies
  )

  const errorMessageToDisplay = typeof error === 'string' ? error : JSON.stringify(error)

  /**
   * if the main movie list is empty, get the first page of movies matching either the search query...
   * ... or the selected category
   */
  useEffect(() => {
    if (!movieList?.length && movieQueryParam != null) {
      dispatch(fetchMoviePageByKeyword(movieQueryParam, 1))
    } else if (!movieList?.length && isValidMovieCategory) {
      dispatch(fetchMoviePageByCategory(categoryFromHash as MovieCategory, 1))
    }
  }, [movieQueryParam, categoryFromHash, movieList?.length, isValidMovieCategory, dispatch])

  /**
   * if no movies could be retrieved for the current query or selected category, make sure...
   * ... there is at least a fallback list of movie from the "now playing" (i.e. current) category
   */
  useEffect(() => {
    if (!movieList?.length && error?.length && !fallbackMovieList?.length) {
      dispatch(fetchMoviePageByCategory('current', 1))
    }
  }, [error, movieList?.length, fallbackMovieList?.length, dispatch])

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
      <MovieHero movieList={movieList?.length ? movieList : fallbackMovieList} />

      {!!movieList?.length && (
        <InfiniteGrid
          itemList={movieList}
          itemWidth={352}
          itemHeight={512}
          itemRenderer={movieCardRenderer}
          moreItemsAvailable={lastPageDownloaded < totalPages}
          isFetching={fetching}
          fetchItems={handleLoadMore}
        />
      )}

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
