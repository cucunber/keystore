import { Box, Flex, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import {
  NotificationModel,
  NotificationStatus,
} from 'components/Notification/context/NotificationProvider'
import { RawText } from 'components/Text'

interface NotificationItemProps extends NotificationModel {}

type TStatusColor = { [key in NotificationStatus]: string }
const statusColor: TStatusColor = {
  common: 'keystore.white',
  failed: 'statuses.failed',
  pending: 'statuses.pending',
  success: 'statuses.success',
}

export const NotificationItem = ({
  type,
  date,
  title,
  data,
  hasBeenRead,
}: NotificationItemProps) => {
  const onItemClickHandler = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('addition item data', data)
  }, [data])

  return (
    <HStack
      width='100%'
      onClick={onItemClickHandler}
      bg={hasBeenRead ? 'keystore.50' : 'transparent'}
      padding='0 0 0 16px'
      height='68px'
      spacing={2}
      transition='400ms ease-in-out'
      cursor='pointer'
      _hover={{
        bg: 'keystore.100',
      }}
    >
      <Flex alignItems='center' justifyContent='center'>
        <Box bg={statusColor[type]} width='8px' height='8px' borderRadius='50%' />
      </Flex>
      <Flex
        pr='10px'
        borderBottom='1px solid'
        borderBottomColor='keystoreNeutral.100'
        height='100%'
        flex='1'
      >
        <Box alignSelf='center'>
          <RawText>{title}</RawText>
        </Box>
        <Box pt='10px' flex='0 0 10%' ml='auto'>
          <RawText fontSize='10px' color='gray.dark'>
            {dayjs(date * 1000).fromNow()}
          </RawText>
        </Box>
      </Flex>
    </HStack>
  )
}
