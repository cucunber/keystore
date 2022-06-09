import { Flex } from '@chakra-ui/react'
import { VFC } from 'react'

import { SecuritySettings } from './SecuritySettings'
import { VerificationStatus } from './VerificationStatus'

interface IProfileBody {
  level: number
}

export const ProfileBody: VFC<IProfileBody> = ({ level }) => {
  return (
    <Flex gap={5}>
      <VerificationStatus level={level} />
      <SecuritySettings />
    </Flex>
  )
}
