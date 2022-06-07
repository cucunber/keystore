import { Button, Checkbox, Divider, Flex } from '@chakra-ui/react'
import { Card } from 'components/Card/Card'
import { Text } from 'components/Text'
import { ProfileActions } from 'context/ProfileProvider/ProfileActionTypes'
import { useProfile } from 'hooks/useProfile/useProfile'

export const SecuritySettings = () => {
  const { dispatch } = useProfile()
  return (
    <Card p={4} w='370px' h='300px'>
      <Card.Header textAlign='left'>
        <Text as='h4' size='md' color='keystone.200' translation='profile.securitySettings.title' />
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
          <Divider color='keystone.150' />
          <Text
            color='keystone.200'
            mt={5}
            mb={3}
            translation='profile.securitySettings.twoFactorAuth'
          />
          <Button colorScheme='lime' w='115px'>
            <Text translation='profile.securitySettings.enable2FA' />
          </Button>
        </Flex>
      </Card.Body>
    </Card>
  )
}
