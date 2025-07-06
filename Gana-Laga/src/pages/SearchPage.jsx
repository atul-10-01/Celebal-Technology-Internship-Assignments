import { mockGenres } from '../data/mockData';

const SearchPage = () => {
  const handleGenreClick = (genre) => {
    console.log('Selected genre:', genre.name);
    // Will implement genre filtering in later steps
  };

  return (
    <div className="text-white space-y-8 pb-32">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Search
      </h1>
      
      {/* Browse Categories */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Browse all</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {mockGenres.map((genre) => (
            <div
              key={genre.id}
              className={`${genre.color} rounded-2xl p-4 md:p-6 cursor-pointer hover:scale-105 transition-all duration-300 relative overflow-hidden min-h-[120px] md:min-h-[140px] flex items-end shadow-xl hover:shadow-2xl`}
              onClick={() => handleGenreClick(genre)}
            >
              <h3 className="text-lg md:text-xl font-black text-white relative z-10 drop-shadow-lg">
                {genre.name}
              </h3>
              
              {/* Enhanced decorative elements */}
              <div className="absolute -top-4 -right-4 transform rotate-12 opacity-30">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 transform -rotate-12 opacity-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-black/30 rounded-xl"></div>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Searches */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Popular searches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: 'The Weeknd', color: 'from-purple-500 to-pink-500' },
            { name: 'Taylor Swift', color: 'from-yellow-500 to-orange-500' },
            { name: 'Drake', color: 'from-blue-500 to-purple-500' },
            { name: 'Billie Eilish', color: 'from-green-500 to-teal-500' },
            { name: 'Ed Sheeran', color: 'from-orange-500 to-red-500' },
            { name: 'Ariana Grande', color: 'from-pink-500 to-purple-500' }
          ].map((artist, index) => (
            <div
              key={index}
              className="group flex items-center bg-gradient-to-r from-gray-800/50 to-gray-700/30 hover:from-gray-700/70 hover:to-gray-600/50 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-gray-700/30 shadow-lg hover:shadow-xl"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${artist.color} rounded-2xl flex items-center justify-center text-white font-black text-lg md:text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {artist.name.charAt(0)}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="font-bold text-lg md:text-xl truncate text-white group-hover:text-green-400 transition-colors">
                  {artist.name}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">Artist</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Recent searches</h2>
        <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/20 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/30">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Start searching</h3>
          <p className="text-gray-400 text-lg">Try searching for artists, songs, or podcasts</p>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
