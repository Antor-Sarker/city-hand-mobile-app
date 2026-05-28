import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[serviceId]"
        options={{ headerShown: true, title: "details" }}
      />
      <Stack.Screen
        name="booking/[serviceId]"
        options={{ headerShown: true, title: "booking" }}
      />
    </Stack>
  );
}
