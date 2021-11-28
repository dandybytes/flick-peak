import {FunctionComponent} from 'react'
import {useSelector} from 'react-redux'

import './FavoriteMoviePage.scss'

import {FavoriteMovieState, RootState} from '../../state'

import PageContainer from './PageContainer'
import MovieBoard from '../MovieBoard'

const FavoriteMoviePage: FunctionComponent = () => {
  const favorites: FavoriteMovieState = useSelector((state: RootState) => state?.favorites)

  const idsFavoriteMovies = Object.keys(favorites)

  return (
    <PageContainer classNames='favorite-page'>
      <MovieBoard movieIDs={idsFavoriteMovies} />
    </PageContainer>
  )
}

export default FavoriteMoviePage
