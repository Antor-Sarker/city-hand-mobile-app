import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.logo}>CityHand</Text>

      <View style={styles.iconsContainer}>
        <Link href="/home/details">
          <Fontisto name="bell" size={24} color="black" />
        </Link>

        <Link href="/home/details">
          <Ionicons name="search" size={25} color="black" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { color: "#E2136E", fontSize: 25, fontWeight: "bold" },
  iconsContainer: { flexDirection: "row", gap: 24 },
});
