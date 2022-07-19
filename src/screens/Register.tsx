import { VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export const Register = () => {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="New request" />

      <Input placeholder="Patrimony number" mt={4} />

      <Input
        placeholder="Problem description"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
      />

      <Button title="Sign up" mt={5} />
    </VStack>
  );
};
