import { Button, Flex, ModalBody, ModalHeader, Text as ChakraText } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'
import { useTimer } from 'hooks/useTimer'
export const RecoverPasswordWaiting = ({ history }: RouteComponentProps) => {
  const { start, seconds, formate } = useTimer({ timer: 300 })

  const resendDisabled = useMemo(() => seconds !== 0, [seconds])
  const {
    state: {
      accessoryInfo: { email },
    },
  } = useAuthorization()

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

  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='keystoneNeutral.200'
          size='50px'
          fontWeight='extrabold'
          translation='authorization.checkInbox.title'
        />
      </ModalHeader>
      <ModalBody>
        <Text
          textAlign='center'
          width='95%'
          translation='authorization.checkInbox.sendMessage'
          margin='0 auto'
          color='keystone.200'
          fontWeight='medium'
          size='lg'
        />
        <ChakraText textAlign='center' color='keystone.200' fontWeight='bold' size='lg'>
          {email}
        </ChakraText>
        <Text
          textAlign='center'
          width='95%'
          translation='authorization.checkInbox.followTo'
          margin='0 auto'
          color='keystone.200'
          fontWeight='medium'
          size='lg'
          mt={4}
          mb={4}
        />
        <Flex alignItems='center' justifyContent='center'>
          <Button mr={2} variant='outline' onClick={onResendClickHandler} disabled={resendDisabled}>
            <Text translation='authorization.common.resend' />
          </Button>
          {formattedTimer}
        </Flex>
      </ModalBody>
    </>
  )
}
