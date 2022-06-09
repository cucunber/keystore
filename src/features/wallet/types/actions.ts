import { Transaction } from './Transaction'

export type setTransactionPayload = {
  transactions: Transaction[]
  shouldConcat?: boolean
}
