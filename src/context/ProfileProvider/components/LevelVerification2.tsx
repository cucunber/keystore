import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button, Flex, ModalBody, ModalHeader, useMediaQuery } from '@chakra-ui/react'
import { useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { Text } from 'components/Text'
import { breakpoints } from 'theme/theme'

export const LevelVerification2 = ({ history }: RouteComponentProps) => {
  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)
  const onDoneClickHandler = useCallback(() => {
    history.push('/level-verification3')
  }, [history])
  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='slate.200'
          size='30px'
          fontWeight='extrabold'
          translation='profile.levelVerification2.title'
        />
      </ModalHeader>
      <ModalBody
        display='flex'
        alignItems='flex-start'
        justifyContent='flex-start'
        flexDirection='column'
        textAlign='center'
        pt={0}
        px={0}
      >
        <Text
          color='slate.200'
          size='18px'
          fontWeight='bold'
          mt={8}
          translation='profile.levelVerification2.buttonTitle'
        />
        <Flex justifyContent='flex-start' alignItems='center' gap={5} mt={4}>
          <Button w='180px' colorScheme='lime' leftIcon={<AddIcon />}>
            <Text translation='profile.levelVerification2.uploadFile' />
          </Button>
          <Button w='180px' colorScheme='lime' leftIcon={<MinusIcon />} variant='outline'>
            <Text translation='profile.levelVerification2.removeFile' />
          </Button>
          <Text translation='profile.levelVerification2.noFile' />
        </Flex>
        <Text
          color='keystoneNeutral.200'
          size='12px'
          mt={2}
          translation='profile.levelVerification2.buttonSubtitle'
        />
        <Flex
          maxWidth={isLargerThanMd ? '100%' : '50%'}
          w='full'
          alignItems='center'
          justifyContent='flex-end'
          mt={3}
        >
          <Button mr={2} colorScheme='lime' onClick={onDoneClickHandler}>
            <Text translation='profile.levelVerification2.done' />
          </Button>
        </Flex>
      </ModalBody>
    </>
  )
}
