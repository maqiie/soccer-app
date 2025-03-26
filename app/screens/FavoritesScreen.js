import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, 
  Image, ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from '../../assets/services/firebaseConfig';
import ProtectedScreen from '../screens/ProtectedScreen';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    // Check if the user is authenticated
    if (!user) {
      setLoading(false);
      return;
    }

    // Define the Firestore query to get the favorites for the current user
    const q = query(collection(db, "favorites"), where("userId", "==", user.uid));

    // Set up the listener for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const favoriteMatches = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavorites(favoriteMatches);
      setLoading(false); // Stop loading once data is fetched
    }, (error) => {
      console.error("Error fetching favorites:", error);
      setLoading(false); // Stop loading on error
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [user]); // Run the effect when `user` changes

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MatchDetails', { match: item })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: item.strThumb || 'https://via.placeholder.com/100x100' }} 
          style={styles.thumbnail} 
        />
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

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  date: {
    color: '#ddd',
    fontSize: 14,
  },
  league: {
    color: '#ccc',
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
