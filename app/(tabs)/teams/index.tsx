import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Users, MapPin, Star, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { teamsData } from "@/lib/data/teams";
import { blurhash } from "@/lib/helpers/blurhash";
import { LARGE_SCREEN_WIDTH } from "@/lib/constants";
import { getResponsiveImageUrl } from "@/lib/helpers/getResponsiveImageUrl";

export default function TeamsScreen() {
  const { width } = useWindowDimensions();

  const isLargeScreen = width > LARGE_SCREEN_WIDTH;
  const cardWidth = width >= 1200 ? "48%" : "96%";

  const handleTeamPress = (teamId: number) => {
    router.push(`/teams/${teamId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.header}>
        <Text style={styles.title}>Competing Teams</Text>
        <Text style={styles.subtitle}>
          Meet the incredible developers showcasing their games
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.grid}>
          {teamsData.map((team) => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamCard, { width: cardWidth }]}
              onPress={() => handleTeamPress(team.id)}
              activeOpacity={0.8}
            >
              <View style={styles.teamImageContainer}>
                <Image
                  source={{
                    uri: getResponsiveImageUrl(team.teamImage, isLargeScreen),
                  }}
                  style={styles.teamImage}
                  contentFit="cover"
                  transition={300}
                  placeholder={{ blurhash }}
                  cachePolicy="disk"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.imageOverlay}
                />
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: team.color },
                  ]}
                />
              </View>

              <View style={styles.teamInfo}>
                <View style={styles.teamHeader}>
                  <Text style={styles.teamName}>{team.name}</Text>
                  <ChevronRight size={20} color="#666" />
                </View>

                <Text style={styles.gameName}>{team.game}</Text>

                <View style={styles.teamStats}>
                  <View style={styles.statItem}>
                    <Users size={14} color="#00d4ff" />
                    <Text style={styles.statText}>{team.members}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MapPin size={14} color="#00d4ff" />
                    <Text style={styles.statText}>
                      {team.location.split(",")[0]}
                    </Text>
                  </View>
                </View>

                <View style={styles.achievements}>
                  <View style={styles.achievementBadge}>
                    <Star size={12} color="#ffd93d" />
                    <Text style={styles.achievementText}>
                      {team.achievements.length} awards
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f23",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#b0b0b0",
  },
  content: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  teamCard: {
    margin: 8,
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a3e",
    elevation: 4,
  },
  teamImageContainer: {
    position: "relative",
    height: 140,
  },
  teamImage: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  colorIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  teamInfo: {
    padding: 20,
  },
  teamHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00d4ff",
    marginBottom: 8,
  },
  teamStats: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: "#e0e0e0",
  },
  achievements: {
    flexDirection: "row",
  },
  achievementBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 217, 61, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 217, 61, 0.3)",
    gap: 4,
  },
  achievementText: {
    fontSize: 12,
    color: "#ffd93d",
    fontWeight: "500",
  },
});
