import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Trophy, Medal, Star } from "lucide-react-native";
import { leaderboardData } from "@/lib/data/leaderboard";
import { LARGE_SCREEN_WIDTH } from "@/lib/constants";

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy size={24} color="#ffd93d" />;
    case 2:
      return <Medal size={24} color="#74b9ff" />;
    case 3:
      return <Medal size={24} color="#fd79a8" />;
    default:
      return <Star size={24} color="#b0b0b0" />;
  }
};

export default function LeaderboardScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= LARGE_SCREEN_WIDTH;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Current standings and achievements</Text>
      </LinearGradient>

      <View style={[styles.content, isLargeScreen && styles.contentLarge]}>
        <View style={styles.podium}>
          <View style={styles.podiumItem}>
            <View style={[styles.podiumRank, { backgroundColor: "#74b9ff" }]}>
              <Text style={styles.podiumPosition}>2</Text>
            </View>
            <Text style={styles.podiumTeam}>Quantum Games</Text>
            <Text style={styles.podiumScore}>92 pts</Text>
          </View>

          <View style={[styles.podiumItem, { marginBottom: 40 }]}>
            <View style={[styles.podiumRank, { backgroundColor: "#ffd93d" }]}>
              <Text style={styles.podiumPosition}>1</Text>
            </View>
            <Text style={styles.podiumTeam}>Phoenix Studios</Text>
            <Text style={styles.podiumScore}>95 pts</Text>
          </View>

          <View style={styles.podiumItem}>
            <View style={[styles.podiumRank, { backgroundColor: "#fd79a8" }]}>
              <Text style={styles.podiumPosition}>3</Text>
            </View>
            <Text style={styles.podiumTeam}>Neon Interactive</Text>
            <Text style={styles.podiumScore}>89 pts</Text>
          </View>
        </View>

        <View style={styles.fullLeaderboard}>
          <Text style={styles.sectionTitle}>Full Rankings</Text>

          <View
            style={[
              styles.leaderboardGrid,
              isLargeScreen && {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              },
            ]}
          >
            {leaderboardData.map((team, index) => (
              <View
                key={index}
                style={[
                  styles.teamRow,
                  isLargeScreen && { width: "48%", marginBottom: 16 },
                ]}
              >
                <View style={styles.teamRank}>
                  {getRankIcon(team.rank)}
                  <Text style={styles.rankNumber}>{team.rank}</Text>
                </View>

                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{team.team}</Text>
                  <Text style={styles.gameName}>{team.game}</Text>
                  <View style={styles.categories}>
                    {team.categories.map((category, catIndex) => (
                      <View key={catIndex} style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{category}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.scoreContainer}>
                  <Text style={styles.score}>{team.score}</Text>
                  <Text style={styles.scoreLabel}>pts</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${team.score}%`,
                          backgroundColor: team.color,
                        },
                      ]}
                    />
                  </View>
                </View>
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
  contentLarge: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  podium: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  podiumItem: {
    alignItems: "center",
    flex: 1,
  },
  podiumRank: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#2a2a3e",
  },
  podiumPosition: {
    fontSize: 18,
    fontWeight: "bold",
  },
  podiumTeam: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 12,
    color: "#b0b0b0",
  },
  fullLeaderboard: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  leaderboardGrid: {
    gap: 12,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  teamRank: {
    alignItems: "center",
    marginRight: 16,
    minWidth: 50,
  },
  rankNumber: {
    fontSize: 12,
    color: "#b0b0b0",
    marginTop: 4,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  gameName: {
    fontSize: 14,
    color: "#00d4ff",
    marginBottom: 8,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  categoryBadge: {
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.3)",
  },
  categoryText: {
    fontSize: 10,
    color: "#00d4ff",
  },
  scoreContainer: {
    alignItems: "center",
    minWidth: 60,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  scoreLabel: {
    fontSize: 12,
    color: "#b0b0b0",
    marginBottom: 8,
  },
  progressBar: {
    width: 40,
    height: 4,
    backgroundColor: "#2a2a3e",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
