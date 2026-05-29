import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BookingScreen() {
  const { serviceId,planType } = useLocalSearchParams<{serviceId:string,planType:string}>();
  return (
    <View>
      <Text>booking screen {serviceId} {planType}</Text>
    </View>
  );
}
