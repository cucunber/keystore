import { Avatar, Flex, Tooltip, useClipboard } from '@chakra-ui/react'
import { chopAddress } from 'features/wallet/utils'
import { MouseEventHandler, ReactElement } from 'react'
import { RawText } from 'components/Text'

interface AddressProps {
  address: string
  avatar?: string
  size?: 'sm' | 'md'
  icon?: ReactElement
  info?: ReactElement
  copyable?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const Address = ({
  avatar,
  address,
  size = 'sm',
  info,
  icon,
  copyable,
  onClick,
}: AddressProps) => {
  const { hasCopied, onCopy } = useClipboard(address)
  return (
    <Flex onClick={onClick} alignItems='center'>
      {icon ? icon : <Avatar name={address} src={avatar} size={size} mr={2} />}
      <Flex flexDirection='column' alignItems='flex-start' justifyContent='space-evenly'>
        <Tooltip isDisabled={!copyable} hasArrow size='xs' label={hasCopied ? 'Copied' : 'Copy'}>
          <RawText onClick={onCopy} fontSize={size} fontWeight={info ? 'bold' : 'semibold'}>
            {chopAddress({ address, format: 'capitalize' })}
          </RawText>
        </Tooltip>
        {info}
      </Flex>
    </Flex>
  )
}
