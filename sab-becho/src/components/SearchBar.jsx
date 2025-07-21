import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { products } from '../data/products';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches] = useState(['iPhone', 'Laptop', 'Headphones', 'Jeans', 'Coffee Maker']);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = products
        .filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice(0, 8)
        .map(product => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          image: product.image
        }));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    if (term.trim()) {
      // Add to recent searches
      const newRecentSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      onSearch(term);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    handleSearch(product.name);
  };

  const handleRecentSearch = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for products, brands, categories..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Products</h3>
              <div className="space-y-2">
                {suggestions.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && searchTerm.length < 2 && (
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(term)}
                    className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-700"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {searchTerm.length < 2 && (
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(term)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchTerm.length > 1 && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p>No products found for "{searchTerm}"</p>
              <p className="text-sm mt-1">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
