import { Stack } from "expo-router";

export default function MyBookingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[bookingID]"
        options={{ title: "Edit Booking", headerShown: true }}
      />
    </Stack>
  );
}
