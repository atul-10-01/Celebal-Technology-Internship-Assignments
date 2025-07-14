import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiSearch, HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import Button from '../UI/Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Add to search history (avoid duplicates and limit to 10 items)
      const newHistory = [
        searchQuery,
        ...searchHistory.filter(item => item !== searchQuery)
      ].slice(0, 10);
      
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      // Navigate to search page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle navigation through browser history
  const handleNavigation = (direction) => {
    if (direction === 'back') {
      window.history.back();
    } else {
      window.history.forward();
    }
  };

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 h-16 relative z-20 border-b border-gray-700/30 backdrop-blur-sm">
      {/* Navigation Buttons - Hidden on mobile when search is focused */}
      <div className={`flex items-center space-x-3 transition-opacity duration-200 ${isSearchFocused ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
        <button 
          className="p-2.5 bg-black/30 hover:bg-black/50 rounded-full transition-all duration-200 hover:scale-105 border border-gray-700/50"
          onClick={() => handleNavigation('back')}
        >
          <HiChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </button>
        <button 
          className="p-2.5 bg-black/30 hover:bg-black/50 rounded-full transition-all duration-200 hover:scale-105 border border-gray-700/50"
          onClick={() => handleNavigation('forward')}
        >
          <HiChevronRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className={`flex-1 max-w-2xl transition-all duration-200 ${isSearchFocused ? 'mx-4' : 'mx-4 md:mx-8'}`}>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-12 py-3 bg-white/90 backdrop-blur-sm text-black rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-sm md:text-base font-medium shadow-lg hover:bg-white transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-200"
              >
                <HiX className="h-4 w-4 md:h-5 md:w-5 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* User Profile */}
      <div className={`flex items-center space-x-3 transition-opacity duration-200 ${isSearchFocused ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
        {/* Profile */}
        <Button
          variant="secondary"
          size="sm"
          className="!rounded-full !p-2.5 md:!px-4 md:!py-2.5 bg-black/30 hover:bg-black/50 border border-gray-700/50 hover:border-gray-600 hover:scale-105 transition-all duration-200"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">U</span>
          </div>
          <span className="hidden md:inline ml-2 text-sm font-semibold text-white">Profile</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
