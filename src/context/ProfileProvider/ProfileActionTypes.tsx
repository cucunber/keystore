import { ProfileSteps } from './config'
import { AccessoryInfo } from './ProfileProvider'

export enum ProfileActions {
  SET_INITIAL_ROUTE = 'SET_INITIAL_ROUTE',
  SET_PROFILE_MODAL = 'SET_PROFILE_MODAL',
  SET_CHANGE_PASSWORD_MODAL = 'SET_CHANGE_PASSWORD_MODAL',
  SET_SHOW_BACK_BUTTON = 'SET_SHOW_BACK_BUTTON',
  SET_ACCESSORY_INFO = 'SET_ACCESSORY_INFO',
}

export type ProfileActionsTypes =
  | {
      type: ProfileActions.SET_PROFILE_MODAL
      payload: { route: string; modal: boolean }
    }
  | {
      type: ProfileActions.SET_CHANGE_PASSWORD_MODAL
      payload: { type: ProfileSteps; modal: boolean }
    }
  | {
      type: ProfileActions.SET_INITIAL_ROUTE
      payload: string
    }
  | {
      type: ProfileActions.SET_SHOW_BACK_BUTTON
      payload: boolean
    }
  | {
      type: ProfileActions.SET_ACCESSORY_INFO
      payload: Partial<AccessoryInfo>
    }
