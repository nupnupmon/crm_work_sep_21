'use client'

interface CustomerData {
  id: string
  customer: string
  date: string
  amount: string
  status: 'shipped' | 'delivered' | 'hold'
}

const CustomerTable = () => {
  const customers: CustomerData[] = [
    { id: 'R217308', customer: 'Pranjalpets', date: '13/01/2022', amount: '$ 54,000', status: 'shipped' },
    { id: 'R28308', customer: 'Adom.com', date: '13/01/2022', amount: '$ 86,050', status: 'delivered' },
    { id: 'R28765', customer: 'Charles Tea', date: '13/01/2022', amount: '$ 4,000', status: 'hold' },
    { id: 'R27120B', customer: 'Princeparts', date: '12/01/2022', amount: '$ 54,000', status: 'shipped' },
    { id: 'R27308', customer: 'Apexo.com', date: '12/01/2022', amount: '$ 68,050', status: 'delivered' },
    { id: 'R29765', customer: 'Charles Teo', date: '12/01/2022', amount: '$ 4,000', status: 'hold' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped':
        return 'text-yellow-400'
      case 'delivered':
        return 'text-green-400'
      case 'hold':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shipped':
        return '🚚'
      case 'delivered':
        return '✅'
      case 'hold':
        return '⏸️'
      default:
        return '❓'
    }
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Customer Details</h3>
        <div className="flex gap-4">
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span>Filter</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <span>Download</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700/30">
              <th className="text-left py-3 font-medium">Id</th>
              <th className="text-left py-3 font-medium">Customer</th>
              <th className="text-left py-3 font-medium">Date</th>
              <th className="text-left py-3 font-medium">Invoiced Amount</th>
              <th className="text-left py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {customers.map((customer, index) => (
              <tr 
                key={customer.id} 
                className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
              >
                <td className="py-4 text-gray-300 font-mono">{customer.id}</td>
                <td className="py-4 text-gray-300">{customer.customer}</td>
                <td className="py-4 text-gray-300">{customer.date}</td>
                <td className="py-4 text-gray-300 font-medium">{customer.amount}</td>
                <td className="py-4">
                  <span className={`flex items-center gap-2 ${getStatusColor(customer.status)}`}>
                    <span>{getStatusIcon(customer.status)}</span>
                    <span className="capitalize">{customer.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <span>Showing 1-6 of 6 results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-purple-500 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerTable 