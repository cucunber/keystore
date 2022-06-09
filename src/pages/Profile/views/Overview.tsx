import { Main } from 'components/Layout/Main'
import { selectProfile } from 'state/slices/selectors'
import { useAppSelector } from 'state/store'

import { ProfileBody } from '../components/ProfileBody'
import { ProfileHeader } from '../components/ProfileHeader'

export const ProfileOverview = () => {
  const { user } = useAppSelector(state => selectProfile(state))
  return (
    <Main
      titleComponent={
        <ProfileHeader
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.phone}
          email={user.email}
        />
      }
    >
      <ProfileBody />
    </Main>
  )
}
