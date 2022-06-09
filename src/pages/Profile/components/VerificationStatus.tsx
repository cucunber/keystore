import { Box, Flex, Heading, Spacer, Tag } from '@chakra-ui/react'
import { VFC } from 'react'
import { Card } from 'components/Card/Card'
import { Levels } from 'components/Levels/Levels'

interface IVerificationStatus {
  level: number
}

export const steps = [
  {
    label: 'Register a Profile',
    isCompleted: true,
    step: 0,
    subtitle: 'Create a profile using your personal details.',
  },
  {
    label: 'Level 1',
    isCompleted: false,
    step: 1,
    subtitle: 'Trade up to a total amount of R15 000',
    buttonSubtitle: 'Upload a selfie and enable two-factor-authentication',
  },
  {
    label: 'Level 2',
    isCompleted: false,
    step: 2,
    subtitle: 'Deposit or withdraw up to R50 000 per month.',
    buttonSubtitle: 'Upload government issued ID',
  },
  {
    label: 'Level 3',
    isCompleted: false,
    step: 3,
    subtitle: 'Trade, deposit, withdraw without any limits.',
    buttonSubtitle: 'Upload proof of residential address.',
  },
]

export const VerificationStatus: VFC<IVerificationStatus> = ({ level }) => {
  const activeStep = steps.find(step => !step.isCompleted)

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
                Level {level}
              </Heading>
            </Tag>
          </Box>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Levels activeStep={activeStep?.step || 0} steps={steps} />
      </Card.Body>
    </Card>
  )
}
