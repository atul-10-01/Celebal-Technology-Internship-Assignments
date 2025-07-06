import { mockSongs, mockPlaylists } from '../data/mockData';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { HiPlay, HiHeart, HiDotsHorizontal } from 'react-icons/hi';

const HomePage = () => {
  const handlePlaySong = (song) => {
    console.log('Playing song:', song.title);
    // Will implement actual play functionality in Step 3
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist.name);
    // Will implement actual play functionality in Step 3
  };

  return (
    <div className="text-white space-y-8 pb-32">
      {/* Hero Greeting Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Good evening
        </h1>
        <p className="text-gray-400 text-lg">Welcome back to your music journey</p>
      </div>

      {/* Quick Access - Recently Played */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Recently played</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="group flex items-center bg-gradient-to-r from-gray-800/40 to-gray-700/20 hover:from-gray-700/60 hover:to-gray-600/40 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-gray-700/30"
              onClick={() => handlePlayPlaylist(playlist)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shadow-xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="font-bold text-lg md:text-xl truncate text-white">{playlist.name}</h3>
                <p className="text-gray-400 text-sm md:text-base truncate">{playlist.description}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 ml-4">
                <Button
                  variant="primary"
                  size="md"
                  className="!rounded-full w-12 h-12 !p-0 shadow-xl hover:scale-110 transition-transform duration-200"
                >
                  <HiPlay className="h-5 w-5 ml-0.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Music */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Made for you</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {mockSongs.slice(0, 6).map((song) => (
            <div
              key={song.id}
              className="group bg-gradient-to-b from-gray-800/30 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/70 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-gray-700/20 shadow-xl"
              onClick={() => handlePlaySong(song)}
            >
              <div className="relative mb-4">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full aspect-square rounded-xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  <Button
                    variant="primary"
                    size="sm"
                    className="!rounded-full w-12 h-12 !p-0 shadow-xl hover:scale-110 transition-transform duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySong(song);
                    }}
                  >
                    <HiPlay className="h-4 w-4 ml-0.5" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base truncate group-hover:text-green-400 transition-colors">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Songs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Popular this week</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            See all
          </Button>
        </div>
        <div className="bg-gradient-to-b from-gray-800/20 to-gray-900/40 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/30">
          <div className="space-y-2">
            {mockSongs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center hover:bg-white/5 rounded-xl p-3 cursor-pointer transition-all duration-200"
                onClick={() => handlePlaySong(song)}
              >
                <span className="text-gray-400 text-lg font-bold w-8 flex-shrink-0 group-hover:text-white transition-colors">
                  {index + 1}
                </span>
                <div className="relative flex-shrink-0 mx-4">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-14 h-14 rounded-lg object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-all"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base truncate group-hover:text-green-400 transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors">
                    {song.artist}
                  </p>
                </div>
                <div className="hidden sm:block text-gray-400 text-sm mr-6 flex-shrink-0 group-hover:text-gray-300 transition-colors">
                  {song.duration}
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-2 hover:text-green-400"
                  >
                    <HiHeart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="!rounded-full w-10 h-10 !p-0 shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <HiPlay className="h-4 w-4 ml-0.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-2"
                  >
                    <HiDotsHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
