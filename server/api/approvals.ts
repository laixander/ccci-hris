import type { ApprovalRequest } from '~~/app/types'

export default defineEventHandler((): ApprovalRequest[] => {
    return [
        {
            id: 1,
            requestType: 'leave',
            employee: { name: 'Alice Smith', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice', role: 'Software Engineer' },
            type: 'Vacation',
            scheduleType: 'Whole Day',
            startDate: '2026-08-20',
            endDate: '2026-08-25',
            duration: '4 Days',
            reason: 'Annual family trip',
            dateApplied: '2026-08-10',
            status: 'PENDING',
            approvers: [
                { role: 'Manager', name: 'Bob Jones', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            ],
            timeline: [
                { title: 'Manager Approved', description: 'Have a great trip!', date: '2026-08-11', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { title: 'Leave Request Submitted', description: 'Annual family trip', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice' }
            ]
        },
        {
            id: 2,
            requestType: 'leave',
            employee: { name: 'David Brown', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=David', role: 'UX Designer' },
            type: 'Sick Leave',
            scheduleType: 'Half Day (AM)',
            startDate: '2026-08-14',
            endDate: '2026-08-15',
            duration: '2 Days',
            reason: 'Flu and high fever',
            dateApplied: '2026-08-10',
            status: 'PENDING',
            approvers: [
                { role: 'Manager', name: 'Bob Jones', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            ],
            timeline: [
                { title: 'Leave Request Submitted', description: 'Flu and high fever', date: '2026-08-14', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=David' }
            ]
        },
        {
            id: 3,
            requestType: 'leave',
            employee: { name: 'Eve Davis', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Eve', role: 'Marketing Specialist' },
            type: 'Maternity',
            scheduleType: 'Whole Day',
            startDate: '2026-09-01',
            endDate: '2026-12-01',
            duration: '3 Months',
            reason: 'Maternity leave',
            dateApplied: '2026-08-10',
            status: 'APPROVED',
            approvers: [
                { role: 'Manager', name: 'Bob Jones', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { role: 'Director', name: 'Frank Miller', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { role: 'HR', name: 'Carol White', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            ],
            timeline: [
                { title: 'HR Approved', description: 'Approved by HR', date: '2026-07-05', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
                { title: 'Director Approved', description: 'Approved by Director', date: '2026-07-04', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { title: 'Manager Approved', description: 'Approved by Manager', date: '2026-07-02', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { title: 'Leave Request Submitted', description: 'Maternity leave', date: '2026-07-01', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Eve' }
            ]
        },
        {
            id: 4,
            requestType: 'leave',
            employee: { name: 'Charlie Clark', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Charlie', role: 'QA Tester' },
            type: 'Unpaid Leave',
            scheduleType: 'Whole Day',
            startDate: '2026-08-18',
            endDate: '2026-08-20',
            duration: '3 Days',
            reason: 'Personal errands',
            dateApplied: '2026-08-10',
            status: 'REJECTED',
            approvers: [
                { role: 'Manager', name: 'Bob Jones', status: 'REJECTED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            ],
            timeline: [
                { title: 'Manager Rejected', description: 'Need you during this critical release phase.', date: '2026-08-11', icon: 'i-lucide-x-circle', color: 'red', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { title: 'Leave Request Submitted', description: 'Personal errands', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Charlie' }
            ]
        },
        {
            id: 5,
            requestType: 'overtime',
            employee: { name: 'John Doe', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=John', role: 'Frontend Developer' },
            type: 'Regular Overtime',
            date: '2026-08-20',
            timeStart: '18:00',
            timeEnd: '22:00',
            duration: '4 Hours',
            reason: 'Urgent bug fixes for release',
            dateApplied: '2026-08-19',
            status: 'PENDING',
            approvers: [
                { role: 'Manager', name: 'Bob Jones', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            ],
            timeline: [
                { title: 'Overtime Request Submitted', description: 'Urgent bug fixes for release', date: '2026-08-19', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=John' }
            ]
        },
        {
            id: 6,
            requestType: 'adjustment',
            employee: { name: 'Sarah Lee', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Sarah', role: 'Backend Developer' },
            type: 'Time Adjustment',
            date: '2026-09-06',
            currentTimeStart: '09:32',
            currentTimeEnd: '18:45',
            timeStart: '09:00',
            timeEnd: '18:00',
            duration: '9 Hours',
            reason: 'Forgot to clock in due to network issue',
            dateApplied: '2026-09-07',
            status: 'PENDING',
            approvers: [
                { role: 'Manager', name: 'Bob Jones', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
                { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
                { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            ],
            timeline: [
                { title: 'Time Adjustment Submitted', description: 'Forgot to clock in due to network issue', date: '2026-09-07', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Sarah' }
            ]
        }
    ]
})
