import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Zap,
} from "lucide-react-native";
import { useEffect, useState } from "react";

export default function About() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(Date.now() + 48 * 3600000 + 12 * 60000);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f4c75"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>PLAY + CRAFT 2025</Text>
          <Text style={styles.subtitle}>Very Cool Gaming Conference</Text>
          <View style={styles.countdownContainer}>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>
                {String(timeLeft.hours).padStart(2, "0")} H
              </Text>
            </View>
            <Text style={styles.countdownDivider}>:</Text>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>
                {String(timeLeft.minutes).padStart(2, "0")} M
              </Text>
            </View>
            <Text style={styles.countdownDivider}>:</Text>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>
                {String(timeLeft.seconds).padStart(2, "0")} S
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Event Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Calendar size={20} color="#00d4ff" />
              <Text style={styles.infoText}>July 10-12, 2025</Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={20} color="#00d4ff" />
              <Text style={styles.infoText}>
                Výstaviště Brno, Czech Republic
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={20} color="#00d4ff" />
              <Text style={styles.infoText}>9:00 AM - 8:00 PM Daily</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>By The Numbers</Text>

          <View
            style={[
              styles.statsGrid,
              {
                flexDirection: isLargeScreen ? "row" : "column",
                gap: 8,
              },
            ]}
          >
            <View style={styles.statCard}>
              <Users size={24} color="#ff6b6b" />
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Teams</Text>
            </View>
            <View style={styles.statCard}>
              <Trophy size={24} color="#ffd93d" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Awards</Text>
            </View>
            <View style={styles.statCard}>
              <Zap size={24} color="#6c5ce7" />
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About The Event</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Join us for the most exciting gaming conference of the year! Play
              + Craft 2025 brings together the most innovative game development
              teams from around the world to showcase their latest creations.
            </Text>
            <Text style={styles.aboutText}>
              Experience cutting-edge gameplay, meet the developers behind your
              favorite games, and witness the future of gaming unfold before
              your eyes.
            </Text>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 64,
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Tiny5",
  },
  subtitle: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  countdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
  },
  countdownItem: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minWidth: 80,
  },
  countdownNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00d4ff",
  },
  countdownDivider: {
    color: "#00d4ff",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 4,
  },
  content: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#e0e0e0",
    marginLeft: 12,
  },
  statsSection: {
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 16,
    color: "#b0b0b0",
  },
  aboutSection: {
    marginBottom: 5,
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
    marginVertical: 4,
  },
});
