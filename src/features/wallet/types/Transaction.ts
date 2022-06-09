export enum TransactionType {
  Transaction = 'transaction',
  Permission = 'permission',
}

export enum TransactionStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
  Queued = 'queued',
  Canceled = 'canceled',
}

export type TransactionAddress = {
  address: string
  icon: string
}

export type TransactionMethod = {
  name: string
  functionType: string
  functionCode: string
  rawData: string
}

export type TransactionFeeData = {
  gasLimit: number
  gasUsed: number
  baseFee: number
  priorityFee: number
  totalFee: number
  maxFeePerGas: number
  total: number
}

export type TransactionAmount = {
  amount: number
  name: string
  icon?: string
}

export type TransactionActivityLog = string[]

export type TransactionSlim = {
  hash: string
  method: TransactionMethod
  status: TransactionStatus
  to: TransactionAddress
  amount: TransactionAmount
  asker: string
  date?: number
}

export type Transaction = {
  from: TransactionAddress
  nonce: number
  fee: TransactionFeeData
  suggestion: TransactionFeeData
  logs: TransactionActivityLog
} & TransactionSlim

export type PermissionTransaction = {}
