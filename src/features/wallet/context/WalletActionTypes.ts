import { setTransactionPayload, Transaction } from '../types'
import { NetworkData } from '../types/network'

export enum NativeWalletActions {
  SET_INITIAL_ROUTE = 'SET_INITIAL_ROUTE',
  SET_SHOW_BACK_BUTTON = 'SET_SHOW_BACK_BUTTON',
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
  SET_TRANSACTION_STATUS = 'SET_TRANSACTION_STATUS',
  SET_NETWORK = 'SET_NETWORK',
  SET_NETWORK_STATUS = 'SET_NETWORK_STATUS',
  SET_NATIVE_WALLET_MODAL = 'SET_NATIVE_WALLET_MODAL',
  SET_LAST_TRANSACTION = 'SET_LAST_TRANSACTION',
  SET_LAST_TRANSACTION_STATUS = 'SET_LAST_TRANSACTION_STATUS',
}

export type NativeWalletActionTypes =
  | { type: NativeWalletActions.SET_INITIAL_ROUTE; payload: string }
  | { type: NativeWalletActions.SET_SHOW_BACK_BUTTON; payload: boolean }
  | { type: NativeWalletActions.SET_TRANSACTIONS; payload: setTransactionPayload }
  | { type: NativeWalletActions.SET_NATIVE_WALLET_MODAL; payload: boolean }
  | { type: NativeWalletActions.SET_TRANSACTION_STATUS; payload: boolean }
  | { type: NativeWalletActions.SET_NETWORK; payload: NetworkData }
  | { type: NativeWalletActions.SET_NETWORK_STATUS; payload: boolean }
  | { type: NativeWalletActions.SET_LAST_TRANSACTION; payload: Transaction }
  | { type: NativeWalletActions.SET_LAST_TRANSACTION_STATUS; payload: boolean }
