import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axios.get('https://www.thesportsdb.com/api/v1/json/2/eventsnextleague.php?id=4396');
  return response.data.events;
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    filteredGames: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterGames: (state, action) => {
      state.filteredGames = state.games.filter(game =>
        game.strEvent.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload;
        state.filteredGames = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterGames } = gamesSlice.actions;
export default gamesSlice.reducer;
