import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { employees } from "../ts/dummyData";

export default function EmployeeList() {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return employees.filter(emp =>
            emp.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">Employees</h2>
                    <span className="text-sm bg-fuchsia-50 text-fuchsia-700 px-3 py-1 rounded-full font-medium">
                        {filtered.length} shown
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    <Link 
                        to="/employees/new" 
                        className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors text-center font-medium"
                    >
                        Add Employee
                    </Link>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filtered.map(emp => (
                            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-700 font-medium">
                                            {emp.name.charAt(0)}
                                        </span>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-medium">
                                        {emp.department}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    ${emp.salary.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link 
                                        to={`/employees/${emp.id}`} 
                                        className="text-fuchsia-600 hover:text-fuchsia-900 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {filtered.map(emp => (
                    <div key={emp.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-700 font-medium text-lg">
                                    {emp.name.charAt(0)}
                                </span>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{emp.name}</h3>
                                    <p className="text-sm text-gray-600">{emp.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Department</span>
                                <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-medium">
                                    {emp.department}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Salary</span>
                                <span className="text-sm font-medium text-gray-900">${emp.salary.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                            <Link 
                                to={`/employees/${emp.id}`} 
                                className="w-full block text-center px-4 py-2 bg-fuchsia-50 text-fuchsia-700 rounded-lg hover:bg-fuchsia-100 transition-colors font-medium"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {search ? 'Try adjusting your search terms.' : 'Get started by adding a new employee.'}
                    </p>
                </div>
            )}
        </div>
    );
}