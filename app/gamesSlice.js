import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUpcomingGames } from '../assets/services/sportsApiService';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  try {
    const games = await fetchUpcomingGames();
    console.log('Fetched Games:', games); // Debugging line
    return games;
  } catch (error) {
    throw new Error('Failed to fetch games');
  }
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    filteredGames: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterGames: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredGames = state.games.filter(
        (game) => game.strEvent?.toLowerCase().includes(searchQuery)
      );
    },
    toggleFavorite: (state, action) => {
      const gameId = action.payload;
      const game = state.games.find((game) => game.idEvent === gameId);

      if (game) {
        game.isFavorite = !game.isFavorite;
        if (game.isFavorite) {
          state.favorites.push(game);
        } else {
          state.favorites = state.favorites.filter((fav) => fav.idEvent !== gameId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload || [];
        state.filteredGames = action.payload || [];
        console.log('Games stored in state:', action.payload); // Debugging line
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterGames, toggleFavorite } = gamesSlice.actions;
export default gamesSlice.reducer;
