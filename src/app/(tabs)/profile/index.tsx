import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY = "#E2136E";
const WHITE = "#FFFFFF";

type User = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

const user: User = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+8801700000000",
  address: "Dhaka, Bangladesh",
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.fullName.charAt(0)}</Text>
        </View>

        <Text style={styles.name}>{user.fullName}</Text>
      </View>

      {/* Account Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ACCOUNT DETAILS</Text>

        <InfoRow
          icon="person-outline"
          label="Full Name"
          value={user.fullName}
        />

        <InfoRow icon="mail-outline" label="Email" value={user.email} />

        <InfoRow icon="call-outline" label="Phone" value={user.phone} />

        <InfoRow icon="location-outline" label="Address" value={user.address} />
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="create-outline" size={20} color={PRIMARY} />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={WHITE} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color={PRIMARY} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 42,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 42,
    fontWeight: "700",
    color: PRIMARY,
  },

  name: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "700",
  },

  email: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },

  card: {
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginTop: -30,
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },

  cardTitle: {
    color: PRIMARY,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 16,
    letterSpacing: 1,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFF0F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  editButton: {
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  editText: {
    color: PRIMARY,
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: PRIMARY,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 40,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "700",
  },
});
