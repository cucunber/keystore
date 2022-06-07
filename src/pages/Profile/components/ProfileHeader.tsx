import { Box, Button, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import { VFC } from 'react'
import profile from 'assets/profile.svg'
import { EditIcon } from 'components/Icons/Edit'
import { MailIcon } from 'components/Icons/Mail'
import { PhoneIcon } from 'components/Icons/Phone'
import { SignOutIcon } from 'components/Icons/SignOut'
import { useModal } from 'hooks/useModal/useModal'

interface IProfileHeader {
  firstName: string
  lastName: string
  phone: string
  email: string
}

export const ProfileHeader: VFC<IProfileHeader> = ({ firstName, lastName, phone, email }) => {
  const { editDetails } = useModal()
  return (
    <Box p={['0', '8']}>
      <Flex mb={8}>
        <Box display='flex' alignItems='center'>
          <Image src={profile} />
          <Text ml={4} fontSize={['md', 'lg', '3xl']}>
            {firstName} {lastName}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Button leftIcon={<EditIcon />} colorScheme='gray' onClick={() => editDetails.open()}>
            Edit Details
          </Button>
          <Button leftIcon={<SignOutIcon />} variant='outline' colorScheme='slate' ml={2.5}>
            Sign Out
          </Button>
        </Box>
      </Flex>
      <Flex>
        {phone && (
          <Box display='flex' alignItems='center'>
            <MailIcon />
            <Text ml={3} fontSize={['xs', 's', 'md']}>
              {phone}
            </Text>
          </Box>
        )}
        {email && (
          <Box display='flex' alignItems='center' ml={20}>
            <PhoneIcon />
            <Text ml={3} fontSize={['xs', 's', 'md']}>
              {email}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  )
}
