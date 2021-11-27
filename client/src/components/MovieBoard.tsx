import React, {FC} from 'react'

import './MovieBoard.scss'

import LoadingIndicator from './common/LoadingIndicator'
import MovieCard from './MovieCard'
import {ITMDBMovieData, ITMDBMovieDetails} from '../services/tmdbapi'

type MovieBoardProps = {
  movieList: (ITMDBMovieData | ITMDBMovieDetails)[]
}

const MovieBoard: FC<MovieBoardProps> = ({movieList}) => (
  <div className='movie-board'>
    {!movieList?.length ? (
      <LoadingIndicator />
    ) : (
      <>
        {movieList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </>
    )}
  </div>
)

export default MovieBoard
