import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailsScreen() {
  const { serviceId } = useLocalSearchParams();
  return (
    <View>
      <Text>Details Screen {serviceId}</Text>
      <Link href={`/home/booking/${serviceId}`}>book now</Link>
    </View>
  );
}
