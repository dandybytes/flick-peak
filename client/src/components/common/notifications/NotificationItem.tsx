import {FC, MutableRefObject, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'

import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegWindowClose
} from 'react-icons/fa'

import './NotificationItem.scss'
import {destroyNotification, NotificationData} from '../../../state'

const notificationIcon = {
  success: <FaCheck />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
  error: <FaExclamationCircle />
}

type NotificationItemProps = NotificationData

// the length in characters beyond which a message...
// ... will be considered large (for layout & style purposes)
const messageThreshold = 38

const NotificationItem: FC<NotificationItemProps> = ({id, type, message, lifeSpan}) => {
  const dispatch = useDispatch()

  const timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null)

  useEffect(() => {
    if (lifeSpan) {
      timeoutRef.current = setTimeout(() => dispatch(destroyNotification(id)), lifeSpan)

      return () => {
        if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
      }
    }
  }, [dispatch, id, lifeSpan])

  return (
    <li className={`notification ${type}`}>
      <FaRegWindowClose
        className={`close-button${message.length > messageThreshold ? ' large' : ''}`}
        onClick={() => dispatch(destroyNotification(id))}
      />
      <div className={`notification-icon${message.length > messageThreshold ? ' large' : ''}`}>
        {notificationIcon[type]}
      </div>
      <div className='notification-content'>
        <p className='notification-message'>{message}</p>
      </div>
    </li>
  )
}

export default NotificationItem
