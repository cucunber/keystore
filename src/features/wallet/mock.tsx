import avatar1 from './components/icons/avatar1.svg'
import avatar2 from './components/icons/avatar2.svg'
import { Transaction, TransactionStatus } from './types'

export const transactions: Transaction[] = [
  {
    from: {
      address: 'Account 1',
      icon: avatar1,
    },
    hash: '0xfb7e97296c937fa635c0e8750d6d5aa251100fc14bfcaa9e713e5226b1e1cf79',
    method: {
      name: 'mint',
      functionType: 'Mint(Uint256)',
      functionCode: `Parameters:
        [
          {
            "type": "uint256"
          }
        ]`,
      rawData: '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
    },
    status: TransactionStatus.Success,
    to: {
      address: '0x87D6807F329Db21dD389d8c9aB4dAF294bFCF52b',
      icon: avatar2,
    },
    amount: {
      amount: 1,
      name: 'ETH',
    },
    date: 1656641622,
    asker: 'https://app.key.store/',
    nonce: 10,
    fee: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    suggestion: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    logs: [
      'Transaction created with a value of 0.4 ETH at 18:32 on 6/7/2022.',
      'Transaction submitted with estimated gas fee of 31500 GWEI at 18:32 on 6/7/2022.',
      'Transaction confirmed at 18:32 on 6/7/2022.',
    ],
  },
  {
    from: {
      address: 'Account 1',
      icon: avatar1,
    },
    hash: '0x4a4a403cc4118e4429b2faaa321853f713d24c7d70b43d401d747ef37567da9c',
    method: {
      name: 'swap',
      functionType: 'Swap(Uint256)',
      functionCode: `Parameters:
        [
          {
            "type": "uint256"
          }
        ]`,
      rawData: '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
    },
    status: TransactionStatus.Pending,
    to: {
      address: '0x87D6807F329Db21dD389d8c9aB4dAF294bFCF52b',
      icon: avatar2,
    },
    amount: {
      amount: 1,
      name: 'ETH',
    },
    date: 1656641622,
    asker: 'https://app.key.store/',
    nonce: 9,
    fee: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    suggestion: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    logs: [
      'Transaction created with a value of 0.4 ETH at 18:32 on 6/7/2022.',
      'Transaction submitted with estimated gas fee of 31500 GWEI at 18:32 on 6/7/2022.',
      'Transaction confirmed at 18:32 on 6/7/2022.',
    ],
  },
  {
    from: {
      address: 'Account 1',
      icon: avatar1,
    },
    hash: '0xfb7e97296c937fa635c0e8750d6d5aa251100fc14bfcaa9e713e5226b1e1cf79',
    method: {
      name: 'stake',
      functionType: 'Stake(Uint256)',
      functionCode: `Parameters:
        [
          {
            "type": "uint256"
          }
        ]`,
      rawData: '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
    },
    status: TransactionStatus.Canceled,
    to: {
      address: '0x87D6807F329Db21dD389d8c9aB4dAF294bFCF52b',
      icon: avatar2,
    },
    amount: {
      amount: 1,
      name: 'ETH',
    },
    date: 1656641622,
    asker: 'https://app.key.store/',
    nonce: 8,
    fee: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    suggestion: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    logs: [
      'Transaction created with a value of 0.4 ETH at 18:32 on 6/7/2022.',
      'Transaction submitted with estimated gas fee of 31500 GWEI at 18:32 on 6/7/2022.',
      'Transaction confirmed at 18:32 on 6/7/2022.',
    ],
  },
  {
    from: {
      address: 'Account 1',
      icon: avatar1,
    },
    hash: '0x10a2233dc72b407654539f436458506c094ea8cec7072d7e5c44c724219d647c',
    method: {
      name: 'receive',
      functionType: 'Receive(Uint256)',
      functionCode: `Parameters:
        [
          {
            "type": "uint256"
          }
        ]`,
      rawData: '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
    },
    status: TransactionStatus.Failed,
    to: {
      address: '0x87D6807F329Db21dD389d8c9aB4dAF294bFCF52b',
      icon: avatar2,
    },
    amount: {
      amount: 1,
      name: 'ETH',
    },
    date: 1656641622,
    asker: 'https://app.key.store/',
    nonce: 7,
    fee: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    suggestion: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    logs: [],
  },
  {
    from: {
      address: 'Account 1',
      icon: avatar1,
    },
    hash: '0xec50cb5996c3beb8a84f796ec6fcf0c2375f988ad38e1f5f43a02bb2133d46ba',
    method: {
      name: 'mint',
      functionType: 'Mint(Uint256)',
      functionCode: `Parameters:
        [
          {
            "type": "uint256"
          }
        ]`,
      rawData: '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
    },
    status: TransactionStatus.Success,
    to: {
      address: '0x87D6807F329Db21dD389d8c9aB4dAF294bFCF52b',
      icon: avatar2,
    },
    amount: {
      amount: 1,
      name: 'ETH',
    },
    date: 1656641622,
    asker: 'https://app.key.store//',
    nonce: 6,
    fee: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    suggestion: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    logs: [
      'Transaction created with a value of 0.4 ETH at 18:32 on 6/7/2022.',
      'Transaction submitted with estimated gas fee of 31500 GWEI at 18:32 on 6/7/2022.',
      'Transaction confirmed at 18:32 on 6/7/2022.',
    ],
  },
  {
    from: {
      address: 'Account 1',
      icon: avatar1,
    },
    hash: '0x7a849dc2eb9cd00aa9687405c9087eafbf22a9ba34f7ddb6942245a89c99e0fc',
    method: {
      name: 'mint',
      functionType: 'Mint(Uint256)',
      functionCode: `Parameters:
        [
          {
            "type": "uint256"
          }
        ]`,
      rawData: '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
    },
    status: TransactionStatus.Success,
    to: {
      address: '0x87D6807F329Db21dD389d8c9aB4dAF294bFCF52b',
      icon: avatar2,
    },
    amount: {
      amount: 1,
      name: 'ETH',
    },
    date: 1656641622,
    asker: 'https://app.key.store/',
    nonce: 5,
    fee: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    suggestion: {
      gasLimit: 21000,
      gasUsed: 21000,
      baseFee: 30.86547387,
      priorityFee: 1.5,
      totalFee: 0.0000068,
      maxFeePerGas: 0.000000039,
      total: 0.0016796,
    },
    logs: [
      'Transaction created with a value of 0.4 ETH at 18:32 on 6/7/2022.',
      'Transaction submitted with estimated gas fee of 31500 GWEI at 18:32 on 6/7/2022.',
      'Transaction confirmed at 18:32 on 6/7/2022.',
    ],
  },
]
