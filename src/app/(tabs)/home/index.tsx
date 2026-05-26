import AppBar from "@/components/home/appBar";
import Category from "@/components/home/category";
import { ServiceCard } from "@/components/home/serviceCard";
import { BASE_URL } from "@/config/api";
import { Service } from "@/types/services";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/api/service?category=${filterBy}`,
        );
        const data: Service[] = await response.json();
        setServicesData(data);
      } catch (error) {
        console.log("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [filterBy]);

  return (
    <>
      <FlatList
        data={servicesData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ServiceCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <AppBar />
            <Category
              setServicesData={setServicesData}
              setFilterBy={setFilterBy}
            />
          </>
        }
      />

      {loading && (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}
