import React, {CSSProperties, FC} from 'react'

import './TabBar.scss'

export type TabDataType = {
  label: string
  id: string
  icon: JSX.Element
  color: string
}

type TabBarProps = {
  tabs: TabDataType[]
  activeTabId: string
  onTabClick: (tabId: string) => void
  style?: CSSProperties
}

const TabBar: FC<TabBarProps> = ({tabs, activeTabId, onTabClick, style}) => (
  <div className='tab-bar' style={style}>
    <ul className='tab-list' role='tablist'>
      {tabs.map(tab => {
        const isActiveTab = tab.id === activeTabId
        const tabWidth = isActiveTab
          ? `calc(1rem + 1.5rem + 1rem + ${tab?.label?.length ?? 0}ch + 1rem)`
          : 'calc(1rem + 1.5rem + 1rem)'

        return (
          <li
            key={tab.id}
            className={'tab' + (isActiveTab ? ' active' : '')}
            role='presentation'
            style={{width: tabWidth}}
            onClick={() => onTabClick(tab.id)}
          >
            <span
              className='tab-background'
              style={{background: isActiveTab ? tab.color : 'none'}}
            />

            <span className='tab-icon' style={{fill: isActiveTab ? tab.color : 'white'}}>
              {tab.icon}
            </span>

            <span className='tab-label' style={{color: isActiveTab ? tab.color : 'none'}}>
              {tab.label}
            </span>
          </li>
        )
      })}
    </ul>
  </div>
)

export default TabBar
