import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, setIsPlaying } from '../store/playerSlice';
import { toggleLikeAlbum, addToRecentlyPlayed } from '../store/librarySlice';
import { HiPlay, HiPause, HiHeart, HiOutlineHeart, HiClock, HiDotsHorizontal } from 'react-icons/hi';
import { mockSongs, mockAlbums } from '../data/mockData';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const AlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [album, setAlbum] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  
  // Get data from Redux store
  const currentSong = useSelector(state => state.player.currentSong);
  const isPlayerPlaying = useSelector(state => state.player.isPlaying);
  const likedAlbums = useSelector(state => state.library.likedAlbums) || [];
  
  const isLiked = likedAlbums.includes(parseInt(id));

  // Fetch album and its songs
  useEffect(() => {
    const albumId = parseInt(id);
    const foundAlbum = mockAlbums.find(album => album.id === albumId);
    
    if (foundAlbum) {
      setAlbum(foundAlbum);
      // Get all songs from this album
      const songs = mockSongs.filter(song => song.albumId === albumId);
      setAlbumSongs(songs);
      
      // Check if current song is from this album and player is playing
      if (currentSong && songs.some(song => song.id === currentSong.id) && isPlayerPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    } else {
      // Album not found, redirect to home
      navigate('/');
    }
  }, [id, navigate, currentSong, isPlayerPlaying]);

  // Play all songs in the album
  const handlePlayAlbum = () => {
    if (albumSongs.length > 0) {
      dispatch(playSong({
        song: albumSongs[0],
        queue: albumSongs,
        index: 0
      }));
      
      // Add to recently played
      dispatch(addToRecentlyPlayed(albumSongs[0].id));
      
      setIsPlaying(true);
    }
  };

  // Play/pause album
  const handlePlayPauseAlbum = () => {
    if (isPlaying) {
      // Just pause the current song
      dispatch(setIsPlaying(false));
      setIsPlaying(false);
    } else {
      handlePlayAlbum();
    }
  };

  // Play individual song
  const handlePlaySong = (song) => {
    const songIndex = albumSongs.findIndex(s => s.id === song.id);
    
    dispatch(playSong({
      song: song,
      queue: albumSongs,
      index: songIndex
    }));
    
    // Add to recently played
    dispatch(addToRecentlyPlayed(song.id));
    
    setIsPlaying(true);
  };

  // Toggle like album
  const handleToggleLikeAlbum = () => {
    dispatch(toggleLikeAlbum(parseInt(id)));
  };

  // Add to playlist modal
  const handleAddToPlaylist = () => {
    // We'll implement this in the next step
    setShowOptionsModal(false);
  };

  if (!album) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="text-white pb-32">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-8">
        <div className="relative group">
          <img 
            src={album.cover} 
            alt={album.title}
            className="w-48 h-48 md:w-56 md:h-56 object-cover shadow-2xl rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
            <button 
              onClick={handlePlayPauseAlbum}
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
          <p className="text-sm font-medium uppercase tracking-wider mb-1">Album</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{album.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 space-y-1 md:space-y-0 md:space-x-2">
            <div className="flex items-center justify-center md:justify-start">
              <img 
                src={album.artistImage || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop"}
                alt={album.artist}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="font-medium hover:underline cursor-pointer">{album.artist}</span>
            </div>
            <span className="hidden md:inline-block">•</span>
            <span>{album.year}</span>
            <span className="hidden md:inline-block">•</span>
            <span>{albumSongs.length} songs</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="primary"
          size="lg"
          className="!rounded-full !px-8"
          onClick={handlePlayPauseAlbum}
        >
          {isPlaying ? 
            <><HiPause className="h-5 w-5 mr-2" /> Pause</> : 
            <><HiPlay className="h-5 w-5 mr-2" /> Play</>
          }
        </Button>
        
        <button 
          onClick={handleToggleLikeAlbum}
          className={`p-2 rounded-full ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          {isLiked ? <HiHeart className="h-8 w-8" /> : <HiOutlineHeart className="h-8 w-8" />}
        </button>
        
        <button 
          className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          onClick={() => setShowOptionsModal(true)}
        >
          <HiDotsHorizontal className="h-6 w-6" />
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
        
        <div className="space-y-1">
          {albumSongs.map((song, index) => {
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
      </div>
      
      {/* Album Info */}
      <div className="mt-12 text-gray-400">
        <h3 className="text-lg font-bold text-white mb-3">About this album</h3>
        <p className="text-sm md:text-base max-w-3xl">{album.description || "No description available."}</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white font-medium mb-1">Released</p>
            <p>{album.releaseDate || album.year}</p>
          </div>
          <div>
            <p className="text-white font-medium mb-1">Genre</p>
            <p>{album.genre || "Various"}</p>
          </div>
        </div>
      </div>
      
      {/* Options Modal */}
      <Modal
        isOpen={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        title="Album Options"
      >
        <div className="space-y-2 py-2">
          <button 
            className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg flex items-center space-x-3"
            onClick={handleAddToPlaylist}
          >
            <HiPlus className="h-5 w-5" />
            <span>Add to playlist</span>
          </button>
          <button 
            className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg flex items-center space-x-3"
            onClick={handleToggleLikeAlbum}
          >
            {isLiked ? <HiHeart className="h-5 w-5 text-green-500" /> : <HiOutlineHeart className="h-5 w-5" />}
            <span>{isLiked ? 'Remove from Liked Albums' : 'Add to Liked Albums'}</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AlbumPage;
