import { Box, Flex, Heading, Spacer, Tag } from '@chakra-ui/react'
import { Card } from 'components/Card/Card'
import { Levels } from 'components/Levels/Levels'
import { selectProfile } from 'state/slices/selectors'
import { useAppSelector } from 'state/store'

export const VerificationStatus = () => {
  const { user } = useAppSelector(state => selectProfile(state))
  const steps = [
    {
      label: 'Register a Profile',
      isCompleted: 'Complete',
      step: 0,
      subtitle: 'Create a profile using your personal details.',
    },
    {
      label: 'Level 1',
      isCompleted: (() => {
        if (user.level >= 1 && user.is2FAEnabled) {
          return 'Complete'
        }
        if (user.level >= 1 && !user.is2FAEnabled) {
          return 'Pending'
        }
        return 'Incomplete'
      })(),
      step: 1,
      subtitle: 'Trade up to a total amount of R15 000',
      buttonSubtitle: 'Upload a selfie and enable two-factor-authentication',
    },
    {
      label: 'Level 2',
      isCompleted: user.level >= 2 ? 'Complete' : 'Incomplete',
      step: 2,
      subtitle: 'Deposit or withdraw up to R50 000 per month.',
      buttonSubtitle: 'Upload government issued ID',
    },
    {
      label: 'Level 3',
      isCompleted: user.level === 3 ? 'Complete' : 'Incomplete',
      step: 3,
      subtitle: 'Trade, deposit, withdraw without any limits.',
      buttonSubtitle: 'Upload proof of residential address.',
    },
  ]

  return (
    <Card p={4} w='full'>
      <Card.Header textAlign='left'>
        <Flex>
          <Box display='flex' alignItems='center'>
            <Heading as='h4' size='md' color='keystone.200'>
              Verification Status
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Tag bgColor='lime.bg' color='slate.200'>
              <Heading as='h4' size='md'>
                Level {user.level}
              </Heading>
            </Tag>
          </Box>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Levels activeStep={user.level + 1 || 0} steps={steps} />
      </Card.Body>
    </Card>
  )
}
