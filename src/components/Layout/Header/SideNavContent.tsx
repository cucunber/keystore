import { ChevronRightIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Flex, FlexProps, IconButton, Link, Stack, useMediaQuery } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { Link as ReactRouterLink } from 'react-router-dom'
import { FeedbackIcon } from 'components/Icons/FeedBack'
import { ProfileIcon } from 'components/Icons/Profile'
import { useModal } from 'hooks/useModal/useModal'
import { breakpoints } from 'theme/theme'

import { AutoCompleteSearch } from './AutoCompleteSearch/AutoCompleteSearch'
import { FiatRamps } from './NavBar/FiatRamps'
import { MainNavLink } from './NavBar/MainNavLink'
import { NavBar } from './NavBar/NavBar'
import { UserMenu } from './NavBar/UserMenu'

type HeaderContentProps = {
  isCompact?: boolean
  onClose?: () => void
} & FlexProps

export const SideNavContent = ({ onClose }: HeaderContentProps) => {
  const [isSideBarActive, setIsSideBarActive] = useState(true)
  const translate = useTranslate()
  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)
  const { settings } = useModal()

  const handleClick = (onClick?: () => void) => {
    onClose && onClose()
    onClick && onClick()
  }

  const handleOpenSideBar = useCallback(() => {
    setIsSideBarActive(!isSideBarActive)
  }, [isSideBarActive])

  return (
    <Flex
      width='full'
      height='full'
      alignItems='flex-start'
      justifyContent='flex-start'
      data-test='full-width-header'
      flexDir='column'
      position='relative'
      p={4}
    >
      {!isLargerThanMd && (
        <>
          <Flex width='full'>
            <UserMenu onClick={() => handleClick()} />
          </Flex>
          <Flex width='full' mt={4}>
            <FiatRamps />
          </Flex>
          <Box mt={12} width='full'>
            <AutoCompleteSearch />
          </Box>
        </>
      )}
      {isLargerThanMd && (
        <IconButton
          aria-label='opener'
          onClick={handleOpenSideBar}
          size='sm'
          icon={<ChevronRightIcon transform={`rotate(${isSideBarActive ? 180 : 0}deg)`} />}
          position='absolute'
          right={-3}
          top={1}
          variant='solid'
        />
      )}
      <NavBar isSideBarActive={isSideBarActive} isCompact={isSideBarActive} mt={6} />
      <Stack width='full'>
        <MainNavLink
          variant='ghost'
          isCompact={isSideBarActive}
          onClick={() => handleClick()}
          label={translate('common.profile')}
          as={ReactRouterLink}
          leftIcon={<ProfileIcon />}
          isSideBarActive={isSideBarActive}
          data-test='navigation-profile-button'
          href='/profile'
          to='/profile'
        />
        <MainNavLink
          variant='ghost'
          isCompact={isSideBarActive}
          onClick={() => handleClick(() => settings.open({}))}
          label={translate('common.settings')}
          leftIcon={<SettingsIcon />}
          isSideBarActive={isSideBarActive}
          data-test='navigation-settings-button'
        />
        <MainNavLink
          leftIcon={<FeedbackIcon />}
          isCompact={isSideBarActive}
          as={Link}
          justifyContent='flex-start'
          variant='ghost'
          onClick={() => handleClick()}
          isSideBarActive={isSideBarActive}
          label={translate('common.submitFeedback')}
          isExternal
          href='https://shapeshift.notion.site/Submit-Feedback-or-a-Feature-Request-af48a25fea574da4a05a980c347c055b'
        />
      </Stack>
    </Flex>
  )
}
