import { chakra, useColorModeValue } from '@chakra-ui/react'
import { DemoConfig } from 'context/WalletProvider/DemoWallet/config'
import { useWallet } from 'hooks/useWallet/useWallet'

import { SideNavContent } from './SideNavContent'

export const SideNav = () => {
  const bg = useColorModeValue('white', 'gray.850')
  const borderColor = useColorModeValue('gray.100', 'gray.750')
  const {
    state: { walletInfo },
  } = useWallet()
  const top = walletInfo?.deviceId === DemoConfig.name ? '7rem' : '4.5rem'
  return (
    <>
      <chakra.header
        paddingTop={`env(safe-area-inset-top)`}
        bg={bg}
        borderRightWidth={1}
        borderColor={borderColor}
        left='0'
        right='0'
        height={`calc(100vh - ${top})`}
        position='sticky'
        top={top}
        maxWidth='xs'
        flex={{ base: 'inherit' }}
        display={{ base: 'none', md: 'flex' }}
      >
        <SideNavContent isCompact={true} />
      </chakra.header>
    </>
  )
}
