import { Link, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { RawText } from 'components/Text'
import { useModal } from 'hooks/useModal/useModal'
import { useWallet } from 'hooks/useWallet/useWallet'

interface RedirectModalProps {
  href?: string
}

export const RedirectModal = ({ href = 'https://gnosios.vercel.app/' }: RedirectModalProps) => {
  const { redirect } = useModal()
  const { close, isOpen } = redirect
  const { state } = useWallet()
  const userAddress = state.walletInfo?.meta?.address || ''
  const walletProvider = state.walletInfo?.name || ''
  const hrefWithQueryAddress = (() => {
    if (href) {
      const urlObject = new URL(href)
      urlObject.searchParams.append('userAddress', userAddress)
      urlObject.searchParams.append('walletProvider', walletProvider)
      return urlObject.toString()
    }
    return ''
  })()
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent p={4}>
        <RawText textAlign='center'>
          You will be redirected to the{' '}
          <RawText fontWeight={600}>
            <a href={href} target='_blank' rel='noreferrer'>
              {href}
            </a>
          </RawText>
        </RawText>
        <RawText textAlign='center'>
          Please connect your wallet with this address:{' '}
          <RawText fontWeight={600}>{userAddress}</RawText>
        </RawText>
        <RawText textAlign='center'>
          and this provider:
          <RawText fontWeight={600}>{walletProvider}</RawText>
        </RawText>
        <Link
          mt={6}
          colorScheme='green'
          isExternal
          href={hrefWithQueryAddress}
          target='_blank'
          variant='filled'
          rel='noreferrer'
          width='100%'
          textAlign='center'
        >
          Let's go
        </Link>
      </ModalContent>
    </Modal>
  )
}
