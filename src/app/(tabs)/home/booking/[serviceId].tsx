import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BookingScreen() {
  const { serviceId } = useLocalSearchParams();
  return (
    <View>
      <Text>booking screen {serviceId}</Text>
    </View>
  );
}
