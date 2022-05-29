import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslate } from 'react-polyglot'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'

export const RecoverPassword = ({ history }: RouteComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const translate = useTranslate()

  const onSendResetClick = (data: FieldValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='keystoneNeutral.200'
          size='50px'
          fontWeight='extrabold'
          translation='authorization.forgetPassword.title'
        />
      </ModalHeader>
      <ModalBody>
        <Text
          textAlign='center'
          width='95%'
          translation='authorization.forgetPassword.provideEmail'
          margin='0 auto'
          color='keystone.200'
          fontWeight='medium'
          size='lg'
        />
        <Box>
          <FormControl>
            <FormLabel mt={6} htmlFor='recovery-email'>
              <Text fontSize='13px' color='keystone.200' translation='authorization.common.email' />
            </FormLabel>
            <Input
              id='recovery-email'
              type='email'
              size='lg'
              variant='filled'
              placeholder={translate('authorization.common.emailPlaceholder')}
              {...register('email', {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
          </FormControl>
        </Box>
        <Flex justifyContent='flex-end'>
          <Button
            onClick={handleSubmit(onSendResetClick)}
            disabled={!isValid}
            paddingLeft='50px'
            paddingRight='50px'
            size='lg'
            variant='solid'
            colorScheme='lime'
            mt={10}
          >
            <Text translation='authorization.forgetPassword.sendResetLink' />
          </Button>
        </Flex>
      </ModalBody>
    </>
  )
}
