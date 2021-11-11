import {FunctionComponent} from 'react'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import './NavTab.scss'

type NavTabProps = {
  label: string
  icon: JSX.Element
  color?: string
  isActive: boolean
  onClick: () => void
}

const NavTab: FunctionComponent<NavTabProps> = ({label, icon, color, isActive, onClick}) => {
  const tabWidth = isActive
    ? `calc(1rem + 1.5rem + 1rem + ${label?.length + 1 ?? 0}ch + 1rem)`
    : 'calc(1rem + 1.5rem + 1rem)'

  return (
    <li
      className={'tab' + (isActive ? ' active' : '')}
      role='presentation'
      style={{width: tabWidth}}
      onClick={onClick}
    >
      <span className='tab-background' style={isActive && color ? {background: color} : {}} />

      {isActive ? (
        <span className='tab-icon' style={isActive && color ? {fill: color} : {}}>
          {icon}
        </span>
      ) : (
        <Tooltip trigger={['hover', 'focus']} overlay={<p>{label}</p>} placement='bottom'>
          <span className='tab-icon' style={isActive && color ? {fill: color} : {}}>
            {icon}
          </span>
        </Tooltip>
      )}

      <span className='tab-label' style={isActive && color ? {color} : {}}>
        {label}
      </span>
    </li>
  )
}

export default NavTab
