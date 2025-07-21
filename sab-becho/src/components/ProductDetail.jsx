import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    // Navigate to checkout
    console.log(`Buy now: ${quantity} of ${product.name}`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Mock multiple images for demonstration
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
        <span>/</span>
        <span className="capitalize">{product.category.replace('-', ' ')}</span>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleWishlist}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Share2 className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="text-lg text-gray-600">{product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{product.rating}</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                  Save {discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Key Features</h3>
            <div className="grid grid-cols-1 gap-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 ${
                    isInCart(product.id) 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInCart(product.id) ? `Added (${getItemQuantity(product.id)})` : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}

          {/* Delivery Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-sm text-gray-600">Full manufacturer warranty</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">30 Day Returns</p>
                <p className="text-sm text-gray-600">Easy returns and exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
