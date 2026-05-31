import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: "#E2136E",
        paddingTop: insets.top + 10,
        paddingBottom: 8,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{ zIndex: 1, paddingLeft: 15 }}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Ionicons name="chevron-back" color="white" size={23} />
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 23,
          fontWeight: "bold",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
