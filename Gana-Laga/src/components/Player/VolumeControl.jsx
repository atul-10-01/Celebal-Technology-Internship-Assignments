import { useSelector, useDispatch } from 'react-redux';
import { setVolume } from '../../store/playerSlice';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { useState } from 'react';

const VolumeControl = () => {
  const dispatch = useDispatch();
  const { volume } = useSelector(state => state.player);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    dispatch(setVolume(newVolume));
    
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted || volume === 0) {
      dispatch(setVolume(previousVolume || 50));
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      dispatch(setVolume(0));
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return HiVolumeOff;
    return HiVolumeUp;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="hidden md:flex items-center space-x-3">
      <button
        onClick={toggleMute}
        className="text-gray-300 hover:text-white transition-colors p-1"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="h-5 w-5" />
      </button>
      
      <div className="flex items-center space-x-2 w-24 group">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer volume-slider"
          style={{
            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`
          }}
        />
      </div>
      
      <span className="text-xs text-gray-400 w-8 text-center font-mono">
        {volume}
      </span>
    </div>
  );
};

export default VolumeControl;
