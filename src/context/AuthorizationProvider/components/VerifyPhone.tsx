import {
  Button,
  Flex,
  HStack,
  ModalBody,
  ModalHeader,
  PinInput,
  PinInputField,
  Text as ChakraText,
  useMediaQuery,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'
import { useTimer } from 'hooks/useTimer'
import { breakpoints } from 'theme/theme'

import { AuthorizationActions } from '../AuthorizationActionTypes'
export const VerifyPhone = ({ history }: RouteComponentProps) => {
  const { start, seconds, formate } = useTimer({ timer: 300 })

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)

  const resendDisabled = useMemo(() => seconds !== 0, [seconds])
  const {
    state: {
      accessoryInfo: { phone },
    },
    dispatch,
  } = useAuthorization()

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
    if (pinValue.length === 4) {
      dispatch({ type: AuthorizationActions.SET_SHOW_BACK_BUTTON, payload: false })
      history.push('/verify-phone/waiting')
    }
  }, [dispatch, history, pinValue.length])

  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='keystoneNeutral.200'
          size='50px'
          fontWeight='extrabold'
          translation='authorization.verifyMobile.title'
        />
      </ModalHeader>
      <ModalBody>
        <Text
          textAlign='center'
          width='95%'
          translation='authorization.verifyMobile.subtitle'
          margin='0 auto'
          color='keystone.200'
          fontWeight='medium'
          size='lg'
        />
        <ChakraText textAlign='center' color='keystone.200' fontWeight='bold' size='lg'>
          {phone}
        </ChakraText>
        <Text
          textAlign='center'
          width='95%'
          translation='authorization.verifyMobile.enterCode'
          margin='0 auto'
          color='keystone.200'
          fontWeight='medium'
          size='lg'
          mt={4}
          mb={4}
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
