import { useState } from 'react';
import { Star, ChevronDown, ChevronUp, X } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, brands, categories, isVisible, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
    features: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    onFilterChange('brand', newBrands);
  };

  const clearAllFilters = () => {
    onFilterChange('category', 'all');
    onFilterChange('priceRange', [0, 2000]);
    onFilterChange('brand', []);
    onFilterChange('rating', 0);
    onFilterChange('inStock', false);
  };

  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: 2000 }
  ];

  const ratingOptions = [
    { value: 4.5, label: '4.5 & Up' },
    { value: 4, label: '4.0 & Up' },
    { value: 3.5, label: '3.5 & Up' },
    { value: 3, label: '3.0 & Up' }
  ];

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-3 font-medium text-gray-900"
      >
        {title}
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isExpanded && children}
    </div>
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      
      {/* Filter Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto h-full lg:h-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <FilterSection
            title="Category"
            isExpanded={expandedSections.category}
            onToggle={() => toggleSection('category')}
          >
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === 'all'}
                  onChange={() => onFilterChange('category', 'all')}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700">All Categories</span>
              </label>
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.slug}
                    onChange={() => onFilterChange('category', category.slug)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection
            title="Price Range"
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection('price')}
          >
            <div className="space-y-3">
              {/* Custom Range Slider */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="25"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Preset Price Ranges */}
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => onFilterChange('priceRange', [range.min, range.max])}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection
            title="Brand"
            isExpanded={expandedSections.brand}
            onToggle={() => toggleSection('brand')}
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="mr-3 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">{brand}</span>
                  <span className="ml-auto text-sm text-gray-400">
                    {/* You could add product count per brand here */}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection
            title="Customer Rating"
            isExpanded={expandedSections.rating}
            onToggle={() => toggleSection('rating')}
          >
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === 0}
                  onChange={() => onFilterChange('rating', 0)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700">All Ratings</span>
              </label>
              {ratingOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === option.value}
                    onChange={() => onFilterChange('rating', option.value)}
                    className="mr-3 text-blue-600"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(option.value)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 text-sm">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Availability Filter */}
          <FilterSection
            title="Availability"
            isExpanded={expandedSections.features}
            onToggle={() => toggleSection('features')}
          >
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => onFilterChange('inStock', e.target.checked)}
                  className="mr-3 text-blue-600 rounded"
                />
                <span className="text-gray-700">In Stock Only</span>
              </label>
              
              {/* Additional filters can be added here */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.onSale || false}
                  onChange={(e) => onFilterChange('onSale', e.target.checked)}
                  className="mr-3 text-blue-600 rounded"
                />
                <span className="text-gray-700">On Sale</span>
              </label>
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
