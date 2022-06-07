import { ChangePassword } from './components/ChangePassword'
import { EditDetails } from './components/EditDetails'

export enum ProfileSteps {
  profile = 'profile',
}

export const PROFILE_STEPS = {
  [ProfileSteps.profile]: {
    routes: [
      { path: '/change-password', component: ChangePassword },
      { path: '/edit-details', component: EditDetails },
    ],
  },
}
