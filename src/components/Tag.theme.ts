import { transparentize } from '@chakra-ui/theme-tools'

const baseStyle = {
  lineHeight: '1.2',
  borderRadius: 'lg',
  fontWeight: 'semibold',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  color: 'slate.200',
  bg: transparentize('lime.200', 0.2),
}

const sizes = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: 'lg',
    px: 6,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 2,
  },
}

const defaultProps = {
  size: 'md',
}

export const TagStyle = {
  baseStyle,
  sizes,
  defaultProps,
}
