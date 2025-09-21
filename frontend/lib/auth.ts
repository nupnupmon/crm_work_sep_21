import Cookies from 'js-cookie'

// For demo purposes, we'll use a simple token approach
// In production, you'd use proper JWT with a backend
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'manager' | 'user'
}

export interface TokenPayload {
  userId: string
  email: string
  role: string
  exp: number
}

// Generate simple token (in production, use proper JWT)
export const generateToken = (user: User): string => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + TOKEN_EXPIRY
  }
  
  return btoa(JSON.stringify(payload)) // Base64 encode
}

// Verify token
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const payload = JSON.parse(atob(token)) as TokenPayload
    if (payload.exp < Date.now()) {
      console.error('Token expired')
      return null
    }
    return payload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Set authentication cookie
export const setAuthCookie = (token: string): void => {
  Cookies.set('auth-token', token, {
    expires: 1, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  })
}

// Get authentication cookie
export const getAuthCookie = (): string | undefined => {
  return Cookies.get('auth-token')
}

// Remove authentication cookie
export const removeAuthCookie = (): void => {
  Cookies.remove('auth-token', { path: '/' })
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthCookie()
  if (!token) return false
  
  const payload = verifyToken(token)
  return payload !== null
}

// Get current user from token
export const getCurrentUser = (): User | null => {
  const token = getAuthCookie()
  if (!token) return null
  
  const payload = verifyToken(token)
  if (!payload) return null
  
  // Find user in mock database
  const user = mockUsers.find(u => u.id === payload.userId)
  if (!user) return null
  
  return user
}

// Login user
export const loginUser = (user: User): void => {
  const token = generateToken(user)
  setAuthCookie(token)
}

// Logout user
export const logoutUser = (): void => {
  removeAuthCookie()
}

// Mock user database (in real app, this would be a database)
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'admin'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'manager'
  }
]

// Mock authentication function
export const authenticateUser = (email: string, password: string): User | null => {
  // In real app, you would hash the password and check against database
  const user = mockUsers.find(u => u.email === email)
  
  // For demo purposes, accept any password for existing users
  if (user && password.length >= 6) {
    return user
  }
  
  return null
}

// Mock registration function
export const registerUser = (userData: Omit<User, 'id'>): User => {
  const newUser: User = {
    id: Date.now().toString(), // Simple ID generation
    ...userData
  }
  
  // In real app, you would save to database
  mockUsers.push(newUser)
  
  return newUser
} 