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
    if (token && idsFavoriteMovies == null && !favoriteMoviesAreFetching) {
      dispatch(fetchFavoriteMovies(token))
    }
  }, [dispatch, favoriteMoviesAreFetching, idsFavoriteMovies, token])

  return (
    <PageContainer classNames='favorite-page'>
      {favoriteMoviesAreFetching ? (
        <LoadingIndicator />
      ) : favoriteMovieError?.length ? (
        <ErrorMessageBox message={favoriteMovieError} />
      ) : idsFavoriteMovies != null && idsFavoriteMovies?.length !== 0 ? (
        <MovieBoard movieIDs={idsFavoriteMovies} />
      ) : (
        <ErrorMessageBox message='No movies marked as favorite yet.' />
      )}
    </PageContainer>
  )
}

export default FavoriteMoviePage
