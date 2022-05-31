import { Box, Button, ButtonProps, forwardRef, Tooltip, useMediaQuery } from '@chakra-ui/react'
import { memo } from 'react'
import { NavLinkProps, useLocation } from 'react-router-dom'
import { breakpoints } from 'theme/theme'

type SidebarLinkProps = {
  href?: string
  label: string
  children?: React.ReactNode
  to?: NavLinkProps['to']
  isCompact?: boolean
  isSideBarActive?: boolean
} & ButtonProps

export const MainNavLink = memo(
  forwardRef<SidebarLinkProps, 'div'>(({ isCompact, ...rest }: SidebarLinkProps, ref) => {
    const { href, label, isSideBarActive } = rest
    const [isLargerThan2xl] = useMediaQuery(`(min-width: ${breakpoints['2xl']})`)
    const location = useLocation()
    const active = location?.pathname.includes(href ?? '')
    return (
      <Tooltip label={label} isDisabled={isLargerThan2xl || isSideBarActive} placement='right'>
        <Button
          width='full'
          justifyContent='flex-start'
          variant='ghost'
          transition='all 300ms ease-in-out'
          isActive={href ? active : false}
          minWidth={isSideBarActive ? 280 : 'auto'}
          iconSpacing={!isSideBarActive ? 0 : 4}
          ref={ref}
          {...rest}
        >
          <Box display={{ base: isCompact && !isSideBarActive ? 'none' : 'flex', '2xl': 'block' }}>
            {label}
          </Box>
        </Button>
      </Tooltip>
    )
  }),
)
