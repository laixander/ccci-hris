import type { Notification } from '~/composables/useNotifications'

export const notificationItems: Notification[] = [
  {
    id: 1,
    title: 'Leave request approved',
    description: { name: 'HR Department', received: '1h ago' },
    content: 'Your recent leave request from Sep 12–15 has been approved. Please coordinate with your manager for workload handover.',
    read: false
  },
  {
    id: 2,
    title: 'New payslip available',
    description: { name: 'Payroll System', received: '3h ago' },
    content: 'Your payslip for August 2025 is now available. Log in to the payroll portal to review your salary breakdown and deductions.',
    read: false
  },
  {
    id: 3,
    title: 'Overtime request submitted',
    description: { name: 'John Doe', received: '5h ago' },
    content: 'You submitted an overtime request for September 1st, 6:00–9:00 PM. The request is now pending manager approval.',
    read: true
  },
  {
    id: 4,
    title: 'Upcoming performance review',
    description: { name: 'HR Manager', received: '8h ago' },
    content: 'Your annual performance review is scheduled for September 10, 2025. Please prepare your self-assessment ahead of the meeting.',
    read: false
  },
  {
    id: 5,
    title: 'Leave request pending approval',
    description: { name: 'Jane Smith', received: '12h ago' },
    content: 'Your leave request from September 20–22 is awaiting approval from your manager.',
    read: true
  },
  {
    id: 6,
    title: 'Training schedule assigned',
    description: { name: 'Learning & Dev', received: '16h ago' },
    content: 'You have been enrolled in the “Effective Communication Skills” training scheduled for September 15, 9:00 AM–12:00 NN.',
    read: false
  },
  {
    id: 7,
    title: 'Timesheet submitted',
    description: { name: 'Michael Foster', received: '1d ago' },
    content: 'Your weekly timesheet for Aug 25–31 has been successfully submitted and is pending approval.',
    read: false
  },
  {
    id: 8,
    title: 'New company policy update',
    description: { name: 'Admin', received: '2d ago' },
    content: 'A new Work From Home policy has been released. Please review the updated guidelines effective September 15.',
    read: true
  },
  {
    id: 9,
    title: 'Shift change request approved',
    description: { name: 'Operations', received: '2d ago' },
    content: 'Your request to change shifts on September 5 has been approved. Your new schedule is now reflected in the HRIS system.',
    read: false
  },
  {
    id: 10,
    title: 'Leave balance updated',
    description: { name: 'HRIS System', received: '3d ago' },
    content: 'Your annual leave balance has been updated. You now have 8 remaining leave days for 2025.',
    read: true
  },
  {
    id: 11,
    title: 'New job opening posted',
    description: { name: 'Recruitment Team', received: '4d ago' },
    content: 'A new position for “Project Coordinator” has been posted on the Careers portal. Share with your network if you know potential candidates.',
    read: false
  },
  {
    id: 12,
    title: 'Birthday reminder',
    description: { name: 'HRIS System', received: '5d ago' },
    content: 'Today is Anna Lopez’s birthday. Don’t forget to greet her and celebrate with the team!',
    read: true
  }
]