import {generateUniqueId} from '../../utils'

import {
  NotificationState,
  NotificationAction,
  create_notification,
  remove_notification,
  clear_all_notifications,
  CreateNotificationPayload,
  RemoveNotificationPayload
} from './notificationTypes'

const initialState: NotificationState = {
  items: []
}

export const notificationReducer = (
  state = initialState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case create_notification: {
      const {type, message, lifeSpan} = action.payload as CreateNotificationPayload
      const newNotification = {
        id: generateUniqueId(),
        type,
        message,
        lifeSpan
      }
      return {...state, items: [...state.items, newNotification]}
    }

    case remove_notification: {
      const {id: idNotificationToRemove} = action.payload as RemoveNotificationPayload
      return {...state, items: state.items.filter(item => item.id !== idNotificationToRemove)}
    }

    case clear_all_notifications: {
      return {...state, items: []}
    }

    default:
      return state
  }
}
