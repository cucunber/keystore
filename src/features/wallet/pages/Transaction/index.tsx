import { AddIcon, CopyIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Link,
  Spinner,
  Tooltip,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import { Address } from 'features/wallet/components/Address'
import { ArrowRightIcon } from 'features/wallet/components/icons/ArrowRightIcon'
import { useNativeWallet } from 'features/wallet/hooks/useNativeWallet/useNativeWallet'
import { Transaction } from 'features/wallet/types'
import { formatText } from 'features/wallet/utils'
import { History } from 'history'
import { useEffect, useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { useParams } from 'react-router-dom'
import { Amount } from 'components/Amount/Amount'
import { RawText, Text } from 'components/Text'

type TransactionProps = {
  history: History
}

const statusColorMap = {
  pending: 'statuses.pending',
  success: 'statuses.success',
  failed: 'statuses.failed',
  canceled: 'statuses.failed',
  queued: 'statuses.queued',
}

interface ActivityItemProps {
  activity: string
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  return (
    <Box
      my={2}
      pl={4}
      position='relative'
      _before={{
        position: 'absolute',
        content: '""',
        top: '50%',
        left: '-10px',
        width: '16px',
        height: '16px',
        bg: 'lime.200',
        borderRadius: '50%',
        transform: 'translateY(-50%)',
      }}
      _after={{
        position: 'absolute',
        content: '""',
        top: '100%',
        left: '-3px',
        width: '1px',
        height: '100%',
        bg: 'lime.200',
        transform: 'translateY(-50%)',
      }}
      _last={{
        _after: {
          display: 'none',
        },
      }}
    >
      <RawText fontSize='xs' color='keystore.200'>
        {activity}
      </RawText>
    </Box>
  )
}

export const TransactionInfo = ({}: TransactionProps) => {
  const { hash } = useParams<{ hash: string }>()
  const {
    state: { transaction, network },
  } = useNativeWallet()

  const { transactionList } = transaction
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)
  const translate = useTranslate()

  useEffect(() => {
    setTimeout(() => {
      const selectedTransaction = transactionList.find(trans => trans.hash === hash)
      if (selectedTransaction) {
        setCurrentTransaction(selectedTransaction)
      }
    }, 1500)
    return () => {
      setCurrentTransaction(null)
    }
  }, [hash, transactionList])

  const { hasCopied: hasHashCopied, onCopy: onTransactionCopy } = useClipboard(hash)
  const { onCopy: onRawDataCopy } = useClipboard(currentTransaction?.method.rawData || '')

  if (!currentTransaction) {
    return (
      <Flex minHeight='620px' alignItems='center' justifyContent='center'>
        <Spinner size='xl' />
      </Flex>
    )
  }

  const { currency } = network.network
  const { method, status, from, to, nonce, amount, fee, logs } = currentTransaction

  return (
    <Box maxHeight='620px' px='20px' overflowY='auto'>
      <RawText ml={8} mb={8} mt='3px' fontSize='lg' fontWeight='bold' color='keystoreNeutral.200'>
        {formatText(method.name, 'capitalize')}
      </RawText>
      <Flex alignItems='center' justifyContent='space-between'>
        <Text
          fontSize='md'
          fontWeight='bold'
          color='keystoreNeutral.200'
          translation='wallet.transaction.status'
        />
        <Link
          fontSize='sm'
          fontWeight='semibold'
          color='lime.200'
          href={`${network.network.explorer}tx/${hash}`}
          isExternal
        >
          <Text translation='wallet.transaction.viewOnBlockExplorer' />
        </Link>
      </Flex>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <RawText fontSize='sm' fontWeight='bold' color={statusColorMap[status]}>
          {formatText(status, 'capitalize')}
        </RawText>
        <Tooltip hasArrow placement='left' size='xs' label={hasHashCopied ? 'Copied' : 'Copy'}>
          <Button variant='link' colorScheme='lime' onClick={onTransactionCopy}>
            <Text
              fontSize='sm'
              fontWeight='semibold'
              color='lime.200'
              translation='wallet.transaction.copyTransactionId'
            />
          </Button>
        </Tooltip>
      </Flex>
      <Flex mt={8} alignItems='center' justifyContent='space-between'>
        <Text
          fontSize='md'
          fontWeight='bold'
          color='keystoreNeutral.200'
          translation='wallet.transaction.from'
        />
        <Text
          fontSize='md'
          fontWeight='bold'
          color='keystoreNeutral.200'
          translation='wallet.transaction.to'
        />
      </Flex>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <Address copyable address={from.address} avatar={from.icon} />

        <Flex
          alignItems='center'
          justifyContent='center'
          width='26px'
          height='26px'
          borderRadius='50%'
          borderColor='keystore.200'
          borderWidth='1px'
        >
          <ArrowRightIcon />
        </Flex>

        <Address copyable address={to.address} avatar={to.icon} />
      </Flex>
      <Text
        mt={8}
        fontSize='md'
        fontWeight='bold'
        color='keystoreNeutral.200'
        translation='wallet.transaction.transaction'
      />
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <Text
          fontSize='xs'
          fontWeight='semibold'
          color='keystore.200'
          translation='wallet.transaction.nonce'
        />
        <RawText fontSize='xs' fontWeight='semibold' color='keystore.200'>
          {nonce}
        </RawText>
      </Flex>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <Text
          fontSize='xs'
          fontWeight='semibold'
          color='keystore.200'
          translation='wallet.transaction.amount'
        />
        <Amount.Crypto
          borderColor='keystore.200'
          fontSize='xs'
          fontWeight='bold'
          value={String(amount.amount)}
          symbol={amount.name}
          prefix='-'
        />
      </Flex>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <RawText display='inline-flex' fontSize='xs' fontWeight='semibold' color='keystore.200'>
          <Text translation='wallet.transaction.gasLimit' />
          {' ('}
          <Text translation='wallet.transaction.units' />
          {')'}
        </RawText>
        <RawText fontSize='xs' fontWeight='semibold' color='keystore.200'>
          {fee.gasLimit}
        </RawText>
      </Flex>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <RawText display='inline-flex' fontSize='xs' fontWeight='semibold' color='keystore.200'>
          <Text translation='wallet.transaction.gasUsed' />
          {' ('}
          <Text translation='wallet.transaction.units' />
          {')'}
        </RawText>
        <RawText fontSize='xs' fontWeight='semibold' color='keystore.200'>
          {fee.gasUsed}
        </RawText>
      </Flex>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <RawText display='inline-flex' fontSize='xs' fontWeight='semibold' color='keystore.200'>
          <Text translation='wallet.transaction.baseFee' />
          {' ('}
          <Text translation='wallet.transaction.GWEI' />
          {')'}
        </RawText>
        <RawText fontSize='xs' fontWeight='semibold' color='keystore.200'>
          {fee.baseFee}
        </RawText>
      </Flex>
      <Flex mt={3} alignItems='flex-start' justifyContent='space-between'>
        <RawText display='inline-flex' fontSize='xs' fontWeight='semibold' color='keystore.200'>
          <Text translation='wallet.transaction.priorityFee' />
          {' ('}
          <Text translation='wallet.transaction.GWEI' />
          {')'}
        </RawText>
        <RawText fontSize='xs' fontWeight='semibold' color='keystore.200'>
          {fee.priorityFee}
        </RawText>
      </Flex>
      <Flex mt={3} alignItems='flex-start' justifyContent='space-between'>
        <Text
          fontSize='xs'
          fontWeight='semibold'
          color='keystore.200'
          translation='wallet.transaction.totalGasFee'
        />
        <VStack alignItems='flex-end' justifyContent='space-evenly'>
          <Amount.Crypto
            fontSize='xs'
            fontWeight='semibold'
            color='keystore.200'
            value={String(fee.totalFee)}
            symbol={currency.symbol}
            prefix='-'
          />
          <Amount.Fiat
            fontSize='xs'
            fontWeight='semibold'
            color='keystore.200'
            mt='0px !important'
            value={fee.totalFee * currency.usdPrice}
            prefix='-'
          />
        </VStack>
      </Flex>
      <Flex mt={3} alignItems='flex-start' justifyContent='space-between'>
        <Text
          fontSize='xs'
          fontWeight='semibold'
          color='keystore.200'
          translation='wallet.transaction.maxFeePerGas'
        />
        <VStack alignItems='flex-end' justifyContent='space-evenly'>
          <Amount.Crypto
            fontSize='xs'
            fontWeight='semibold'
            color='keystore.200'
            value={String(fee.maxFeePerGas)}
            symbol={currency.symbol}
            prefix='-'
          />
          <Amount.Fiat
            fontSize='xs'
            fontWeight='semibold'
            color='keystore.200'
            mt='0px !important'
            value={fee.maxFeePerGas * currency.usdPrice}
            prefix='-'
          />
        </VStack>
      </Flex>
      <Flex mt={3} alignItems='flex-start' justifyContent='space-between'>
        <Text
          fontSize='xs'
          fontWeight='semibold'
          color='keystore.200'
          translation='wallet.transaction.total'
        />
        <VStack alignItems='flex-end' justifyContent='space-evenly'>
          <Amount.Crypto
            fontSize='xs'
            fontWeight='extrabold'
            color='keystoreNeutral.200'
            value={String(fee.totalFee)}
            symbol={currency.symbol}
            prefix='-'
          />
          <Amount.Fiat
            fontSize='xs'
            fontWeight='semibold'
            color='keystore.200'
            mt='0px !important'
            value={fee.totalFee * currency.usdPrice}
            prefix='-'
          />
        </VStack>
      </Flex>
      <Accordion allowMultiple border='0px solid transparent'>
        {logs.length > 0 && (
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton pl='2px'>
                  {isExpanded ? (
                    <MinusIcon color='lime.200' fontSize='sm' fontWeight='extrabold' />
                  ) : (
                    <AddIcon color='lime.200' fontSize='sm' fontWeight='extrabold' />
                  )}
                  <Box ml={4} flex='1' textAlign='left'>
                    <Text
                      color='lime.200'
                      fontSize='sm'
                      fontWeight='extrabold'
                      translation='wallet.transaction.activityLog'
                    />
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {logs.map(log => (
                    <ActivityItem activity={log} />
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )}
        {method.rawData.length > 0 && (
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton pl='2px'>
                  {isExpanded ? (
                    <MinusIcon color='lime.200' fontSize='sm' fontWeight='extrabold' />
                  ) : (
                    <AddIcon color='lime.200' fontSize='sm' fontWeight='extrabold' />
                  )}
                  <Box ml={4} flex='1' textAlign='left'>
                    <Text
                      color='lime.200'
                      fontSize='sm'
                      fontWeight='extrabold'
                      translation='wallet.transaction.transactionData'
                    />
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <RawText fontSize='xs' color='keystore.200'>
                    {method.rawData}
                  </RawText>
                  <Button
                    mt={2}
                    size='sm'
                    colorScheme='gray'
                    leftIcon={<CopyIcon />}
                    onClick={onRawDataCopy}
                  >
                    {translate('wallet.transaction.copyRawTransactionData')}
                  </Button>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )}
      </Accordion>
    </Box>
  )
}
