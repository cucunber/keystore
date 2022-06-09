import { INativeWalletContext, NativeWalletContext } from 'features/wallet/context/WalletContext'
import { Context, useContext } from 'react'

export const useNativeWallet = (): INativeWalletContext =>
  useContext(NativeWalletContext as Context<INativeWalletContext>)
