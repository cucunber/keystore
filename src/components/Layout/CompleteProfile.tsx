import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Card } from 'components/Card/Card'
import { SuccessCheckIcon } from 'components/Icons/SuccessCheck'
import { Text } from 'components/Text'
import { ProfileActions } from 'context/ProfileProvider/ProfileActionTypes'
import { useProfile } from 'hooks/useProfile/useProfile'

type CompleteProfileProps = {
  onClose: () => void
  has2FA: boolean
}

export const CompleteProfile: React.FC<CompleteProfileProps> = ({ onClose, has2FA }) => {
  const { dispatch } = useProfile()
  return (
    <Card p={4} m={4}>
      <Card.Header textAlign='left'>
        <Flex>
          <SuccessCheckIcon width='42px' height='50px' mr={4} />
          <Box>
            <Text
              translation='completeProfile.title'
              fontWeight='extrabold'
              transform='uppercase'
              color='slate.200'
            />
            <Text
              translation='completeProfile.subtitle'
              fontWeight='semibold'
              color='keystoreNeutral.200'
            />
          </Box>
          <Spacer />
          <CloseIcon onClick={onClose} cursor='pointer' />
        </Flex>
      </Card.Header>
      <Card.Body display='flex'>
        <Button
          onClick={() =>
            dispatch({
              type: ProfileActions.SET_PROFILE_MODAL,
              payload: { route: '/edit-details', modal: true },
            })
          }
          colorScheme='lime'
        >
          <Text translation='completeProfile.completeProfile' />
        </Button>

        {!has2FA && (
          <Button
            colorScheme='lime'
            w='115px'
            variant='outline'
            ml={3}
            onClick={() =>
              dispatch({
                type: ProfileActions.SET_PROFILE_MODAL,
                payload: { route: '/enable-2fa', modal: true },
              })
            }
          >
            <Text translation='completeProfile.enable2FA' />
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
