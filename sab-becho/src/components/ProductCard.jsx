import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
        <div className="flex gap-4">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleWishlist}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {product.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleQuickView}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Quick View
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`px-4 py-2 ${
                    isInCart(product.id) 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
              }`}
            />
          </button>
          <button
            onClick={handleQuickView}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 ${
              isInCart(product.id) 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-white hover:bg-gray-100'
            } ${
              isInCart(product.id) ? 'text-white' : 'text-gray-900'
            } rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isInCart(product.id) ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{product.brand}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
