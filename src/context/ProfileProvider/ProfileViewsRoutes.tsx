import { MemoryRouter } from 'react-router-dom'

import { ProfileViewsSwitch } from './ProfileViewsSwitch'

export const ProfileViewsRouter = () => {
  return (
    <MemoryRouter initialIndex={0}>
      <ProfileViewsSwitch />
    </MemoryRouter>
  )
}
