import { Heading, Icon, useTheme, VStack } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { useState } from "react";

export const SignIn = () => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {};

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Access your account {name}
      </Heading>
      <Input
        placeholder="E-mail"
        mb={4}
        value={name}
        InputLeftElement={
          <Icon
            as={<MaterialIcons color={colors.gray[300]} />}
            ml={4}
            name="email"
          />
        }
        onChangeText={setName}
      />
      <Input
        placeholder="Password"
        mb={8}
        value={password}
        InputLeftElement={
          <Icon
            as={<FontAwesome5 color={colors.gray[300]} />}
            ml={4}
            name="key"
          />
        }
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Sign in" w="full" onPress={handleSignIn} />
    </VStack>
  );
};
