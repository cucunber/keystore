import { useMemo, useReducer } from 'react'

import { AuthorizationActions, AuthorizationActionsTypes } from './AuthorizationActionTypes'
import { AuthorizationContext, IAuthorizationContext } from './AuthorizationContext'
import { AuthorizationViewsRouter } from './AuthorizationViewsRoutes'
import { AuthorizationSteps } from './config'

export type AccessoryInfo = {
  email: string | null
  phone: string | null
}
export interface InitialState {
  modal: boolean
  showBackButton: boolean
  initialRoute: string
  type: AuthorizationSteps | null
  accessoryInfo: AccessoryInfo
}

const initialState: InitialState = {
  modal: false,
  showBackButton: true,
  initialRoute: '',
  type: AuthorizationSteps.signIn,
  accessoryInfo: {
    email: null,
    phone: null,
  },
}

const reducer = (state: InitialState, action: AuthorizationActionsTypes): InitialState => {
  switch (action.type) {
    case AuthorizationActions.SET_AUTHORIZATION_MODAL: {
      return { ...state, modal: action.payload }
    }
    case AuthorizationActions.SET_INITIAL_ROUTE: {
      return { ...state, initialRoute: action.payload }
    }
    case AuthorizationActions.SET_SHOW_BACK_BUTTON: {
      return { ...state, showBackButton: action.payload }
    }
    case AuthorizationActions.SET_ACCESSORY_INFO: {
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

export const AuthorizationProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const value: IAuthorizationContext = useMemo(() => ({ state, dispatch }), [state])
  return (
    <AuthorizationContext.Provider value={value}>
      {children}
      <AuthorizationViewsRouter />
    </AuthorizationContext.Provider>
  )
}
