import AppBar from "@/components/home/appBar";
import Category from "@/components/home/category";
import { ServiceCard } from "@/components/home/serviceCard";
import { BASE_URL } from "@/config/api";
import { Service } from "@/types/services";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/api/service`);
        const data: Service[] = await response.json();
        setServicesData(data);
      } catch (error) {
        console.log("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={servicesData}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ServiceCard item={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <AppBar />
          <Category />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
