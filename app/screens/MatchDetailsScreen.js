import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../colors';

const MatchDetailsScreen = ({ route }) => {
  const { match } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{match.strEvent}</Text>
      <Text style={styles.date}>{new Date(match.dateEvent).toLocaleDateString()}</Text>
      <Text style={styles.league}>{match.strLeague}</Text>
      <Image source={{ uri: match.strThumb }} style={styles.thumbnail} />
      <Text style={styles.description}>{match.strDescriptionEN || 'No description available.'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    color: colors.onSurface,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  date: {
    color: colors.onSurface,
    fontSize: 16,
    marginBottom: 4,
  },
  league: {
    color: colors.onSurface,
    fontSize: 16,
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    color: colors.onSurface,
    fontSize: 16,
  },
});

export default MatchDetailsScreen;
