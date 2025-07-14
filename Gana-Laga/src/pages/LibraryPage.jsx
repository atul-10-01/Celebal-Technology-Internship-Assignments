import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, setIsPlaying } from '../store/playerSlice';
import { addPlaylist, addToRecentlyPlayed } from '../store/librarySlice';
import { HiPlus, HiFilter, HiSearch, HiClock, HiCollection, HiMusicNote, HiPlay, HiPause } from 'react-icons/hi';
import { mockSongs } from '../data/mockData';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const LibraryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get library data from Redux
  const playlists = useSelector(state => state.library.playlists);
  const albums = useSelector(state => state.library.albums);
  const recentlyPlayedIds = useSelector(state => state.library.recentlyPlayed);
  const currentSong = useSelector(state => state.player.currentSong);
  const isPlayerPlaying = useSelector(state => state.player.isPlaying);
  
  // Get recently played songs
  const recentlyPlayed = recentlyPlayedIds
    .map(id => mockSongs.find(song => song.id === id))
    .filter(Boolean)
    .slice(0, 10);
  
  const [activeTab, setActiveTab] = useState('playlists');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent', 'alphabetical', 'custom'

  // Filtered items based on search query
  const filteredPlaylists = playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (album.genre && album.genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort playlists
  const sortedPlaylists = [...filteredPlaylists].sort((a, b) => {
    if (sortOrder === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'recent') {
      // Sort by created date, most recent first
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    return 0;
  });

  // Create a new playlist
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      dispatch(addPlaylist({
        name: newPlaylistName,
        description: newPlaylistDescription
      }));
      
      setShowCreateModal(false);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      
      // Navigate to the library tab to see the new playlist
      setActiveTab('playlists');
    }
  };
  
  // Play song
  const handlePlaySong = (song) => {
    // In a real app, we would get the album songs or similar songs
    // For now, we'll just play this one song
    dispatch(playSong({
      song: song,
      queue: [song],
      index: 0
    }));
    
    // Add to recently played
    dispatch(addToRecentlyPlayed(song.id));
  };
  
  // Get album image URL
  const getPlaylistImageUrl = (playlist) => {
    if (playlist.image) return playlist.image;
    
    // If no image, use the first song's image
    if (playlist.songs && playlist.songs.length > 0) {
      const firstSong = mockSongs.find(song => song.id === playlist.songs[0]);
      if (firstSong) return firstSong.image;
    }
    
    return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500';
  };

  return (
    <div className="text-white pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Your Library
        </h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800/60 border border-gray-700/50 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-40 md:w-64"
            />
          </div>
          <div className="relative group">
            <button className="p-2 rounded-full text-gray-400 hover:text-white transition-colors">
              <HiFilter className="h-5 w-5" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                <p className="text-xs text-gray-400 uppercase font-bold px-3 py-2">Sort by</p>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-lg ${sortOrder === 'recent' ? 'bg-green-500/10 text-green-400' : 'hover:bg-gray-700/50'}`}
                  onClick={() => setSortOrder('recent')}
                >
                  Most Recent
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-lg ${sortOrder === 'alphabetical' ? 'bg-green-500/10 text-green-400' : 'hover:bg-gray-700/50'}`}
                  onClick={() => setSortOrder('alphabetical')}
                >
                  Alphabetical
                </button>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowCreateModal(true)}
            className="!rounded-full !px-4"
          >
            <HiPlus className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Create Playlist</span>
          </Button>
        </div>
      </div>

      {/* Library Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-700/50 pb-3">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'playlists' 
              ? 'bg-white text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'albums' 
              ? 'bg-white text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('albums')}
        >
          Albums
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'recently' 
              ? 'bg-white text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('recently')}
        >
          Recently Played
        </button>
      </div>

      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <>
          {sortedPlaylists.length === 0 ? (
            <div className="bg-gradient-to-b from-gray-800/20 to-gray-900/40 rounded-2xl p-12 text-center backdrop-blur-sm border border-gray-700/30">
              <div className="w-20 h-20 bg-gray-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCollection className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No playlists found</h3>
              <p className="text-gray-400 text-lg mb-6">
                {searchQuery ? `No results for "${searchQuery}"` : "Create a playlist to get started"}
              </p>
              {!searchQuery && (
                <Button
                  variant="primary"
                  onClick={() => setShowCreateModal(true)}
                  className="!rounded-full !px-6"
                >
                  <HiPlus className="h-5 w-5 mr-2" />
                  Create Playlist
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {sortedPlaylists.map(playlist => (
                <div 
                  key={playlist.id}
                  className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 p-4 rounded-xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-gray-800/60 hover:scale-[1.03] border border-gray-700/30 shadow-lg"
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                >
                  <div className="relative mb-4">
                    <img 
                      src={getPlaylistImageUrl(playlist)}
                      alt={playlist.name}
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-green-500 text-black rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <HiPlay className="h-5 w-5 ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-white truncate group-hover:text-green-400 transition-colors">{playlist.name}</h3>
                  <p className="text-sm text-gray-400 truncate mt-1">
                    {playlist.songs?.length || 0} songs
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Albums Tab */}
      {activeTab === 'albums' && (
        <>
          {filteredAlbums.length === 0 ? (
            <div className="bg-gradient-to-b from-gray-800/20 to-gray-900/40 rounded-2xl p-12 text-center backdrop-blur-sm border border-gray-700/30">
              <div className="w-20 h-20 bg-gray-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiMusicNote className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No albums found</h3>
              <p className="text-gray-400 text-lg mb-6">
                {searchQuery ? `No results for "${searchQuery}"` : "Looks like you haven't saved any albums yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {filteredAlbums.map(album => (
                <div 
                  key={album.id}
                  className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 p-4 rounded-xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-gray-800/60 hover:scale-[1.03] border border-gray-700/30 shadow-lg"
                  onClick={() => navigate(`/album/${album.id}`)}
                >
                  <div className="relative mb-4">
                    <img 
                      src={album.cover}
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-green-500 text-black rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <HiPlay className="h-5 w-5 ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-white truncate group-hover:text-green-400 transition-colors">{album.title}</h3>
                  <p className="text-sm text-gray-400 truncate mt-1">{album.artist}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Recently Played Tab */}
      {activeTab === 'recently' && (
        <div className="bg-gradient-to-b from-gray-800/20 to-gray-900/40 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/30">
          <div className="mb-4 px-4 text-sm text-gray-400 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-6 md:col-span-5">TITLE</div>
            <div className="hidden md:block md:col-span-3">ALBUM</div>
            <div className="col-span-4 md:col-span-2 text-right">
              <HiClock className="h-5 w-5 ml-auto" />
            </div>
          </div>
          
          {recentlyPlayed.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="text-lg">No recently played songs</p>
              <p className="mt-2 text-sm">Play some music to see your history</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentlyPlayed.map((song, index) => {
                const isCurrentSong = currentSong && currentSong.id === song.id;
                
                return (
                  <div 
                    key={song.id}
                    className={`group px-4 py-2 grid grid-cols-12 gap-4 items-center rounded-lg hover:bg-white/5 cursor-pointer transition-colors duration-200 ${isCurrentSong ? 'bg-white/10' : ''}`}
                    onClick={() => handlePlaySong(song)}
                  >
                    <div className="col-span-1 text-center text-gray-400 group-hover:text-white transition-colors relative">
                      {isCurrentSong && isPlayerPlaying ? (
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                      ) : (
                        <>
                          <span className="group-hover:hidden">{index + 1}</span>
                          <HiPlay className="hidden group-hover:block h-5 w-5 ml-auto mr-auto" />
                        </>
                      )}
                    </div>
                    <div className="col-span-6 md:col-span-5 flex items-center space-x-4">
                      <img 
                        src={song.image} 
                        alt={song.title}
                        className="w-10 h-10 rounded-md object-cover shadow-md"
                      />
                      <div className="min-w-0">
                        <h4 className={`font-medium truncate group-hover:text-green-400 transition-colors ${isCurrentSong ? 'text-green-400' : 'text-white'}`}>
                          {song.title}
                        </h4>
                        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:col-span-3 text-gray-400 truncate">
                      {song.album}
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right text-gray-400">
                      {song.duration}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Create Playlist Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Playlist"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="My Awesome Playlist"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={newPlaylistDescription}
              onChange={(e) => setNewPlaylistDescription(e.target.value)}
              placeholder="A collection of my favorite songs"
              rows="3"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowCreateModal(false)}
              className="text-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreatePlaylist}
              disabled={!newPlaylistName.trim()}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LibraryPage;
