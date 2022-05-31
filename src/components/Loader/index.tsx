import './styles.css'

import { Flex } from '@chakra-ui/react'
import { SpinnerIcon } from 'components/Icons/Spinner'

type LoaderProp = {
  size?: 'sm' | 'md' | 'lg'
}

export const Loader = ({ size = 'sm' }: LoaderProp) => {
  return (
    <Flex alignItems='center' justifyContent='center'>
      <div className={`spinner ${size}`}>
        <SpinnerIcon />
      </div>
    </Flex>
  )
}
