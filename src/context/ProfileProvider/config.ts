import { ChangePassword } from './components/ChangePassword'
import { EditDetails } from './components/EditDetails'
import { Enable2FA } from './components/Enable2FA'

export enum ProfileSteps {
  profile = 'profile',
}

export const PROFILE_STEPS = {
  [ProfileSteps.profile]: {
    routes: [
      { path: '/change-password', component: ChangePassword },
      { path: '/edit-details', component: EditDetails },
      { path: '/enable-2fa', component: Enable2FA },
    ],
  },
}
