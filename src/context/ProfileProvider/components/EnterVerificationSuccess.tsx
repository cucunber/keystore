import { Button, Flex, ModalBody, ModalHeader, useMediaQuery } from '@chakra-ui/react'
import { useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { SuccessCheckIcon } from 'components/Icons/SuccessCheck'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'
import { breakpoints } from 'theme/theme'

import { ProfileActions } from '../ProfileActionTypes'

export const EnterVerificationSuccess = ({ history }: RouteComponentProps) => {
  const { dispatch } = useProfile()
  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)
  const onDoneClickHandler = useCallback(() => {
    dispatch({ type: ProfileActions.SET_PROFILE_MODAL, payload: { modal: false, route: '' } })
  }, [dispatch])
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
          color='keystoneNeutral.200'
          size='18px'
          fontWeight='bold'
          translation='profile.enterVerificationSuccess.subtitle'
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
