import { Box, Flex, Spinner, useMediaQuery } from '@chakra-ui/react'
import { useCallback, useMemo, useRef } from 'react'
import { useOnClickOutside } from 'hooks/useClickOutside/useClickOutside'
import { colors } from 'theme/colors'
import { breakpoints } from 'theme/theme'

import { BellButton } from './components/BellButton'
import { NotificationItem } from './components/NotificationItem'
import { NotificationActions } from './context/NotificationActionTypes'
import { useNotificationContext } from './context/NotificationContext'
import { NotificationProvider } from './context/NotificationProvider'

const NotificationBody = () => {
  const {
    state: { notification, isOpen },
    dispatch,
  } = useNotificationContext()

  const btnRef = useRef<HTMLButtonElement | null>(null)
  const notifyRef = useRef<HTMLDivElement | null>(null)

  const onOutsideClickHandler = useCallback(() => {
    dispatch({ type: NotificationActions.SET_NOTIFICATION_OPEN, payload: false })
  }, [dispatch])

  useOnClickOutside(notifyRef, onOutsideClickHandler, btnRef)

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)

  const hasUnseen = useMemo(
    () => notification.notifications.some(n => !n.hasBeenRead),
    [notification],
  )

  const onBellButtonClickHandler = useCallback(() => {
    dispatch({ type: NotificationActions.TOGGLE_NOTIFICATION_OPEN })
  }, [dispatch])

  const sortedNotifications = useMemo(
    () => [...notification.notifications].sort((a, b) => b.date - a.date),
    [notification.notifications],
  )

  return (
    <Box position='relative' ml='auto'>
      <BellButton
        btnRef={btnRef}
        active={isOpen}
        onClick={onBellButtonClickHandler}
        hasUnseen={hasUnseen}
      />
      <Box
        ref={notifyRef}
        position='absolute'
        top='100%'
        bg='keystore.white'
        boxShadow={colors.notificationsShadow}
        borderRadius='10px'
        transition='450ms ease-in-out'
        transform={isOpen ? 'scale(1)' : 'scale(0)'}
        transformOrigin={isLargerThanMd ? '0 10px' : 'calc(100% - 10px) 0'}
        pointerEvents={isOpen ? 'all' : 'none'}
        width={isLargerThanMd ? '450px' : '90vw'}
        py='10px'
        maxHeight='290px'
        overflowY='auto'
        zIndex={4}
        style={{ ...(isLargerThanMd ? { left: '-10px' } : { right: '-10px' }) }}
      >
        <Flex direction='column' alignItems='center'>
          {notification.isLoading ? (
            <Spinner size='lg' />
          ) : (
            sortedNotifications.map(notification => (
              <NotificationItem key={notification.date} {...notification} />
            ))
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export const Notification = () => {
  return (
    <NotificationProvider>
      <NotificationBody />
    </NotificationProvider>
  )
}
