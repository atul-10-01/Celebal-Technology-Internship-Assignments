import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewShipment from './pages/NewShipment'
import TrackShipment from './pages/TrackShipment'

function Navbar() {
  const [navOpen, setNavOpen] = useState(false)
  const { user, logout } = useAuth()
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/register', label: 'Register', hide: user },
    { to: '/login', label: 'Login', hide: user },
    { to: '/dashboard', label: 'Dashboard', hide: !user },
    { to: '/new-shipment', label: 'New Shipment', hide: !user },
    { to: '/track-shipment', label: 'Track Shipment', hide: !user },
  ]
  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between relative">
      <div className="font-bold text-lg">Shipify</div>
      <button className="md:hidden block" onClick={() => setNavOpen(!navOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div className={`md:flex md:space-x-4 absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent z-10 transition-all duration-200 ${navOpen ? 'block' : 'hidden'}`}>
        {navLinks.filter(l => !l.hide).map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-4 py-2 md:inline md:py-0 hover:underline ${isActive ? 'font-bold underline' : ''}`
            }
            onClick={() => setNavOpen(false)}
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
        {user && (
          <button onClick={logout} className="block px-4 py-2 md:inline md:py-0 hover:underline text-red-200">Logout</button>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/new-shipment" element={<PrivateRoute><NewShipment /></PrivateRoute>} />
          <Route path="/track-shipment" element={<PrivateRoute><TrackShipment /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
