import {
  Button,
  Flex,
  HStack,
  ModalBody,
  ModalHeader,
  PinInput,
  PinInputField,
  useMediaQuery,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'
import { useTimer } from 'hooks/useTimer'
import { selectProfile } from 'state/slices/selectors'
import { useAppSelector } from 'state/store'
import { breakpoints } from 'theme/theme'

import { ProfileActions } from '../ProfileActionTypes'

export const EnterVerificationCode = ({ history }: RouteComponentProps) => {
  const { user } = useAppSelector(state => selectProfile(state))
  const { start, seconds, formate, finish } = useTimer({
    timer: 300,
    id: user.is2FAEnabled ? 'disable-verification' : 'enable-verification',
  })
  const { dispatch } = useProfile()

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)

  const resendDisabled = useMemo(() => seconds !== 0, [seconds])

  const [pinValue, setPinValue] = useState('')

  useEffect(() => {
    start()
  }, [start])

  const onResendClickHandler = useCallback(() => {
    start()
  }, [start])

  const formattedTimer = useMemo(() => {
    const { m, s } = formate(seconds)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [formate, seconds])

  useEffect(() => {
    if (pinValue.length === 5) {
      dispatch({ type: ProfileActions.SET_SHOW_BACK_BUTTON, payload: false })
      history.push('/enter-verification/success')
      finish()
    }
  }, [dispatch, finish, history, pinValue.length])
  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='slate.200'
          size='30px'
          fontWeight='extrabold'
          translation={
            user.is2FAEnabled
              ? ['profile.enterVerificationCode.titleDisable', { email: user.email }]
              : 'profile.enterVerificationCode.titleEnable'
          }
        />
      </ModalHeader>
      <ModalBody alignItems='center' justifyContent='center' textAlign='center' pt={0} px={0}>
        <Text
          color='keystoreNeutral.200'
          size='18px'
          fontWeight='bold'
          translation={
            user.is2FAEnabled
              ? ['profile.enterVerificationCode.subtitleDisable', { email: user.email }]
              : 'profile.enterVerificationCode.subtitleEnable'
          }
        />
        <Flex alignItems='center' justifyContent='center'>
          <HStack>
            <PinInput value={pinValue} onChange={setPinValue} placeholder='' variant='filled'>
              <PinInputField
                minWidth={isLargerThanMd ? '70px' : '50px'}
                height={isLargerThanMd ? '70px' : '50px'}
              />
              <PinInputField
                minWidth={isLargerThanMd ? '70px' : '50px'}
                height={isLargerThanMd ? '70px' : '50px'}
              />
              <PinInputField
                minWidth={isLargerThanMd ? '70px' : '50px'}
                height={isLargerThanMd ? '70px' : '50px'}
              />
              <PinInputField
                minWidth={isLargerThanMd ? '70px' : '50px'}
                height={isLargerThanMd ? '70px' : '50px'}
              />
              <PinInputField
                minWidth={isLargerThanMd ? '70px' : '50px'}
                height={isLargerThanMd ? '70px' : '50px'}
              />
            </PinInput>
          </HStack>
        </Flex>
        <Flex
          maxWidth={isLargerThanMd ? '50%' : '100%'}
          margin='0 auto'
          alignItems='center'
          justifyContent='flex-start'
          mt={3}
        >
          <Button mr={2} variant='outline' onClick={onResendClickHandler} disabled={resendDisabled}>
            <Text translation='authorization.common.resend' />
          </Button>
          {formattedTimer}
        </Flex>
      </ModalBody>
    </>
  )
}
