import { Flex } from '@chakra-ui/react';

import { SecuritySettings } from './SecuritySettings';
import { VerificationStatus } from './VerificationStatus';

export const ProfileBody = ({ level }: { level: number }) => {
  return (
    <Flex gap={5}>
      <VerificationStatus level={level} />
      <SecuritySettings />
    </Flex>
  );
};
