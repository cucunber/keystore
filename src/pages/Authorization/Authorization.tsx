import { Button, Center, Circle, Flex } from '@chakra-ui/react'
import { Keyring } from '@shapeshiftoss/hdwallet-core'
import * as native from '@shapeshiftoss/hdwallet-native'
import { NativeHDWallet } from '@shapeshiftoss/hdwallet-native'
import { Vault } from '@shapeshiftoss/hdwallet-native-vault'
import { Dispatch, useEffect } from 'react'
import { useTranslate } from 'react-polyglot'
import { generatePath, matchPath, useHistory } from 'react-router'
import { KeyStoreLightIcon } from 'components/Icons/KeyStoreLight'
import { Page } from 'components/Layout/Page'
import { RawText } from 'components/Text'
import { AuthorizationActions } from 'context/AuthorizationProvider/AuthorizationActionTypes'
import { ActionTypes, WalletActions } from 'context/WalletProvider/actions'
import { SUPPORTED_WALLETS } from 'context/WalletProvider/config'
import { KeyManager } from 'context/WalletProvider/KeyManager'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'
import { useQuery } from 'hooks/useQuery/useQuery'
import { useWallet } from 'hooks/useWallet/useWallet'

async function connectCypressWallet(
  keyring: Keyring,
  dispatch: Dispatch<ActionTypes>,
  walletSeed: string,
  walletPassword: string,
) {
  // Import wallet
  const vault = await Vault.create()
  vault.meta.set('createdAt', Date.now())
  vault.set('#mnemonic', walletSeed)
  vault.seal()
  await vault.setPassword(walletPassword)
  vault.meta.set('name', 'CypressWallet')
  await Promise.all([navigator.storage?.persist?.(), vault.save()])
  // Load wallet
  const deviceId = vault.id
  const adapter = SUPPORTED_WALLETS[KeyManager.Native].adapter.useKeyring(keyring)
  const wallet = (await adapter.pairDevice(deviceId)) as NativeHDWallet
  const mnemonic = (await vault.get('#mnemonic')) as native.crypto.Isolation.Core.BIP39.Mnemonic
  mnemonic.addRevoker?.(() => vault.revoke())
  await wallet.loadDevice({ mnemonic, deviceId })
  const { name, icon } = SUPPORTED_WALLETS[KeyManager.Native]
  dispatch({
    type: WalletActions.SET_WALLET,
    payload: {
      wallet,
      name,
      icon,
      deviceId,
      meta: { label: vault.meta.get('name') as string },
    },
  })
  dispatch({ type: WalletActions.SET_WALLET_MODAL, payload: false })
}

export const Authorization = () => {
  const { dispatch: authDispatch } = useAuthorization()
  const { state, dispatch } = useWallet()

  const translate = useTranslate()

  const isCypressTest =
    localStorage.hasOwnProperty('cypressWalletSeed') &&
    localStorage.hasOwnProperty('cypressWalletPassword')
  const hasWallet = Boolean(state.walletInfo?.deviceId)

  const history = useHistory()
  const query = useQuery<{ returnUrl: string }>()
  useEffect(() => {
    // This handles reloading an asset's account page on Native/KeepKey. Without this, routing will break.
    // /:accountId/:assetId really is /:accountId/:chainId/:assetSubId e.g /accounts/eip155:1:0xmyPubKey/eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
    // The (/:chainId/:assetSubId) part is URI encoded as one entity in the regular app flow in <AssetAccountRow />, using generatePath()
    // This applies a similar logic here, that works with history.push()
    const match = matchPath<{
      accountId?: string
      chainId?: string
      assetSubId?: string
    }>(query.returnUrl, {
      path: '/accounts/:accountId/:chainId/:assetSubId',
    })
    const path = match
      ? generatePath('/accounts/:accountId/:assetId', {
          accountId: match?.params?.accountId ?? '',
          assetId: `${match?.params?.chainId ?? ''}/${match?.params?.assetSubId ?? ''}`,
        })
      : query?.returnUrl
    hasWallet && history.push(path ?? '/dashboard')
    // Programmatic login for Cypress tests
    // The first `!state.isConnected` filters any re-render if the wallet is already connected.
    if (isCypressTest && !state.isConnected) {
      const walletSeed = localStorage.getItem('cypressWalletSeed') || ''
      const walletPassword = localStorage.getItem('cypressWalletPassword') || ''
      connectCypressWallet(state.keyring, dispatch, walletSeed, walletPassword)
        .then(() => {
          // The second `!state.isConnected` filters any intent to redirect if the redirecting had already happened.
          if (!state.isConnected) {
            dispatch({ type: WalletActions.SET_IS_CONNECTED, payload: true })
            authDispatch({ type: AuthorizationActions.SET_AUTHORIZATION_MODAL, payload: false })
            history.push(query?.returnUrl ? query.returnUrl : '/dashboard')
          }
        })
        .catch(e => console.error(e))
    }
  }, [history, hasWallet, authDispatch, query, state, dispatch, isCypressTest])

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
              authDispatch({
                type: AuthorizationActions.SET_AUTHORIZATION_MODAL,
                payload: true,
              })
            }
          >
            Sign in
          </Button>
        </Center>
      </Flex>
    </Page>
  )
}
