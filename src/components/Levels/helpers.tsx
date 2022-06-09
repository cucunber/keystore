import { CheckCircleIcon } from '@chakra-ui/icons'
import { Center, Flex, Heading } from '@chakra-ui/react'

import { StepConfig } from './Levels'

export const getStepLabel = (currentStep: StepConfig, activeStep: number) => {
  if (currentStep.isCompleted === 'Complete') {
    return (
      <Flex mb={1}>
        <Heading as='h4' size='md' color='slate.200'>
          {currentStep.label} -
        </Heading>
        <Heading as='h4' size='md' color='lime.200' ml={1}>
          Complete
        </Heading>
      </Flex>
    )
  }
  if (currentStep.isCompleted === 'Incomplete' && currentStep.step === activeStep) {
    return (
      <Flex mb={1}>
        <Heading as='h4' size='md' color='slate.200'>
          {currentStep.label} -
        </Heading>
        <Heading as='h4' size='md' color='red.500' ml={1}>
          Incomplete
        </Heading>
      </Flex>
    )
  }
  if (currentStep.isCompleted === 'Pending') {
    return (
      <Flex mb={1}>
        <Heading as='h4' size='md' color='slate.200'>
          {currentStep.label} -
        </Heading>
        <Heading as='h4' size='md' color='orange' ml={1}>
          Pending
        </Heading>
      </Flex>
    )
  }
  return (
    <Flex mb={1} opacity={0.5}>
      <Heading as='h4' size='md' color='keystone.200'>
        {currentStep.label} -
      </Heading>
      <Heading as='h4' size='md' color='keystone.200' ml={1}>
        Complete Level {currentStep?.step || 1 - 1} first
      </Heading>
    </Flex>
  )
}
export const getStepIcon = (currentStep: StepConfig, activeStep: number) => {
  if (currentStep.isCompleted === 'Complete' || currentStep.isCompleted === 'Pending') {
    return <CheckCircleIcon color='lime.200' w={30} h={30} />
  }
  if (currentStep.step === activeStep) {
    return (
      <Center bg='slate.200' color='white' borderRadius='full' w={30} h={30}>
        {currentStep.step}
      </Center>
    )
  }
  return (
    <Center
      borderWidth='1px'
      borderColor='keystone.200'
      bg='transparent'
      color='keystone.200'
      w={30}
      h={30}
      borderRadius='full'
    >
      {currentStep.step}
    </Center>
  )
}
export const getStepSubtitle = (currentStep: StepConfig, activeStep: number) => {
  if (currentStep.step === activeStep) {
    return (
      <Heading as='h3' size='sm' color='slate.200'>
        {currentStep.subtitle}
      </Heading>
    )
  }
  return (
    <Heading as='h3' size='sm' color='keystone.200'>
      {currentStep.subtitle}
    </Heading>
  )
}
