import { NotificationModel } from './NotificationProvider'

export type setNotificationPayload = {
  notifications: NotificationModel[]
  shouldConcat?: boolean
}

export enum NotificationActions {
  SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
  SET_NOTIFICATIONS_STATUS = 'SET_NOTIFICATIONS_STATUS',
  SET_NOTIFICATION_OPEN = 'SET_NOTIFICATION_OPEN',
  TOGGLE_NOTIFICATION_OPEN = 'TOGGLE_NOTIFICATION_OPEN',
}

export type NotificationActionTypes =
  | {
      type: NotificationActions.SET_NOTIFICATIONS
      payload: setNotificationPayload
    }
  | { type: NotificationActions.SET_NOTIFICATIONS_STATUS; payload: boolean }
  | { type: NotificationActions.SET_NOTIFICATION_OPEN; payload: boolean }
  | { type: NotificationActions.TOGGLE_NOTIFICATION_OPEN }
