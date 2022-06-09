import { ReactNode, useMemo, useReducer } from 'react'

import { NetworkData } from '../types/network'
import { Transaction } from '../types/Transaction'
import { WalletManager } from './config'
import { NativeWalletActions, NativeWalletActionTypes } from './WalletActionTypes'
import { NativeWalletContext } from './WalletContext'
import { NativeWalletViewsRouter } from './WalletViewsRoutes'

export type AsyncField<T> = T & {
  isLoading: boolean
}

export interface InitialState {
  initialRoute: string
  type: WalletManager | null
  transaction: AsyncField<{ transactionList: Transaction[] }>
  lastTransaction: AsyncField<{ lastTransaction: Transaction | null }>
  showBackButton: boolean
  modal: boolean
  network: AsyncField<{ network: NetworkData }>
}

const initialState: InitialState = {
  initialRoute: '',
  type: WalletManager.Activity,
  transaction: {
    isLoading: true,
    transactionList: [],
  },
  network: {
    isLoading: true,
    network: {
      currency: {
        decimals: 18,
        symbol: 'ETH',
        name: 'ethereum',
        usdPrice: 1801.2329,
      },
      explorer: 'https://etherscan.io/',
    },
  },
  lastTransaction: {
    isLoading: true,
    lastTransaction: null,
  },
  showBackButton: true,
  modal: true,
}

const reducer = (state: InitialState, action: NativeWalletActionTypes): InitialState => {
  switch (action.type) {
    case NativeWalletActions.SET_INITIAL_ROUTE: {
      return {
        ...state,
        initialRoute: action.payload,
      }
    }
    case NativeWalletActions.SET_TRANSACTIONS: {
      const { transactions, shouldConcat } = action.payload
      return {
        ...state,
        transaction: {
          isLoading: false,
          transactionList: shouldConcat
            ? [...state.transaction.transactionList, ...transactions]
            : transactions,
        },
      }
    }
    case NativeWalletActions.SET_TRANSACTION_STATUS: {
      return {
        ...state,
        transaction: { ...state.transaction, isLoading: action.payload },
      }
    }
    case NativeWalletActions.SET_SHOW_BACK_BUTTON: {
      return {
        ...state,
        showBackButton: action.payload,
      }
    }
    case NativeWalletActions.SET_NATIVE_WALLET_MODAL: {
      return {
        ...state,
        modal: action.payload,
      }
    }
    case NativeWalletActions.SET_NETWORK_STATUS: {
      return {
        ...state,
        network: { ...state.network, isLoading: action.payload },
      }
    }
    case NativeWalletActions.SET_NETWORK: {
      return {
        ...state,
        network: {
          isLoading: false,
          network: action.payload,
        },
      }
    }
    case NativeWalletActions.SET_LAST_TRANSACTION: {
      return {
        ...state,
        lastTransaction: {
          isLoading: false,
          lastTransaction: action.payload,
        },
      }
    }
    case NativeWalletActions.SET_LAST_TRANSACTION_STATUS: {
      return {
        ...state,
        lastTransaction: {
          ...state.lastTransaction,
          isLoading: action.payload,
        },
      }
    }
    default: {
      return state
    }
  }
}

const getInitialState = () => {
  return initialState
}

interface NativeWalletProviderProps {
  children?: ReactNode
}

export const NativeWalletProvider = ({ children }: NativeWalletProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <NativeWalletContext.Provider value={value}>
      {children}
      <NativeWalletViewsRouter />
    </NativeWalletContext.Provider>
  )
}
