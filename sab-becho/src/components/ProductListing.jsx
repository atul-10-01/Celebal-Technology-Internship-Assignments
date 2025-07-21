import { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import { products, categories, filterProducts, sortProducts } from '../data/products';

const ProductListing = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 2000],
    brand: [],
    rating: 0,
    inStock: false,
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique brands
  const brands = [...new Set(products.map(product => product.brand))];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        product.brand.toLowerCase().includes(searchTerm)
      );
    }

    // Apply other filters
    filtered = filterProducts(filtered, filters);

    // Apply sorting
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter(b => b !== brand)
        : [...prev.brand, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 2000],
      brand: [],
      rating: 0,
      inStock: false,
      search: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Discover our amazing collection of products</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar 
          onSearch={(term) => handleFilterChange('search', term)}
          initialValue={filters.search}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <span className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} products found
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="name">Name A-Z</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } transition-colors`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } transition-colors`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          brands={brands}
          categories={categories}
          isVisible={showFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Products Grid/List */}
        <div className="flex-1">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
