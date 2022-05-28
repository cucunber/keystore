import { createContext } from 'react'

import { AuthorizationActionsTypes } from './AuthorizationActionTypes'
import { InitialState } from './AuthorizationProvider'

export interface IAuthorizationContext {
  state: InitialState
  dispatch: React.Dispatch<AuthorizationActionsTypes>
}

export const AuthorizationContext = createContext<IAuthorizationContext | null>(null)
