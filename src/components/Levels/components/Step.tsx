import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ReactNode, useCallback } from 'react'
import { ProfileActions } from 'context/ProfileProvider/ProfileActionTypes'
import { useProfile } from 'hooks/useProfile/useProfile'

export type StepProps = {
  icon: ReactNode
  title: ReactNode
  subtitle: ReactNode
  hasButton: boolean
  level: number
  buttonTitle?: string
  buttonSubtitle?: string
  isButtonEnabled?: boolean
}

export const Step = ({
  icon,
  title,
  subtitle,
  hasButton,
  level,
  buttonTitle,
  buttonSubtitle,
  isButtonEnabled,
}: StepProps) => {
  const { dispatch: profileDispatch } = useProfile()
  const handleCompleteClick = useCallback(() => {
    profileDispatch({
      type: ProfileActions.SET_PROFILE_MODAL,
      payload: { modal: true, route: `/level-verification${level}` },
    })
  }, [level, profileDispatch])
  return (
    <Flex alignItems='flex-start'>
      {icon}
      <Box ml={4}>
        {title}
        {subtitle}

        <Flex alignItems='center' mt={3}>
          {hasButton && (
            <Button
              mr={4}
              bg='lime.200'
              color='white'
              disabled={!isButtonEnabled}
              onClick={handleCompleteClick}
            >
              Comptlete {buttonTitle}
            </Button>
          )}
<<<<<<< HEAD
          <Text color="keystore.200">{buttonSubtitle}</Text>
=======
          <Text color='keystore.200'>{buttonSubtitle}</Text>
>>>>>>> f21893f7e7028ddc706471d044e66b6a8d286694
        </Flex>
      </Box>
    </Flex>
  )
}
