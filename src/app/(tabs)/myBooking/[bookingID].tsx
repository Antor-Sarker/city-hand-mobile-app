import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BookingDetailsScreen() {
  const { bookingID } = useLocalSearchParams();
  return (
    <View>
      <Text>Booking Details Screen</Text>
      <Text>Booking ID: {bookingID}</Text>
    </View>
  );
}
