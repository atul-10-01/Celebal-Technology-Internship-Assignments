import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get data from localStorage
    const storedData = localStorage.getItem('userFormData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // If no data found, redirect to form
      navigate('/');
    }
  }, [navigate]);

  const handleGoBack = () => {
    // Clear the stored data and go back to form
    localStorage.removeItem('userFormData');
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Get country name from code
  const getCountryName = (countryCode) => {
    const countries = {
      'IN': 'India',
      'US': 'United States',
      'UK': 'United Kingdom',
      'CA': 'Canada'
    };
    return countries[countryCode] || countryCode;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h1>
          <p className="text-gray-600">Thank you for your registration. Here are your submitted details:</p>
        </div>

        {/* User Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-lg text-gray-900">{userData.firstName} {userData.lastName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Username</label>
                <p className="text-lg text-gray-900">{userData.username}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-lg text-gray-900">{userData.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-lg text-gray-900">{userData.countryCode} {userData.phoneNumber}</p>
              </div>
            </div>

            {/* Location & Documents */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Country</label>
                <p className="text-lg text-gray-900">{getCountryName(userData.country)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">City</label>
                <p className="text-lg text-gray-900">{userData.city}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">PAN Number</label>
                <p className="text-lg text-gray-900 font-mono">{userData.panNo}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Aadhar Number</label>
                <p className="text-lg text-gray-900 font-mono">
                  {userData.aadharNo.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Registration Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Name:</span>
              <br />
              <span className="text-blue-900">{userData.firstName} {userData.lastName}</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Location:</span>
              <br />
              <span className="text-blue-900">{userData.city}, {getCountryName(userData.country)}</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Contact:</span>
              <br />
              <span className="text-blue-900">{userData.countryCode} {userData.phoneNumber}</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Email:</span>
              <br />
              <span className="text-blue-900">{userData.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Print Details
          </button>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Submit Another Form
          </button>
        </div>

        {/* Timestamp */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Form submitted on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
