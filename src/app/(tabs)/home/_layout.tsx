import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen
        name="service/[serviceId]"
        options={{ headerShown: true, title: "service" }}
      />
      <Stack.Screen
        name="booking"
        options={{ headerShown: true, title: "booking" }}
      />
    </Stack>
  );
}
