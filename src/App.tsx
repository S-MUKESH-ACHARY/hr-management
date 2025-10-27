import { Suspense, type JSX } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './layout/Layout'
import LoginPage from './pages/LoginPage'
import EmployeeList from './pages/EmployeeList'
import EmployeeDetails from './pages/EmployeeDetails'
import EmployeeForm from './pages/EmployeeForm'
import AttendancePage from './pages/AttendancePage'
import ReportsPage from './pages/ReportsPage'
import RegisterPage from './pages/RegisterPage'
import DepartmentPage from './pages/DepartmentPage'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <EmployeeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <EmployeeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/:id"
                element={
                  <ProtectedRoute>
                    <EmployeeDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/new"
                element={
                  <ProtectedRoute>
                    <EmployeeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <AttendancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <ProtectedRoute>
                    <DepartmentPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  )
}