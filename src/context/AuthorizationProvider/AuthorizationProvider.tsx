import { useMemo, useReducer } from 'react'

import { AuthorizationActions, AuthorizationActionsTypes } from './AuthorizationActionTypes'
import { AuthorizationContext, IAuthorizationContext } from './AuthorizationContext'
import { AuthorizationViewsRouter } from './AuthorizationViewsRoutes'
import { AuthorizationSteps } from './config'

export interface InitialState {
  modal: boolean
  showBackButton: boolean
  initialRoute: string
  type: AuthorizationSteps | null
}

const initialState: InitialState = {
  modal: false,
  showBackButton: true,
  initialRoute: '',
  type: AuthorizationSteps.signIn,
}

const reducer = (state: InitialState, action: AuthorizationActionsTypes) => {
  switch (action.type) {
    case AuthorizationActions.SET_AUTHORIZATION_MODAL: {
      return { ...state, modal: action.payload }
    }
    case AuthorizationActions.SET_INITIAL_ROUTE: {
      return { ...state, initialRoute: action.payload }
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
