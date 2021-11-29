import React, {FC} from 'react'

import './MovieBoard.scss'

import MovieCard from './MovieCard'

type MovieBoardProps = {
  movieIDs: string[]
}

const MovieBoard: FC<MovieBoardProps> = ({movieIDs}) => (
  <div className='movie-board'>
    {(movieIDs ?? []).map(movieID => (
      <MovieCard key={movieID} movieID={movieID} />
    ))}
  </div>
)

export default MovieBoard
