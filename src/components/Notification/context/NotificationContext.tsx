import { Context, createContext, Dispatch, useContext } from 'react'

import { NotificationActionTypes } from './NotificationActionTypes'
import { InitialState } from './NotificationProvider'

export interface INotificationContext {
  state: InitialState
  dispatch: Dispatch<NotificationActionTypes>
}

export const NotificationContext = createContext<INotificationContext | null>(null)
export const useNotificationContext = () =>
  useContext(NotificationContext as Context<INotificationContext>)
