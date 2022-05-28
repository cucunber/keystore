import { SignIn } from './components/SignIn'

export enum AuthorizationSteps {
  signIn = 'signIn',
}

export const AUTHORIZATION_STEPS = {
  [AuthorizationSteps.signIn]: {
    routes: [
      { path: '/recover-password', component: SignIn },
      { path: '/registration', component: SignIn },
      { path: '/confirm-phone', component: SignIn },
      { path: '/confirm-email', component: SignIn },
    ],
  },
}
