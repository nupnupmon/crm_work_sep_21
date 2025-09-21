'use client'

const SalesChart = () => {
  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Sales</h3>
        <div className="flex gap-4">
          <select className="bg-gray-700/50 rounded px-3 py-1.5 text-sm text-white border border-gray-600/30 focus:border-purple-500 focus:outline-none">
            <option>2022</option>
            <option>2023</option>
          </select>
          <button className="btn-primary flex items-center gap-2">
            <span>Download</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
          <span>$50k</span>
          <span>$40k</span>
          <span>$30k</span>
          <span>$20k</span>
          <span>$10k</span>
        </div>

        {/* Chart Area */}
        <div className="ml-12 h-48 bg-gray-700/30 rounded-lg p-4">
          <div className="h-full flex items-end justify-between gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-sm mb-2"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                ></div>
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-sm opacity-60"
                  style={{ height: `${Math.random() * 40 + 10}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="ml-12 mt-2 flex justify-between text-xs text-gray-400">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-gray-300">Toys</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-300">Animal Care Products</span>
          </div>
        </div>
      </div>

      {/* Character Illustration Placeholder */}
      <div className="absolute right-4 bottom-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl">
        👩‍💼
      </div>
    </div>
  )
}

export default SalesChart 