import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, setIsPlaying } from '../store/playerSlice';
import { 
  updatePlaylist, 
  deletePlaylist, 
  removeSongFromPlaylist,
  toggleLikePlaylist,
  addToRecentlyPlayed
} from '../store/librarySlice';
import { 
  HiPlay, 
  HiPause, 
  HiHeart, 
  HiOutlineHeart, 
  HiClock, 
  HiDotsHorizontal, 
  HiPencil, 
  HiTrash,
  HiPlus,
  HiSearch
} from 'react-icons/hi';
import { mockSongs } from '../data/mockData';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const PlaylistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get playlists from Redux
  const playlists = useSelector(state => state.library.playlists);
  const likedPlaylists = useSelector(state => state.library.likedPlaylists) || [];
  const currentSong = useSelector(state => state.player.currentSong);
  const isPlayerPlaying = useSelector(state => state.player.isPlaying);
  
  const [playlist, setPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddSongsModal, setShowAddSongsModal] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  
  const isLiked = likedPlaylists.includes(parseInt(id));

  // Fetch playlist and its songs
  useEffect(() => {
    const playlistId = parseInt(id);
    const foundPlaylist = playlists.find(playlist => playlist.id === playlistId);
    
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
      setEditedName(foundPlaylist.name);
      setEditedDescription(foundPlaylist.description);
      
      // Get all songs in this playlist
      const songs = mockSongs.filter(song => foundPlaylist.songs.includes(song.id));
      setPlaylistSongs(songs);
      
      // Check if current song is from this playlist and player is playing
      if (currentSong && songs.some(song => song.id === currentSong.id) && isPlayerPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      
      // Get available songs for adding to playlist
      const unavailableSongIds = new Set(foundPlaylist.songs);
      const songsNotInPlaylist = mockSongs.filter(song => !unavailableSongIds.has(song.id));
      setAvailableSongs(songsNotInPlaylist);
    } else {
      // Playlist not found, redirect to home
      navigate('/');
    }
  }, [id, navigate, playlists, currentSong, isPlayerPlaying]);

  // Play all songs in the playlist
  const handlePlayPlaylist = () => {
    if (playlistSongs.length > 0) {
      dispatch(playSong({
        song: playlistSongs[0],
        queue: playlistSongs,
        index: 0
      }));
      
      // Add to recently played
      dispatch(addToRecentlyPlayed(playlistSongs[0].id));
      
      setIsPlaying(true);
    }
  };
  
  // Play/pause playlist
  const handlePlayPausePlaylist = () => {
    if (isPlaying) {
      // Just pause the current song
      dispatch(setIsPlaying(false));
      setIsPlaying(false);
    } else {
      handlePlayPlaylist();
    }
  };

  // Play individual song
  const handlePlaySong = (song) => {
    const songIndex = playlistSongs.findIndex(s => s.id === song.id);
    
    dispatch(playSong({
      song: song,
      queue: playlistSongs,
      index: songIndex
    }));
    
    // Add to recently played
    dispatch(addToRecentlyPlayed(song.id));
    
    setIsPlaying(true);
  };

  // Toggle like playlist
  const handleToggleLikePlaylist = () => {
    dispatch(toggleLikePlaylist(parseInt(id)));
  };

  // Handle edit playlist
  const handleEditPlaylist = () => {
    dispatch(updatePlaylist({
      id: parseInt(id),
      name: editedName,
      description: editedDescription
    }));
    setShowEditModal(false);
  };

  // Handle delete playlist
  const handleDeletePlaylist = () => {
    dispatch(deletePlaylist(parseInt(id)));
    setShowDeleteModal(false);
    navigate('/library');
  };

  // Handle remove song from playlist
  const handleRemoveSong = (songId) => {
    dispatch(removeSongFromPlaylist({
      playlistId: parseInt(id),
      songId: songId
    }));
    
    // Update local state
    setPlaylistSongs(playlistSongs.filter(song => song.id !== songId));
  };
  
  // Handle add songs to playlist
  const handleAddSongs = () => {
    // Update playlist with new songs
    // This would be handled by the librarySlice in a real app
    // For now, we'll just close the modal
    setShowAddSongsModal(false);
    setSelectedSongs([]);
  };
  
  // Toggle song selection for adding to playlist
  const toggleSongSelection = (songId) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter(id => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="text-white pb-32">
      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-8">
        <div className="relative group">
          <img 
            src={playlist.image} 
            alt={playlist.name}
            className="w-48 h-48 md:w-56 md:h-56 object-cover shadow-2xl rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
            <button 
              onClick={handlePlayPausePlaylist}
              className="bg-green-500 text-black rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300"
            >
              {isPlaying ? 
                <HiPause className="h-8 w-8" /> : 
                <HiPlay className="h-8 w-8 ml-1" />
              }
            </button>
          </div>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-sm font-medium uppercase tracking-wider mb-1">Playlist</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{playlist.name}</h1>
          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 space-y-1 md:space-y-0 md:space-x-2">
            <span className="font-medium">{playlist.description}</span>
            <span className="hidden md:inline-block">•</span>
            <span>{playlistSongs.length} songs</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="primary"
          size="lg"
          className="!rounded-full !px-8"
          onClick={handlePlayPausePlaylist}
          disabled={playlistSongs.length === 0}
        >
          {isPlaying ? 
            <><HiPause className="h-5 w-5 mr-2" /> Pause</> : 
            <><HiPlay className="h-5 w-5 mr-2" /> Play</>
          }
        </Button>
        
        <button 
          onClick={handleToggleLikePlaylist}
          className={`p-2 rounded-full ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          {isLiked ? <HiHeart className="h-8 w-8" /> : <HiOutlineHeart className="h-8 w-8" />}
        </button>
        
        <button 
          onClick={() => setShowEditModal(true)}
          className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          title="Edit playlist"
        >
          <HiPencil className="h-6 w-6" />
        </button>
        
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          title="Delete playlist"
        >
          <HiTrash className="h-6 w-6" />
        </button>
        
        <button 
          onClick={() => setShowAddSongsModal(true)}
          className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          title="Add songs"
        >
          <HiPlus className="h-6 w-6" />
        </button>
      </div>
      
      {/* Songs Table */}
      <div className="bg-gradient-to-b from-gray-800/20 to-gray-900/40 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/30">
        <div className="mb-4 px-4 text-sm text-gray-400 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6 md:col-span-5">TITLE</div>
          <div className="hidden md:block md:col-span-3">ALBUM</div>
          <div className="col-span-4 md:col-span-2 text-right">
            <HiClock className="h-5 w-5 ml-auto" />
          </div>
        </div>
        
        {playlistSongs.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <p className="text-lg">This playlist is empty</p>
            <p className="mt-2 text-sm">Add some songs to get started</p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => setShowAddSongsModal(true)}
            >
              <HiPlus className="h-5 w-5 mr-2" />
              Add Songs
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {playlistSongs.map((song, index) => {
              const isCurrentSong = currentSong && currentSong.id === song.id;
              
              return (
                <div 
                  key={song.id}
                  className={`group px-4 py-2 grid grid-cols-12 gap-4 items-center rounded-lg hover:bg-white/5 transition-colors duration-200 ${isCurrentSong ? 'bg-white/10' : ''}`}
                >
                  <div 
                    className="col-span-1 text-center text-gray-400 group-hover:text-white transition-colors relative cursor-pointer"
                    onClick={() => handlePlaySong(song)}
                  >
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
                  <div 
                    className="col-span-6 md:col-span-5 flex items-center space-x-4 cursor-pointer"
                    onClick={() => handlePlaySong(song)}
                  >
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
                  <div 
                    className="hidden md:block md:col-span-3 text-gray-400 truncate cursor-pointer"
                    onClick={() => handlePlaySong(song)}
                  >
                    {song.album}
                  </div>
                  <div className="col-span-4 md:col-span-2 flex items-center justify-end">
                    <span className="text-gray-400 mr-4">{song.duration}</span>
                    <button 
                      onClick={() => handleRemoveSong(song.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all"
                      title="Remove from playlist"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Edit Playlist Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Playlist"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="3"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowEditModal(false)}
              className="text-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEditPlaylist}
              disabled={!editedName.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Delete Playlist Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Playlist"
      >
        <div className="space-y-4">
          <p className="text-gray-300">Are you sure you want to delete this playlist? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowDeleteModal(false)}
              className="text-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeletePlaylist}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Add Songs Modal */}
      <Modal
        isOpen={showAddSongsModal}
        onClose={() => setShowAddSongsModal(false)}
        title="Add Songs to Playlist"
      >
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search songs to add"
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {availableSongs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No more songs available to add</p>
              </div>
            ) : (
              <div className="space-y-2">
                {availableSongs.map((song) => (
                  <div 
                    key={song.id}
                    className="flex items-center space-x-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer"
                    onClick={() => toggleSongSelection(song.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => {}}
                      className="h-4 w-4 bg-gray-700 rounded border-gray-500 text-green-500 focus:ring-green-500"
                    />
                    <img 
                      src={song.image} 
                      alt={song.title}
                      className="w-10 h-10 rounded-md object-cover shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-medium truncate">{song.title}</h4>
                      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                    </div>
                    <span className="text-xs text-gray-500">{song.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowAddSongsModal(false)}
              className="text-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddSongs}
              disabled={selectedSongs.length === 0}
            >
              Add {selectedSongs.length} {selectedSongs.length === 1 ? 'Song' : 'Songs'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlaylistPage;
