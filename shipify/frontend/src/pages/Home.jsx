import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-br from-blue-100 to-blue-300">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4 drop-shadow-lg">Shipify</h1>
        <p className="text-xl md:text-2xl text-blue-900 mb-8 max-w-2xl mx-auto">
          Effortlessly manage, track, and deliver your shipments with our all-in-one platform. Fast, secure, and user-friendly for individuals and businesses alike.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</Link>
          <Link to="/track-shipment" className="bg-white text-blue-700 border border-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition">Track Shipment</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Why Choose Shipify?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 2h13l1-2h2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
            <h3 className="text-xl font-semibold mb-2">Easy Shipment Management</h3>
            <p className="text-gray-600 text-center">Create, view, and manage all your shipments in one place with a clean, intuitive dashboard.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600 text-center">Track your packages in real time and get instant updates on their delivery status and location.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M12 7a4 4 0 110 8 4 4 0 010-8z" /></svg>
            <h3 className="text-xl font-semibold mb-2">Secure & Personalized</h3>
            <p className="text-gray-600 text-center">Your data is protected and only you can access your shipments. Enjoy a personalized experience with your own dashboard.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to simplify your shipping?</h2>
        <p className="mb-6 text-lg">Sign up now and experience seamless shipment management and tracking.</p>
        <Link to="/register" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition">Create Your Free Account</Link>
      </section>
    </div>
  )
} 