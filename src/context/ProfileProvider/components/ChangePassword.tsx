import {
  Box,
  Button,
  Flex,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'

import { ProfileActions } from '../ProfileActionTypes'

export const ChangePassword = ({ history }: RouteComponentProps) => {
  const {
    register,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const [showCurrPw, setShowCurrPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfPw, setShowConfPw] = useState(false)

  const { dispatch } = useProfile()

  const handleShowCurrClick = () => setShowCurrPw(!showCurrPw)
  const handleShowNewClick = () => setShowNewPw(!showNewPw)
  const handleShowConfClick = () => setShowConfPw(!showConfPw)

  const handleSavePassword = () => {
    dispatch({
      type: ProfileActions.SET_PROFILE_MODAL,
      payload: { modal: false, route: '/' },
    })
  }
  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='keystoneNeutral.200'
          size='50px'
          fontWeight='extrabold'
          translation='profile.changePassword.title'
        />
      </ModalHeader>
      <ModalBody>
        <Box mt={4}>
          <FormLabel htmlFor='current-password'>
            <Text
              fontSize='13px'
              color='keystone.200'
              translation='profile.changePassword.currentPassword'
            />
          </FormLabel>
          <InputGroup size='lg' variant='filled'>
            <Input
              id='current-password'
              type={showCurrPw ? 'text' : 'password'}
              placeholder='**********'
              {...register('password', {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showCurrPw ? 'hide' : 'show'}
                h='1.75rem'
                size='sm'
                variant='ghost'
                onClick={handleShowCurrClick}
                icon={!showCurrPw ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box mt={4}>
          <FormLabel htmlFor='new-password'>
            <Text
              fontSize='13px'
              color='keystone.200'
              translation='profile.changePassword.newPassword'
            />
          </FormLabel>
          <InputGroup size='lg' variant='filled'>
            <Input
              id='new-password'
              type={showNewPw ? 'text' : 'password'}
              placeholder='**********'
              {...register('password', {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showNewPw ? 'hide' : 'show'}
                h='1.75rem'
                size='sm'
                variant='ghost'
                onClick={handleShowNewClick}
                icon={!showNewPw ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex mt={1}>
          <Box mr='100px'>
            <Text
              fontSize='13px'
              color='keystone.200'
              translation={['authorization.common.passwordRules.minCharsAmount', { amount: 8 }]}
            />
            <Text
              fontSize='13px'
              color='keystone.200'
              translation='authorization.common.passwordRules.alphabet'
            />
            <Text
              fontSize='13px'
              color='keystone.200'
              translation={['authorization.common.passwordRules.uppercaseAmount', { amount: 1 }]}
            />
          </Box>
          <Box>
            <Text
              fontSize='13px'
              color='keystone.200'
              translation={['authorization.common.passwordRules.lowercaseAmount', { amount: 1 }]}
            />
            <Text
              fontSize='13px'
              color='keystone.200'
              translation={['authorization.common.passwordRules.numberAmount', { amount: 1 }]}
            />
          </Box>
        </Flex>
        <Box mt={4}>
          <FormLabel htmlFor='confirm-password'>
            <Text
              fontSize='13px'
              color='keystone.200'
              translation='profile.changePassword.confirmPassword'
            />
          </FormLabel>
          <InputGroup size='lg' variant='filled'>
            <Input
              id='confirm-password'
              type={showConfPw ? 'text' : 'password'}
              placeholder='**********'
              {...register('password', {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showConfPw ? 'hide' : 'show'}
                h='1.75rem'
                size='sm'
                variant='ghost'
                onClick={handleShowConfClick}
                icon={!showConfPw ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex justifyContent='flex-end' mt={10}>
          <Button
            onClick={handleSavePassword}
            disabled={!isValid}
            paddingLeft='50px'
            paddingRight='50px'
            size='lg'
            variant='solid'
            colorScheme='lime'
          >
            <Text translation='profile.changePassword.saveChanges' />
          </Button>
        </Flex>
      </ModalBody>
    </>
  )
}
