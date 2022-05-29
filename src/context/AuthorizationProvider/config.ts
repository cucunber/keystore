import { RecoverPassword } from './components/RecoverPassword'
import { Register } from './components/Register'
import { SignIn } from './components/SignIn'

export enum AuthorizationSteps {
  signIn = 'signIn',
}

export const AUTHORIZATION_STEPS = {
  [AuthorizationSteps.signIn]: {
    routes: [
      { path: '/recover-password', component: RecoverPassword },
      { path: '/registration', component: Register },
      { path: '/confirm-phone', component: SignIn },
      { path: '/confirm-email', component: SignIn },
    ],
  },
}
