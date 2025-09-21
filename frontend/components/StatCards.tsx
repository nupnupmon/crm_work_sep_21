// src/components/StatCard.tsx
'use client'

interface StatCardProps {
  title?: string
  value?: string
  subtext?: string
  icon?: string
  bgColor?: string
}

const StatCard = ({ title, value, subtext, icon, bgColor }: StatCardProps) => {
  return (
    <div className={`stat-card ${bgColor} relative overflow-hidden group hover:scale-105 transition-transform duration-300`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-4 bottom-4 text-6xl">{icon}</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-gray-800 font-medium mb-2 text-sm">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{value}</h3>
        <button className="text-gray-800 text-sm font-medium hover:underline transition-colors">{subtext}</button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
    </div>
  )
}

export default StatCard