import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack
} from "native-base";

import Logo from "../assets/logo_secondary.svg";
import { Feather } from "@expo/vector-icons";
import { Filter } from "../components/Filter";
import { useState } from "react";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { ChatTeardrop } from "phosphor-react-native";

export const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "123",
      patrimony: "ddddd",
      when: "18/07/2022 as 10:00",
      status: "open"
    }
  ]);

  const handleNewOrder = () => {
    navigation.navigate("new");
  };

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<Feather name="log-out" size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">My tickets</Heading>
          <Text color="gray.200">3</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="In progress"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="Closed"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Order
              data={item}
              onPress={() =>
                navigation.navigate("details", { orderId: item.id })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardrop color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                You have no requests{"\n"}
                {statusSelected === "open" ? "open" : "closed"}
              </Text>
            </Center>
          )}
        />
        <Button title="New request" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
