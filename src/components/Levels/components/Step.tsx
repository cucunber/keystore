import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export type StepProps = {
  icon: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  hasButton: boolean;
  buttonTitle?: string;
  buttonSubtitle?: string;
  isButtonEnabled?: boolean;
};

export const Step = ({
  icon,
  title,
  subtitle,
  hasButton,
  buttonTitle,
  buttonSubtitle,
  isButtonEnabled,
}: StepProps) => {
  return (
    <Flex alignItems="flex-start">
      {icon}
      <Box ml={4}>
        {title}
        {subtitle}

        <Flex alignItems="center" mt={3}>
          {hasButton && (
            <Button mr={4} bg="lime.200" color="white" disabled={!isButtonEnabled}>
              Comptlete {buttonTitle}
            </Button>
          )}
          <Text color="keystore.200">{buttonSubtitle}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
