import {
  NotificationType,
  create_notification,
  remove_notification,
  clear_all_notifications
} from './notificationTypes'

export const createNotification = (message: string, type?: NotificationType, lifeSpan?: number) => ({
  type: create_notification,
  payload: {message, type: type ?? 'warning', lifeSpan}
})

export const destroyNotification = (id: string) => ({type: remove_notification, payload: {id}})

export const removeAllNotifications = () => ({type: clear_all_notifications})
