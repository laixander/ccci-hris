import type { PerformanceData } from '~~/app/types'

export default defineEventHandler((): PerformanceData => {
  return {
    radar: {
      selfEvaluation: [4.5, 3.8, 4.2, 4.8, 4.5, 4.0],
      managerEvaluation: [4.2, 4.0, 4.5, 4.5, 4.2, 4.3]
    },
    historical: {
      yourScore: [3.8, 4.0, 4.1, 4.2],
      companyAverage: [3.5, 3.6, 3.8, 3.7]
    },
    okrs: [
      { id: 1, title: 'Launch New Internal Dashboard', progress: 100, status: 'Completed', color: 'success' },
      { id: 2, title: 'Reduce Onboarding Time by 20%', progress: 75, status: 'On Track', color: 'primary' },
      { id: 3, title: 'Implement Automated Testing Suite', progress: 40, status: 'At Risk', color: 'warning' },
      { id: 4, title: 'Improve Employee Retention Rate', progress: 90, status: 'On Track', color: 'primary' }
    ],
    feedbackList: [
      { id: 1, author: 'Maxiane Maniquiz', role: 'Direct Manager', rating: '4.5', comment: 'Consistently delivers high-quality work and mentors junior team members effectively.' },
      { id: 2, author: 'Alex Chen', role: 'Peer', rating: '4.8', comment: 'Great collaborator. Always willing to jump in and help troubleshoot complex issues.' },
      { id: 3, author: 'Sarah Jenkins', role: 'Peer', rating: '4.2', comment: 'Strong technical skills, but could improve on cross-departmental communication.' }
    ]
  }
})
