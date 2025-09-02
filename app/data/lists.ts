import type { Notification } from '~/composables/useNotifications'

export const notificationItems: Notification[] = [
    {
        id: 1,
        title: 'Leave request approved',
        description: { name: 'HR Department', received: '1h ago' },
        read: false
    },
    {
        id: 2,
        title: 'New payslip available',
        description: { name: 'Payroll System', received: '3h ago' },
        read: false
    },
    {
        id: 3,
        title: 'Overtime request submitted',
        description: { name: 'John Doe', received: '5h ago' },
        read: true
    },
    {
        id: 4,
        title: 'Upcoming performance review',
        description: { name: 'HR Manager', received: '8h ago' },
        read: false
    },
    {
        id: 5,
        title: 'Leave request pending approval',
        description: { name: 'Jane Smith', received: '12h ago' },
        read: true
    },
    {
        id: 6,
        title: 'Training schedule assigned',
        description: { name: 'Learning & Dev', received: '16h ago' },
        read: false
    },
    {
        id: 7,
        title: 'Timesheet submitted',
        description: { name: 'Michael Foster', received: '1d ago' },
        read: false
    },
    {
        id: 8,
        title: 'New company policy update',
        description: { name: 'Admin', received: '2d ago' },
        read: true
    },
    {
        id: 9,
        title: 'Shift change request approved',
        description: { name: 'Operations', received: '2d ago' },
        read: false
    },
    {
        id: 10,
        title: 'Leave balance updated',
        description: { name: 'HRIS System', received: '3d ago' },
        read: true
    },
    {
        id: 11,
        title: 'New job opening posted',
        description: { name: 'Recruitment Team', received: '4d ago' },
        read: false
    },
    {
        id: 12,
        title: 'Birthday reminder',
        description: { name: 'HRIS System', received: '5d ago' },
        read: true
    }
]
