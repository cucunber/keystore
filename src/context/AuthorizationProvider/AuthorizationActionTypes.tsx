import { AccessoryInfo } from './AuthorizationProvider'

export enum AuthorizationActions {
  SET_INITIAL_ROUTE = 'SET_INITIAL_ROUTE',
  SET_AUTHORIZATION_MODAL = 'SET_AUTHORIZATION_MODAL',
  SET_SHOW_BACK_BUTTON = 'SET_SHOW_BACK_BUTTON',
  SET_ACCESSORY_INFO = 'SET_ACCESSORY_INFO',
}

export type AuthorizationActionsTypes =
  | {
      type: AuthorizationActions.SET_AUTHORIZATION_MODAL
      payload: boolean
    }
  | {
      type: AuthorizationActions.SET_INITIAL_ROUTE
      payload: string
    }
  | {
      type: AuthorizationActions.SET_SHOW_BACK_BUTTON
      payload: boolean
    }
  | {
      type: AuthorizationActions.SET_ACCESSORY_INFO
      payload: Partial<AccessoryInfo>
    }
