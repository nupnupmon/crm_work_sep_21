'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'manager', 'user'], {
    required_error: 'Please select a role',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

const roles = [
  { value: 'admin', label: 'Administrator', description: 'Full system access and control' },
  { value: 'manager', label: 'Manager', description: 'Team and project management' },
  { value: 'user', label: 'User', description: 'Basic access and functionality' },
]

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [submitError, setSubmitError] = useState<string>('')
  const router = useRouter()
  const { register: registerUser } = useAuth()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setSubmitError('')
    
    try {
      console.log('🔐 Attempting registration...')
      console.log('📋 User data:', data)
      
      // Check if role is selected
      if (!data.role) {
        throw new Error('Please select a role')
      }
      
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role
      })
      
      if (result.success) {
        console.log('✅ Registration successful!')
        console.log('🔑 JWT Token generated and stored in cookie')
        console.log('🍪 Cookie expires in 24 hours')
        console.log('👤 User automatically logged in')
        
        // Redirect to dashboard after successful registration
        router.push('/')
      } else {
        console.error('❌ Registration failed:', result.message)
        setSubmitError(result.message)
      }
      
    } catch (error) {
      console.error('❌ Registration error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setValue('role', role as 'admin' | 'manager' | 'user')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            D
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start your journey</p>
        </div>

        {/* Register Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="John"
                  suppressHydrationWarning
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  id="lastName"
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Doe"
                  suppressHydrationWarning
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="john.doe@example.com"
                suppressHydrationWarning
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  id="password"
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  suppressHydrationWarning
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  id="confirmPassword"
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  suppressHydrationWarning
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <div
                    key={role.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedRole === role.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600/30 bg-gray-700/30 hover:border-gray-500/50'
                    }`}
                    onClick={() => handleRoleSelect(role.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{role.label}</h3>
                        <p className="text-gray-400 text-sm">{role.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === role.value
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-500'
                      }`}>
                        {selectedRole === role.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Error Display */}
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 