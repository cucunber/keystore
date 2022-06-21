import { ReactNode, useEffect, useMemo, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from 'state/slices/selectors'
import { AsyncField } from 'types/common'

import { NotificationActions, NotificationActionTypes } from './NotificationActionTypes'
import { NotificationContext } from './NotificationContext'

export enum NotificationStatus {
  failed = 'failed',
  success = 'success',
  common = 'common',
  pending = 'pending',
}

export type NotificationModel = {
  type: NotificationStatus
  date: number
  title: string
  data: string
  hasBeenRead: boolean
}

export interface InitialState {
  notification: AsyncField<{ notifications: NotificationModel[] }>
  isOpen: boolean
}

const initialState: InitialState = {
  notification: {
    isLoading: true,
    notifications: [],
  },
  isOpen: false,
}

const reducer = (state: InitialState, action: NotificationActionTypes): InitialState => {
  const { type } = action
  switch (type) {
    case NotificationActions.SET_NOTIFICATIONS: {
      const { payload } = action
      return {
        ...state,
        notification: {
          ...state.notification,
          isLoading: false,
          notifications: payload.shouldConcat
            ? [...state.notification.notifications, ...payload.notifications]
            : payload.notifications,
        },
      }
    }
    case NotificationActions.SET_NOTIFICATIONS_STATUS: {
      const { payload } = action
      return {
        ...state,
        notification: {
          ...state.notification,
          isLoading: payload,
        },
      }
    }
    case NotificationActions.SET_NOTIFICATION_OPEN: {
      const { payload } = action
      return {
        ...state,
        isOpen: payload,
      }
    }
    case NotificationActions.TOGGLE_NOTIFICATION_OPEN: {
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    }
    default: {
      return state
    }
  }
}

interface INotificationProvider {
  children: ReactNode
}

const getInitialState = () => initialState

export const NotificationProvider = ({ children }: INotificationProvider) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())

  const { notifications } = useSelector(selectProfile)

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: NotificationActions.SET_NOTIFICATIONS, payload: { notifications } })
    }, 1500)
  }, [notifications])

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
