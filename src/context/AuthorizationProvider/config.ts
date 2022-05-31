import { RecoverPassword } from './components/RecoverPassword'
import { RecoverPasswordWaiting } from './components/RecoverPasswordWaiting'
import { Register } from './components/Register'
import { SignIn } from './components/SignIn'
import { VerifyPhone } from './components/VerifyPhone'
import { VerifyPhoneWaiting } from './components/VerifyPhoneWaiting'

export enum AuthorizationSteps {
  signIn = 'signIn',
}

export const AUTHORIZATION_STEPS = {
  [AuthorizationSteps.signIn]: {
    routes: [
      { path: '/recover-password', component: RecoverPassword },
      { path: '/recover-password/waiting', component: RecoverPasswordWaiting },
      { path: '/registration', component: Register },
      { path: '/verify-phone', component: VerifyPhone },
      { path: '/verify-phone/waiting', component: VerifyPhoneWaiting },
      { path: '/verify-email', component: SignIn },
    ],
  },
}
