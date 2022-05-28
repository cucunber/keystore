export enum AuthorizationActions {
  SET_INITIAL_ROUTE = 'SET_INITIAL_ROUTE',
  SET_AUTHORIZATION_MODAL = 'SET_AUTHORIZATION_MODAL',
}

export type AuthorizationActionsTypes =
  | {
      type: AuthorizationActions.SET_AUTHORIZATION_MODAL
      payload: boolean
    }
  | {
      type: AuthorizationActions.SET_INITIAL_ROUTE
      payload: string
    }
