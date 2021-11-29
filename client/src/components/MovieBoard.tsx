import {FC} from 'react'
import {AnimatePresence} from 'framer-motion'

import './MovieBoard.scss'

import MovieCard from './MovieCard'

type MovieBoardProps = {
  movieIDs: string[]
}

const MovieBoard: FC<MovieBoardProps> = ({movieIDs}) => (
  <div className='movie-board'>
    <AnimatePresence>
      {(movieIDs ?? []).map((movieID, index) => (
        <MovieCard key={movieID} movieID={movieID} index={index} isAnimated={true} />
      ))}
    </AnimatePresence>
  </div>
)

export default MovieBoard
