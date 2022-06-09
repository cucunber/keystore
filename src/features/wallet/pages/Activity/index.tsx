import { Box, Flex, Spinner } from '@chakra-ui/react'
import { ActivityCard } from 'features/wallet/components/ActivityCard'
import { NativeWalletActions } from 'features/wallet/context/WalletActionTypes'
import { useNativeWallet } from 'features/wallet/hooks/useNativeWallet/useNativeWallet'
import { transactions } from 'features/wallet/mock'
import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'

export const Activity = ({ history }: RouteComponentProps) => {
  const {
    state: { transaction },
    dispatch,
  } = useNativeWallet()
  const { isLoading, transactionList } = transaction
  useEffect(() => {
    dispatch({
      type: NativeWalletActions.SET_TRANSACTION_STATUS,
      payload: true,
    })
    setTimeout(() => {
      dispatch({
        type: NativeWalletActions.SET_TRANSACTIONS,
        payload: { transactions, shouldConcat: false },
      })
    }, 1500)
  }, [dispatch])
  return (
    <Box height='440px' overflowY='auto'>
      <Text
        align='center'
        size='lg'
        fontWeight='bold'
        color='keystore.200'
        translation='wallet.activity.title'
      />

      {isLoading ? (
        <Flex height='100%' alignItems='center' justifyContent='center'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <>
          {transactionList.map(transactionData => (
            <ActivityCard key={transactionData.hash} history={history} {...transactionData} />
          ))}
        </>
      )}
    </Box>
  )
}
