import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { RadioCardGroup } from 'features/wallet/components/RadioGroup'
import { NativeWalletActions } from 'features/wallet/context/WalletActionTypes'
import { useNativeWallet } from 'features/wallet/hooks/useNativeWallet/useNativeWallet'
import { Transaction } from 'features/wallet/types'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslate } from 'react-polyglot'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { Amount } from 'components/Amount/Amount'
import { RawText, Text } from 'components/Text'
import { useLocaleFormatter } from 'hooks/useLocaleFormatter/useLocaleFormatter'

const feeOptions = [
  { value: 1, text: 'wallet.gasFee.low' },
  { value: 2, text: 'wallet.gasFee.medium' },
  { value: 3, text: 'wallet.gasFee.high' },
]

const timeToWork = {
  '1': 'wallet.gasFee.maybeIn',
  '2': 'wallet.gasFee.likelyIn',
  '3': 'wallet.gasFee.veryLikelyIn',
}

const timeToWorkColor = {
  '1': 'statuses.failed',
  '2': 'statuses.success',
  '3': 'statuses.success',
}

const feeMultiplier = {
  '1': 0.5,
  '2': 1,
  '3': 1.5,
}

const gwei = {
  '1': 3.43,
  '2': 3.43,
  '3': 3.47,
}

