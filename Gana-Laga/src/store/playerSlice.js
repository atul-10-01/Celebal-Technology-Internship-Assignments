import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 50,
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat: (state) => {
      state.repeat = !state.repeat;
    },
    nextSong: (state) => {
      if (state.shuffle) {
        // Random song logic for shuffle
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentIndex = randomIndex;
        state.currentSong = state.queue[randomIndex];
      } else if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.queue[state.currentIndex];
      } else if (state.repeat) {
        // If repeat is on, go to first song
        state.currentIndex = 0;
        state.currentSong = state.queue[0];
      }
      // Reset time for new song
      state.currentTime = 0;
    },
    previousSong: (state) => {
      if (state.shuffle) {
        // Random song logic for shuffle
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentIndex = randomIndex;
        state.currentSong = state.queue[randomIndex];
      } else if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.queue[state.currentIndex];
      } else if (state.repeat) {
        // If repeat is on, go to last song
        state.currentIndex = state.queue.length - 1;
        state.currentSong = state.queue[state.currentIndex];
      }
      // Reset time for new song
      state.currentTime = 0;
    },
    playSong: (state, action) => {
      const { song, queue, index } = action.payload;
      state.currentSong = song;
      state.queue = queue || [song];
      state.currentIndex = index || 0;
      state.isPlaying = true;
      state.currentTime = 0;
    },
  },
});

export const {
  setCurrentSong,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setQueue,
  setCurrentIndex,
  toggleShuffle,
  toggleRepeat,
  nextSong,
  previousSong,
  playSong,
} = playerSlice.actions;

export default playerSlice.reducer;
