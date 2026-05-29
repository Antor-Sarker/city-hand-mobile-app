import { Service } from "@/types/services";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SearchReaults({ item }: { item: Service }) {
  const imageURL =
    typeof item?.image === "string" ? item.image : item.image.url;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push(`/home/service/${item?._id}`)}
      style={styles.container}
    >
      <Image source={{ uri: imageURL }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={{ fontSize: 14 }}>{item?.title}</Text>
        <Text style={{ fontSize: 11, color: "gray" }}>
          {item?.categoryLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderWidth: 0.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#cfc8c8ea",
  },
  cover: { width: "20%", height: 50, borderRadius: 7 },
  info: { flexDirection: "column", gap: 3 },
});
