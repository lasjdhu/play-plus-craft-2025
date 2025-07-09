import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Drawer from "expo-router/drawer";
import { Calendar, Info, Trophy, Users } from "lucide-react-native";
import { Platform, useWindowDimensions, View, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isPermanent = width >= 768;
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Tiny5: require("../assets/fonts/Tiny5-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        if (Platform.OS === "web") {
          let title = "Play + Craft 2025";
          switch (pathname) {
            case "/":
              title = "About";
              break;
            case "/teams":
              title = "Teams";
              break;
            case "/schedule":
              title = "Schedule";
              break;
            case "/leaderboard":
              title = "Leaderboard";
              break;
          }
          document.title = title;
        }

        if (fontsLoaded) {
          setAppIsReady(true);
        }
      } catch (err) {
        console.warn("Error during app preparation:", err);
      }
    }

    prepare();
  }, [fontsLoaded, pathname]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar />
      <Drawer
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
            title: "About",
            drawerIcon: ({ size, color }) => <Info size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="teams"
          options={{
            title: "Teams",
            drawerIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="schedule"
          options={{
            title: "Schedule",
            drawerIcon: ({ size, color }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="leaderboard"
          options={{
            title: "Leaderboard",
            drawerIcon: ({ size, color }) => (
              <Trophy size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingTop: 20 }}
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
}
