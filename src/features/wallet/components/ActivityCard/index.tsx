import { Box, Button, ButtonGroup, Flex, Spinner, Tooltip, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { NativeWalletActions } from 'features/wallet/context/WalletActionTypes'
import { useNativeWallet } from 'features/wallet/hooks/useNativeWallet/useNativeWallet'
import { TransactionSlim, TransactionStatus } from 'features/wallet/types'
import { chopAddress, formatText } from 'features/wallet/utils'
import { History } from 'history'
import { MouseEventHandler, useCallback, useEffect, useMemo } from 'react'
import { useTranslate } from 'react-polyglot'
import { Amount } from 'components/Amount/Amount'
import { RawText } from 'components/Text'

import { Address } from '../Address'
import { ApproveIcon } from '../icons/ApproveIcon'
import { ReceiveIcon } from '../icons/ReceiveIcon'
import { StakeIcon } from '../icons/StakeIcon'
import { SwapIcon } from '../icons/SwapIcon'

const functionToIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case 'stake': {
      return <StakeIcon />
    }
    case 'receive': {
      return <ReceiveIcon />
    }
    case 'approve': {
      return <ApproveIcon />
    }
    default: {
      return <SwapIcon />
    }
  }
}

type ActivityInfoBlockProps = Pick<TransactionSlim, 'date' | 'status' | 'asker'>

const ActivityInfoBlock = ({ date, status, asker }: ActivityInfoBlockProps) => {
  const currentStatus = useMemo(() => {
    let infoBlock = <RawText>{formatText(status, 'capitalize')}</RawText>
    switch (status) {
      case TransactionStatus.Success: {
        infoBlock = (
          <RawText fontSize='xs' display='inline-block' color='statuses.success'>
            {date ? dayjs(date * 1000).format('DD MMM') : formatText(status, 'capitalize')} &#8729;
          </RawText>
        )
        break
      }
      case TransactionStatus.Pending: {
        infoBlock = (
          <RawText fontSize='xs' display='inline-block' color='statuses.pending'>
            {formatText(status, 'capitalize')} &#8729;
          </RawText>
        )
        break
      }
      case TransactionStatus.Canceled:
      case TransactionStatus.Failed: {
        infoBlock = (
          <RawText fontSize='xs' display='inline-block' color='statuses.failed'>
            {formatText(status, 'capitalize')} &#8729;
          </RawText>
        )
        break
      }
      default:
        break
    }
    return infoBlock
  }, [date, status])

  return (
    <RawText fontSize='xs' color='keystore.200'>
      {currentStatus}{' '}
      <Tooltip size='xs' label={asker} aria-label='An asker tooltip'>
        {chopAddress({ address: asker })}
      </Tooltip>
    </RawText>
  )
}

type ActivityCardProps = {
  history: History
} & TransactionSlim

export const ActivityCard = ({
  hash,
  method,
  status,
  asker,
  amount,
  date,
  history,
}: ActivityCardProps) => {
  const {
    state: { network },
    dispatch,
  } = useNativeWallet()
  const { isLoading: isNetworkDataLoading, network: networkData } = network

  const translate = useTranslate()

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: NativeWalletActions.SET_NETWORK_STATUS,
        payload: false,
      })
    }, 1500)
  }, [dispatch])

  const spending = useMemo(() => {
    if (isNetworkDataLoading) {
      return <Spinner />
    }
    const { currency } = networkData
    return (
      <VStack alignItems='flex-end' justifyContent='space-evenly'>
        <Amount.Crypto
          fontSize='sm'
          color='keystorePrimarySlate.200'
          value={String(amount.amount)}
          symbol={currency.symbol}
          prefix='-'
        />
        <Amount.Fiat
          fontSize='xs'
          color='keystore.200'
          mt='0px !important'
          value={amount.amount * currency.usdPrice}
          prefix='-'
        />
      </VStack>
    )
  }, [amount.amount, isNetworkDataLoading, networkData])

  const activityCardClickHandler = useCallback(() => {
    history.push(`/activity/${hash}`)
  }, [hash, history])

  const activityCardCancelTransactionClickHandler: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      e => {
        e.preventDefault()
        history.push(`/activity/notification/${hash}/cancel`)
        e.stopPropagation()
      },
      [hash, history],
    )

  const activityCardSpeedUpClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault()
      history.push(`/activity/notification/${hash}/gas`)
      e.stopPropagation()
    },
    [hash, history],
  )

  return (
    <Flex
      width='100%'
      direction='column'
      alignItems='flex-start'
      padding='30px 15px'
      borderBottomColor='keystoreNeutral.100'
      borderBottomWidth='1px'
      cursor='pointer'
      onClick={activityCardClickHandler}
      transition='400ms ease-in-out'
      _hover={{
        bg: 'slate.25',
      }}
    >
      <Flex width='100%' alignItems='center' justifyContent='space-between'>
        <Address
          icon={
            <Flex
              alignItems='center'
              justifyContent='center'
              borderRadius='50%'
              background='keystoreNeutral.100'
              width='30px'
              height='30px'
              mr={2}
            >
              {functionToIcon(method.name)}
            </Flex>
          }
          address={method.name}
          info={ActivityInfoBlock({ status, date, asker })}
        />
        <Box>{spending}</Box>
      </Flex>
      {status === TransactionStatus.Pending && (
        <ButtonGroup mt={3} spacing={3}>
          <Button onClick={activityCardSpeedUpClickHandler} px={8} size='sm' colorScheme='lime'>
            {translate('wallet.common.speedUp')}
          </Button>
          <Button
            onClick={activityCardCancelTransactionClickHandler}
            px={8}
            size='sm'
            colorScheme='lime'
            variant='outline'
          >
            {translate('wallet.common.cancel')}
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  )
}
