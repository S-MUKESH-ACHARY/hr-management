export const hiringTrends = [
    { month: 'Jan', hires: 5 },
    { month: 'Feb', hires: 8 },
    { month: 'Mar', hires: 6 },
    { month: 'Apr', hires: 10 },
    { month: 'May', hires: 7 },
];

export const attendanceTrends = [
    { date: '2025-09-01', present: 20 },
    { date: '2025-09-02', present: 22 },
    { date: '2025-09-03', present: 18 },
    { date: '2025-09-04', present: 25 },
    { date: '2025-09-05', present: 21 },
];

export const dummyAttendance = [
    { date: "2025-09-01", present: 20 },
    { date: "2025-09-02", present: 22 },
    { date: "2025-09-03", present: 18 },
    { date: "2025-09-04", present: 25 },
    { date: "2025-09-05", present: 21 },
];

export type Department = {
    id: string
    name: string
    code: string
    description?: string
    createdAt: string
}

export type Employee = {
    id: string
    name: string
    email: string
    department: string
    departmentId: string
    salary: number
}

export const departments: Department[] = [
    { id: '1', name: 'Human Resources', code: 'HR', description: 'Manages employee relations and recruitment', createdAt: '2024-01-01' },
    { id: '2', name: 'Engineering', code: 'ENG', description: 'Software development and technical operations', createdAt: '2024-01-01' },
    { id: '3', name: 'Sales', code: 'SALES', description: 'Customer acquisition and revenue generation', createdAt: '2024-01-01' },
    { id: '4', name: 'Finance', code: 'FIN', description: 'Financial planning and accounting', createdAt: '2024-01-01' },
    { id: '5', name: 'Operations', code: 'OPS', description: 'Business operations and process management', createdAt: '2024-01-01' },
    { id: '6', name: 'Marketing', code: 'MKT', description: 'Brand promotion and market research', createdAt: '2024-01-15' },
]

export const employees: Employee[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', department: 'Human Resources', departmentId: '1', salary: 52000 },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', department: 'Engineering', departmentId: '2', salary: 82000 },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', department: 'Sales', departmentId: '3', salary: 61000 },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', department: 'Finance', departmentId: '4', salary: 75000 },
    { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', department: 'Operations', departmentId: '5', salary: 68000 },
]

