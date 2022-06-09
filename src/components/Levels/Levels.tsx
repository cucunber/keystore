import { VStack } from "@chakra-ui/react";
import { Step } from "./components/Step";
import { getStepIcon, getStepLabel, getStepSubtitle } from "./helpers";

export type StepConfig = {
  label: string;
  isCompleted?: boolean;
  step?: number;
  subtitle: string;
  buttonSubtitle?: string;
};

export type LevelsProps = {
  activeStep: number;
  steps: StepConfig[];
};

export const Levels = ({ activeStep, steps }: LevelsProps) => {
  return (
    <VStack width="100%" align="stretch" spacing={10}>
      {steps.map((step) => (
        <Step
          icon={getStepIcon(step, activeStep)}
          title={getStepLabel(step, activeStep)}
          subtitle={getStepSubtitle(step, activeStep)}
          buttonTitle={step.label}
          buttonSubtitle={step.buttonSubtitle}
          isButtonEnabled={step.step === activeStep}
          hasButton={!step.isCompleted}
        />
      ))}
    </VStack>
  );
};
