'use client'

import { useState } from 'react'
import { User } from '../lib/auth'

interface HeaderProps {
  user: User | null
  onLogout: () => void
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const getUserInitials = (user: User | null) => {
    if (!user) return 'U'
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="flex justify-between items-center p-6 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/30">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Dashboard Title */}
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-script text-white">Dashboard</h1>
      </div>

      {/* User Profile */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </p>
            <p className="text-xs text-gray-400">{user?.email || 'No email'}</p>
            <p className="text-xs text-purple-400 capitalize">{user?.role || 'No role'}</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              {getUserInitials(user)}
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700/30 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700/30">
                    Signed in as <span className="text-white">{user?.email}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}

export default Header 