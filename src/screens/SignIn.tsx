import { Heading, Icon, useTheme, VStack } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

export const SignIn = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert("Sign in ", "Provide email and password");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Sign in ", "Invalid Email.");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Sign in ", "Wrong password.");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Sign in ", "User not found.");
        }

        return Alert.alert("Sign in", "Not possible to access");
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Access your account {email}
      </Heading>
      <Input
        placeholder="E-mail"
        mb={4}
        value={email}
        InputLeftElement={
          <Icon
            as={<MaterialIcons color={colors.gray[300]} />}
            ml={4}
            name="email"
          />
        }
        onChangeText={setEmail}
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
      <Button
        title="Sign in"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
};
