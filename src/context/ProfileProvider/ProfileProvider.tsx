import { useMemo, useReducer } from 'react'

import { ProfileSteps } from './config'
import { ProfileActions, ProfileActionsTypes } from './ProfileActionTypes'
import { IProfileContext, ProfileContext } from './ProfileContext'
import { ProfileViewsRouter } from './ProfileViewsRoutes'

export type AccessoryInfo = {
  email: string | null
  phone: string | null
}
export interface InitialState {
  modal: boolean
  showBackButton: boolean
  initialRoute: string
  type: ProfileSteps | null
  route: string
  accessoryInfo: AccessoryInfo
}

const initialState: InitialState = {
  modal: false,
  showBackButton: true,
  initialRoute: '',
  type: ProfileSteps.profile,
  route: '',
  accessoryInfo: {
    email: null,
    phone: null,
  },
}

const reducer = (state: InitialState, action: ProfileActionsTypes): InitialState => {
  switch (action.type) {
    case ProfileActions.SET_PROFILE_MODAL: {
      return { ...state, ...action.payload }
    }
    case ProfileActions.SET_CHANGE_PASSWORD_MODAL: {
      return { ...state, ...action.payload }
    }
    case ProfileActions.SET_INITIAL_ROUTE: {
      return { ...state, initialRoute: action.payload }
    }
    case ProfileActions.SET_SHOW_BACK_BUTTON: {
      return { ...state, showBackButton: action.payload }
    }
    case ProfileActions.SET_ACCESSORY_INFO: {
      return { ...state, accessoryInfo: { ...state.accessoryInfo, ...action.payload } }
    }
    default: {
      return state
    }
  }
}

const getInitialState = () => {
  return initialState
}

export const ProfileProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const value: IProfileContext = useMemo(() => ({ state, dispatch }), [state])
  return (
    <ProfileContext.Provider value={value}>
      {children}
      <ProfileViewsRouter />
    </ProfileContext.Provider>
  )
}
