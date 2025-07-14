import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockGenres, mockSongs, mockPlaylists } from '../data/mockData';
import { useDispatch } from 'react-redux';
import { playSong } from '../store/playerSlice';
import { HiPlay, HiHeart, HiClock, HiUser, HiMusicNote } from 'react-icons/hi';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [activeGenre, setActiveGenre] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Search and filter logic
  useEffect(() => {
    // Reset genre filter if we have a search query
    if (searchQuery) setActiveGenre(null);
    
    // Filter songs based on search query or genre
    let songResults = [...mockSongs];
    let playlistResults = [...mockPlaylists];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      songResults = mockSongs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      );
      
      playlistResults = mockPlaylists.filter(playlist =>
        playlist.name.toLowerCase().includes(query) ||
        playlist.description.toLowerCase().includes(query)
      );
    }
    
    if (activeGenre) {
      songResults = songResults.filter(song => 
        song.genre.toLowerCase() === activeGenre.name.toLowerCase()
      );
    }
    
    setFilteredSongs(songResults);
    setFilteredPlaylists(playlistResults);
  }, [searchQuery, activeGenre]);

  const handleGenreClick = (genre) => {
    if (activeGenre && activeGenre.id === genre.id) {
      // If clicking the already active genre, clear the filter
      setActiveGenre(null);
    } else {
      setActiveGenre(genre);
    }
  };

  const handlePlaySong = (song) => {
    // Get the current song's index in the filteredSongs array
    const currentIndex = filteredSongs.findIndex(s => s.id === song.id);
    
    // Dispatch the playSong action with the song, full queue, and current index
    dispatch(playSong({
      song: song,
      queue: filteredSongs,
      index: currentIndex
    }));
  };

  const handlePlayPlaylist = (playlist) => {
    // For playlists, use mockSongs filtered to only include songs in the playlist
    const playlistSongs = mockSongs.filter(song => playlist.songs.includes(song.id));
    if (playlistSongs.length > 0) {
      dispatch(playSong({
        song: playlistSongs[0],
        queue: playlistSongs,
        index: 0
      }));
    }
  };

  return (
    <div className="text-white space-y-8 pb-32">
      {searchQuery ? (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Results for "{searchQuery}"
        </h1>
      ) : activeGenre ? (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {activeGenre.name} Music
        </h1>
      ) : (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Search
        </h1>
      )}
      
      {/* Browse Categories */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Browse all</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {mockGenres.map((genre) => (
            <div
              key={genre.id}
              className={`${genre.color} ${activeGenre?.id === genre.id ? 'ring-4 ring-green-500 scale-105' : ''} rounded-2xl p-4 md:p-6 cursor-pointer hover:scale-105 transition-all duration-300 relative overflow-hidden min-h-[120px] md:min-h-[140px] flex items-end shadow-xl hover:shadow-2xl`}
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

      {/* Popular Searches - Only show if no search query or active genre */}
      {!searchQuery && !activeGenre && (
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
                onClick={() => {
                  // Navigate to search with this artist
                  window.location.href = `/search?q=${encodeURIComponent(artist.name)}`;
                }}
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
      )}

      {/* Recent Searches - Only show if no search query or active genre */}
      {!searchQuery && !activeGenre && recentSearches.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Recent searches</h2>
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/20 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="bg-black/30 hover:bg-black/50 rounded-xl p-3 cursor-pointer transition-all duration-200 text-center hover:scale-105"
                  onClick={() => {
                    window.location.href = `/search?q=${encodeURIComponent(search)}`;
                  }}
                >
                  <span className="text-white hover:text-green-400 font-medium truncate block transition-colors">
                    {search}
                  </span>
                </div>
              ))}
              <div 
                className="bg-gray-800/30 hover:bg-gray-700/50 rounded-xl p-3 cursor-pointer transition-all duration-200 text-center hover:scale-105 border border-gray-700/50"
                onClick={() => {
                  localStorage.removeItem('searchHistory');
                  setRecentSearches([]);
                }}
              >
                <span className="text-gray-400 hover:text-white font-medium truncate block transition-colors">
                  Clear All
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Empty State - Only show if no search query, no active genre, and no recent searches */}
      {!searchQuery && !activeGenre && recentSearches.length === 0 && (
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
      )}
      
      {/* Search Results Section - Only show if there's a search query or active genre */}
      {(searchQuery || activeGenre) && (
        <>
          {/* Top Results Section */}
          {filteredSongs.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Top Results</h2>
              
              {/* Top Track Result */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSongs.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-start space-x-5">
                      <img 
                        src={filteredSongs[0].image}
                        alt={filteredSongs[0].title}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Song</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-2 truncate">{filteredSongs[0].title}</h3>
                        <p className="text-gray-400 mb-6 truncate">{filteredSongs[0].artist}</p>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handlePlaySong(filteredSongs[0])}
                            className="bg-green-500 hover:bg-green-400 text-black rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <HiPlay className="h-6 w-6 ml-0.5" />
                          </button>
                          <button className="text-gray-400 hover:text-white transition-colors p-2">
                            <HiHeart className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Top Playlist Result */}
                {filteredPlaylists.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-start space-x-5">
                      <img 
                        src={filteredPlaylists[0].image}
                        alt={filteredPlaylists[0].name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Playlist</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-2 truncate">{filteredPlaylists[0].name}</h3>
                        <p className="text-gray-400 mb-6 truncate">{filteredPlaylists[0].description}</p>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handlePlayPlaylist(filteredPlaylists[0])}
                            className="bg-green-500 hover:bg-green-400 text-black rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <HiPlay className="h-6 w-6 ml-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          
          {/* Songs Section */}
          {filteredSongs.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Songs</h2>
              <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/40 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/30">
                <div className="mb-4 px-4 text-sm text-gray-400 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-6 md:col-span-5">TITLE</div>
                  <div className="hidden md:block md:col-span-3">ALBUM</div>
                  <div className="col-span-4 md:col-span-2 text-right">
                    <HiClock className="h-5 w-5 ml-auto" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  {filteredSongs.map((song, index) => (
                    <div 
                      key={song.id}
                      className="group px-4 py-2 grid grid-cols-12 gap-4 items-center rounded-lg hover:bg-white/5 cursor-pointer transition-colors duration-200"
                      onClick={() => handlePlaySong(song)}
                    >
                      <div className="col-span-1 text-center text-gray-400 group-hover:text-white transition-colors relative">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <HiPlay className="hidden group-hover:block h-5 w-5 ml-auto mr-auto" />
                      </div>
                      <div className="col-span-6 md:col-span-5 flex items-center space-x-4">
                        <img 
                          src={song.image} 
                          alt={song.title}
                          className="w-10 h-10 rounded-md object-cover shadow-md"
                        />
                        <div className="min-w-0">
                          <h4 className="text-white font-medium truncate group-hover:text-green-400 transition-colors">{song.title}</h4>
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
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {/* Playlists Section */}
          {filteredPlaylists.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {filteredPlaylists.map(playlist => (
                  <div 
                    key={playlist.id}
                    className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 p-4 rounded-xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-gray-800/60 hover:scale-[1.03] border border-gray-700/30 shadow-lg"
                    onClick={() => handlePlayPlaylist(playlist)}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={playlist.image}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-green-500 text-black rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <HiPlay className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-white truncate group-hover:text-green-400 transition-colors">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 truncate mt-1">{playlist.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* No Results */}
          {filteredSongs.length === 0 && filteredPlaylists.length === 0 && (
            <section className="mb-10">
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-2xl p-10 text-center backdrop-blur-sm border border-gray-700/30">
                <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiMusicNote className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                <p className="text-gray-400 text-lg">
                  {searchQuery 
                    ? `We couldn't find any matches for "${searchQuery}"`
                    : activeGenre
                      ? `No ${activeGenre.name} music found`
                      : 'Try a different search term or browse the categories'
                  }
                </p>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
