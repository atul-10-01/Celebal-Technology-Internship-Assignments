import { useState } from 'react';
import { Truck, Clock, Zap, CheckCircle } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';

const ShippingOptions = () => {
  const { checkoutData, updateCheckoutData } = useCheckout();
  const [selectedOption, setSelectedOption] = useState(
    checkoutData.shippingOption || 'standard'
  );

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 0,
      duration: '5-7 business days',
      description: 'Free standard shipping on all orders',
      icon: Truck,
      popular: false
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 15,
      duration: '2-3 business days',
      description: 'Faster delivery for urgent orders',
      icon: Clock,
      popular: true
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 30,
      duration: '1 business day',
      description: 'Next business day delivery',
      icon: Zap,
      popular: false
    }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    const option = shippingOptions.find(opt => opt.id === optionId);
    updateCheckoutData({
      shippingOption: optionId,
      shippingCost: option.price
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Choose your delivery option
        </h3>
        <p className="text-gray-600">
          Select a shipping method that works best for you
        </p>
      </div>

      <div className="space-y-4">
        {shippingOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedOption === option.id;

          return (
            <div
              key={option.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.popular && (
                <div className="absolute -top-2 left-4">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        isSelected ? 'text-blue-600' : 'text-gray-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {option.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      {option.price === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        <span className="text-gray-900 font-semibold">
                          ${option.price}
                        </span>
                      )}
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {option.description}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Delivery: {option.duration}
                  </p>
                </div>

                <div className="flex-shrink-0">
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
            </div>
          );
        })}
      </div>

      {/* Delivery Information */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Delivery Information</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• All orders are processed within 1-2 business days</li>
          <li>• You'll receive tracking information once your order ships</li>
          <li>• Signature may be required for delivery</li>
          <li>• Weekend and holiday deliveries are not available</li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingOptions;
