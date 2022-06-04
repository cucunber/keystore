import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  Tag,
} from "@chakra-ui/react";
import profile from "assets/profile.svg";
import { Card } from "components/Card/Card";
import { EditIcon } from "components/Icons/Edit";
import { MailIcon } from "components/Icons/Mail";
import { PhoneIcon } from "components/Icons/Phone";
import { SignOutIcon } from "components/Icons/SignOut";
import { Main } from "components/Layout/Main";
import { Levels } from "components/Levels/Levels";

export const ProfileHeader = () => {
  const user = {
    firstName: "Name",
    lastName: "Surname",
    email: "sarahjane@mail.com",
    phone: "+27 83 445 5423",
    level: 0,
  };

  const steps = [
    {
      label: "Register a Profile",
      isCompleted: true,
      step: 0,
      subtitle: "Create a profile using your personal details.",
    },
    {
      label: "Level 1",
      isCompleted: false,
      step: 1,
      subtitle: "Trade up to a total amount of R15 000",
      buttonSubtitle: 'Upload a selfie and enable two-factor-authentication',
    },
    {
      label: "Level 2",
      isCompleted: false,
      step: 2,
      subtitle: "Deposit or withdraw up to R50 000 per month.",
      buttonSubtitle: 'Upload government issued ID',
    },
    {
      label: "Level 3",
      isCompleted: false,
      step: 3,
      subtitle: "Trade, deposit, withdraw without any limits.",
      buttonSubtitle: 'Upload proof of residential address.',
    },
  ];
  const activeStep = steps.find((step) => !step.isCompleted);

  const TitleComponent = () => (
    <Box p={["0", "8"]}>
      <Flex mb={8}>
        <Box display="flex" alignItems="center">
          <Image src={profile} />
          <Text ml={4} fontSize={["md", "lg", "3xl"]}>
            {user.firstName} {user.lastName}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Button leftIcon={<EditIcon />} colorScheme="gray">
            Edit Details
          </Button>
          <Button
            leftIcon={<SignOutIcon />}
            variant="outline"
            colorScheme="slate"
            ml={2.5}
          >
            Sign Out
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box display="flex" alignItems="center">
          <MailIcon />
          <Text ml={3} fontSize={["xs", "s", "md"]}>
            {user.phone}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" ml={20}>
          <PhoneIcon />
          <Text ml={3} fontSize={["xs", "s", "md"]}>
            {user.email}
          </Text>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <Main titleComponent={<TitleComponent />}>
      <Card p={4}>
        <Card.Header textAlign="left">
          <Flex>
            <Box display="flex" alignItems="center">
              <Heading as="h4" size="md" color="keystone.200">
                Verification Status
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Tag bgColor="lime.bg" color="slate.200">
                <Heading as="h4" size="md">
                  Level {user.level}
                </Heading>
              </Tag>
            </Box>
          </Flex>
        </Card.Header>
        <Card.Body>
          <Levels activeStep={activeStep?.step || 0} steps={steps} />
        </Card.Body>
      </Card>
    </Main>
  );
};
