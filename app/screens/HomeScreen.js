// import React, { useEffect, useState, useCallback, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchGames, filterGames, toggleFavorite } from "../gamesSlice";
// import debounce from "lodash.debounce";
// import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { Box, HStack, VStack, Pressable } from "@gluestack-ui/themed";

// const colors = {
//   primary: "#6C5CE7",
//   secondary: "#E84393",
//   background: "#F8F9FA",
//   surface: "#FFFFFF",
//   error: "#FF7675",
//   onPrimary: "#FFFFFF",
//   onBackground: "#2D3436",
//   onSurface: "#2D3436",
//   cardStart: "#0984E3",
//   cardEnd: "#6C5CE7",
//   searchBackground: "#Dfe6e9",
//   searchBorder: "#B2BEC3",
//   searchText: "#2D3436",
// };

// const HomeScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { filteredGames, status } = useSelector((state) => state.games);
//   const [searchQuery, setSearchQuery] = useState("");
//   const fadeAnim = useRef(new Animated.Value(0)).current;
  
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchGames());
//     }

//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [status, dispatch]);

//   const debouncedFilter = useCallback(
//     debounce((text) => {
//       dispatch(filterGames(text));
//     }, 300),
//     [dispatch]
//   );

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     debouncedFilter(text);
//   };

//   const handleFavorite = (item) => {
//     dispatch(toggleFavorite(item.idEvent));
//   };

//   const renderItem = ({ item }) => (
//     <Animated.View style={[styles.card, { opacity: fadeAnim }]}> 
//       <LinearGradient colors={[colors.cardStart, colors.cardEnd]} style={styles.gradient}>
//         <TouchableOpacity onPress={() => navigation.navigate("MatchDetails", { match: item })}>
//           <VStack>
//             <HStack alignItems="center" space="md">
//               <FontAwesome5 name="futbol" size={24} color={colors.onPrimary} />
//               <Text style={styles.title}>{item.strEvent}</Text>
//             </HStack>
//             <HStack space="md">
//               <MaterialIcons name="event" size={20} color={colors.onPrimary} />
//               <Text style={styles.date}>{new Date(item.dateEvent).toLocaleDateString()}</Text>
//             </HStack>
//             <HStack space="md">
//               <MaterialIcons name="sports-soccer" size={20} color={colors.onPrimary} />
//               <Text style={styles.league}>{item.strLeague}</Text>
//             </HStack>
//           </VStack>
//         </TouchableOpacity>
//         <Pressable onPress={() => handleFavorite(item)}>
//           <Ionicons name={item.isFavorite ? "heart" : "heart-outline"} size={24} color={item.isFavorite ? colors.secondary : colors.onPrimary} />
//         </Pressable>
//       </LinearGradient>
//     </Animated.View>
//   );

//   return (
//     <Box flex={1} bg={colors.background}>
//       <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.header}>
//         <HStack justifyContent="space-between" alignItems="center">
//           <Text style={styles.headerTitle}>Soccer App</Text>
//           <Pressable onPress={() => navigation.openDrawer()}>
//             <Ionicons name="menu" size={28} color={colors.onPrimary} />
//           </Pressable>
//         </HStack>
//       </LinearGradient>

//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color={colors.searchText} />
//         <TextInput
//           placeholder="Search for matches..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           style={styles.input}
//           placeholderTextColor={colors.searchText}
//         />
//       </View>
      
//       {status === "loading" && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}

//       <FlatList
//         data={filteredGames}
//         keyExtractor={(item) => item.idEvent?.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </Box>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     padding: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: colors.onPrimary,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.searchBackground,
//     borderRadius: 15,
//     padding: 12,
//     margin: 16,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingLeft: 10,
//     color: colors.searchText,
//   },
//   card: {
//     borderRadius: 15,
//     margin: 12,
//     elevation: 5,
//   },
//   gradient: {
//     padding: 16,
//     borderRadius: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     color: colors.onPrimary,
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   date: {
//     color: colors.onPrimary,
//     fontSize: 14,
//   },
//   league: {
//     color: colors.onPrimary,
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, filterGames, toggleFavoriteAsync } from "../gamesSlice"; 
import debounce from "lodash.debounce";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../assets/services/firebaseConfig"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

