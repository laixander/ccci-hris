import type { StatCardProps } from '~/types/models'

export const statDashboardCards: StatCardProps[] = [
  {
    icon: 'i-lucide-users',
    color: 'success',
    label: 'Total Partners',
    count: 156,
    trendValue: '+12%',
    trendDescription: 'Active institutional partnerships',
  },
  {
    icon: 'i-lucide-file-text',
    color: 'secondary',
    label: 'Active MOUs',
    count: 89,
    trendValue: '+5%',
    trendDescription: 'Currently valid agreements',
  },
  {
    icon: 'i-lucide-folder-open',
    color: 'warning',
    label: 'Ongoing Activities',
    count: 34,
    trendValue: '-8%',
    trendDescription: 'Projects in progress',
  },
  {
    icon: 'i-lucide-info',
    color: 'error',
    label: 'Expiring Soon',
    count: 7,
    trendValue: '-2%',
    trendDescription: 'MOUs expiring in 60 days',
  },
]