import { RefObject } from 'react'

import { NativeWalletProvider } from './context/WalletProvider'

interface NativeWalletProps {
  btnRef?: RefObject<any>
}

export const NativeWallet = ({ btnRef }: NativeWalletProps) => {
  return <NativeWalletProvider btnRef={btnRef} />
}
