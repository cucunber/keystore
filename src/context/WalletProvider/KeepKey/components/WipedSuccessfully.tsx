import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, Flex, ModalBody, ModalHeader } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Text } from 'components/Text'
import { KeepKeyRoutes } from 'context/WalletProvider/routes'
import { useWallet } from 'hooks/useWallet/useWallet'

export const WipedSuccessfully = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { setDeviceState } = useWallet()

  useEffect(() => {
    setDeviceState({ disposition: undefined })
  }, [setDeviceState])

  const handleCreateWalletPress = async () => {
    setLoading(true)
    setDeviceState({ disposition: 'initializing' })
    history.push(KeepKeyRoutes.NewLabel)
  }

  const handleRecoverWalletPress = async () => {
    setLoading(true)
    setDeviceState({ disposition: 'recovering' })
    history.push(KeepKeyRoutes.RecoverySettings)
  }

  return (
    <>
      <ModalHeader>
        <Flex alignItems='center'>
          <CheckCircleIcon color='green.400' mr={3} />
          <Text translation={'modals.keepKey.wiped.header'} />
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Text color='gray.500' translation={'modals.keepKey.wiped.body'} mb={4} />
        <Button
          isFullWidth
          size='lg'
          colorScheme='lime'
          onClick={handleCreateWalletPress}
          disabled={loading}
          mb={3}
        >
          <Text translation={'modals.keepKey.wiped.createButton'} />
        </Button>
        <Button
          isFullWidth
          size='lg'
          onClick={handleRecoverWalletPress}
          disabled={loading}
          variant='outline'
          border='none'
        >
          <Text translation={'modals.keepKey.wiped.recoverButton'} />
        </Button>
      </ModalBody>
    </>
  )
}
