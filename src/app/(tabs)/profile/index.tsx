import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Text>Profile Screen</Text>
      <Link href={"/(tabs)/profile/auth"}>login</Link>
      <Text>auth</Text>
      <Link href={"/(tabs)/profile/auth/signup"}>reg</Link>
    </View>
  );
}
