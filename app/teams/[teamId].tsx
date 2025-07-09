import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Users,
  MapPin,
  Star,
  Play,
  ArrowLeft,
  Calendar,
  Trophy,
  CookingPot,
} from "lucide-react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, router, Route } from "expo-router";
import { teamsData } from "@/lib/data/teams";
import { useEffect } from "react";
import { blurhash } from "@/lib/helpers/blurhash";

const localImages: Record<string, any> = {
  platformer: require("@/assets/images/platformer.png"),
  runner: require("@/assets/images/runner.png"),
};

export default function TeamDetailScreen() {
  const { teamId } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const team = teamsData.find((t) => t.id === parseInt(teamId as string));

  useEffect(() => {
    if (Platform.OS === "web" && team) {
      document.title = team.name;
    }
  }, [team]);

  if (!team) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Team not found</Text>
      </View>
    );
  }

  const isGameReady = !!team.gameLink;

  const imageSource = team.gameImage?.startsWith("http")
    ? { uri: team.gameImage }
    : localImages[team.gameImage];

  const teamInfoItems = [
    {
      Icon: Users,
      label: "Team Size",
      value: `${team.members} members`,
      color: team.color,
    },
    {
      Icon: MapPin,
      label: "Location",
      value: team.location,
      color: team.color,
    },
    {
      Icon: Calendar,
      label: "Founded",
      value: team.founded,
      color: team.color,
    },
    {
      Icon: Trophy,
      label: "Lead",
      value: team.teamLead,
      color: team.color,
    },
  ];

  const handlePlayGame = () => router.push(team.gameLink as Route);

  const handleBack = () => {
    router.push("/teams");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: team.teamImage }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
          placeholder={{ blurhash }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.heroOverlay}
        />

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <View style={styles.backButtonContainer}>
            <ArrowLeft size={24} color="#ffffff" />
          </View>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>{team.name}</Text>
            <View
              style={[styles.colorIndicator, { backgroundColor: team.color }]}
            />
          </View>
          <Text style={styles.specialty}>{team.specialty}</Text>
        </View>
      </View>

      <View style={[styles.content, isLargeScreen && styles.contentLarge]}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Team Information</Text>
          <View
            style={[
              styles.infoGrid,
              {
                flexDirection: "row",
                flexWrap: isLargeScreen ? "nowrap" : "wrap",
                justifyContent: isLargeScreen ? "space-between" : "flex-start",
              },
            ]}
          >
            {teamInfoItems.map(({ Icon, label, value, color }, index) => (
              <View
                key={index}
                style={[
                  styles.infoCard,
                  {
                    width: isLargeScreen ? "24%" : "48%",
                    marginBottom: 16,
                  },
                ]}
              >
                <Icon size={20} color={color} />
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.gameShowcase}>
          <Text style={styles.sectionTitle}>Featured Game</Text>
          <View style={styles.gameCard}>
            <View style={styles.gameImageContainer}>
              <Image
                source={imageSource}
                style={styles.gameImage}
                contentFit="cover"
                transition={300}
                placeholder={{ blurhash }}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.gameImageOverlay}
              />

              <TouchableOpacity
                disabled={!isGameReady}
                style={styles.playButton}
                onPress={isGameReady ? handlePlayGame : undefined}
              >
                <LinearGradient
                  colors={[team.color, `${team.color}CC`]}
                  style={styles.playButtonGradient}
                >
                  {isGameReady ? (
                    <Play size={40} color="white" fill="white" />
                  ) : (
                    <CookingPot size={40} color="white" />
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{team.game}</Text>
                <Text style={styles.playText}>
                  {isGameReady
                    ? "Tap to play"
                    : "The game is still being prepared"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About the Team</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>{team.fullDescription}</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Current Achievements</Text>
          <View style={styles.achievementsList}>
            {team.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Star size={16} color="#ffd93d" fill="#ffd93d" />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.previousGamesSection}>
          <Text style={styles.sectionTitle}>Previous Games</Text>
          <View style={styles.gamesList}>
            {team.previousGames.map((game, index) => (
              <View key={index} style={styles.gameItem}>
                <Text style={styles.gameItemText}>{game}</Text>
              </View>
            ))}
          </View>
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
  heroContainer: {
    position: "relative",
    height: 300,
  },
  heroImage: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  teamHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  teamName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  specialty: {
    fontSize: 18,
    color: "#00d4ff",
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  contentLarge: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 30,
  },
  infoGrid: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a3e",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#b0b0b0",
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  aboutSection: {
    marginBottom: 30,
  },
  aboutCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  aboutText: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 24,
  },
  achievementsSection: {
    marginBottom: 30,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  achievementText: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 12,
    fontWeight: "500",
  },
  previousGamesSection: {
    marginBottom: 30,
  },
  gamesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  gameItem: {
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.3)",
  },
  gameItemText: {
    fontSize: 14,
    color: "#00d4ff",
    fontWeight: "500",
  },
  gameShowcase: {
    marginBottom: 30,
  },
  gameCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  gameImageContainer: {
    position: "relative",
    height: 250,
  },
  gameImage: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  gameImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -45 }, { translateY: -45 }],
    width: 90,
    height: 90,
    borderRadius: 45,
    elevation: 12,
  },
  playButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  gameInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  playText: {
    fontSize: 16,
    color: "#b0b0b0",
  },
  errorText: {
    fontSize: 18,
    color: "#ff6b6b",
    textAlign: "center",
    marginTop: 100,
  },
});
