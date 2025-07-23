import { useState } from 'react'
import { createShipment } from '../api'

export default function NewShipment() {
  const [form, setForm] = useState({ sender: '', receiver: '', size: '', address: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.sender || !form.receiver || !form.size || !form.address) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    const res = await createShipment(form)
    setLoading(false)
    if (res._id) {
      setSuccess('Shipment created successfully!')
      setForm({ sender: '', receiver: '', size: '', address: '' })
    } else {
      setError(res.message || 'Failed to create shipment')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">New Shipment</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Sender</label>
          <input type="text" name="sender" value={form.sender} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Receiver</label>
          <input type="text" name="receiver" value={form.receiver} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Package Size</label>
          <select name="size" value={form.size} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
            <option value="">Select size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Delivery Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Creating...' : 'Create Shipment'}
        </button>
      </form>
    </div>
  )
} 