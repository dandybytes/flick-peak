export const create_notification = 'create_notification'
export const remove_notification = 'remove_notification'
export const clear_all_notifications = 'clear_all_notifications'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export type NotificationData = {
  id: string
  type: NotificationType
  message: string
  lifeSpan: number | null | undefined
}

export type NotificationState = {
  items: NotificationData[]
}

export interface CreateNotificationPayload {
  type: NotificationType
  message: string
  lifeSpan?: number
}

export interface CreateNotificationAction {
  type: typeof create_notification
  payload: CreateNotificationPayload
}

export interface RemoveNotificationPayload {
  id: string
}

export interface RemoveNotificationAction {
  type: typeof remove_notification
  payload: RemoveNotificationPayload
}

export interface ClearAllNotificationsAction {
  type: typeof clear_all_notifications
}

export type NotificationAction =
  | CreateNotificationAction
  | RemoveNotificationAction
  | ClearAllNotificationsAction
