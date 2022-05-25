import { InfoIcon } from '@chakra-ui/icons'
import { FlexProps } from '@chakra-ui/layout'
import { Box, Button, Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import Polyglot from 'node-polyglot'
import React from 'react'
import { useTranslate } from 'react-polyglot'
import { Text } from 'components/Text'
import { useWallet } from 'hooks/useWallet/useWallet'

export type AwaitKeepKeyProps = {
  translation: string | null | [string, number | Polyglot.InterpolationOptions]
  children?: React.ReactNode
  onCancel?: () => Promise<void> | void
} & FlexProps

export const AwaitKeepKey = ({ children, translation, onCancel, ...props }: AwaitKeepKeyProps) => {
  const translate = useTranslate()
  const {
    setDeviceState,
    state: {
      deviceState: { awaitingDeviceInteraction },
      wallet,
    },
    load,
  } = useWallet()
  const limeShade = useColorModeValue('lime.200', 'lime.200')

  const cancel = async () => {
    if (onCancel) {
      await onCancel()
    }
    setDeviceState({ awaitingDeviceInteraction: false })
    await wallet?.cancel()
    await load()
  }

  return awaitingDeviceInteraction ? (
    <>
      <Divider />
      <Box p={3}>
        <Flex {...props}>
          <InfoIcon color={limeShade} mt={1} />
          <Box ml={3}>
            <Text translation={translation} mb={3} fontWeight='medium' color={limeShade} />
            <Button colorScheme='lime' variant='ghost-filled' onClick={cancel} size='sm'>
              {translate('common.cancel')}
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  ) : (
    <>{children}</>
  )
}
