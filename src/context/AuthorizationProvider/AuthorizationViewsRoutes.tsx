import { MemoryRouter } from 'react-router-dom'

import { AuthorizationViewsSwitch } from './AuthorizationViewsSwitch'

export const AuthorizationViewsRouter = () => {
  return (
    <MemoryRouter initialIndex={0}>
      <AuthorizationViewsSwitch />
    </MemoryRouter>
  )
}
