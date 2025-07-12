import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, MapPin } from "lucide-react-native";
import { scheduleData } from "@/lib/data/schedule";
import { LARGE_SCREEN_WIDTH } from "@/lib/constants";

const getEventColor = (type: string) => {
  switch (type) {
    case "ceremony":
      return "#ff6b6b";
    case "presentation":
      return "#00d4ff";
    case "workshop":
      return "#ffd93d";
    case "networking":
      return "#6c5ce7";
    case "panel":
      return "#00b894";
    case "judging":
      return "#fd79a8";
    case "showcase":
      return "#ff7675";
    case "keynote":
      return "#a29bfe";
    default:
      return "#74b9ff";
  }
};

export default function ScheduleScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= LARGE_SCREEN_WIDTH;
  const columns = isLargeScreen && width >= 1200 ? 3 : isLargeScreen ? 2 : 1;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.header}>
        <Text style={styles.title}>Event Schedule</Text>
        <Text style={styles.subtitle}>
          Three days of incredible gaming experiences
        </Text>
      </LinearGradient>

      <View style={[styles.content, isLargeScreen && styles.contentLarge]}>
        <View
          style={[
            styles.scheduleGrid,
            columns > 1 && {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            },
          ]}
        >
          {scheduleData.map((day, dayIndex) => (
            <View
              key={dayIndex}
              style={[
                styles.daySection,
                columns > 1 && {
                  width: columns === 3 ? "30%" : "48%",
                  marginBottom: 30,
                },
              ]}
            >
              <Text style={styles.dayTitle}>{day.day}</Text>

              {day.events.map((event, eventIndex) => (
                <View key={eventIndex} style={styles.eventCard}>
                  <View style={styles.eventHeader}>
                    <View style={styles.timeContainer}>
                      <Clock size={16} color="#00d4ff" />
                      <Text style={styles.eventTime}>{event.time}</Text>
                    </View>
                    <View
                      style={[
                        styles.eventTypeBadge,
                        { backgroundColor: getEventColor(event.type) },
                      ]}
                    >
                      <Text style={styles.eventTypeText}>{event.type}</Text>
                    </View>
                  </View>

                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>

                  <View style={styles.eventFooter}>
                    <View style={styles.locationContainer}>
                      <MapPin size={14} color="#b0b0b0" />
                      <Text style={styles.locationText}>{event.location}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
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
  contentLarge: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  scheduleGrid: {
    gap: 20,
  },
  daySection: {
    marginBottom: 30,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#00d4ff",
  },
  eventCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTime: {
    fontSize: 14,
    color: "#00d4ff",
    marginLeft: 8,
    fontWeight: "600",
  },
  eventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: "#b0b0b0",
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#b0b0b0",
    marginLeft: 6,
  },
});
