import {FunctionComponent} from 'react'
import {useSelector} from 'react-redux'

import './FavoriteMoviePage.scss'

import {FavoriteMovieState, RootState} from '../../state'

import PageContainer from './PageContainer'
import MovieBoard from '../MovieBoard'

const FavoriteMoviePage: FunctionComponent = () => {
  const favorites: FavoriteMovieState = useSelector((state: RootState) => state?.favorites)

  const favoriteMovies = Object.values(favorites)

  return (
    <PageContainer classNames='favorite-page'>
      <MovieBoard movieList={favoriteMovies} />
    </PageContainer>
  )
}

export default FavoriteMoviePage