export const GasFee = ({ history }: RouteComponentProps) => {
  const { hash } = useParams<{ hash: string }>()
  const {
    state: { transaction },
    dispatch,
  } = useNativeWallet()

  const {
    number: { toFiat },
  } = useLocaleFormatter({ fiatType: 'USD' })

  const translate = useTranslate()
  const { transactionList } = transaction
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)

  const { setValue, watch, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      feeSpeed: '2',
      gasLimit: currentTransaction?.fee.gasLimit || 0,
      maxPriorityFee: currentTransaction?.fee.priorityFee || 0,
      maxFee: currentTransaction?.fee.totalFee || 0,
    },
  })

  const feeSpeedValue = watch('feeSpeed') as '1' | '2' | '3'
  const gasLimit = watch('gasLimit')
  const maxPriorityFee = watch('maxPriorityFee')
  const maxFee = watch('maxFee')

  const onFeeApply = useCallback(
    (data: FieldValues) => {
      if (currentTransaction) {
        const newTransaction = {
          ...currentTransaction,
          fee: {
            ...currentTransaction.fee,
            gasLimit: data.gasLimit,
            priorityFee: data.maxPriorityFee,
            totalFee: data.maxFee,
          },
        }
        const newTransactionList = transactionList.map(tx =>
          tx.hash === newTransaction.hash ? newTransaction : tx,
        )
        dispatch({
          type: NativeWalletActions.SET_TRANSACTIONS,
          payload: { transactions: newTransactionList },
        })
        history.goBack()
      }
    },
    [currentTransaction, dispatch, history, transactionList],
  )

  useEffect(() => {
    setTimeout(() => {
      const selectedTransaction = transactionList.find(trans => trans.hash === hash)
      if (selectedTransaction) {
        setCurrentTransaction(selectedTransaction)
      }
    }, 1000)
    return () => {
      setCurrentTransaction(null)
    }
  }, [hash, transactionList])

  useEffect(() => {
    if (currentTransaction) {
      setValue('gasLimit', currentTransaction.fee.gasLimit * feeMultiplier[feeSpeedValue])
      setValue('maxPriorityFee', currentTransaction.fee.priorityFee * feeMultiplier[feeSpeedValue])
      setValue('maxFee', currentTransaction.fee.totalFee * feeMultiplier[feeSpeedValue])
    }
  }, [feeSpeedValue, currentTransaction, setValue])

  if (!currentTransaction) {
    return (
      <Flex minHeight='440px' alignItems='center' justifyContent='center'>
        <Spinner size='xl' />
      </Flex>
    )
  }

  const { fee } = currentTransaction

  return (
    <Box height='440px' overflowY='auto'>
      <HStack mt={1} width='100%' spacing={2} justifyContent='center'>
        <Text
          align='center'
          size='lg'
          fontWeight='bold'
          color='keystore.200'
          translation='wallet.gasFee.newGasFee'
        />
        <Tooltip label={translate('wallet.gasFee.newGasFeeTooltip')}>
          <InfoIcon color='keystore.200' />
        </Tooltip>
      </HStack>
      <RawText mt={8} align='center' fontSize='4xl' color='keystorePrimarySlate.200'>
        <Amount.Fiat value={feeMultiplier[feeSpeedValue] * fee.totalFee} prefix='≈' />
      </RawText>
      <Text
        fontWeight='bold'
        fontSize='xs'
        color={timeToWorkColor[feeSpeedValue]}
        translation={timeToWork[feeSpeedValue]}
        align='center'
        mt={2}
      />
      <Flex mt={8} alignItems='center' justifyContent='center'>
        <RadioCardGroup
          options={feeOptions.map(fO => ({
            content: (
              <Text size='xs' color='keystore.200' fontWeight='bold' translation={fO.text} />
            ),
            value: String(fO.value),
          }))}
          name='fee'
          defaultValue='2'
          onChange={value => setValue('feeSpeed', value)}
        />
      </Flex>
      <Accordion mt={8} allowMultiple defaultIndex={[0]} border='0px solid transparent'>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton alignItems='center' justifyContent='center' pl='2px'>
                <Box mr={4} textAlign='left'>
                  <Text
                    color='lime.200'
                    fontSize='sm'
                    fontWeight='extrabold'
                    translation='wallet.gasFee.advancedOptions'
                  />
                </Box>
                {isExpanded ? (
                  <TriangleUpIcon color='lime.200' fontSize='sm' fontWeight='extrabold' />
                ) : (
                  <TriangleDownIcon color='lime.200' fontSize='sm' fontWeight='extrabold' />
                )}
              </AccordionButton>
              <AccordionPanel pb={4}>
                <HStack alignItems='center'>
                  <Text
                    fontSize='10px'
                    color='keystorePrimarySlate.200'
                    translation='wallet.transaction.gasLimit'
                  />
                  <Tooltip size='xs' label={translate('wallet.gasFee.newGasFeeTooltip')}>
                    <InfoIcon color='keystore.200' fontSize='xs' />
                  </Tooltip>
                </HStack>
                <NumberInput
                  colorScheme='gray'
                  mt={2}
                  defaultValue={feeMultiplier[feeSpeedValue] * gasLimit}
                  step={(feeMultiplier[feeSpeedValue] * fee.gasLimit) / 100}
                  onChange={(str, val) => setValue('maxPriorityFee', val)}
                  value={gasLimit}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <HStack mt={2} alignItems='center'>
                  <RawText display='inline-flex' fontSize='10px'>
                    <Text
                      color='keystorePrimarySlate.200'
                      translation='wallet.gasFee.maxPriorityFee'
                    />
                    (<Text color='keystore.200' translation='wallet.transaction.GWEI' />)
                  </RawText>
                  <Tooltip size='xs' label={translate('wallet.gasFee.newGasFeeTooltip')}>
                    <InfoIcon color='keystore.200' fontSize='xs' />
                  </Tooltip>
                </HStack>
                <NumberInput
                  colorScheme='gray'
                  mt={2}
                  defaultValue={feeMultiplier[feeSpeedValue] * maxPriorityFee}
                  step={(feeMultiplier[feeSpeedValue] * maxPriorityFee) / 100}
                  value={maxPriorityFee}
                  onChange={(str, val) => setValue('maxPriorityFee', val)}
                  position='relative'
                  _after={{
                    content: `"${toFiat(
                      gwei[feeSpeedValue] * (feeMultiplier[feeSpeedValue] * maxPriorityFee),
                    )}"`,
                    position: 'absolute',
                    top: '50%',
                    right: '34px',
                    fontSize: 'xs',
                    color: 'keystore.200',
                    fontWeight: 'semibold',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <HStack mt={2} alignItems='center'>
                  <RawText display='inline-flex' fontSize='10px'>
                    <Text color='keystorePrimarySlate.200' translation='wallet.gasFee.maxFee' />
                    (<Text color='keystore.200' translation='wallet.transaction.GWEI' />)
                  </RawText>
                  <Tooltip size='xs' label={translate('wallet.gasFee.newGasFeeTooltip')}>
                    <InfoIcon color='keystore.200' fontSize='xs' />
                  </Tooltip>
                </HStack>
                <NumberInput
                  colorScheme='gray'
                  mt={2}
                  defaultValue={feeMultiplier[feeSpeedValue] * maxFee}
                  step={(feeMultiplier[feeSpeedValue] * maxFee) / 100}
                  value={maxFee}
                  onChange={(str, val) => setValue('maxFee', val)}
                  position='relative'
                  _after={{
                    content: `"${toFiat(
                      gwei[feeSpeedValue] * (feeMultiplier[feeSpeedValue] * maxFee),
                    )}"`,
                    position: 'absolute',
                    top: '50%',
                    right: '34px',
                    fontSize: 'xs',
                    color: 'keystore.200',
                    fontWeight: 'semibold',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      <VStack px={4} alignItems='center'>
        <Link fontWeight='extrabold' my={4} color='lime.200' colorScheme='lime'>
          {translate('wallet.gasFee.howShouldIChoose')}
        </Link>
        <Button onClick={handleSubmit(onFeeApply)} mt={8} width='100%' colorScheme='lime'>
          {translate('wallet.common.save')}
        </Button>
      </VStack>
    </Box>
  )
}
