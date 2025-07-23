import { useEffect, useState } from 'react'
import { getShipments } from '../api'

export default function Dashboard() {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getShipments().then(data => {
      setShipments(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Shipments</h2>
        {loading ? (
          <div>Loading...</div>
        ) : shipments.length === 0 ? (
          <div>No shipments found.</div>
        ) : (
          <ul className="divide-y">
            {shipments.map(s => (
              <li key={s._id} className="py-2 flex justify-between">
                <span>Shipment #{s._id.slice(-6).toUpperCase()}</span>
                <span className={
                  s.status === 'Delivered' ? 'text-green-600' :
                  s.status === 'In Transit' ? 'text-blue-600' :
                  'text-yellow-600'
                }>{s.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 