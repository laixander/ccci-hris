import type { OnboardingTemplate } from '~~/app/types'

export default defineEventHandler((): OnboardingTemplate[] => {
  return [
    {
      id: 1,
      name: 'Software Engineer Onboarding',
      description: 'Standard onboarding for new software engineers',
      status: 'PUBLISHED',
      tasks: [],
      dateCreated: 'October 1, 2023 at 09:00 AM',
    },
    {
      id: 2,
      name: 'HR Generalist Onboarding',
      description: 'Standard onboarding for new HR generalists',
      status: 'PUBLISHED',
      tasks: [],
      dateCreated: 'October 2, 2023 at 10:30 AM',
    },
    {
      id: 3,
      name: 'Sales Representative Onboarding',
      description: 'Standard onboarding for new sales representatives',
      status: 'DRAFT',
      tasks: [],
      dateCreated: 'October 5, 2023 at 01:15 PM',
    },
    {
      id: 4,
      name: 'Marketing Manager Onboarding',
      description: 'Standard onboarding for new marketing managers',
      status: 'PUBLISHED',
      tasks: [],
      dateCreated: 'October 10, 2023 at 11:45 AM',
    },
    {
      id: 5,
      name: 'Customer Support Onboarding',
      description: 'Standard onboarding for new customer support specialists',
      status: 'DRAFT',
      tasks: [],
      dateCreated: 'October 12, 2023 at 03:20 PM',
    },
    {
      id: 6,
      name: 'Executive Onboarding',
      description: 'Standard onboarding for new executives',
      status: 'PUBLISHED',
      tasks: [],
      dateCreated: 'October 15, 2023 at 08:30 AM',
    },
    {
      id: 7,
      name: 'Intern Onboarding',
      description: 'Standard onboarding for new interns',
      status: 'DRAFT',
      tasks: [],
      dateCreated: 'October 20, 2023 at 02:00 PM',
    },
    {
      id: 8,
      name: 'Contractor Onboarding',
      description: 'Standard onboarding for new contractors',
      status: 'PUBLISHED',
      tasks: [],
      dateCreated: 'October 25, 2023 at 04:45 PM',
    },
  ]
})
