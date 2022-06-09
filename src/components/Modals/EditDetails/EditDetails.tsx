import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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
// import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// import { object, string } from 'yup'
import { SlideTransition } from 'components/SlideTransition'
import { useModal } from 'hooks/useModal/useModal'
import { profile as profileSlice } from 'state/slices/profileSlice/profileSlice'
import { selectProfile } from 'state/slices/selectors'
import { useAppDispatch, useAppSelector } from 'state/store'

// const registerValidator = object().shape({
//   firstName: string().min(2),
//   lastName: string().min(2),
//   phone: string().test('is-phone', '', phone =>
//     phone ? new RegExp(/^\+?(27)[ -]?\d{2}[ -]?\d{3}[ -]?\d{2}$/gm).test(phone) : false,
//   ),
//   email: string().email(),
// })
const EditDetails = () => {
  const dispatch = useAppDispatch()
  const { editDetails } = useModal()
  const { close, isOpen } = editDetails
  const { user } = useAppSelector(state => selectProfile(state))
  const { register, handleSubmit } = useForm()
  const handleUpdateProfile = (data: FieldValues) => {
    dispatch(
      profileSlice.actions.updateProfile({
        user: {
          ...user,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
      }),
    )
    editDetails.close()
  }

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
                <FormControl>
                  <Flex flexDirection='column' width='full' alignItems='flex-start'>
                    <FormLabel htmlFor='register-first-name'>
                      <Text color='keystore.200' mb={1}>
                        First Name
                      </Text>
                    </FormLabel>
                    <Input
                      id='register-first-name'
                      placeholder='Michael'
                      {...register('firstName', {
                        minLength: 2,
                      })}
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex flexDirection='column' width='full' alignItems='flex-start'>
                    <FormLabel htmlFor='register-last-name'>
                      <Text color='keystore.200' mb={1}>
                        Last Name
                      </Text>
                    </FormLabel>
                    <Input
                      id='register-last-name'
                      placeholder='Johnson'
                      {...register('lastName', {
                        minLength: 2,
                      })}
                    />
                  </Flex>
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <Flex flexDirection='column' width='full' alignItems='flex-start'>
                    <FormLabel htmlFor='register-phone'>
                      <Text color='keystore.200' mb={1}>
                        Mobile Number
                      </Text>
                    </FormLabel>
                    <Input
                      id='register-phone'
                      placeholder='+27 83 554 6753'
                      {...register('phone')}
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex flexDirection='column' width='full' alignItems='flex-start'>
                    <FormLabel htmlFor='register-email'>
                      <Text color='keystore.200' mb={1}>
                        Email
                      </Text>
                    </FormLabel>
                    <Input
                      id='register-email'
                      placeholder='example@email.com'
                      {...register('email')}
                    />
                  </Flex>
                </FormControl>
              </Flex>
              <Button
                // disabled={!isValid}
                colorScheme='lime'
                onClick={handleSubmit(handleUpdateProfile)}
              >
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
