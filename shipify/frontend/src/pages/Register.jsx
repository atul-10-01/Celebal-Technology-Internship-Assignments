import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    const res = await register({ name: form.name, email: form.email, password: form.password })
    setLoading(false)
    if (res.token) {
      setToken(res.token)
      setUser(res.user)
      navigate('/dashboard')
    } else {
      setError(res.message || 'Registration failed')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </div>
  )
} 