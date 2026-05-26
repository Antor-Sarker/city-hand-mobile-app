import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "All Service", value: "all" },
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

    // filter data by category
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
    borderStyle: "solid",
    borderColor: "#7a7474",
    borderRadius: 5,
    borderWidth: 0.8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal: 5,
  },
  content: {
    fontSize: 15,
    fontWeight: "300",
    color: "#4d4b4b",
  },
  selectedCategory: {
    color: "#E2136E",
    borderColor: "#E2136E",
  },
});
