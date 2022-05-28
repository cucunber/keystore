import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react'
import { ChangeEventHandler, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslate } from 'react-polyglot'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'

export const SignIn = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  const onEmailChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget
    setEmail(value)
  }

  const onPasswordChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget
    setPassword(value)
  }

  const handleShowClick = () => setShowPw(!showPw)

  const translate = useTranslate()
  return (
    <>
      <ModalHeader>
        <Text translation='authorization.signIn.title' />
      </ModalHeader>
      <ModalBody>
        <Box>
          <FormControl>
            <FormLabel htmlFor='signIn-email'>
              <Text translation='authorization.common.email' />
            </FormLabel>
            <Input
              id='signIn-email'
              type='email'
              placeholder={translate('authorization.common.emailPlaceholder')}
              value={email}
              onChange={onEmailChangeHandler}
            />
          </FormControl>
        </Box>
        <Box>
          <FormLabel htmlFor='signIn-password'>
            <Text translation='authorization.common.password' />
          </FormLabel>
          <InputGroup size='lg' variant='filled'>
            <Input
              id='signIn-password'
              type='password'
              value={password}
              onChange={onPasswordChangeHandler}
            />
            <InputRightElement>
              <IconButton
                aria-label={translate(`modals.shapeShift.password.${showPw ? 'hide' : 'show'}`)}
                h='1.75rem'
                size='sm'
                onClick={handleShowClick}
                icon={!showPw ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>Captcha</Box>
        <Box>
          <Button
            variant='ghost'
            justifyContent='center'
            onClick={() => history.push('/recover-password')}
          >
            <Text translation='authorization.forgetPassword.title' />
          </Button>
        </Box>
      </ModalBody>
    </>
  )
}
