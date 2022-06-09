import { createContext, Dispatch } from 'react'

import { NativeWalletActionTypes } from './WalletActionTypes'
import { InitialState } from './WalletProvider'

export interface INativeWalletContext {
  state: InitialState
  dispatch: Dispatch<NativeWalletActionTypes>
}

export const NativeWalletContext = createContext<INativeWalletContext | null>(null)
