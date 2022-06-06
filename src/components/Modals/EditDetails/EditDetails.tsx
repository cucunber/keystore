import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { SlideTransition } from 'components/SlideTransition'
import { useModal } from 'hooks/useModal/useModal'
import { profile as profileSlice } from 'state/slices/profileSlice/profileSlice'
import { selectProfile } from 'state/slices/selectors'
import { useAppDispatch, useAppSelector } from 'state/store'

const EditDetails = () => {
  const dispatch = useAppDispatch()
  const { editDetails } = useModal()
  const { close, isOpen } = editDetails
  const { user } = useAppSelector(state => selectProfile(state))
  const [userData, setUserData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
  })

  const handleUserDataChange = (key: string, value: string) => {
    setUserData(prev => ({ ...prev, [key]: value }))
  }

  const handleUpdateProfile = useCallback(() => {
    dispatch(profileSlice.actions.updateProfile({ user: { ...user, ...userData } }))
    editDetails.close()
  }, [dispatch, editDetails, user, userData])

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent p={['64px', '60px', '50px']}>
        <SlideTransition>
          <ModalHeader textAlign='center'>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignItems='center' justifyContent='center' textAlign='center' pt={0} px={0}>
            <Stack width='full' p={0} spacing='18px'>
              <Flex gap={3}>
                <Flex flexDirection='column' width='full' alignItems='flex-start'>
                  <Text color='keystone.200' mb={1}>
                    First Name
                  </Text>
                  <Input
                    value={userData.firstName || user.firstName}
                    placeholder='Michael'
                    onChange={(event: any) =>
                      handleUserDataChange('firstName', event.currentTarget.value)
                    }
                  />
                </Flex>
                <Flex flexDirection='column' width='full' alignItems='flex-start'>
                  <Text color='keystone.200' mb={1}>
                    Last Name
                  </Text>
                  <Input
                    value={userData.lastName || user.lastName}
                    placeholder='Johnson'
                    onChange={(event: any) =>
                      handleUserDataChange('lastName', event.currentTarget.value)
                    }
                  />
                </Flex>
              </Flex>
              <Flex gap={3}>
                <Flex flexDirection='column' width='full' alignItems='flex-start'>
                  <Text color='keystone.200' mb={1}>
                    Mobile Number
                  </Text>
                  <Input
                    value={userData.phone || user.phone}
                    placeholder='+27 83 554 6753'
                    onChange={(event: any) =>
                      handleUserDataChange('phone', event.currentTarget.value)
                    }
                  />
                </Flex>
                <Flex flexDirection='column' width='full' alignItems='flex-start'>
                  <Text color='keystone.200' mb={1}>
                    Email
                  </Text>
                  <Input
                    value={userData.email || user.email}
                    placeholder='example@email.com'
                    onChange={(event: any) =>
                      handleUserDataChange('email', event.currentTarget.value)
                    }
                  />
                </Flex>
              </Flex>
              <Button colorScheme='lime' onClick={handleUpdateProfile}>
                Save Changes
              </Button>
            </Stack>
          </ModalBody>
        </SlideTransition>
      </ModalContent>
    </Modal>
  )
}

export const EditDetailsModal = EditDetails
