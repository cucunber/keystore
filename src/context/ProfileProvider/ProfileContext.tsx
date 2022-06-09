import { createContext } from 'react'

import { ProfileActionsTypes } from './ProfileActionTypes'
import { InitialState } from './ProfileProvider'

export interface IProfileContext {
  state: InitialState
  dispatch: React.Dispatch<ProfileActionsTypes>
}

export const ProfileContext = createContext<IProfileContext | null>(null)
