import api from "@/api/exios";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingScreen() {
  const [plan, setPlan] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const { serviceId, serviceName, serviceCategory, prices, selectedPrice } =
    useLocalSearchParams<{
      serviceId: string;
      serviceName: string;
      serviceCategory: string;
      prices: string;
      selectedPrice: string;
    }>();

  const priceData = JSON.parse(prices);
  console.log(serviceId, priceData[`${selectedPrice}`], selectedPrice);

  useEffect(() => {
    setPlan(selectedPrice);
  }, [selectedPrice]);

  const openCalender = () => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onValueChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
        }
      },
      mode: "date",
      minimumDate: new Date(),
    });
  };

  async function handleConfirm() {
    const bookingData = {
      serviceId,
      serviceName,
      serviceCategory,
      plan,
      bookingTime,
      bookingDate: date ? formatDate(date) : "",
      price: priceData[`${plan}`],
      phone,
      address,
      notes,
    };

    try {
      setIsLoading(true);
      setIsError(false);

      const response = await api.post(`/api/booking`, bookingData);
      if (response.status === 201) {
        router.replace("/(tabs)/myBooking");
      }
    } catch (error) {
      setIsError(true);
      console.log("Booking API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={{ paddingBottom: 230 }}
      >
        {/* Service Info */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>SERVICE NAME</Text>
          <Text style={styles.infoText}>{serviceName}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>CATEGORY</Text>
          <Text style={styles.infoText}>{serviceCategory}</Text>
        </View>

        {/* Plan */}
        <Text style={styles.label}>SERVICE PLAN</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={plan || selectedPrice} onValueChange={setPlan}>
            <Picker.Item label="Select Plan" value="" />
            <Picker.Item label={`Basic - ৳${priceData?.basic}`} value="basic" />
            <Picker.Item
              label={`Standard - ৳${priceData?.standard}`}
              value="standard"
            />
            <Picker.Item
              label={`Premium - ৳${priceData?.premium}`}
              value="premium"
            />
          </Picker>
        </View>

        {/* Date Picker */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>BOOKING DATE</Text>
          <TouchableOpacity
            style={styles.inputRow}
            activeOpacity={0.7}
            onPress={openCalender}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color="#888"
              style={styles.iconLeft}
            />
            <Text style={[styles.inputText, !date && styles.placeholderText]}>
              {date ? formatDate(date) : "Selecte Date"}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={18}
              color="#888"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Time */}
        <Text style={styles.label}>BOOKING TIME</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={bookingTime} onValueChange={setBookingTime}>
            <Picker.Item label="Select Time" value="" />
            <Picker.Item label="08:00 AM" value="08:00 AM" />
            <Picker.Item label="09:00 AM" value="09:00 AM" />
            <Picker.Item label="10:00 AM" value="10:00 AM" />
            <Picker.Item label="11:00 AM" value="11:00 AM" />
            <Picker.Item label="12:00 PM" value="12:00 PM" />
            <Picker.Item label="01:00 PM" value="01:00 PM" />
            <Picker.Item label="02:00 PM" value="02:00 PM" />
            <Picker.Item label="03:00 PM" value="03:00 PM" />
            <Picker.Item label="04:00 PM" value="04:00 PM" />
            <Picker.Item label="05:00 PM" value="05:00 PM" />
          </Picker>
        </View>

        {/* Phone */}
        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          placeholder="Enter phone number"
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Address */}
        <Text style={styles.label}>ADDRESS</Text>
        <TextInput
          placeholder="Your address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        {/* Notes */}
        <Text style={styles.label}>NOTES</Text>
        <TextInput
          placeholder="Additional notes..."
          multiline
          numberOfLines={5}
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
        />
        {isError && <Text style={styles.error}>Please Try Again!</Text>}
        {/* Footer  confirm/cancel button*/}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm Booking</Text>
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={"white"}
                style={{ paddingLeft: 8 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const PRIMARY = "#E2136E";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    borderWidth: 0.5,
    borderColor: PRIMARY,
    borderRadius: 14,
    padding: 10,
    marginVertical: 5,
  },
  label: {
    marginTop: 8,
    marginBottom: 5,
    fontSize: 12,
    color: "#888",
    fontWeight: "700",
  },
  infoText: {
    color: PRIMARY,
    fontWeight: "600",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    overflow: "hidden",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  notesInput: {
    height: 120,
    textAlignVertical: "top",
  },

  error: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
    color: "#E2136E",
  },

  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    paddingBottom: 110,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtn: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: PRIMARY,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  cancelText: {
    color: "#666",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },

  // Date field
  fieldWrapper: {
    marginTop: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingVertical: 14,
  },
  iconLeft: {
    paddingHorizontal: 12,
  },
  iconRight: {
    paddingHorizontal: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
});
