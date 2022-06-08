import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalHeader,
  Stack,
} from '@chakra-ui/react'
// import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslate } from 'react-polyglot'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'
// import { object, string } from 'yup'
import { profile as profileSlice } from 'state/slices/profileSlice/profileSlice'
import { selectProfile } from 'state/slices/selectors'
import { useAppDispatch, useAppSelector } from 'state/store'

import { ProfileActions } from '../ProfileActionTypes'

// const registerValidator = object().shape({
//   firstName: string().min(2),
//   lastName: string().min(2),
//   phone: string().test('is-phone', '', phone =>
//     phone ? new RegExp(/^\+?(27)[ -]?\d{2}[ -]?\d{3}[ -]?\d{2}$/gm).test(phone) : false,
//   ),
//   email: string().email(),
// })
export const EditDetails = () => {
  const dispatch = useAppDispatch()
  const { dispatch: profileDispatch } = useProfile()
  const { user } = useAppSelector(state => selectProfile(state))
  const translate = useTranslate()
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
    profileDispatch({
      type: ProfileActions.SET_PROFILE_MODAL,
      payload: { modal: false, route: '' },
    })
  }

  return (
    <>
      <ModalHeader textAlign='center'>Edit Details</ModalHeader>
      <ModalBody alignItems='center' justifyContent='center' textAlign='center' pt={0} px={0}>
        <Stack width='full' p={0} spacing='18px'>
          <Flex gap={3}>
            <FormControl>
              <Flex flexDirection='column' width='full' alignItems='flex-start'>
                <FormLabel htmlFor='register-first-name'>
                  <Text color='keystone.200' mb={1} translation='authorization.common.firstName' />
                </FormLabel>
                <Input
                  id='register-first-name'
                  placeholder={translate('authorization.common.firstNamePlaceholder')}
                  {...register('firstName', {
                    minLength: 2,
                  })}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex flexDirection='column' width='full' alignItems='flex-start'>
                <FormLabel htmlFor='register-last-name'>
                  <Text color='keystone.200' mb={1} translation='authorization.common.lastName' />
                </FormLabel>
                <Input
                  id='register-last-name'
                  placeholder={translate('authorization.common.lastNamePlaceholder')}
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
                  <Text
                    color='keystone.200'
                    mb={1}
                    translation='authorization.common.mobileNumber'
                  />
                </FormLabel>
                <Input
                  id='register-phone'
                  placeholder={translate('authorization.common.mobileNumberPlaceholder')}
                  {...register('phone')}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex flexDirection='column' width='full' alignItems='flex-start'>
                <FormLabel htmlFor='register-email'>
                  <Text color='keystone.200' mb={1} translation='authorization.common.email' />
                </FormLabel>
                <Input
                  id='register-email'
                  placeholder={translate('authorization.common.emailPlaceholder')}
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
            <Text translation='profile.changePassword.saveChanges' />
          </Button>
        </Stack>
      </ModalBody>
    </>
  )
}
