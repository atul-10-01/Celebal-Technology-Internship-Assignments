import { useState } from 'react'

export default function TrackShipment() {
  const [tracking, setTracking] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!tracking) {
      setError('Tracking number is required')
      setStatus(null)
      return
    }
    setError('')
    // TODO: Integrate with backend
    setStatus({
      number: tracking,
      state: 'In Transit',
      lastUpdate: '2024-06-01 14:30',
      location: 'Distribution Center, City'
    })
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Track Shipment</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Tracking Number</label>
          <input type="text" value={tracking} onChange={e => setTracking(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4">Track</button>
        {status && (
          <div className="bg-blue-50 rounded p-4 mt-4">
            <div className="font-semibold mb-2">Shipment #{status.number}</div>
            <div>Status: <span className="font-bold">{status.state}</span></div>
            <div>Last Update: {status.lastUpdate}</div>
            <div>Location: {status.location}</div>
          </div>
        )}
      </form>
    </div>
  )
} 