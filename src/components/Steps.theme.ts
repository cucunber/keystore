import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { StepsStyleConfig } from 'chakra-ui-steps'

export const StepsStyle = {
  ...StepsStyleConfig,
  baseStyle: (props: StyleFunctionProps) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(props).stepIconContainer,
        bg: 'transparent',
      },
      labelContainer: {
        ...StepsStyleConfig.baseStyle(props).labelContainer,
        '& span': {
          color: 'gray.500',
        },
        _highlighted: {
          '& span': {
            color: 'lime.200',
          },
        },
        _activeStep: {
          '& span': {
            color: mode('black', 'white')(props),
          },
        },
      },
      connector: {
        ...StepsStyleConfig.baseStyle(props).connector,
        borderColor: 'transparent',
      },
    }
  },
}
