'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/', active: pathname === '/' },
    { icon: '🏠', label: 'Home', href: '/home', active: pathname === '/home' },
    { icon: '📦', label: 'Products', href: '/products', active: pathname === '/products' },
    { icon: '📄', label: 'Orders', href: '/orders', active: pathname === '/orders' },
    { icon: '💬', label: 'Messages', href: '/messages', active: pathname === '/messages' },
    { icon: '📈', label: 'Analytics', href: '/analytics', active: pathname === '/analytics' },
    { icon: '👥', label: 'Customers', href: '/customers', active: pathname === '/customers' },
    { icon: '⚙️', label: 'Settings', href: '/settings', active: pathname === '/settings' },
    { icon: '👥', label: 'Agents', href: '/agents', active: pathname === '/agents' },
  ]

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-800/80 backdrop-blur-sm border-r border-gray-700/30 transition-all duration-300 z-50 ${
      isCollapsed ? 'w-16' : 'w-20'
    }`}>
      <div className="flex flex-col items-center py-6 space-y-6">
        {/* Logo/Brand */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
          D
        </div>

        {/* Menu Items */}
        <div className="flex flex-col items-center space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`sidebar-icon ${item.active ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
            </Link>
          ))}
        </div>

        {/* Add Button */}
        <div className="mt-auto">
          <button className="sidebar-icon">
            <span className="text-xl">+</span>
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar-icon"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <span className="text-sm">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar 