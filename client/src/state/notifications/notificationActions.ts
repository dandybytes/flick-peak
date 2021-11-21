import {Dispatch} from 'redux'

import {
  NotificationType,
  CreateNotificationAction,
  RemoveNotificationAction,
  ClearAllNotificationsAction,
  create_notification,
  remove_notification,
  clear_all_notifications
} from './notificationTypes'

export const createNotification =
  (message: string, type?: NotificationType, lifeSpan?: number) =>
  async (dispatch: Dispatch<CreateNotificationAction>) => {
    dispatch({
      type: create_notification,
      payload: {message, type: type ?? 'warning', lifeSpan: lifeSpan ?? 5000}
    })
  }

export const destroyNotification =
  (id: string) => async (dispatch: Dispatch<RemoveNotificationAction>) => {
    dispatch({type: remove_notification, payload: {id}})
  }

export const removeAllNotifications =
  () => async (dispatch: Dispatch<ClearAllNotificationsAction>) => {
    dispatch({type: clear_all_notifications})
  }
