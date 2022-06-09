import { Flex } from '@chakra-ui/react'

import { SecuritySettings } from './SecuritySettings'
import { VerificationStatus } from './VerificationStatus'

export const ProfileBody = () => {
  return (
    <Flex gap={5}>
      <VerificationStatus />
      <SecuritySettings />
    </Flex>
  )
}
