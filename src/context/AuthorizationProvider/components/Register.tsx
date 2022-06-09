import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalHeader,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslate } from 'react-polyglot'
import { RouteComponentProps } from 'react-router'
import { object, ref, string } from 'yup'
import { Text } from 'components/Text'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'
import { breakpoints } from 'theme/theme'

import { AuthorizationActions } from '../AuthorizationActionTypes'

const registerValidator = object().shape({
  firstName: string().min(2).required(),
  secondName: string().min(2).required(),
  phone: string()
    .required()
    .test('is-phone', '', phone =>
      phone ? new RegExp(/^\+?(27)[ -]?\d{2}[ -]?\d{3}[ -]?\d{2}$/gm).test(phone) : false,
    ),
  email: string().email().required(),
  password: string()
    .min(8)
    .required()
    .test('only romans', '', pass => (pass ? new RegExp(/[a-z][0-9]*/i).test(pass) : false))
    .test('with upper', '', pass => (pass ? new RegExp(/[A-Z]/).test(pass) : false))
    .test('with lower', '', pass => (pass ? new RegExp(/[a-z]/).test(pass) : false))
    .test('with numbers', '', pass => (pass ? new RegExp(/[0-9]/).test(pass) : false)),
  confirm: string()
    .required()
    .oneOf([ref('password')]),
})

export const Register = ({ history }: RouteComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(registerValidator),
  })

  const [showPw, setShowPw] = useState(false)
  const [showConf, setShowConf] = useState(false)

  const { dispatch } = useAuthorization()

  const translate = useTranslate()

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)

  const onSendRegistrationClick = (data: FieldValues) => {
    dispatch({
      type: AuthorizationActions.SET_ACCESSORY_INFO,
      payload: { email: data.email, phone: data.phone },
    })
    history.push('/verify-phone')
  }

  const handleShowClick = () => setShowPw(!showPw)
  const handleShowClickConf = () => setShowConf(!showConf)

  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='keystoreNeutral.200'
          size='50px'
          fontWeight='extrabold'
          translation='authorization.register.title'
        />
      </ModalHeader>
      <ModalBody>
        <Text
          textAlign='center'
          width='95%'
          translation='authorization.register.subtitle'
          margin='0 auto'
          color='keystore.200'
          fontWeight='medium'
          size='lg'
        />
        <Stack direction={isLargerThanMd ? 'row' : 'column'} mt={6} spacing='10px'>
          <FormControl>
            <FormLabel htmlFor='register-first-name'>
              <Text
                fontSize='13px'
                color='keystore.200'
                translation='authorization.common.firstName'
              />
            </FormLabel>
            <Input
              id='register-first-name'
              type='text'
              size='lg'
              variant='filled'
              placeholder={translate('authorization.common.firstNamePlaceholder')}
              {...register('firstName', {
                required: true,
                minLength: 2,
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='register-second-name'>
              <Text
                fontSize='13px'
                color='keystore.200'
                translation='authorization.common.lastName'
              />
            </FormLabel>
            <Input
              id='register-second-name'
              type='text'
              size='lg'
              variant='filled'
              placeholder={translate('authorization.common.lastNamePlaceholder')}
              {...register('secondName', {
                required: true,
                minLength: 2,
              })}
            />
          </FormControl>
        </Stack>
        <Stack direction={isLargerThanMd ? 'row' : 'column'} mt={4} spacing='10px'>
          <FormControl>
            <FormLabel htmlFor='register-phone'>
              <Text
                fontSize='13px'
                color='keystore.200'
                translation='authorization.common.mobileNumber'
              />
            </FormLabel>
            <Input
              id='register-phone'
              type='tel'
              size='lg'
              variant='filled'
              placeholder={translate('authorization.common.mobileNumberPlaceholder')}
              {...register('phone', {
                required: true,
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='register-email'>
              <Text fontSize='13px' color='keystore.200' translation='authorization.common.email' />
            </FormLabel>
            <Input
              id='register-email'
              type='email'
              size='lg'
              variant='filled'
              placeholder={translate('authorization.common.emailPlaceholder')}
              {...register('email', {
                required: true,
              })}
            />
          </FormControl>
        </Stack>
        <Box mt={4}>
          <FormLabel htmlFor='register-password'>
            <Text
              fontSize='13px'
              color='keystore.200'
              translation='authorization.register.createPassword'
            />
          </FormLabel>
          <InputGroup size='lg' variant='filled'>
            <Input
              id='register-password'
              type={showPw ? 'text' : 'password'}
              placeholder='**********'
              {...register('password', {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={translate(`modals.shapeShift.password.${showPw ? 'hide' : 'show'}`)}
                h='1.75rem'
                size='sm'
                variant='ghost'
                onClick={handleShowClick}
                icon={!showPw ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Stack mt={1} direction='row' spacing='100px'>
          <Box>
            <Text
              fontSize='13px'
              color='keystore.200'
              translation={['authorization.common.passwordRules.minCharsAmount', { amount: 8 }]}
            />
            <Text
              fontSize='13px'
              color='keystore.200'
              translation='authorization.common.passwordRules.alphabet'
            />
            <Text
              fontSize='13px'
              color='keystore.200'
              translation={['authorization.common.passwordRules.uppercaseAmount', { amount: 1 }]}
            />
          </Box>
          <Box>
            <Text
              fontSize='13px'
              color='keystore.200'
              translation={['authorization.common.passwordRules.lowercaseAmount', { amount: 1 }]}
            />
            <Text
              fontSize='13px'
              color='keystore.200'
              translation={['authorization.common.passwordRules.numberAmount', { amount: 1 }]}
            />
          </Box>
        </Stack>

        <Box mt={4}>
          <FormLabel htmlFor='register-confirm-password'>
            <Text
              fontSize='13px'
              color='keystore.200'
              translation='authorization.register.confirmPassword'
            />
          </FormLabel>
          <InputGroup size='lg' variant='filled'>
            <Input
              id='register-confirm-password'
              type={showConf ? 'text' : 'password'}
              placeholder='**********'
              {...register('confirm', {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={translate(`modals.shapeShift.password.${showConf ? 'hide' : 'show'}`)}
                h='1.75rem'
                size='sm'
                variant='ghost'
                onClick={handleShowClickConf}
                icon={!showConf ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>Captcha</Box>
        <Stack
          mt={8}
          direction={{ md: 'row', base: 'column' }}
          spacing={{ base: 2, md: 8 }}
          justifyContent='space-between'
          alignItems='center'
        >
          <Flex justifyContent='space-between' alignItems='center'>
            <Text
              mr={1}
              fontSize='lg'
              color='lime.200'
              translation='authorization.register.haveAccount'
              fontWeight='normal'
            />
            <Button variant='link' onClick={() => history.push('/')}>
              <Text
                color='lime.200'
                fontSize='lg'
                translation='authorization.signIn.title'
                fontWeight='medium'
                textDecoration='underline'
              />
            </Button>
          </Flex>
          <Button
            onClick={handleSubmit(onSendRegistrationClick)}
            disabled={!isValid}
            paddingLeft='50px'
            paddingRight='50px'
            size='lg'
            variant='solid'
            colorScheme='lime'
          >
            <Text translation='authorization.register.createAccount' />
          </Button>
        </Stack>
      </ModalBody>
    </>
  )
}
