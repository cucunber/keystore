import { MemoryRouter } from 'react-router-dom'

import { NativeWalletViewsSwitch } from './WalletViewsSwitch'

export const NativeWalletViewsRouter = () => {
  return (
    <MemoryRouter initialIndex={0}>
      <NativeWalletViewsSwitch />
    </MemoryRouter>
  )
}
