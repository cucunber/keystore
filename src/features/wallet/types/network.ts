export type Currency = {
  decimals: number
  symbol: string
  name: string
  usdPrice: number
}

export type NetworkData = {
  currency: Currency
  explorer: string
}
