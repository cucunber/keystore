import { ModalBody, ModalHeader } from '@chakra-ui/react'
import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'

export const VerifyPhoneWaiting = ({ history }: RouteComponentProps) => {
  useEffect(() => {
    setTimeout(() => {
      history.push('/verify-email')
    }, 3000)
  }, [history])

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
        <Loader />
      </ModalBody>
    </>
  )
}
