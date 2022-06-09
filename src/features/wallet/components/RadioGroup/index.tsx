import { Box, HStack, useRadio, useRadioGroup, UseRadioProps, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'

export const RadioCard = (props: UseRadioProps & { children: ReactElement }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <VStack as='label' alignItems='center'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='2px'
        width='20px'
        height='20px'
        borderRadius='50%'
        position='relative'
        borderColor='lime.200'
        mb={2}
        _after={{
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          bg: 'transparent',
          translate: '400ms ease-in-out',
          width: '65%',
          height: '65%',
          borderRadius: '50%',
        }}
        _checked={{
          _after: {
            bg: 'lime.200',
          },
        }}
      />
      {props.children}
    </VStack>
  )
}

export type RadioCardOption = {
  value: string
  content: ReactElement
}

interface RadioCardGroupProps {
  name: string
  options: Array<RadioCardOption>
  onChange: (nextValue: string) => void
  defaultValue?: string
}

export const RadioCardGroup = ({ options, name, onChange, defaultValue }: RadioCardGroupProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  })

  const group = getRootProps()

  return (
    <HStack spacing={8} {...group}>
      {options.map(value => {
        const radio = getRadioProps({ value: value.value })
        return (
          <RadioCard key={value.value} {...radio}>
            {value.content}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
