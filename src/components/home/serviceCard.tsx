import { Service } from "@/types/services";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ServiceCard = ({ item }: { item: Service }) => {
  const imageUrl =
    typeof item.image === "string" ? item.image : item.image?.url;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={() => router.push(`/home/service/${item?._id}`)}
    >
      {/* Image */}
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <Text numberOfLines={2} style={styles.description}>
          {item.description || "No description available"}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.startingText}>Starting From</Text>
            <Text style={styles.price}>৳ {item.price?.basic ?? 300}</Text>
          </View>

          <Text style={styles.categoryTag}>{item.categoryLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 20,
    marginHorizontal: 4,
    overflow: "hidden",
    elevation: 4,
  },

  cardImage: {
    width: "100%",
    height: 190,
  },

  categoryTag: {
    color: "#E2136E",
    fontSize: 12,
    fontWeight: "500",
    backgroundColor: "#e2136d19",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  contentContainer: {
    padding: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: "#666",
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  startingText: {
    fontSize: 12,
    color: "#666",
  },

  price: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "700",
    color: "#E2136E",
  },
});
