import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiHome, 
  HiSearch, 
  HiCollection, 
  HiHeart,
  HiPlus,
  HiDownload,
  HiMenu,
  HiX
} from 'react-icons/hi';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [
    { name: 'Home', href: '/', icon: HiHome },
    { name: 'Search', href: '/search', icon: HiSearch },
    { name: 'Your Library', href: '/library', icon: HiCollection },
  ];

  const library = [
    { name: 'Create Playlist', href: '/create-playlist', icon: HiPlus },
    { name: 'Liked Songs', href: '/liked-songs', icon: HiHeart },
    { name: 'Downloaded', href: '/downloaded', icon: HiDownload },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black bg-opacity-80 rounded-full text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        flex flex-col w-64 bg-gradient-to-b from-black via-gray-900 to-black text-white h-full border-r border-gray-800/50
        fixed lg:relative top-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center p-6 pt-16 lg:pt-6 border-b border-gray-800/30">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              GanaLaga
            </h1>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group ${
                      isActive 
                        ? 'bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border-l-4 border-green-500' 
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={`h-6 w-6 flex-shrink-0 transition-colors ${
                    window.location.pathname === item.href ? 'text-green-400' : 'group-hover:text-green-400'
                  }`} />
                  <span className="font-semibold truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Library Section */}
        <div className="px-4">
          <div className="border-t border-gray-800/50 pt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">
              Your Library
            </h3>
            <ul className="space-y-2">
              {library.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 text-gray-300 hover:text-white group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                    <span className="font-medium truncate">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Playlists */}
        <div className="flex-1 px-4 mt-6 overflow-y-auto">
          <div className="space-y-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">
              Recently Created
            </div>
            <div className="space-y-1">
              {[
                { name: "My Playlist #1", songs: 23 },
                { name: "Chill Vibes", songs: 45 },
                { name: "Rock Classics", songs: 67 },
                { name: "Workout Mix", songs: 34 },
                { name: "Study Music", songs: 28 },
                { name: "Road Trip", songs: 52 }
              ].map((playlist, index) => (
                <div key={index} className="group px-4 py-3 hover:bg-gray-800/30 rounded-xl cursor-pointer transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-gray-500 group-hover:to-gray-700 transition-all">
                      <span className="text-white text-xs font-bold">
                        {playlist.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate group-hover:text-green-400 transition-colors">
                        {playlist.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {playlist.songs} songs
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - User Info */}
        <div className="p-4 border-t border-gray-800/50 mt-auto">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-gray-800/30 to-gray-700/20 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-xs">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">User</p>
              <p className="text-gray-400 text-xs">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
