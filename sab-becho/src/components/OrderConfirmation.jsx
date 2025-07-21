import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Calendar, CreditCard, MapPin, ArrowRight, Download, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Get order from localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('user-orders') || '[]');
      const order = orders.find(o => o.orderId === orderId);
      
      if (order) {
        setOrderData(order);
        clearCart(); // Clear the cart after successful order
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading order:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [orderId, navigate, clearCart]);

  const getEstimatedDelivery = () => {
    const orderDate = new Date(orderData.orderDate);
    const estimatedDays = orderData.shippingOption === 'overnight' ? 1 : 
                         orderData.shippingOption === 'express' ? 3 : 7;
    
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + estimatedDays);
    
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getShippingMethodName = () => {
    switch (orderData.shippingOption) {
      case 'standard': return 'Standard Shipping';
      case 'express': return 'Express Shipping';
      case 'overnight': return 'Overnight Shipping';
      default: return 'Standard Shipping';
    }
  };

  const calculateTotal = () => {
    const itemsTotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return itemsTotal + (orderData.shippingCost || 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Order not found.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-blue-800">
              Order ID: <span className="font-mono font-semibold">{orderData.orderId}</span>
            </p>
          </div>
        </div>

        {/* Order Details Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Delivery Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-gray-600">{getEstimatedDelivery()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Shipping Method</p>
                  <p className="text-gray-600">{getShippingMethodName()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <div className="text-gray-600">
                    <p>{orderData.shippingAddress.fullName}</p>
                    <p>{orderData.shippingAddress.street}</p>
                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900">Payment Method</p>
                <p className="text-gray-600">
                  {orderData.paymentMethod === 'card' 
                    ? `Card ending in ${orderData.cardNumber?.slice(-4) || '****'}`
                    : orderData.paymentMethod === 'paypal' 
                    ? 'PayPal'
                    : 'UPI Payment'
                  }
                </p>
              </div>
              
              <div>
                <p className="font-medium text-gray-900">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">${calculateTotal().toFixed(2)}</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-900">Order Date</p>
                <p className="text-gray-600">
                  {new Date(orderData.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.images?.[0] || '/placeholder-image.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {item.size && <p>Size: {item.size}</p>}
                    {item.color && <p>Color: {item.color}</p>}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t mt-6 pt-6">
            <div className="space-y-2 max-w-sm ml-auto">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">
                  ${orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-900">
                  {orderData.shippingCost === 0 ? 'Free' : `$${orderData.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          
          <button
            onClick={() => {
              const subject = encodeURIComponent(`Order Confirmation - ${orderData.orderId}`);
              const body = encodeURIComponent(`Hi,\n\nI have a question about my order ${orderData.orderId}.\n\nThanks!`);
              window.location.href = `mailto:support@sabbecho.com?subject=${subject}&body=${body}`;
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Email Confirmation Notice */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-800">
            📧 A confirmation email has been sent to <strong>{orderData.shippingAddress.email}</strong>
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Please check your inbox (and spam folder) for order details and tracking information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
