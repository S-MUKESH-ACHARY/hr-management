import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
})


type Form = { email: string; password: string; confirmPassword: string }


export default function RegisterPage() {
  const { register: registerUser } = useAuth() as any
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: yupResolver(schema) })


  const onSubmit = async (vals: Form) => {
    const ok = await registerUser(vals.email, vals.password)
    if (ok) navigate('/login')
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-amber-100 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-600 mt-2">Join our HR management system</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                {...register('email')} 
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent" 
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                {...register('password')} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent" 
                placeholder="Create a password"
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input 
                type="password" 
                {...register('confirmPassword')} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent" 
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full px-4 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors font-medium"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-fuchsia-600 hover:text-fuchsia-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


