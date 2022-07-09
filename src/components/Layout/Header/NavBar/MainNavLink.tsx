import { Box, Button, ButtonProps, forwardRef, Tooltip, useMediaQuery } from '@chakra-ui/react'
import { memo, MouseEventHandler } from 'react'
import { NavLinkProps, useLocation } from 'react-router-dom'
import { useModal } from 'hooks/useModal/useModal'
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
  forwardRef<SidebarLinkProps, 'div'>(({ ...rest }: SidebarLinkProps, ref) => {
    const { href, label, isSideBarActive } = rest
    const [isLargerThan2xl] = useMediaQuery(`(min-width: ${breakpoints['2xl']})`)
    const { redirect } = useModal()
    const { open } = redirect
    const location = useLocation()
    const active = location?.pathname.includes(href ?? '')
    const isOuterLink = (() => {
      try {
        if (!href) {
          return false
        }
        const link = new URL(href)
        return link.origin !== ''
      } catch (e) {
        return false
      }
    })()
    const outerLinkClickHandler: MouseEventHandler<HTMLButtonElement> = e => {
      e.preventDefault()
      e.stopPropagation()
      open({ href })
    }
    return (
      <Tooltip label={label} isDisabled={isLargerThan2xl || isSideBarActive} placement='right'>
        <Button
          width='full'
          justifyContent='flex-start'
          variant='ghost'
          transition='all 300ms ease-in-out'
          isActive={href ? active : false}
          minWidth={isSideBarActive ? 280 : 'auto'}
          iconSpacing={isSideBarActive ? 4 : 0}
          ref={ref}
          onClick={isOuterLink ? outerLinkClickHandler : () => {}}
          {...rest}
        >
          <Box display={{ base: isSideBarActive ? 'flex' : 'none' }}>{label}</Box>
        </Button>
      </Tooltip>
    )
  }),
)
