import React, { useContext } from 'react'
import { IProfileContext, ProfileContext } from 'context/ProfileProvider/ProfileContext'

export const useProfile = (): IProfileContext =>
  useContext(ProfileContext as React.Context<IProfileContext>)
