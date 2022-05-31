import React, { useContext } from 'react'
import {
  AuthorizationContext,
  IAuthorizationContext,
} from 'context/AuthorizationProvider/AuthorizationContext'

export const useAuthorization = (): IAuthorizationContext =>
  useContext(AuthorizationContext as React.Context<IAuthorizationContext>)
