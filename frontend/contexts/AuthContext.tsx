'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, isAuthenticated, getCurrentUser, loginUser, logoutUser, authenticateUser, registerUser } from '../lib/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: Omit<User, 'id'>) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (isAuthenticated()) {
          const currentUser = getCurrentUser()
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const authenticatedUser = authenticateUser(email, password)
      
      if (authenticatedUser) {
        loginUser(authenticatedUser)
        setUser(authenticatedUser)
        return { success: true, message: 'Login successful!' }
      } else {
        return { success: false, message: 'Invalid email or password' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const register = async (userData: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> => {
    try {
      const newUser = registerUser(userData)
      loginUser(newUser)
      setUser(newUser)
      return { success: true, message: 'Registration successful!' }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Registration failed. Please try again.' }
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 