import { ChangePassword } from './components/ChangePassword'

export enum ProfileSteps {
  profile = 'profile',
}

export const PROFILE_STEPS = {
  [ProfileSteps.profile]: {
    routes: [{ path: '/change-password', component: ChangePassword }],
  },
}
