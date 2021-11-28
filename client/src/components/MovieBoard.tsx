import React, {FC} from 'react'

import './MovieBoard.scss'

import LoadingIndicator from './common/LoadingIndicator'
import MovieCard from './MovieCard'

type MovieBoardProps = {
  movieIDs: string[]
}

const MovieBoard: FC<MovieBoardProps> = ({movieIDs}) => (
  <div className='movie-board'>
    {!movieIDs?.length ? (
      <LoadingIndicator />
    ) : (
      <>
        {movieIDs.map(movieID => (
          <MovieCard key={movieID} movieID={movieID} />
        ))}
      </>
    )}
  </div>
)

export default MovieBoard
