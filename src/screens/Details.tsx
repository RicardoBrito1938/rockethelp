import { Text, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export const Details = ({ route }) => {
  const { orderId } = route.params;
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Request" />
      <Text color="white">{orderId}</Text>
    </VStack>
  );
};
