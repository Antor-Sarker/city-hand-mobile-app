import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Pressable } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E2136E",
        tabBarInactiveTintColor: "#7A7A7A",
        animation: "none",

        // remove animation on tab press
        tabBarButton: (props) => {
          const { ref, ...restProps } = props as any;
          return (
            <Pressable
              {...restProps}
              android_ripple={Platform.OS === "android" ? null : undefined}
            />
          );
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "400",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myBooking"
        options={{
          title: "My Booking",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
