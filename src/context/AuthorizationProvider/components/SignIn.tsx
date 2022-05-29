import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslate } from "react-polyglot";
import { RouteComponentProps } from "react-router";
import { Text } from "components/Text";
import { useWallet } from "hooks/useWallet/useWallet";
import { useForm } from "react-hook-form";

export const SignIn = ({ history }: RouteComponentProps) => {
  const {
    register,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  const [showPw, setShowPw] = useState(false);

  const { connectDemo } = useWallet();

  const handleShowClick = () => setShowPw(!showPw);

  const translate = useTranslate();
  return (
    <>
      <ModalHeader textAlign="center">
        <Text
          color="keystoneNeutral.200"
          size="50px"
          fontWeight="extrabold"
          translation="authorization.signIn.title"
        />
      </ModalHeader>
      <ModalBody>
        <Box>
          <FormControl>
            <FormLabel htmlFor="signIn-email">
              <Text
                fontSize="13px"
                color="keystone.200"
                translation="authorization.common.email"
              />
            </FormLabel>
            <Input
              id="signIn-email"
              type="email"
              size="lg"
              variant="filled"
              placeholder={translate("authorization.common.emailPlaceholder")}
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormLabel htmlFor="signIn-password">
            <Text
              fontSize="13px"
              color="keystone.200"
              translation="authorization.common.password"
            />
          </FormLabel>
          <InputGroup size="lg" variant="filled">
            <Input
              id="signIn-password"
              type={showPw ? 'text' : 'password'}
              placeholder="**********"
              {...register("password", {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={translate(
                  `modals.shapeShift.password.${showPw ? "hide" : "show"}`
                )}
                h="1.75rem"
                size="sm"
                variant="ghost"
                onClick={handleShowClick}
                icon={!showPw ? <FaEye /> : <FaEyeSlash />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex mt={6} mb={6}>
          <Box>Captcha</Box>
        </Flex>
        <Flex justifyContent="center">
          <Button
            variant="link"
            justifyContent="center"
            onClick={() => history.push("/recover-password")}
          >
            <Text
              fontSize="lg"
              color="keystoneNeutral.200"
              translation="authorization.forgetPassword.title"
            />
          </Button>
        </Flex>
        <Flex mt={8} justifyContent="space-between" alignItems="center">
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              mr={1}
              fontSize="lg"
              color="lime.200"
              translation="authorization.signIn.dontHaveAccount"
              fontWeight="normal"
            />
            <Button
              variant="link"
              onClick={() => history.push("/registration")}
            >
              <Text
                color="lime.200"
                fontSize="lg"
                translation="authorization.signIn.register"
                fontWeight="medium"
                textDecoration="underline"
              />
            </Button>
          </Flex>
          <Button
            onClick={connectDemo}
            disabled={!isValid}
            paddingLeft="50px"
            paddingRight="50px"
            size="lg"
            variant="solid"
            colorScheme="lime"
          >
            <Text translation="authorization.signIn.title" />
          </Button>
        </Flex>
      </ModalBody>
    </>
  );
};
