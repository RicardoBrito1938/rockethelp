import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { OrderProps } from "../components/Order";
import firestore from "@react-native-firebase/firestore";
import { OrderFirestoreDTO } from "../DTOs/OrderDTO";
import { dateformat } from "../utils/firestoreDateFormat";
import { Loading } from "../components/Loading";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard
} from "phosphor-react-native";
import { CarDetails } from "../components/CarDetails";
import { Alert } from "react-native";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export const Details = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const { orderId } = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const navigation = useNavigation();

  const handleOrderClose = () => {
    if (!solution) {
      return Alert.alert("Solicitation", "Inform the solution the close");
    }

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Request", "Request closed");
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Request", "Error closing request");
      });
  };

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then(doc => {
        const {
          patrimony,
          description,
          status,
          closed_at,
          created_at,
          solution
        } = doc.data();

        const closed = closed_at ? dateformat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateformat(created_at),
          closed
        });

        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <VStack flex={1} bg="gray.700">
      <Box p={6} bg="gray.600">
        <Header title="Request" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status ? "Closed" : "OnHold"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CarDetails
          title="Equipment"
          description={`Patrimony ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CarDetails
          title="Problem description"
          description={order.description}
          icon={Clipboard}
          footer={order.when}
        />

        <CarDetails
          title="Solution"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Closed in ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Solution description"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CarDetails>
      </ScrollView>
      {!order.closed && (
        <Button title="Close request" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  );
};
