import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const dateformat = (timestamp: FirebaseFirestoreTypes.Timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = date.toLocaleDateString("en-UK");
    const hour = date.toLocaleTimeString("en-UK");

    return `${day} at ${hour}`;
  }
};
