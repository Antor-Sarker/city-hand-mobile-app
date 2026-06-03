import { BASE_URL } from "@/config/api";
import { Service } from "@/types/services";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PINK = "#E2136E";
const PINK_LIGHT = "#fce8f1";
const PINK_DARK = "#b80d57";

const plans = [
  {
    name: "basic",
    desc: "Basic check & quick fixes",
    popular: false,
  },
  {
    name: "standard",
    desc: "Full service & maintenance",
    popular: true,
  },
  {
    name: "premium",
    desc: "Complete end-to-end setup",
    popular: false,
  },
];

export default function ServiceScreen() {
  const [selected, setSelected] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<Service | null>(null);
  const { serviceId } = useLocalSearchParams();

  const image =
    typeof serviceData?.image === "string"
      ? serviceData?.image
      : serviceData?.image?.url;
  const description = serviceData?.description?.substring(0, 105);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/api/service/${serviceId}`);
        const data: Service = await response.json();
        setServiceData(data);
      } catch (error) {
        console.log(`Failed to fatch service data `, error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function handelBookingNavigate(isBasic = false) {
    router.push({
      pathname: "/home/booking",
      params: {
        serviceId: serviceData?._id,
        serviceName: serviceData?.title,
        serviceCategory: serviceData?.categoryLabel,
        prices: JSON.stringify(serviceData?.price),
        selectedPrice: isBasic ? "basic" : plans[selected].name,
      },
    });
  }

  // Loading
  if (isLoading)
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator size="large" color={PINK} />
      </View>
    );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* card */}
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={styles.image}
          imageStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        >
          <View style={styles.overlay} />

          {/* categpory tag*/}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {serviceData?.categoryLabel}
            </Text>
          </View>

          {/* Bottom title */}
          <View style={styles.cardBottom}>
            <Text style={styles.cardTitle}>{serviceData?.title}</Text>
            <Text style={styles.cardSubtitle}>{description}</Text>
          </View>
        </ImageBackground>

        {/* Body */}
        <View style={styles.body}>
          {/* Booking */}
          <View style={styles.bookingRow}>
            <View>
              <Text style={styles.startingLabel}>STARTING FROM</Text>
              <Text style={styles.startingPrice}>
                ৳{serviceData?.price?.basic}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bookBtnTop}
              activeOpacity={0.85}
              onPress={() => handelBookingNavigate(true)}
            >
              <Text style={styles.bookBtnTextTop}>Book Now →</Text>
            </TouchableOpacity>
          </View>

          {/* Section: What's Included */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>What's Included</Text>
          </View>

          {serviceData?.serviceInclusions?.map((item) => (
            <View key={item} style={styles.serviceRow}>
              <Ionicons name="checkmark-circle-sharp" size={20} color={PINK} />
              <Text style={styles.serviceLabel}>{item}</Text>
            </View>
          ))}

          {/* Section: Pricing */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>Pricing Plans</Text>
          </View>

          {plans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelected(index)}
              activeOpacity={0.8}
              style={[
                styles.planCard,
                selected === index && styles.planCardSelected,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}

              <View style={styles.planRow}>
                <View>
                  <Text
                    style={[
                      styles.planName,
                      selected === index && { color: PINK_DARK },
                    ]}
                  >
                    {capitalizeFirstLetter(plan?.name)}
                  </Text>
                  <Text style={styles.planDesc}>{plan.desc}</Text>
                </View>
                <Text style={styles.planPrice}>
                  ৳
                  {
                    serviceData?.price?.[
                      plan?.name?.toLowerCase() as
                        | "basic"
                        | "standard"
                        | "premium"
                    ]
                  }
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/*Book Now Button */}
          <TouchableOpacity
            style={styles.bookBtnBottom}
            activeOpacity={0.85}
            onPress={() => handelBookingNavigate()}
          >
            <Text style={styles.bookTextBottom}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },

  // top card
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },

  image: {
    height: 220,
    justifyContent: "space-between",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.38)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  categoryBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  cardBottom: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 28,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
    lineHeight: 19,
  },

  // Body
  body: {
    padding: 20,
  },

  // Booking row
  bookingRow: {
    backgroundColor: PINK_LIGHT,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: "#f4b8d4",
  },
  startingLabel: {
    fontSize: 10,
    color: PINK,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  startingPrice: {
    fontSize: 26,
    fontWeight: "800",
    color: PINK,
    marginTop: 2,
  },
  bookBtnTop: {
    backgroundColor: PINK,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
  bookBtnTextTop: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // Section
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  sectionBar: {
    width: 4,
    height: 22,
    backgroundColor: PINK,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
    marginLeft: 8,
  },

  // Service rows
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    gap: 12,
  },
  serviceIcon: {
    fontSize: 18,
    color: PINK,
  },
  serviceLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },

  // Plan cards
  planCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: "#eee",
    backgroundColor: "#fff",
    marginBottom: 10,
    overflow: "hidden",
  },
  planCardSelected: {
    borderColor: PINK,
    borderWidth: 2,
    backgroundColor: PINK_LIGHT,
  },
  popularBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: PINK,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
  },
  popularText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  planDesc: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: PINK,
  },

  // bottom book button
  bookBtnBottom: {
    backgroundColor: PINK,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  bookTextBottom: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
