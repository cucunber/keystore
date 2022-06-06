import { createSlice } from '@reduxjs/toolkit';

import { initialState, Profile } from './profileSliceCommon';

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clear: () => {
      return initialState;
    },
    updateProfile: (state, { payload }: { payload: Profile }) => {
      console.log('payload', payload);
      return { ...state, ...payload };
    },
  },
});
