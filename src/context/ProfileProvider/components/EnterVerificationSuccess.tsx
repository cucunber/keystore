import { Button, Flex, ModalBody, ModalHeader, useMediaQuery } from '@chakra-ui/react'
import { useCallback } from 'react'
import { SuccessCheckIcon } from 'components/Icons/SuccessCheck'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'
import { profile as profileSlice } from 'state/slices/profileSlice/profileSlice'
import { selectProfile } from 'state/slices/selectors'
import { useAppDispatch, useAppSelector } from 'state/store'
import { breakpoints } from 'theme/theme'

import { ProfileActions } from '../ProfileActionTypes'

export const EnterVerificationSuccess = () => {
  const dispatch = useAppDispatch()
  const { dispatch: profileDispatch } = useProfile()
  const { user } = useAppSelector(state => selectProfile(state))
  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)
  const onDoneClickHandler = useCallback(() => {
    dispatch(
      profileSlice.actions.updateUser({
        ...user,
        is2FAEnabled: !user.is2FAEnabled,
      }),
    )
    profileDispatch({
      type: ProfileActions.SET_PROFILE_MODAL,
      payload: { modal: false, route: '' },
    })
  }, [dispatch, profileDispatch, user])
  return (
    <>
      <ModalHeader textAlign='center'>
        <SuccessCheckIcon width='42px' height='50px' />
        <Text
          color='slate.200'
          size='30px'
          fontWeight='extrabold'
          translation='profile.enterVerificationSuccess.title'
        />
      </ModalHeader>
      <ModalBody alignItems='center' justifyContent='center' textAlign='center' pt={0} px={0}>
        <Text
          color='keystoreNeutral.200'
          size='18px'
          fontWeight='bold'
          mt={8}
          translation={
            user.is2FAEnabled
              ? 'profile.enterVerificationSuccess.subtitleDisabled'
              : 'profile.enterVerificationSuccess.subtitleEnabled'
          }
        />
        <Flex
          maxWidth={isLargerThanMd ? '50%' : '100%'}
          margin='0 auto'
          alignItems='center'
          justifyContent='flex-end'
          mt={3}
        >
          <Button mr={2} colorScheme='lime' onClick={onDoneClickHandler}>
            <Text translation='profile.enterVerificationSuccess.done' />
          </Button>
        </Flex>
      </ModalBody>
    </>
  )
}
