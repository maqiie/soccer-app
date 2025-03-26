import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameCard = ({ game }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{game.strEvent}</Text>
      <Text style={styles.info}>{game.dateEvent} - {game.strTime}</Text>
      <Text style={styles.teams}>{game.strHomeTeam} vs {game.strAwayTeam}</Text>
      <Text style={styles.venue}>Venue: {game.strVenue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: "gray",
  },
  teams: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  venue: {
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 5,
  },
});

export default GameCard;