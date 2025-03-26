import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, collection, doc, setDoc, deleteDoc, getDocs, getAuth } from "../assets/services/firebaseConfig";
import { fetchUpcomingGames } from "../assets/services/sportsApiService";

// Fetch upcoming games
export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  try {
    const games = await fetchUpcomingGames();
    return games;
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
});

// Fetch user favorites from Firestore
export const fetchFavoritesFromFirestore = createAsyncThunk("games/fetchFavorites", async (_, { getState }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return [];

  const favoritesRef = collection(db, "users", user.uid, "favorites");
  const snapshot = await getDocs(favoritesRef);
  
  return snapshot.docs.map((doc) => doc.data());
});

// Toggle favorite (Async to avoid side effects in reducer)
export const toggleFavoriteAsync = createAsyncThunk("games/toggleFavorite", async (game, { getState }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const gameRef = doc(db, "users", user.uid, "favorites", game.idEvent);
  const state = getState().games;
  const isFavorite = state.favorites.some((fav) => fav.idEvent === game.idEvent);

  if (isFavorite) {
    await deleteDoc(gameRef); // Remove from Firestore
    return state.favorites.filter((fav) => fav.idEvent !== game.idEvent);
  } else {
    await setDoc(gameRef, game); // Save to Firestore
    return [...state.favorites, game];
  }
});

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    filteredGames: [],
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    filterGames: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredGames = state.games.filter((game) =>
        game.strEvent?.toLowerCase().includes(searchQuery)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.games = action.payload || [];
        state.filteredGames = action.payload || [];
      })
      .addCase(fetchFavoritesFromFirestore.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { filterGames } = gamesSlice.actions;
export default gamesSlice.reducer;
