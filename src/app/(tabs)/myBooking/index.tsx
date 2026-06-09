import api from "@/api/exios";
import { Booking } from "@/types/booking";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const PRIMARY = "#E2136E";

export default function MyBookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      (async function fetchBookings() {
        try {
          const response = await api.get("/api/booking");
          if (response?.data) {
            const reverseBookings = response?.data?.data?.reverse();
            setBookings(reverseBookings);
          }
        } catch (error) {
          console.log("Error fetching bookings:", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }, []),
  );

  const renderStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#22C55E";
      case "completed":
        return "#3B82F6";
      case "cancelled":
        return "#EF4444";
      default:
        return "#F59E0B";
    }
  };

  const renderItem = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.serviceName}>{item.serviceName}</Text>
          <Text style={styles.plan}>{item.plan} Plan</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: renderStatusColor(item.status),
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status || "pending"}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>📅 Date</Text>
        <Text style={styles.value}>{item.bookingDate}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>🕒 Time</Text>
        <Text style={styles.value}>{item.bookingTime}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>📍 Address</Text>
        <Text style={styles.value}>{item.address}</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.price}>৳ {item.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/(tabs)/myBooking/${item._id}`)}
        >
          <Feather name="edit" size={18} color={"white"} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading)
    return (
      <View style={{ marginTop: "80%" }}>
        <ActivityIndicator size="large" color={PRIMARY} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={[styles.topSection, { paddingTop: insets.top }]}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyText}>
              Your service bookings will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topSection: {
    backgroundColor: PRIMARY,
    paddingBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  plan: {
    marginTop: 4,
    color: "#777",
    fontSize: 13,
    fontWeight: "500",
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 30,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#666",
    fontSize: 14,
  },

  value: {
    color: "#111",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceLabel: {
    color: "#777",
    fontSize: 12,
  },

  price: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    flexDirection: "row",
    backgroundColor: PRIMARY,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    paddingLeft: 5,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  emptyText: {
    marginTop: 8,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
