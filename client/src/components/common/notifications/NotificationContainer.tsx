import {FC} from 'react'
import {createPortal} from 'react-dom'
import {useSelector} from 'react-redux'

import './NotificationContainer.scss'

import {NotificationData, RootState} from '../../../state'
import NotificationItem from './NotificationItem'

const notificationContainerID = 'snack'

type NotificationPosition = 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'

type NotificationContainerProps = {
  position?: NotificationPosition
}

const NotificationContainer: FC<NotificationContainerProps> = ({position = 'bottom-right'}) => {
  const notifications: NotificationData[] = useSelector(
    (state: RootState) => state.notifications?.items
  )

  const portalContainer = document.getElementById(notificationContainerID)

  if (portalContainer == null) {
    console.error(
      `The notification container could not be rendered, because the HTML element with ID ${notificationContainerID}, which is supposed to serve as anchor for its portal, could not be found.`
    )
    return null
  }

  return createPortal(
    <ul className={`notification-list ${position}`}>
      {notifications.map(notification => (
        <NotificationItem {...notification} key={notification.id} />
      ))}
    </ul>,
    portalContainer
  )
}

export default NotificationContainer
