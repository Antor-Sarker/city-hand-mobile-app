import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
