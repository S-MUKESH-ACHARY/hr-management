import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { departments,type Department } from '../ts/dummyData'

const schema = yup.object({
  name: yup.string().required('Department name is required'),
  code: yup.string().required('Department code is required').max(10, 'Code must be 10 characters or less'),
  description: yup.string().optional(),
})

type FormData = yup.InferType<typeof schema>

export default function DepartmentPage() {
  const [departmentsList, setDepartmentsList] = useState<Department[]>(departments)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const filteredDepartments = useMemo(() => {
    return departmentsList.filter(dept =>
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.code.toLowerCase().includes(search.toLowerCase())
    )
  }, [departmentsList, search])

  const onSubmit = async (data: FormData) => {
    if (editingId) {
      // Update existing department
      setDepartmentsList(prev => prev.map(dept => 
        dept.id === editingId 
          ? { ...dept, ...data }
          : dept
      ))
    } else {
      // Create new department
      const newDept: Department = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setDepartmentsList(prev => [...prev, newDept])
    }
    
    reset()
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (dept: Department) => {
    setValue('name', dept.name)
    setValue('code', dept.code)
    setValue('description', dept.description || '')
    setEditingId(dept.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartmentsList(prev => prev.filter(dept => dept.id !== id))
    }
  }

  const handleCancel = () => {
    reset()
    setEditingId(null)
    setShowForm(false)
  }

  const getEmployeeCount = (departmentId: string) => {
    // This would normally come from a proper data relationship
    // For now, we'll simulate it
    return Math.floor(Math.random() * 10) + 1
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Departments</h2>
          <p className="text-sm text-gray-600 mt-1">Manage organizational departments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
        >
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          {filteredDepartments.length} department{filteredDepartments.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Department' : 'Add New Department'}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    placeholder="e.g., Human Resources"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Code *
                  </label>
                  <input
                    {...register('code')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    placeholder="e.g., HR"
                  />
                  {errors.code && (
                    <p className="text-sm text-red-600 mt-1">{errors.code.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    placeholder="Brief description of the department..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                <p className="text-sm text-gray-500 font-mono">{dept.code}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit department"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete department"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {dept.description && (
              <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{getEmployeeCount(dept.id)} employees</span>
              <span>Created {new Date(dept.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No departments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try adjusting your search terms.' : 'Get started by creating a new department.'}
          </p>
        </div>
      )}
    </div>
  )
}
