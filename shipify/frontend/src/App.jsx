import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewShipment from './pages/NewShipment'
import TrackShipment from './pages/TrackShipment'
import Home from './pages/Home'
function App() {
  const [navOpen, setNavOpen] = useState(false)
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/register', label: 'Register' },
    { to: '/login', label: 'Login' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/new-shipment', label: 'New Shipment' },
    { to: '/track-shipment', label: 'Track Shipment' },
  ]
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex items-center justify-between relative">
        <div className="font-bold text-lg">Shipify</div>
        <button className="md:hidden block" onClick={() => setNavOpen(!navOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className={`md:flex md:space-x-4 absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent z-10 transition-all duration-200 ${navOpen ? 'block' : 'hidden'}`}>
          {navLinks.map(link => (
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
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-shipment" element={<NewShipment />} />
        <Route path="/track-shipment" element={<TrackShipment />} />
      </Routes>
    </Router>
  )
}

export default App