const { width } = Dimensions.get("window");

const colors = {
  primary: "#6C5CE7",
  secondary: "#FD79A8",
  background: "#F8F9FA",
  surface: "#FFFFFF",
  error: "#D63031",
  onPrimary: "#FFFFFF",
  onBackground: "#2D3436",
  onSurface: "#2D3436",
  cardStart: "#0984E3",
  cardEnd: "#6C5CE7",
  searchBackground: "#DCDDE1",
  searchText: "#2D3436",
};

const fallbackLogo = "https://via.placeholder.com/150/000000/FFFFFF/?text=No+Logo";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { filteredGames, status, favorites } = useSelector((state) => state.games);
  const [searchQuery, setSearchQuery] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGames());
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [status, dispatch]);

  // Debounced search filtering
  const debouncedFilter = useMemo(
    () => debounce((text) => dispatch(filterGames(text)), 300),
    [dispatch]
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedFilter(text);
  };

  const toggleFavorite = async (match) => {
    const user = auth.currentUser;
  
    if (!user) {
      console.log("User not authenticated");
      return;
    }
  
    // Reference to the user's document in the "favorites" collection
    const userFavoritesRef = doc(db, "favorites", user.uid);
  
    try {
      // Fetch the current document to get existing favorites
      const docSnap = await getDoc(userFavoritesRef);
      const existingFavorites = docSnap.exists() ? docSnap.data().games || [] : [];
      
      // Check if the match is already in favorites
      let updatedFavorites;
      if (existingFavorites.some((fav) => fav.idEvent === match.idEvent)) {
        // If match exists, remove it from favorites
        updatedFavorites = existingFavorites.filter((fav) => fav.idEvent !== match.idEvent);
      } else {
        // If match does not exist, add it to favorites
        updatedFavorites = [...existingFavorites, match];
      }
  
      // Update the user's favorites document with the new list of favorites
      await setDoc(userFavoritesRef, { games: updatedFavorites }, { merge: true });
  
      // Optionally dispatch to Redux or update local state
      dispatch(toggleFavoriteAsync(match)); // Assuming this is how you update the state
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };
  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.idEvent === item.idEvent);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("MatchDetails", { match: item })}
        style={styles.cardContainer}
      >
        <LinearGradient colors={[colors.cardStart, colors.cardEnd]} style={styles.card}>
          {/* Favorite Button */}
          <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item)}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="#FF6B6B" />
          </TouchableOpacity>

          {/* Team Logos */}
          <View style={styles.logoContainer}>
            <Image source={{ uri: item.strThumb || fallbackLogo }} style={styles.logo} />
          </View>

          {/* Match Details */}
          <Text style={styles.gameTitle}>{item.strEvent || "Unknown Match"}</Text>
          <Text style={styles.gameDetails}>🏆 {item.strLeague || "Unknown League"}</Text>
          <Text style={styles.gameDetails}>📅 {item.dateEvent ? new Date(item.dateEvent).toLocaleDateString() : "TBA"}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.header}>
        <Text style={styles.headerText}>Match Finder</Text>
        <Ionicons name="menu" size={28} color={colors.onPrimary} />
      </LinearGradient>

      {/* Search Bar */}
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.searchText} />
          <TextInput
            placeholder="Search for a match..."
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.input}
            placeholderTextColor={colors.searchText}
          />
        </View>

        {/* Content */}
        {status === "loading" ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : filteredGames.length === 0 ? (
          <Text style={styles.noResultsText}>No matches found.</Text>
        ) : (
          <FlatList
            data={filteredGames}
            keyExtractor={(item) => item.idEvent?.toString() || `fallback-${Math.random()}`}
            renderItem={renderItem}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerText: {
    color: colors.onPrimary,
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.searchBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: colors.searchText,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.onBackground,
    marginTop: 20,
  },
  cardContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  card: {
    width: width * 0.9,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    position: "relative",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  logoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 40,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  gameDetails: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
