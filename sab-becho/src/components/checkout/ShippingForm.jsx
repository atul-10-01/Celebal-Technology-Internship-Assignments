import { useCheckout } from '../../context/CheckoutContext';

const ShippingForm = () => {
  const { checkoutData, updateCheckoutData, errors } = useCheckout();
  const shippingAddress = checkoutData.shippingAddress || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCheckoutData({
      shippingAddress: {
        ...shippingAddress,
        [name]: value
      }
    });
  };

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
        <p className="text-gray-600 mb-6">Enter the address where you'd like your order delivered.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingAddress.fullName || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={shippingAddress.email || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingAddress.phone || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"            id="street"
            name="street"
          value={shippingAddress.street || ''}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${              errors.street ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your street address"
        />          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street}</p>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            id="state"
            name="state"
            value={shippingAddress.state || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingAddress.zipCode || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="12345"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
          Country *
        </label>
        <select
          id="country"
          name="country"
          value={shippingAddress.country || 'United States'}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
        </select>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t pt-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-3 text-blue-600 rounded"
            defaultChecked
          />
          <span className="text-sm text-gray-700">
            Keep me updated with news and exclusive offers
          </span>
        </label>
      </div>
    </div>
  );
};

export default ShippingForm;
