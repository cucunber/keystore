import { createSlice } from '@reduxjs/toolkit'

import { initialState, Profile, User } from './profileSliceCommon'

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
      return { ...state, ...payload }
    },
  },
})
