import { Box, Button, Image, ModalBody, ModalHeader, Stack, Text as UIText } from '@chakra-ui/react'
import qrCode from 'assets/qrCode.png'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'

import { ProfileActions } from '../ProfileActionTypes'

const textCode = 'XBE-7B9-10A7'

export const Enable2FA = () => {
  const { dispatch: profileDispatch } = useProfile()
  const handleUpdateProfile = () => {
    profileDispatch({
      type: ProfileActions.SET_PROFILE_MODAL,
      payload: { modal: false, route: '' },
    })
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
          color='keystoneNeutral.200'
          size='18px'
          fontWeight='bold'
          translation='profile.enable2FA.subtitle'
        />
        <Stack width='full' p={0} spacing='18px'>
          <Box
            p={3}
            borderRadius='8px'
            mt={7}
            borderWidth='1px'
            borderColor='keystone.150'
            w='200px'
          >
            <Image src={qrCode} />
          </Box>
          <Text
            translation='profile.enable2FA.orEnterCode'
            color='grey.dark'
            mt={5}
            size='19px'
            fontWeight='bold'
          />
          <UIText color='lime.200' size='45px' mt={4}>
            {textCode}
          </UIText>
          <Button
            // disabled={!isValid}
            colorScheme='lime'
            onClick={handleUpdateProfile}
          >
            <Text translation='profile.enable2FA.next' />
          </Button>
        </Stack>
      </ModalBody>
    </>
  )
}
