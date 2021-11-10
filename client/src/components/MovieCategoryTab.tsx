import {FC} from 'react'

import './MovieCategoryTab.scss'

type MovieCategoryTabProps = {
  label: string
  icon: JSX.Element
  color: string
  isActiveTab: boolean
  onTabClick: () => void
}

const MovieCategoryTab: FC<MovieCategoryTabProps> = ({
  label,
  icon,
  color,
  isActiveTab,
  onTabClick
}) => {
  const tabWidth = isActiveTab
    ? `calc(1rem + 1.5rem + 1rem + ${label?.length ?? 0}ch + 1rem)`
    : 'calc(1rem + 1.5rem + 1rem)'

  return (
    <li
      className={'tab' + (isActiveTab ? ' active' : '')}
      role='presentation'
      style={{width: tabWidth}}
      onClick={onTabClick}
    >
      <span className='tab-background' style={{background: isActiveTab ? color : 'none'}} />

      <span
        className={'tab-icon' + (isActiveTab ? ' active' : '')}
        style={isActiveTab ? {fill: color} : {}}
      >
        {icon}
      </span>

      <span className='tab-label' style={{color: isActiveTab ? color : 'none'}}>
        {label}
      </span>
    </li>
  )
}

export default MovieCategoryTab
