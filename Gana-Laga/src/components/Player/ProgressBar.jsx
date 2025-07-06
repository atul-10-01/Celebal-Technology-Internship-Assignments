import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTime } from '../../store/playerSlice';

const ProgressBar = ({ audioRef }) => {
  const dispatch = useDispatch();
  const { currentTime, duration } = useSelector(state => state.player);

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    if (audioRef?.current && duration) {
      audioRef.current.currentTime = newTime;
      dispatch(setCurrentTime(newTime));
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || !time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center space-x-3 w-full">
      <span className="text-xs text-gray-400 w-10 text-right font-mono">
        {formatTime(currentTime)}
      </span>
      
      <div
        className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group hover:h-1.5 transition-all"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-green-500 rounded-full relative transition-all group-hover:bg-green-400"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
        </div>
      </div>
      
      <span className="text-xs text-gray-400 w-10 font-mono">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;
