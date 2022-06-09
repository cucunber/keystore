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
  Spinner,
  Tooltip,
} from '@chakra-ui/react'
import { RadioCardGroup } from 'features/wallet/components/RadioGroup'
import { useNativeWallet } from 'features/wallet/hooks/useNativeWallet/useNativeWallet'
import { Transaction } from 'features/wallet/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslate } from 'react-polyglot'
import { useParams } from 'react-router-dom'
import { Amount } from 'components/Amount/Amount'
import { RawText, Text } from 'components/Text'

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

export const GasFee = () => {
  const { hash } = useParams<{ hash: string }>()
  const {
    state: { transaction },
  } = useNativeWallet()

  const translate = useTranslate()
  const { transactionList } = transaction
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)

  const {
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      feeSpeed: '2',
    },
  })

  const feeSpeedValue = watch('feeSpeed') as '1' | '2' | '3'

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

  if (!currentTransaction) {
    return (
      <Flex minHeight='620px' alignItems='center' justifyContent='center'>
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
        <Amount.Fiat value={fee.totalFee} prefix='≈' />
      </RawText>
      <Text
        fontWeight='bold'
        fontSize='xs'
        color={timeToWorkColor[feeSpeedValue]}
        translation={timeToWork[feeSpeedValue]}
        align='center'
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
              <AccordionPanel pb={4}></AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      <Link my={4} color='lime.200' colorScheme='lime'>
        {translate('wallet.gasFee.howShouldIChoose')}
      </Link>
      <Button disabled={!isDirty}>{translate('wallet.common.save')}</Button>
    </Box>
  )
}
