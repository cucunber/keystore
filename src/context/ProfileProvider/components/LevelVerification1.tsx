import { Button, Flex, ModalBody, ModalHeader, useMediaQuery } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'
import { FileUpload } from 'components/FileUpload'
import { Text } from 'components/Text'
import { useProfile } from 'hooks/useProfile/useProfile'
import { profile as profileSlice } from 'state/slices/profileSlice/profileSlice'
import { selectProfile } from 'state/slices/selectors'
import { useAppDispatch, useAppSelector } from 'state/store'
import { breakpoints } from 'theme/theme'

import { ProfileActions } from '../ProfileActionTypes'

export const LevelVerification1 = ({ history }: RouteComponentProps) => {
  const [hasImgURL, setHasImgURL] = useState(false)
  const { control } = useForm()
  const dispatch = useAppDispatch()
  const { dispatch: profileDispatch } = useProfile()
  const { user } = useAppSelector(state => selectProfile(state))
  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)
  const onDoneClickHandler = useCallback(() => {
    dispatch(
      profileSlice.actions.updateUser({
        ...user,
        level: 1,
      }),
    )
    if (!user.is2FAEnabled) {
      history.push('/enable-2fa')
    } else {
      profileDispatch({
        type: ProfileActions.SET_PROFILE_MODAL,
        payload: { modal: false, route: '' },
      })
    }
  }, [dispatch, history, profileDispatch, user])
  return (
    <>
      <ModalHeader textAlign='center'>
        <Text
          color='slate.200'
          size='30px'
          fontWeight='extrabold'
          translation='profile.levelVerification1.title'
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
          translation='profile.levelVerification1.buttonTitle'
        />
        <FileUpload
          name='levelVerification1.uploadFile'
          acceptedFileTypes='image/*'
          control={control}
          onSetHasImgURL={setHasImgURL}
        />
        <Text
          color='keystoreNeutral.200'
          size='12px'
          mt={2}
          translation='profile.levelVerification1.buttonSubtitle'
        />
        <Flex
          maxWidth={isLargerThanMd ? '100%' : '50%'}
          w='full'
          alignItems='center'
          justifyContent='flex-end'
          mt={3}
        >
          <Button mr={2} colorScheme='lime' onClick={onDoneClickHandler} disabled={!hasImgURL}>
            <Text
              translation={
                user.is2FAEnabled
                  ? 'profile.levelVerification1.done'
                  : 'profile.levelVerification1.continue'
              }
            />
          </Button>
        </Flex>
      </ModalBody>
    </>
  )
}
