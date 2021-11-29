import {FunctionComponent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './FavoriteMoviePage.scss'

import {fetchFavoriteMovies, RootState} from '../../state'

import PageContainer from './PageContainer'
import MovieBoard from '../MovieBoard'
import ErrorMessageBox from '../common/ErrorMessageBox'
import LoadingIndicator from '../common/LoadingIndicator'

const FavoriteMoviePage: FunctionComponent = () => {
  const dispatch = useDispatch()

  const token = useSelector((state: RootState) => state?.user?.data?.token)
  const favoriteMoviesAreFetching: boolean = useSelector(
    (state: RootState) => state?.favorites?.fetching
  )
  const favoriteMovieError: string = useSelector((state: RootState) => state?.favorites?.error)
  const idsFavoriteMovies: string[] | null = useSelector(
    (state: RootState) => state?.favorites?.data
  )

  useEffect(() => {
    if (token && !idsFavoriteMovies?.length) {
      dispatch(fetchFavoriteMovies(token))
    }
  }, [dispatch, idsFavoriteMovies?.length, token])

  return (
    <PageContainer classNames='favorite-page'>
      {favoriteMoviesAreFetching ? (
        <LoadingIndicator />
      ) : idsFavoriteMovies.length ? (
        <MovieBoard movieIDs={idsFavoriteMovies} />
      ) : favoriteMovieError?.length ? (
        <ErrorMessageBox message={favoriteMovieError} />
      ) : null}
    </PageContainer>
  )
}

export default FavoriteMoviePage
