import { createSlice } from '@reduxjs/toolkit';
import { mockPlaylists, mockAlbums, mockSongs } from '../data/mockData';

const initialState = {
  playlists: mockPlaylists,
  albums: mockAlbums,
  likedSongs: [],
  likedAlbums: [],
  likedPlaylists: [],
  recentlyPlayed: []
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // Playlist operations
    addPlaylist: (state, action) => {
      // Generate a new unique ID
      const newId = Math.max(...state.playlists.map(p => p.id)) + 1;
      
      const newPlaylist = {
        id: newId,
        name: action.payload.name,
        description: action.payload.description,
        image: action.payload.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500',
        songs: [],
        createdAt: new Date().toISOString()
      };
      
      state.playlists.push(newPlaylist);
      return state;
    },
    
    updatePlaylist: (state, action) => {
      const { id, name, description, image } = action.payload;
      const index = state.playlists.findIndex(p => p.id === id);
      
      if (index !== -1) {
        if (name) state.playlists[index].name = name;
        if (description) state.playlists[index].description = description;
        if (image) state.playlists[index].image = image;
      }
      
      return state;
    },
    
    deletePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload);
      return state;
    },
    
    addSongToPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlistIndex = state.playlists.findIndex(p => p.id === playlistId);
      
      if (playlistIndex !== -1 && !state.playlists[playlistIndex].songs.includes(songId)) {
        state.playlists[playlistIndex].songs.push(songId);
      }
      
      return state;
    },
    
    removeSongFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlistIndex = state.playlists.findIndex(p => p.id === playlistId);
      
      if (playlistIndex !== -1) {
        state.playlists[playlistIndex].songs = state.playlists[playlistIndex].songs.filter(id => id !== songId);
      }
      
      return state;
    },
    
    // Liked items operations
    toggleLikeSong: (state, action) => {
      const songId = action.payload;
      const index = state.likedSongs.indexOf(songId);
      
      if (index === -1) {
        state.likedSongs.push(songId);
      } else {
        state.likedSongs.splice(index, 1);
      }
      
      return state;
    },
    
    toggleLikeAlbum: (state, action) => {
      const albumId = action.payload;
      const index = state.likedAlbums.indexOf(albumId);
      
      if (index === -1) {
        state.likedAlbums.push(albumId);
      } else {
        state.likedAlbums.splice(index, 1);
      }
      
      return state;
    },
    
    toggleLikePlaylist: (state, action) => {
      const playlistId = action.payload;
      const index = state.likedPlaylists.indexOf(playlistId);
      
      if (index === -1) {
        state.likedPlaylists.push(playlistId);
      } else {
        state.likedPlaylists.splice(index, 1);
      }
      
      return state;
    },
    
    // Recently played
    addToRecentlyPlayed: (state, action) => {
      const songId = action.payload;
      
      // Remove if already exists
      state.recentlyPlayed = state.recentlyPlayed.filter(id => id !== songId);
      
      // Add to beginning of array
      state.recentlyPlayed.unshift(songId);
      
      // Keep only the most recent 20 songs
      state.recentlyPlayed = state.recentlyPlayed.slice(0, 20);
      
      return state;
    }
  }
});

export const {
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  toggleLikeSong,
  toggleLikeAlbum,
  toggleLikePlaylist,
  addToRecentlyPlayed
} = librarySlice.actions;

export default librarySlice.reducer;
