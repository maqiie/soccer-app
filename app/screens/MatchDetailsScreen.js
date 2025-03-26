import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../colors";

const MatchDetailsScreen = ({ route }) => {
  const { match } = route.params;

  return (
    <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Match Thumbnail */}
        <Image
          source={{
            uri: match.strThumb || "https://via.placeholder.com/400x200",
          }}
          style={styles.thumbnail}
        />

        {/* Match Details */}
        <View style={styles.card}>
          <Text style={styles.title}>{match.strEvent}</Text>
          <Text style={styles.date}>
            {new Date(match.dateEvent).toLocaleDateString()} at {match.strTime}
          </Text>
          <Text style={styles.league}>{match.strLeague}</Text>

          {/* Team Logos & Names */}
          <View style={styles.teamContainer}>
            <View style={styles.team}>
              <Image
                source={{ uri: match.strHomeTeamBadge }}
                style={styles.teamLogo}
              />
              <Text style={styles.teamName}>{match.strHomeTeam}</Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.team}>
              <Image
                source={{ uri: match.strAwayTeamBadge }}
                style={styles.teamLogo}
              />
              <Text style={styles.teamName}>{match.strAwayTeam}</Text>
            </View>
          </View>

          {/* Venue */}
          <Text style={styles.venue}>Venue: {match.strVenue}</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            {match.strDescriptionEN || "No description available."}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 4,
  },
  league: {
    fontSize: 16,
    color: "#eee",
    fontWeight: "600",
    marginBottom: 10,
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 15,
  },
  team: {
    alignItems: "center",
  },
  teamLogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  teamName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
  vsText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  venue: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 10,
  },
  descriptionBox: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default MatchDetailsScreen;
