import { useCheckout } from '../../context/CheckoutContext';

const BillingForm = () => {
  const { shippingInfo, billingInfo, setBillingInfo, errors } = useCheckout();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ [name]: value });
  };

  const handleSameAsShippingChange = (e) => {
    const sameAsShipping = e.target.checked;
    if (sameAsShipping) {
      setBillingInfo({
        sameAsShipping: true,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country
      });
    } else {
      setBillingInfo({
        sameAsShipping: false,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
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
            checked={billingInfo.sameAsShipping}
            onChange={handleSameAsShippingChange}
            className="mr-3 text-blue-600 rounded"
          />
          <span className="text-sm font-medium text-gray-900">
            Billing address is the same as shipping address
          </span>
        </label>
      </div>

      {/* Billing Form - Only show if different from shipping */}
      {!billingInfo.sameAsShipping && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="billingFirstName"
                name="firstName"
                value={billingInfo.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="billingLastName"
                name="lastName"
                value={billingInfo.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              id="billingAddress"
              name="address"
              value={billingInfo.address}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your street address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
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
                value={billingInfo.city}
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
                value={billingInfo.state}
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
                value={billingInfo.zipCode}
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
              value={billingInfo.country}
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
      {billingInfo.sameAsShipping && (
        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-medium text-gray-900 mb-2">Billing Address</h4>
          <div className="text-sm text-gray-700">
            <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p>{shippingInfo.country}</p>
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
