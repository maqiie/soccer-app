import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../colors';
import ProtectedScreen from '../screens/ProtectedScreen';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.games.favorites) || [];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MatchDetails', { match: item })}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.strThumb || 'https://via.placeholder.com/100x100' }} style={styles.thumbnail} />
        <View style={styles.cardInfo}>
          <Text style={styles.title}>{item.strEvent}</Text>
          <Text style={styles.date}>{new Date(item.dateEvent).toLocaleDateString()}</Text>
          <Text style={styles.league}>{item.strLeague}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ProtectedScreen>
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
        <Text style={styles.header}>Favorite Matches</Text>
        
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item?.idEvent?.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4013/4013075.png' }} 
              style={styles.emptyImage}
            />
            <Text style={styles.noGamesText}>No favorite matches found.</Text>
            <Text style={styles.subText}>Explore matches and add them to your favorites!</Text>
          </View>
        )}
      </LinearGradient>
    </ProtectedScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: colors.secondary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    color: '#eee',
    marginTop: 4,
    fontSize: 14,
  },
  league: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    opacity: 0.8,
  },
  noGamesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default FavoritesScreen;
