'use client'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatCard from '../components/StatCards'
import SalesChart from '../components/SalesChart'
import Calendar from '../components/Calendar'
import CustomerTable from '../components/CustomerTable'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('🚫 User not authenticated, redirecting to login')
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  const handleLogout = () => {
    console.log('🚪 Logging out user:', user?.email)
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="ml-20">
        <Header user={user} onLogout={handleLogout} title={'Dashboard'} />
        
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Hello, {user?.firstName || 'User'}</h2>
            <p className="text-gray-400">Welcome back to your dashboard</p>
            <p className="text-sm text-gray-500">Role: {user?.role} | Email: {user?.email}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                title="Weekly Balance" 
                value="$20k" 
                subtext="View entire list" 
                icon="💰" 
                bgColor="bg-gradient-to-br from-cyan-400 to-cyan-500" 
              />
              <StatCard 
                title="Orders In Line" 
                value="750" 
                subtext="View entire list" 
                icon="📱" 
                bgColor="bg-gradient-to-br from-yellow-400 to-yellow-500" 
              />
              <StatCard 
                title="New Clients" 
                value="150" 
                subtext="View entire list" 
                icon="👸" 
                bgColor="bg-gradient-to-br from-pink-400 to-purple-500" 
              />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Sales Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <SalesChart />
            </div>

            {/* Calendar - Takes 1 column */}
            <div>
              <Calendar />
            </div>
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Sales Distribution */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">petshop.com (Oreo)</h3>
                  <p className="text-sm text-gray-400">Distributions of sales across platform</p>
                </div>
                <select className="bg-gray-700/50 rounded px-2 py-1 text-xs text-white border border-gray-600/30">
                  <option>05th - 12th Jan</option>
                </select>
              </div>
              
              {/* Pie Chart Placeholder */}
              <div className="flex justify-center items-center h-32">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-400 via-orange-400 to-green-400 relative">
                  <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs text-white font-medium">
                    $10k
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span className="text-gray-300">Facebook</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded"></div>
                  <span className="text-gray-300">Youtube</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-gray-300">Instagram</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                  <span className="text-gray-300">Website</span>
                </div>
              </div>
            </div>

            {/* Sales Metrics */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sales Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Intake</span>
                  <span className="text-white font-medium">1500k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">New Customers</span>
                  <span className="text-white font-medium">7k <span className="text-green-400">+1k</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Repeat Customers</span>
                  <span className="text-white font-medium">1.5k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Revenue</span>
                  <span className="text-white font-medium">130k</span>
                </div>
              </div>
            </div>

            {/* Weekly Sales */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Sales</h3>
              <div className="flex items-end justify-between h-24 gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={day} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-sm mb-2 relative"
                      style={{ height: `${Math.random() * 60 + 20}%` }}
                    >
                      {index === 3 && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                          $10k
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visitors */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Visitors</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Online</span>
                    <span className="text-white font-medium">20k</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Offline</span>
                    <span className="text-white font-medium">7k</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <CustomerTable />
        </main>
      </div>
    </div>
  )
} 