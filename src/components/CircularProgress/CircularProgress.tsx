import {
  CircularProgress as CKCircularProgress,
  CircularProgressProps,
  useColorModeValue,
} from '@chakra-ui/react'

export const CircularProgress = (props: CircularProgressProps) => {
  return (
    <CKCircularProgress
      color='lime.200'
      trackColor={useColorModeValue('gray.50', 'gray.700')}
      isIndeterminate={true}
      {...props}
    />
  )
}
