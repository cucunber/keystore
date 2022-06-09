import { Button, Checkbox, Divider, Flex } from '@chakra-ui/react'
import { Card } from 'components/Card/Card'
import { Text } from 'components/Text'
import { ProfileActions } from 'context/ProfileProvider/ProfileActionTypes'
import { useProfile } from 'hooks/useProfile/useProfile'
import { selectProfile } from 'state/slices/selectors'
import { useAppSelector } from 'state/store'

export const SecuritySettings = () => {
  const { dispatch } = useProfile()
  const { user } = useAppSelector(state => selectProfile(state))
  return (
    <Card p={3} w='370px' h='300px'>
      <Card.Header textAlign='left'>
        <Text as='h4' size='md' color='keystore.200' translation='profile.securitySettings.title' />
      </Card.Header>
      <Card.Body>
        <Flex flexDirection='column'>
          <Flex alignItems='center'>
            <Checkbox />
            <Text color='slate.200' ml={3} translation='profile.securitySettings.keepSign' />
          </Flex>
          <Button
            variant='outline'
            colorScheme='lime'
            mt={5}
            mb={5}
            w='160px'
            onClick={() =>
              dispatch({
                type: ProfileActions.SET_PROFILE_MODAL,
                payload: { route: '/change-password', modal: true },
              })
            }
          >
            <Text translation='profile.securitySettings.changePassword' />
          </Button>
          <Divider color='keystore.150' />
          <Text
            color='keystore.200'
            mt={5}
            mb={3}
            translation='profile.securitySettings.twoFactorAuth'
          />
          <Button
            colorScheme='lime'
            w='115px'
            variant={user.is2FAEnabled ? 'outline' : 'solid'}
            onClick={() =>
              dispatch({
                type: ProfileActions.SET_PROFILE_MODAL,
                payload: { route: '/enable-2fa', modal: true },
              })
            }
          >
            <Text
              translation={
                user.is2FAEnabled
                  ? 'profile.securitySettings.disable2FA'
                  : 'profile.securitySettings.enable2FA'
              }
            />
          </Button>
        </Flex>
      </Card.Body>
    </Card>
  )
}
