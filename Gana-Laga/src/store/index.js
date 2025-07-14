import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import libraryReducer from './librarySlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    library: libraryReducer,
  },
});

export default store;
