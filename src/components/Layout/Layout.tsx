import { Container, ContainerProps, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { selectProfile } from 'state/slices/selectors'
import { useAppSelector } from 'state/store'

import { CompleteProfile } from './CompleteProfile'
import { Header } from './Header/Header'
import { SideNav } from './Header/SideNav'

type LayoutProps = ContainerProps

export const Layout: React.FC<LayoutProps> = ({ children, ...rest }) => {
  const [isShowCompleteProfile, setIsShowCompleteProfile] = useState(true)
  const handleClose = () => setIsShowCompleteProfile(false)
  const { user } = useAppSelector(state => selectProfile(state))
  return (
    <>
      <Header />

      <Flex>
        <SideNav />
        <Container
          as='main'
          maxWidth='full'
          width='full'
          paddingBottom={{ base: 'calc(0 + env(safe-area-inset-bottom))', md: 0 }}
          marginInline='auto'
          paddingInlineStart='0'
          paddingInlineEnd='0'
          flex='1 1 0%'
          {...rest}
        >
          {isShowCompleteProfile && user.level === 0 && (
            <CompleteProfile onClose={handleClose} has2FA={user.is2FAEnabled} />
          )}
          {children}
        </Container>
      </Flex>
    </>
  )
}
