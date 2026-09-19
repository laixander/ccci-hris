import type { OnboardingRecord } from '~~/app/types'

export default defineEventHandler((): OnboardingRecord[] => {
  return [
    { id: 1, employee: 'John Doe', role: 'Software Engineer', template: 'Software Engineer Onboarding', status: 'IN PROGRESS', progress: 45, startDate: '2026-09-10' },
    { id: 2, employee: 'Jane Smith', role: 'HR Generalist', template: 'HR Generalist Onboarding', status: 'SCHEDULED', progress: 0, startDate: '2026-09-20' },
    { id: 3, employee: 'Alice Johnson', role: 'Sales Representative', template: 'Sales Representative Onboarding', status: 'COMPLETED', progress: 100, startDate: '2026-08-01' },
    { id: 4, employee: 'Michael Brown', role: 'Marketing Manager', template: 'Marketing Manager Onboarding', status: 'CANCELLED', progress: 10, startDate: '2026-08-15' },
    { id: 5, employee: 'David Wilson', role: 'Customer Support Specialist', template: 'Customer Support Onboarding', status: 'IN PROGRESS', progress: 75, startDate: '2026-09-05' },
    { id: 6, employee: 'Sarah Miller', role: 'Executive Assistant', template: 'Executive Onboarding', status: 'SCHEDULED', progress: 0, startDate: '2026-09-25' },
    { id: 7, employee: 'James Taylor', role: 'Intern', template: 'Intern Onboarding', status: 'IN PROGRESS', progress: 20, startDate: '2026-09-12' },
    { id: 8, employee: 'Jessica Anderson', role: 'Contractor', template: 'Contractor Onboarding', status: 'COMPLETED', progress: 100, startDate: '2026-07-20' },
    { id: 9, employee: 'Thomas Martinez', role: 'Software Engineer', template: 'Software Engineer Onboarding', status: 'SCHEDULED', progress: 0, startDate: '2026-09-22' },
    { id: 10, employee: 'Lisa Thomas', role: 'HR Generalist', template: 'HR Generalist Onboarding', status: 'IN PROGRESS', progress: 60, startDate: '2026-09-08' },
    { id: 11, employee: 'William Jackson', role: 'Sales Representative', template: 'Sales Representative Onboarding', status: 'SCHEDULED', progress: 0, startDate: '2026-09-28' },
    { id: 12, employee: 'Ashley White', role: 'Marketing Manager', template: 'Marketing Manager Onboarding', status: 'COMPLETED', progress: 100, startDate: '2026-06-15' }
  ]
})
