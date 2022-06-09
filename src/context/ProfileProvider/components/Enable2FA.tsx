import { Box, Button, Flex, Image, ModalBody, ModalHeader, Stack } from '@chakra-ui/react'
import { RouteComponentProps } from 'react-router'
import qrCode from 'assets/qrCode.png'
import { RawText, Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'

import { ProfileActions } from '../ProfileActionTypes'

const textCode = 'XBE-7B9-10A7'

export const Enable2FA = ({ history }: RouteComponentProps) => {
  const { dispatch: profileDispatch } = useProfile()
  const handleUpdateProfile = () => {
    profileDispatch({
      type: ProfileActions.SET_SHOW_BACK_BUTTON,
      payload: false,
    })
    history.push('/enter-verification')
  }

  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='slate.200'
          size='30px'
          fontWeight='extrabold'
          translation='profile.enable2FA.title'
        />
      </ModalHeader>
      <ModalBody alignItems='center' justifyContent='center' textAlign='center' pt={0} px={0}>
        <Text
          color='keystoreNeutral.200'
          size='18px'
          fontWeight='bold'
          translation='profile.enable2FA.subtitle'
        />
        <Stack width='full' p={0} spacing='18px'>
          <Flex justifyContent='center'>
            <Box
              p={3}
              borderRadius='8px'
              mt={7}
              borderWidth='1px'
              borderColor='keystore.150'
              w='200px'
            >
              <Image src={qrCode} />
            </Box>
          </Flex>
          <Text
            translation='profile.enable2FA.orEnterCode'
            color='grey.dark'
            mt={5}
            size='19px'
            fontWeight='bold'
          />
          <RawText color='lime.200' fontSize='45px' mt={4}>
            {textCode}
          </RawText>
          <Flex justifyContent='flex-end'>
            <Button colorScheme='lime' onClick={handleUpdateProfile}>
              <Text translation='profile.enable2FA.next' />
            </Button>
          </Flex>
        </Stack>
      </ModalBody>
    </>
  )
}
