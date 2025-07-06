import { useSelector, useDispatch } from 'react-redux';
import { playSong } from '../../store/playerSlice';
import { HiPlay, HiX, HiMusicNote } from 'react-icons/hi';
import Button from '../UI/Button';

const QueueManager = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { queue, currentSong, currentIndex } = useSelector(state => state.player);

  const handlePlayFromQueue = (song, index) => {
    dispatch(playSong({
      song: song,
      queue: queue,
      index: index
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <HiMusicNote className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold text-white">Queue</h2>
            <span className="text-gray-400 text-sm">({queue.length} songs)</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="!p-2 hover:bg-gray-700/50"
          >
            <HiX className="h-5 w-5" />
          </Button>
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto p-4">
          {queue.length === 0 ? (
            <div className="text-center py-12">
              <HiMusicNote className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No songs in queue</p>
              <p className="text-gray-500 text-sm mt-2">Add some music to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {queue.map((song, index) => (
                <div
                  key={song.id}
                  className={`group flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    currentSong?.id === song.id && index === currentIndex
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'hover:bg-gray-700/30'
                  }`}
                  onClick={() => handlePlayFromQueue(song, index)}
                >
                  {/* Song Number/Play Indicator */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {currentSong?.id === song.id && index === currentIndex ? (
                      <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium group-hover:hidden">
                        {index + 1}
                      </span>
                    )}
                    <HiPlay className="h-4 w-4 text-white hidden group-hover:block" />
                  </div>

                  {/* Song Image */}
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover shadow-lg"
                  />

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate transition-colors ${
                      currentSong?.id === song.id && index === currentIndex
                        ? 'text-green-400'
                        : 'text-white group-hover:text-green-400'
                    }`}>
                      {song.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate group-hover:text-gray-300 transition-colors">
                      {song.artist}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="text-gray-400 text-xs flex-shrink-0">
                    {song.duration}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueManager;
