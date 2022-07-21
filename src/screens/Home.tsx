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
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import Logo from "../assets/logo_secondary.svg";
import { Feather } from "@expo/vector-icons";
import { Filter } from "../components/Filter";
import { useEffect, useState } from "react";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { ChatTeardrop } from "phosphor-react-native";
import { Alert } from "react-native";
import { dateformat } from "../utils/firestoreDateFormat";
import { Loading } from "../components/Loading";

export const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const handleNewOrder = () => {
    navigation.navigate("new");
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .catch(() => Alert.alert("Log out", "Not possible to log out"));
  };

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateformat(created_at)
          };
        });
        setOrders(data);
        setLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

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
          icon={
            <Feather
              name="log-out"
              size={26}
              color={colors.gray[300]}
              onPress={handleSignOut}
            />
          }
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

        {loading ? (
          <Loading />
        ) : (
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
        )}
        <Button title="New request" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
