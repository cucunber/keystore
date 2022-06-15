import { IconButton } from '@chakra-ui/react'
import { RefObject } from 'react'
import { NotificationBellIcon } from 'components/Icons/NotificationBell'
import { colors } from 'theme/colors'

interface BullButtonProps {
  onClick: () => void
  hasUnseen: boolean
  active: boolean
  btnRef: RefObject<HTMLButtonElement>
}

export const BellButton = ({ onClick, hasUnseen, active, btnRef }: BullButtonProps) => {
  return (
    <IconButton
      ref={btnRef}
      aria-label='notification-bell-icon'
      onClick={onClick}
      icon={<NotificationBellIcon />}
      position='relative'
      variant='link'
      bg={active ? 'keystore.white' : 'transparent'}
      boxShadow={active ? colors.notificationsShadow : 'none'}
      borderRadius='50% 50% 0 0'
      width='30px'
      height='30px'
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        bg: hasUnseen ? 'statuses.failed' : 'transparent',
      }}
    />
  )
}
