import { Button, Center, Circle, Flex } from '@chakra-ui/react'
import { useTranslate } from 'react-polyglot'
import { KeyStoreLightIcon } from 'components/Icons/KeyStoreLight'
import { Page } from 'components/Layout/Page'
import { RawText } from 'components/Text'
import { AuthorizationActions } from 'context/AuthorizationProvider/AuthorizationActionTypes'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'

export const Authorization = () => {
  const { dispatch } = useAuthorization()
  const translate = useTranslate()
  return (
    <Page>
      <Flex
        direction={'column'}
        gap={4}
        width='full'
        bg='keystonePrimarySlate.200'
        position='fixed'
        zIndex={3}
        py={3}
        px={4}
        bottom={0}
        alignItems={'center'}
      >
        <Center flexDir='column' height='100vh' px={6}>
          <Circle size='100px' mb={6}>
            <KeyStoreLightIcon boxSize='100%' color='white' />
          </Circle>
          <Flex flexDir='row' textAlign='center' fontSize={{ base: '6xl', lg: '8xl' }} mb={6}>
            <RawText color='white' fontWeight='medium' lineHeight='1'>
              {translate('connectWalletPage.exploreThe')}{' '}
              <RawText color='lime.200' fontWeight='bold' as='span'>
                {translate('connectWalletPage.defiUniverse')}
              </RawText>
            </RawText>
          </Flex>
          <Button
            size='lg'
            onClick={() =>
              dispatch({ type: AuthorizationActions.SET_AUTHORIZATION_MODAL, payload: true })
            }
          >
            Sign in
          </Button>
        </Center>
      </Flex>
    </Page>
  )
}
