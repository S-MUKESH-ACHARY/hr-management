import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { departments } from '../ts/dummyData'

type Form = { name: string; email: string; departmentId: string; salary: number }

export default function EmployeeForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>()
    const navigate = useNavigate()

    const onSubmit = useCallback(async (vals: Form) => {
        // Simulate API call
        console.log('Employee data submitted:', vals)
        reset()
        navigate('/employees')
    }, [navigate, reset])

    const onBulk = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        // Simulate bulk upload
        console.log('Bulk employee file uploaded:', file)
        navigate('/employees')
    }, [navigate])

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Add Employee</h3>
                    <p className="text-sm text-gray-600 mt-1">Fill in the employee details below</p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input 
                                {...register('name', { required: 'Name is required' })} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent" 
                                placeholder="Enter full name"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input 
                                type="email"
                                {...register('email', { required: 'Email is required' })} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent" 
                                placeholder="Enter email address"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department *
                            </label>
                            <select 
                                {...register('departmentId', { required: 'Department is required' })} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                            >
                                <option value="">Select a department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name} ({dept.code})
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && (
                                <p className="text-sm text-red-600 mt-1">{errors.departmentId.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Annual Salary *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input 
                                    type="number" 
                                    {...register('salary', { required: 'Salary is required', min: 0 })} 
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent" 
                                    placeholder="Enter annual salary"
                                />
                            </div>
                            {errors.salary && (
                                <p className="text-sm text-red-600 mt-1">{errors.salary.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors font-medium"
                            >
                                {isSubmitting ? 'Creating Employee...' : 'Create Employee'}
                            </button>
                            
                            <label className="flex-1 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-fuchsia-400 hover:bg-fuchsia-50 transition-colors text-center">
                                <span className="text-gray-600 font-medium">Upload CSV File</span>
                                <input 
                                    type="file" 
                                    accept=".csv" 
                                    onChange={onBulk} 
                                    className="hidden" 
                                />
                            </label>
                            
                            <button 
                                type="button"
                                onClick={() => navigate('/employees')}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-3 text-center">
                            CSV should contain columns: name, email, department, salary
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}