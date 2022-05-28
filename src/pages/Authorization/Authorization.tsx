import { Button, Flex } from '@chakra-ui/react'
import { Page } from 'components/Layout/Page'
import { AuthorizationActions } from 'context/AuthorizationProvider/AuthorizationActionTypes'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'

export const Authorization = () => {
  const { dispatch } = useAuthorization()
  return (
    <Page>
      <Flex
        direction={'column'}
        gap={4}
        width='full'
        bg='gray.900'
        position='fixed'
        zIndex={3}
        py={3}
        px={4}
        bottom={0}
        alignItems={'center'}
      >
        <Button
          onClick={() =>
            dispatch({ type: AuthorizationActions.SET_AUTHORIZATION_MODAL, payload: true })
          }
        >
          Sign in
        </Button>
      </Flex>
    </Page>
  )
}
