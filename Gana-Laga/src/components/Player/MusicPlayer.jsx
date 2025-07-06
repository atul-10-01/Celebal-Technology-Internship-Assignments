import { useSelector, useDispatch } from 'react-redux';
import { 
  HiPlay, 
  HiPause, 
  HiHeart,
  HiOutlineHeart,
  HiFastForward,
  HiRewind,
  HiRefresh
} from 'react-icons/hi';
import { 
  HiQueueList,
  HiArrowsRightLeft
} from 'react-icons/hi2';
import { 
  setIsPlaying, 
  setCurrentTime, 
  setDuration,
  nextSong, 
  previousSong,
  toggleShuffle,
  toggleRepeat
} from '../../store/playerSlice';
import { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import QueueManager from './QueueManager';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, shuffle, repeat, volume } = useSelector(state => state.player);
  
  const audioRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  // Handle play/pause
  const togglePlayPause = () => {
    if (!currentSong) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      dispatch(setIsPlaying(!isPlaying));
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  // Auto-play next song when current ends
  const handleSongEnd = () => {
    dispatch(nextSong());
  };

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Auto-play when song changes
  useEffect(() => {
    if (currentSong && audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-700/50 px-3 md:px-4 py-3 z-50 backdrop-blur-sm">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
        preload="metadata"
      />

      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Current Song Info */}
        <div className="flex items-center space-x-3 md:space-x-4 w-1/4 min-w-0">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shadow-xl"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white text-sm md:text-base font-semibold truncate hover:text-green-400 transition-colors cursor-pointer">
              {currentSong.title}
            </h4>
            <p className="text-gray-400 text-xs md:text-sm truncate hover:text-gray-300 transition-colors cursor-pointer">
              {currentSong.artist}
            </p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="text-gray-400 hover:text-green-500 transition-colors hidden sm:block p-1"
          >
            {isLiked ? (
              <HiHeart className="h-5 w-5 text-green-500" />
            ) : (
              <HiOutlineHeart className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col items-center space-y-2 md:space-y-3 w-2/5 max-w-lg">
          {/* Control Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => dispatch(toggleShuffle())}
              className={`transition-colors p-1 ${shuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
              title={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
            >
              <HiArrowsRightLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            <button
              onClick={() => dispatch(previousSong())}
              className="text-gray-300 hover:text-white transition-colors p-1"
              title="Previous"
            >
              <HiRewind className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="bg-white hover:bg-gray-200 text-black rounded-full p-2 md:p-3 transition-all hover:scale-105 shadow-xl"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <HiPause className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <HiPlay className="h-5 w-5 md:h-6 md:w-6 ml-1" />
              )}
            </button>
            
            <button
              onClick={() => dispatch(nextSong())}
              className="text-gray-300 hover:text-white transition-colors p-1"
              title="Next"
            >
              <HiFastForward className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              onClick={() => dispatch(toggleRepeat())}
              className={`transition-colors p-1 ${repeat ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
              title={repeat ? 'Disable repeat' : 'Enable repeat'}
            >
              <HiRefresh className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <ProgressBar audioRef={audioRef} />
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end w-1/4 space-x-3">
          <button
            onClick={() => setShowQueue(true)}
            className="text-gray-400 hover:text-white transition-colors p-1 hidden sm:block"
            title="Queue"
          >
            <HiQueueList className="h-5 w-5" />
          </button>
          <VolumeControl />
        </div>
      </div>
      
      {/* Queue Manager Modal */}
      <QueueManager isOpen={showQueue} onClose={() => setShowQueue(false)} />
    </div>
  );
};

export default MusicPlayer;
