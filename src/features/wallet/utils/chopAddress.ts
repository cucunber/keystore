import Web3 from 'web3'

import { formatText, formatType } from './formatText'

type chopAddressArgs = {
  address: string
  chopStart?: number
  chopEnd?: number
  format?: formatType | null
}

export const chopAddress = ({
  address,
  chopStart = 5,
  chopEnd = 5,
  format = null,
}: chopAddressArgs) => {
  const isAddress = Web3.utils.isAddress(address)
  if (isAddress) {
    return `${address.slice(0, chopStart)}...${address.slice(address.length - chopEnd)}`
  }
  let newAddress = format ? formatText(address, format) : address
  if (address.length > 20) {
    return `${newAddress.slice(0, 20)}...`
  }
  return newAddress
}
