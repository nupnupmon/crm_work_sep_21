'use client'

import { useState } from 'react'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [currentMonth] = useState('Feb 2023')

  // Generate calendar days for February 2023
  const daysInMonth = 28 // February 2023 has 28 days
  const firstDayOfWeek = 2 // Wednesday (0 = Sunday, 1 = Monday, etc.)
  
  const days = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Calendar</h3>
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            {currentMonth}
          </button>
        </div>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          View
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday headers */}
        {weekdays.map((day, index) => (
          <div key={index} className="text-center text-sm text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              text-center text-sm py-2 rounded-lg cursor-pointer transition-all duration-200
              ${day === null 
                ? 'text-transparent' 
                : day === selectedDate
                ? 'bg-yellow-400 text-gray-900 font-medium'
                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }
            `}
            onClick={() => day && setSelectedDate(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-700/30">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Today: 13th</span>
          <span>Events: 3</span>
        </div>
      </div>
    </div>
  )
}

export default Calendar 