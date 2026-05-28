import SearchReaults from "@/components/search/searchResults";
import { BASE_URL } from "@/config/api";
import { Service } from "@/types/services";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [input, setInput] = useState<string>("");
  const insets = useSafeAreaInsets();
  const [searchResult, setSearchResult] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handelSearch(searchInput: string) {
    setInput(searchInput);

    if (searchInput === "") {
      setSearchResult([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/service?search=${searchInput}`,
      );
      const data: Service[] = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.log("failed to search services", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handelClearSearch() {
    setInput("");
    setSearchResult([]);
  }

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* back button */}
        <Link href={"/(tabs)/home"}>
          <Ionicons name="arrow-back-outline" size={25} color={"#070707bf"} />
        </Link>

        {/* search input */}
        <TextInput
          placeholder="Search service"
          autoFocus={true}
          value={input}
          onChangeText={handelSearch}
          style={styles.input}
        />

        {/* clear search */}
        {input && (
          <TouchableOpacity onPress={handelClearSearch}>
            <Ionicons
              name="close-sharp"
              size={25}
              color={"balck"}
              style={styles.clearButton}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* not found */}
      {searchResult?.length === 0 && input && (
        <Text style={styles.empty}>
          No result found for <Text style={styles.inputFor}>"{input}"</Text>
        </Text>
      )}

      <FlatList
        data={searchResult}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SearchReaults item={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* loading */}
      {isLoading && (
        <View style={{ flex: 3 }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    borderColor: "#7d7a7a8c",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  input: { flex: 1, fontSize: 17 },

  clearButton: { alignItems: "center", color: "#070707bf" },
  empty: {
    alignSelf: "center",
    paddingTop: 10,
    fontSize: 15,
    color: "#575355",
  },
  inputFor: { fontWeight: "400", color: "#E2136E" },
});
