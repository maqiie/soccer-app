import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, filterGames } from "../gamesSlice";
import debounce from "lodash.debounce";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../colors";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { filteredGames, status } = useSelector((state) => state.games);
  const [searchQuery, setSearchQuery] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGames());
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [status, dispatch]);

  const debouncedFilter = useCallback(
    debounce((text) => {
      dispatch(filterGames(text));
    }, 300),
    [dispatch]
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedFilter(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MatchDetails', { match: item })}>
      <Text style={styles.title}>{item.strEvent}</Text>
      <Text style={styles.date}>{new Date(item.dateEvent).toLocaleDateString()}</Text>
      <Text style={styles.league}>{item.strLeague}</Text>
      <Ionicons name="star" size={20} color={colors.primary} style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a match..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.input}
        />
      </View>
      {filteredGames?.length > 0 ? (
        <FlatList
          data={filteredGames}
          keyExtractor={(item) => item.idEvent?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noGamesText}>No games found.</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  input: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  icon: {
    marginLeft: 10,
  },
  noGamesText: {
    color: colors.onSurface,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
