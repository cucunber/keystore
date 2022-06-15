import { createSlice } from '@reduxjs/toolkit'

import { initialState, NotificationPayload, Profile, User } from './profileSliceCommon'

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clear: () => {
      return initialState
    },
    updateProfile: (state, { payload }: { payload: Profile }) => {
      return { ...state, ...payload }
    },
    updateUser: (state, { payload }: { payload: User }) => {
      return { ...state, user: { ...payload } }
    },
    updateNotifications: (state, { payload }: { payload: NotificationPayload }) => {
      const { notifications, shouldConcat } = payload
      return {
        ...state,
        notifications: shouldConcat ? [...state.notifications] : notifications,
      }
    },
  },
})
