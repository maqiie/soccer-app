import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../colors';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.games.favorites) || []; // Ensure favorites is always an array

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MatchDetails', { match: item })}
    >
      <Text style={styles.title}>{item?.strEvent || 'Unknown Event'}</Text>
      <Text style={styles.date}>{item?.dateEvent ? new Date(item.dateEvent).toLocaleDateString() : 'No Date'}</Text>
      <Text style={styles.league}>{item?.strLeague || 'Unknown League'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item?.idEvent?.toString() || Math.random().toString()} // Fallback in case of missing id
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noGamesText}>No favorite matches found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    color: colors.onSurface,
    fontWeight: "bold",
    fontSize: 18,
  },
  date: {
    color: colors.onSurface,
    marginTop: 4,
    fontSize: 14,
  },
  league: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: "500",
  },
  noGamesText: {
    color: colors.onSurface,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoritesScreen;
