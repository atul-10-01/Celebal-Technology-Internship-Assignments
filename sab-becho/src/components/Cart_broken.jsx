import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2, Tag, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    cartTotal,
    shippingCost,
    discountAmount,
    finalTotal,
    coupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    availableCoupons
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setCouponMessage(result.message);
    if (result.success) {
      setCouponCode('');
      setShowCoupons(false);
    }
    setTimeout(() => setCouponMessage(''), 3000);
  };

  const handleCouponSelect = (code) => {
    setCouponCode(code);
    setShowCoupons(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50" 
        onClick={onClose} 
      />
      
      {/* Cart Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Cart Sidebar - Mobile: full width, Desktop: centered modal */}
        <div className="w-full max-w-md bg-white shadow-xl transform transition-all duration-300 ease-in-out sm:max-w-lg sm:rounded-lg h-full sm:h-auto sm:max-h-[90vh]">
          <div className="flex flex-col h-full sm:max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart ({itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {/* Cart Items */}
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-gray-900">${item.price}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Promo Code
                    </h3>
                    <button
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Available
                    </button>
                  </div>

                  {/* Available Coupons */}
                  {showCoupons && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Available Coupons:</h4>
                      <div className="space-y-2">
                        {Object.entries(availableCoupons).map(([code, details]) => (
                          <button
                            key={code}
                            onClick={() => handleCouponSelect(code)}
                            className="w-full text-left p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-medium">{code}</span>
                              <Gift className="w-4 h-4 text-blue-600" />
                            </div>
                            <p className="text-xs text-gray-600">{details.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Coupon */}
                  {coupon && (
                    <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm font-medium text-green-800">{coupon.code}</span>
                          <p className="text-xs text-green-600">{coupon.description}</p>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Coupon Input */}
                  {!coupon && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {/* Coupon Message */}
                  {couponMessage && (
                    <p className={`text-sm mt-2 ${couponMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with totals and checkout */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Order Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Free shipping notification */}
              {cartTotal < 50 && shippingCost > 0 && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-gray-600 hover:text-red-600 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
