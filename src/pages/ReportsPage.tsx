import React from 'react'
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts'
import { hiringTrends, attendanceTrends } from '../ts/dummyData'
import jsPDF from 'jspdf'

const ReportsPage: React.FC = () => {
    const exportPdf = () => {
        const doc = new jsPDF()
        doc.text('Hiring Trends', 10, 10)
        doc.save('reports.pdf')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">Reports & Analytics</h2>
                    <p className="text-sm text-gray-600 mt-1">Visualize HR data and trends</p>
                </div>
                <button 
                    onClick={exportPdf} 
                    className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors font-medium"
                >
                    Export Report PDF
                </button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hiring Trends Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Hiring Trends</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">New Hires</span>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hiringTrends}>
                                <XAxis 
                                    dataKey="month" 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={{ stroke: '#e5e7eb' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={{ stroke: '#e5e7eb' }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: '#f9fafb',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px'
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="hires" 
                                    stroke="#c026d3" 
                                    strokeWidth={3}
                                    dot={{ fill: '#c026d3', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#c026d3', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attendance Pattern Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Attendance Pattern</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Present</span>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceTrends}>
                                <XAxis 
                                    dataKey="date" 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={{ stroke: '#e5e7eb' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={{ stroke: '#e5e7eb' }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: '#f9fafb',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px'
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="present" 
                                    stroke="#f59e0b" 
                                    strokeWidth={3}
                                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Total Employees</div>
                            <div className="text-2xl font-semibold text-gray-900">5</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Departments</div>
                            <div className="text-2xl font-semibold text-gray-900">6</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Avg Attendance</div>
                            <div className="text-2xl font-semibold text-gray-900">21.2</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Avg Salary</div>
                            <div className="text-2xl font-semibold text-gray-900">$67.6k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsPage