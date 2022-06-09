import { ChangePassword } from './components/ChangePassword'
import { EditDetails } from './components/EditDetails'
import { Enable2FA } from './components/Enable2FA'
import { EnterVerificationCode } from './components/EnterVerificationCode'
import { EnterVerificationSuccess } from './components/EnterVerificationSuccess'
import { LevelVerification1 } from './components/LevelVerification1'
import { LevelVerification2 } from './components/LevelVerification2'
import { LevelVerification3 } from './components/LevelVerification3'

export enum ProfileSteps {
  profile = 'profile',
}

export const PROFILE_STEPS = {
  [ProfileSteps.profile]: {
    routes: [
      { path: '/change-password', component: ChangePassword },
      { path: '/edit-details', component: EditDetails },
      { path: '/enable-2fa', component: Enable2FA },
      { path: '/enter-verification', component: EnterVerificationCode },
      { path: '/enter-verification/success', component: EnterVerificationSuccess },
      { path: '/level-verification1', component: LevelVerification1 },
      { path: '/level-verification2', component: LevelVerification2 },
      { path: '/level-verification3', component: LevelVerification3 },
    ],
  },
}
