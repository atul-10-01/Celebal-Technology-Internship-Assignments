import { useCheckout } from '../../context/CheckoutContext';

const BillingForm = () => {
  const { checkoutData, updateCheckoutData, errors } = useCheckout();
  const billingAddress = checkoutData.billingAddress || {};
  const shippingAddress = checkoutData.shippingAddress || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCheckoutData({
      billingAddress: {
        ...billingAddress,
        [name]: value
      }
    });
  };

  const handleSameAsShippingChange = (e) => {
    const sameAsShipping = e.target.checked;
    if (sameAsShipping) {
      updateCheckoutData({
        sameAsShipping: true,
        billingAddress: { ...shippingAddress }
      });
    } else {
      updateCheckoutData({
        sameAsShipping: false,
        billingAddress: {
          fullName: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'United States'
        }
      });
    }
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h3>
        <p className="text-gray-600 mb-6">Enter your billing address for payment processing.</p>
      </div>

      {/* Same as Shipping Checkbox */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={checkoutData.sameAsShipping}
            onChange={handleSameAsShippingChange}
            className="mr-3 text-blue-600 rounded"
          />
          <span className="text-sm font-medium text-gray-900">
            Billing address is the same as shipping address
          </span>
        </label>
      </div>

      {/* Billing Form - Only show if different from shipping */}
      {!checkoutData.sameAsShipping && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="billingFullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="billingFullName"
                name="fullName"
                value={billingAddress.fullName || ''}
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

            {/* Street Address */}
            <div>
              <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="billingAddress"
                name="street"
                value={billingAddress.street || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your street address"
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* City */}
            <div>
              <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="billingCity"
                name="city"
                value={billingAddress.city || ''}
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
              <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                id="billingState"
                name="state"
                value={billingAddress.state || ''}
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
              <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                id="billingZipCode"
                name="zipCode"
                value={billingAddress.zipCode || ''}
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
            <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              id="billingCountry"
              name="country"
              value={billingAddress.country || 'United States'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
        </div>
      )}

      {/* Summary when same as shipping */}
      {checkoutData.sameAsShipping && shippingAddress && (
        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-medium text-gray-900 mb-2">Billing Address</h4>
          <div className="text-sm text-gray-700">
            <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p>{shippingAddress.country}</p>
          </div>
        </div>
      )}

      {/* Tax Information */}
      <div className="border-t pt-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Tax Information</h4>
          <p className="text-sm text-yellow-700">
            Sales tax will be calculated based on your billing address and local tax rates.
            The final tax amount will be displayed in your order summary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
