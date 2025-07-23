export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipment Summary</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-blue-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">2</div>
            <div className="text-gray-700">Active Shipments</div>
          </div>
          <div className="flex-1 bg-green-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-gray-700">Delivered</div>
          </div>
          <div className="flex-1 bg-yellow-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">1</div>
            <div className="text-gray-700">Pending</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Recent Shipments</h2>
        <ul className="divide-y">
          <li className="py-2 flex justify-between"><span>Shipment #12345</span><span className="text-blue-600">In Transit</span></li>
          <li className="py-2 flex justify-between"><span>Shipment #12344</span><span className="text-green-600">Delivered</span></li>
          <li className="py-2 flex justify-between"><span>Shipment #12343</span><span className="text-yellow-600">Pending</span></li>
        </ul>
      </div>
    </div>
  )
} 