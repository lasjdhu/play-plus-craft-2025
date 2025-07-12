import Metadata from "@/components/Metadata";
import { LARGE_SCREEN_WIDTH, ROUTE_TITLES } from "@/lib/constants";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import { Calendar, Info, Trophy, Users } from "lucide-react-native";
import { useWindowDimensions, View, Text } from "react-native";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingTop: 40 }}
    >
      <View
        style={{ marginBottom: 20, paddingHorizontal: 16, alignSelf: "center" }}
      >
        <Text style={{ color: "white", fontSize: 32, fontFamily: "Tiny5" }}>
          Play + Craft 2025
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  const { width } = useWindowDimensions();
  const isPermanent = width >= LARGE_SCREEN_WIDTH;

  return (
    <>
      <Metadata />
      <Drawer
        detachInactiveScreens={true}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1a1a2e",
            borderBottomColor: "#2a2a3e",
          },
          drawerStyle: {
            backgroundColor: "#1a1a2e",
            borderRightColor: "#2a2a3e",
          },
          drawerItemStyle: {
            marginVertical: 4,
          },
          drawerActiveTintColor: "#00d4ff",
          drawerInactiveTintColor: "white",
          drawerType: isPermanent ? "permanent" : "front",
          headerShown: isPermanent ? false : true,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: ROUTE_TITLES.index,
            drawerIcon: ({ size, color }) => <Info size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="teams"
          options={{
            title: ROUTE_TITLES.teams,
            drawerIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="schedule"
          options={{
            title: ROUTE_TITLES.schedule,
            drawerIcon: ({ size, color }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="leaderboard"
          options={{
            title: ROUTE_TITLES.leaderboard,
            drawerIcon: ({ size, color }) => (
              <Trophy size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </>
  );
}
