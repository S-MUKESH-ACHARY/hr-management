import React, { useCallback } from 'react'
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Layout() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = useCallback(() => {
        logout()
        navigate('/login')
    }, [logout, navigate])


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-fuchsia-100">
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
                        <Link to="/" className="font-bold text-xl text-fuchsia-600">EMS</Link>
                        <nav className="flex flex-wrap items-center gap-1 text-gray-700">
                            <NavLink
                                to="/employees"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Employees</NavLink>
                            <NavLink
                                to="/attendance"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Attendance</NavLink>
                            <NavLink
                                to="/reports"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Reports</NavLink>
                            <NavLink
                                to="/departments"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Departments</NavLink>
                            <button onClick={handleLogout} className="ml-2 sm:ml-3 px-2 sm:px-3 py-2 rounded-md border border-amber-300 text-amber-700 hover:bg-amber-50 text-sm">Logout</button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
        </div>
    )
}