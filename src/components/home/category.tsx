import { Service } from "@/types/services";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Category({
  setServicesData,
  setFilterBy,
}: {
  setServicesData: Dispatch<SetStateAction<Service[]>>;
  setFilterBy: Dispatch<SetStateAction<string>>;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "All", value: "all" },
    { key: "Cleaning", value: "cleaning" },
    { key: "Plumbing", value: "plumbing" },
    { key: "Electrical", value: "electrical" },
    { key: "Repairing", value: "appliance" },
    { key: "Installation", value: "installation" },
    { key: "IT", value: "it" },
    { key: "Relocation", value: "moving" },
  ];

  function handelSelectedCategory(value: string) {
    setSelectedCategory(value);
    setServicesData([]);
    setFilterBy(value);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
    >
      {categories?.map((item) => (
        <TouchableOpacity
          key={item?.key}
          activeOpacity={0.8}
          style={[
            styles.category,
            selectedCategory === item.value && styles.selectedCategory,
          ]}
          onPress={() => handelSelectedCategory(item.value)}
        >
          <Text
            style={[
              styles.content,
              selectedCategory === item.value && styles.selectedCategory,
            ]}
          >
            {item?.key}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    overflowX: "scroll",
    marginHorizontal: 12,
    marginBottom: 15,
  },

  category: {
    backgroundColor: "#cd89b226",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginHorizontal: 5,
  },
  content: {
    fontSize: 14,
    fontWeight: "400",
    color: "#E2136E",
  },
  selectedCategory: {
    color: "white",
    backgroundColor: "#E2136E",
  },
});
