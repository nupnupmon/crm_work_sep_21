'use client'

interface StatCard {
  title: string
  value: string
  subtext: string
  icon: string
  bgColor: string
  gradient: string
}

const StatCards = () => {
  const stats: StatCard[] = [
    {
      title: 'Weekly Balance',
      value: '$20k',
      subtext: 'View entire list',
      icon: '💰',
      bgColor: 'bg-gradient-to-br from-cyan-400 to-cyan-500',
      gradient: 'from-cyan-400 to-cyan-500'
    },
    {
      title: 'Orders In Line',
      value: '750',
      subtext: 'View entire list',
      icon: '📱',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
      gradient: 'from-yellow-400 to-yellow-500'
    },
    {
      title: 'New Clients',
      value: '150',
      subtext: 'View entire list',
      icon: '👸',
      bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
      gradient: 'from-pink-400 to-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`stat-card ${stat.bgColor} relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-4 bottom-4 text-6xl">
              {stat.icon}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-gray-800 font-medium mb-2 text-sm">
              {stat.title}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {stat.value}
            </h3>
            <button className="text-gray-800 text-sm font-medium hover:underline transition-colors">
              {stat.subtext}
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
        </div>
      ))}
    </div>
  )
}

export default StatCards 