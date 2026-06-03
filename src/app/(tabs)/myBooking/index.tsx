import { Text, View } from "react-native";

export default function BookingsScreen(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
            <Text style={{fontSize:24,fontWeight:"bold", color: "#E2136E"}}>My Bookings</Text>
        </View>
    )
}




// import {
//     FlatList,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from "react-native";

// interface Booking {
//   _id: string;
//   serviceId: string;
//   serviceName: string;
//   serviceCategory: string;
//   plan: string;
//   price: number;
//   bookingDate: string;
//   bookingTime: string;
//   phone: string;
//   address: string;
//   notes: string;
//   status?: "pending" | "approved" | "completed" | "cancelled";
// }

// const bookings: Booking[] = [
//   {
//     _id: "1",
//     serviceId: "69b24ef4c8d6be129859a853",
//     serviceName: "AC Service",
//     serviceCategory: "ac",
//     plan: "Premium",
//     price: 800,
//     bookingDate: "12-12-24",
//     bookingTime: "03:30 PM",
//     phone: "1234567809",
//     address: "Savar",
//     notes: "Phone dite hobe",
//     status: "pending",
//   },
//   {
//     _id: "2",
//     serviceId: "69b24ef4c8d6be129859a853",
//     serviceName: "AC Repair",
//     serviceCategory: "ac",
//     plan: "Standard",
//     price: 1200,
//     bookingDate: "15-12-24",
//     bookingTime: "11:00 AM",
//     phone: "1234567809",
//     address: "Dhaka",
//     notes: "",
//     status: "approved",
//   },
// ];

// const PRIMARY = "#E2136E";

// const MyBookingsScreen = () => {
//   const renderStatusColor = (status?: string) => {
//     switch (status) {
//       case "approved":
//         return "#22C55E";
//       case "completed":
//         return "#3B82F6";
//       case "cancelled":
//         return "#EF4444";
//       default:
//         return "#F59E0B";
//     }
//   };

//   const renderItem = ({ item }: { item: Booking }) => (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       style={styles.card}
//       onPress={() => {
//         // Navigation here
//         console.log(item);
//       }}
//     >
//       <View style={styles.header}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.serviceName}>{item.serviceName}</Text>
//           <Text style={styles.plan}>{item.plan} Plan</Text>
//         </View>

//         <View
//           style={[
//             styles.statusBadge,
//             {
//               backgroundColor: renderStatusColor(item.status),
//             },
//           ]}
//         >
//           <Text style={styles.statusText}>{item.status || "pending"}</Text>
//         </View>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.infoRow}>
//         <Text style={styles.label}>📅 Date</Text>
//         <Text style={styles.value}>{item.bookingDate}</Text>
//       </View>

//       <View style={styles.infoRow}>
//         <Text style={styles.label}>🕒 Time</Text>
//         <Text style={styles.value}>{item.bookingTime}</Text>
//       </View>

//       <View style={styles.infoRow}>
//         <Text style={styles.label}>📍 Address</Text>
//         <Text style={styles.value}>{item.address}</Text>
//       </View>

//       <View style={styles.footer}>
//         <View>
//           <Text style={styles.priceLabel}>Total Price</Text>
//           <Text style={styles.price}>৳ {item.price}</Text>
//         </View>

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.topSection}>
//         <Text style={styles.title}>My Bookings</Text>
//         <Text style={styles.subtitle}>{bookings.length} Booking Found</Text>
//       </View>

//       <FlatList
//         data={bookings}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         contentContainerStyle={{
//           padding: 16,
//           paddingBottom: 30,
//         }}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyEmoji}>📅</Text>
//             <Text style={styles.emptyTitle}>No Bookings Yet</Text>
//             <Text style={styles.emptyText}>
//               Your service bookings will appear here.
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// export default MyBookingsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },

//   topSection: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 12,
//     backgroundColor: "#fff",
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111",
//   },

//   subtitle: {
//     marginTop: 4,
//     color: "#666",
//     fontSize: 14,
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#F2F2F2",
//     elevation: 2,
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   serviceName: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111",
//   },

//   plan: {
//     marginTop: 4,
//     color: "#777",
//     fontSize: 13,
//     fontWeight: "500",
//   },

//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 30,
//   },

//   statusText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "700",
//     textTransform: "capitalize",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#F3F4F6",
//     marginVertical: 14,
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   label: {
//     color: "#666",
//     fontSize: 14,
//   },

//   value: {
//     color: "#111",
//     fontSize: 14,
//     fontWeight: "600",
//   },

//   footer: {
//     marginTop: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   priceLabel: {
//     color: "#777",
//     fontSize: 12,
//   },

//   price: {
//     color: PRIMARY,
//     fontSize: 24,
//     fontWeight: "700",
//   },

//   button: {
//     backgroundColor: PRIMARY,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },

//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },

//   emptyContainer: {
//     alignItems: "center",
//     marginTop: 100,
//   },

//   emptyEmoji: {
//     fontSize: 60,
//   },

//   emptyTitle: {
//     marginTop: 12,
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111",
//   },

//   emptyText: {
//     marginTop: 8,
//     color: "#777",
//     textAlign: "center",
//     paddingHorizontal: 40,
//   },
// });
