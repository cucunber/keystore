import { RefObject } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { NativeWalletViewsSwitch } from './WalletViewsSwitch'

interface NativeWalletViewsRouterProps {
  btnRef?: RefObject<any>
}

export const NativeWalletViewsRouter = ({ btnRef }: NativeWalletViewsRouterProps) => {
  return (
    <MemoryRouter initialIndex={0}>
      <NativeWalletViewsSwitch btnRef={btnRef} />
    </MemoryRouter>
  )
}
