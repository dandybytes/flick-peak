import React, {FC} from 'react'

import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import './FavoriteBubble.scss'

type FavoriteBubbleProps = {
  isFavorite: boolean
  onClick?: () => void
  size?: string
  color?: string
}

const FavoriteBubble: FC<FavoriteBubbleProps> = ({
  isFavorite,
  onClick,
  size,
  color
}: FavoriteBubbleProps) => {
  return (
    <Tooltip
      overlay={<p>{isFavorite ? 'remove from favorites' : 'add to favorites'}</p>}
      placement='top'
    >
      <div
        className={'bubble-favorite' + (isFavorite ? ' active' : ' inactive')}
        style={size ? {height: size, width: size} : {}}
        onClick={onClick}
      >
        {isFavorite ? (
          <AiFillHeart style={color ? {color} : {}} />
        ) : (
          <AiOutlineHeart style={color ? {color} : {}} />
        )}
      </div>
    </Tooltip>
  )
}

export default FavoriteBubble
