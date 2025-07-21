import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import { ShoppingBag, Tag, Truck, CreditCard, MapPin } from 'lucide-react';

const OrderSummary = () => {
  const { 
    items, 
    cartTotal, 
    discountAmount, 
    coupon, 
    finalTotal,
    itemCount 
  } = useCart();
  
  const { checkoutData } = useCheckout();

  const getShippingCost = () => {
    return checkoutData.shippingCost || 0;
  };

  const getTotalWithShipping = () => {
    return (finalTotal || 0) + getShippingCost();
  };

  const formatAddress = (address) => {
    if (!address || !address.street) return 'Not provided';
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  const getPaymentMethodDisplay = () => {
    const method = checkoutData.paymentMethod;
    switch (method) {
      case 'card':
        return `Card ending in ${(checkoutData.cardNumber || '').slice(-4)}`;
      case 'paypal':
        return 'PayPal';
      case 'upi':
        return 'UPI Payment';
      default:
        return 'Not selected';
    }
  };

  const getShippingOptionDisplay = () => {
    const option = checkoutData.shippingOption;
    switch (option) {
      case 'standard':
        return 'Standard Shipping (5-7 days)';
      case 'express':
        return 'Express Shipping (2-3 days)';
      case 'overnight':
        return 'Overnight Shipping (1 day)';
      default:
        return 'Not selected';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        Order Summary
      </h3>

      {/* Items List */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
        {(items || []).map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
              <img
                src={item.images?.[0] || item.image || '/placeholder-image.jpg'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h4>
              <div className="text-xs text-gray-600 space-y-0.5">
                {item.size && <p>Size: {item.size}</p>}
                {item.color && <p>Color: {item.color}</p>}
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount || 0} items)</span>
          <span className="text-gray-900">${(cartTotal || 0).toFixed(2)}</span>
        </div>

        {(discountAmount || 0) > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Discount {coupon && `(${coupon.code})`}
            </span>
            <span className="text-green-600">-${(discountAmount || 0).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">Calculated at checkout</span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-blue-600">
              ${getTotalWithShipping().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      {checkoutData.shippingAddress && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Shipping Address
          </h4>
          <div className="text-sm text-gray-600">
            <p className="font-medium">{checkoutData.shippingAddress.fullName}</p>
            <p>{formatAddress(checkoutData.shippingAddress)}</p>
            {checkoutData.shippingAddress.phone && (
              <p>{checkoutData.shippingAddress.phone}</p>
            )}
          </div>
        </div>
      )}

      {/* Billing Address */}
      {checkoutData.billingAddress && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Billing Address
          </h4>
          <div className="text-sm text-gray-600">
            {checkoutData.sameAsShipping ? (
              <p className="italic">Same as shipping address</p>
            ) : (
              <>
                <p className="font-medium">{checkoutData.billingAddress.fullName}</p>
                <p>{formatAddress(checkoutData.billingAddress)}</p>
                {checkoutData.billingAddress.phone && (
                  <p>{checkoutData.billingAddress.phone}</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Shipping Method */}
      {checkoutData.shippingOption && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Shipping Method
          </h4>
          <p className="text-sm text-gray-600">
            {getShippingOptionDisplay()}
          </p>
        </div>
      )}

      {/* Payment Method */}
      {checkoutData.paymentMethod && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Method
          </h4>
          <p className="text-sm text-gray-600">
            {getPaymentMethodDisplay()}
          </p>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Secure 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
