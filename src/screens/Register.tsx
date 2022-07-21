import { VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleOderRegister = () => {
    if (!patrimony || !description) {
      return Alert.alert("Register", "Fill the data");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Request", "Request submitted successfully");
        navigation.goBack();
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Request", "Not possible to register the request");
      });
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="New request" />

      <Input
        placeholder="Patrimony number"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Problem description"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Sign up"
        mt={5}
        isLoading={isLoading}
        onPress={handleOderRegister}
      />
    </VStack>
  );
};
