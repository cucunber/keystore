import { Icon } from '@chakra-ui/react'

export const SpinnerIcon = () => {
  return (
    <Icon viewBox='0 0 80 80' width='80' height='80'>
      <circle cx='40' cy='38' r='30' stroke='#F2F4F5' stroke-width='4' />
      <g filter='url(#filter0_d_247_3664)'>
        <path
          d='M40 8C23.4315 8 10 21.4315 10 38C10 54.5685 23.4315 68 40 68C56.5685 68 70 54.5685 70 38'
          stroke='#79C62B'
          stroke-width='10'
          stroke-linecap='round'
          fill='transparent'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_247_3664'
          x='0'
          y='0'
          width='80'
          height='80'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='2.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_247_3664' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_247_3664'
            result='shape'
          />
        </filter>
      </defs>
    </Icon>
  )
}
