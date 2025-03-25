import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../soccer-games-app/app/gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});
