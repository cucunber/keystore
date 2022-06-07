import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Card } from 'components/Card/Card';

export const SecuritySettings = () => {
  return (
    <Card p={4} w='370px' h='300px'>
      <Card.Header textAlign='left'>
        <Heading as='h4' size='md' color='keystone.200'>
          Security Settings
        </Heading>
      </Card.Header>
      <Card.Body>
        <Flex flexDirection='column'>
          <Flex alignItems='center'>
            <Checkbox />
            <Text color='slate.200' ml={3}>
              Keep me signed in
            </Text>
          </Flex>
          <Button variant='outline' colorScheme='lime' mt={5} mb={5} w='160px'>
            Change password
          </Button>
          <Divider color='keystone.150' />
          <Text color='keystone.200' mt={5} mb={3}>
            Two-Factor Authentication
          </Text>
          <Button colorScheme='lime' w='115px'>
            Enable 2FA
          </Button>
        </Flex>
      </Card.Body>
    </Card>
  );
};
