import { useState } from 'react';
import { CreditCard, Building2, Smartphone, Shield, Eye, EyeOff } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';

const PaymentForm = () => {
  const { checkoutData, updateCheckoutData, validatePayment } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState(
    checkoutData.paymentMethod || 'card'
  );
  const [showCVV, setShowCVV] = useState(false);
  const [errors, setErrors] = useState({});

  const [cardData, setCardData] = useState({
    cardNumber: checkoutData.cardNumber || '',
    expiryDate: checkoutData.expiryDate || '',
    cvv: checkoutData.cvv || '',
    cardholderName: checkoutData.cardholderName || '',
    saveCard: checkoutData.saveCard || false
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, MasterCard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Building2,
      description: 'Pay with your PayPal account'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm'
    }
  ];

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    updateCheckoutData({ paymentMethod: method });
    setErrors({});
  };

  const handleCardDataChange = (field, value) => {
    let formattedValue = value;

    // Format card number
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      if (formattedValue.length > 19) return;
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    const newCardData = { ...cardData, [field]: formattedValue };
    setCardData(newCardData);
    updateCheckoutData(newCardData);

    // Clear specific field error
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'generic';
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!cardData.cardholderName.trim()) {
        newErrors.cardholderName = 'Please enter the cardholder name';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Payment Information
        </h3>
        <p className="text-gray-600">
          Choose your preferred payment method and enter your details
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Payment Method</h4>
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isSelected = paymentMethod === method.id;

          return (
            <div
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handlePaymentMethodChange(method.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                </div>
                <div className="flex-grow">
                  <h5 className="font-medium text-gray-900">{method.name}</h5>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">
              Your payment information is secure and encrypted
            </span>
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardData.cardNumber}
                onChange={(e) => handleCardDataChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {cardData.cardNumber && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className={`w-8 h-5 rounded text-xs flex items-center justify-center text-white font-bold ${
                    getCardType(cardData.cardNumber) === 'visa' ? 'bg-blue-600' :
                    getCardType(cardData.cardNumber) === 'mastercard' ? 'bg-red-600' :
                    getCardType(cardData.cardNumber) === 'amex' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {getCardType(cardData.cardNumber).toUpperCase().slice(0, 2)}
                  </div>
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardData.expiryDate}
                onChange={(e) => handleCardDataChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>

            {/* CVV */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type={showCVV ? 'text' : 'password'}
                  value={cardData.cvv}
                  onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                  placeholder="123"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCVV(!showCVV)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardData.cardholderName}
              onChange={(e) => handleCardDataChange('cardholderName', e.target.value)}
              placeholder="John Doe"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
            )}
          </div>

          {/* Save Card Option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={cardData.saveCard}
              onChange={(e) => handleCardDataChange('saveCard', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-700">
              Save this card for future purchases
            </label>
          </div>
        </div>
      )}

      {/* Alternative Payment Methods */}
      {paymentMethod === 'paypal' && (
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <div className="mb-4">
            <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">PayPal Payment</h4>
            <p className="text-sm text-gray-600">
              You'll be redirected to PayPal to complete your payment
            </p>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Continue with PayPal
          </button>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="mb-4 text-center">
            <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">UPI Payment</h4>
            <p className="text-sm text-gray-600">
              Scan QR code or enter UPI ID
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@upi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Or scan QR code</p>
              <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-gray-500 text-xs">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
        <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Secure Payment</p>
          <p>
            Your payment information is encrypted and secure. We never store your 
            complete payment details on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
