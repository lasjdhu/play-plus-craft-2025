import { ROUTE_TITLES } from "@/lib/constants";
import { useRouteInfo } from "expo-router/build/hooks";
import Head from "expo-router/head";
import { Platform } from "react-native";

export default function Metadata() {
  const segment = useRouteInfo().pathname.split("/")[1];
  const routeKey = segment === "" || !segment ? "index" : segment;

  const pageTitle = ROUTE_TITLES[routeKey] ?? "Play + Craft 2025";

  if (Platform.OS !== "web") return null;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content="Demo application that showcases Unity and Flutter integration into React Native"
      />
    </Head>
  );
}
