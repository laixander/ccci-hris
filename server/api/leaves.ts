import type { LeavesData } from '~~/app/types'

export default defineEventHandler((): LeavesData => {
  return {
    kpis: [
      { label: 'Sick', icon: 'i-lucide-thermometer', color: 'text-rose-500', bg: 'bg-rose-500/10', value: '0.00', sublabel: 'DAYS REMAINING' },
      { label: 'Vacation', icon: 'i-lucide-plane', color: 'text-sky-500', bg: 'bg-sky-500/10', value: '0.00', sublabel: 'DAYS REMAINING' },
      { label: 'Birthday', icon: 'i-lucide-cake', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10', value: '1.00', sublabel: 'DAYS REMAINING' },
      { label: 'Others', icon: 'i-lucide-calendar-check', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: '0.00', sublabel: 'DAYS REMAINING' }
    ],
    ledger: [
      { date: 'September 01, 2026 at 04:57 PM', leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'September 01, 2026 at 04:57 PM', leaveType: 'Vacation Leave', credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'August 20, 2026 at 03:03 PM',    leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'August 13, 2026 at 10:03 AM',    leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'August 10, 2026 at 02:36 PM',    leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'August 04, 2026 at 03:31 PM',    leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'August 04, 2026 at 03:31 PM',    leaveType: 'Vacation Leave', credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'July 29, 2026 at 10:08 AM',      leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'July 28, 2026 at 07:29 AM',      leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'July 28, 2026 at 07:28 AM',      leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 2, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'July 24, 2026 at 05:27 PM',      leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'July 08, 2026 at 05:38 PM',      leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'July 01, 2026 at 07:54 AM',      leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 2, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'July 01, 2026 at 07:54 AM',      leaveType: 'Vacation Leave', credit: 2,    debit: null, balance: 3, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'June 08, 2026 at 04:38 PM',      leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'June 04, 2026 at 01:32 PM',      leaveType: 'Birthday Leave', credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'June 03, 2026 at 09:16 AM',      leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 2, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'June 03, 2026 at 09:04 AM',      leaveType: 'Vacation Leave', credit: 1,    debit: null, balance: 2, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
      { date: 'May 28, 2026 at 10:26 PM',       leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
      { date: 'May 14, 2026 at 08:50 AM',       leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
    ],
    leaves: [
      {
        id: 1,
        dateApplied: 'August 17, 2026 at 09:16 AM',
        type: 'Emergency Leave',
        start: 'August 17, 2026',
        end: 'August 17, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 2,
        dateApplied: 'August 11, 2026 at 07:24 AM',
        type: 'Emergency Leave',
        start: 'August 11, 2026',
        end: 'August 11, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 3,
        dateApplied: 'August 04, 2026 at 08:56 AM',
        type: 'Sick Leave',
        start: 'August 04, 2026',
        end: 'August 04, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 4,
        dateApplied: 'July 27, 2026 at 09:51 AM',
        type: 'Emergency Leave',
        start: 'July 27, 2026',
        end: 'July 27, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 5,
        dateApplied: 'July 21, 2026 at 06:22 AM',
        type: 'Emergency Leave',
        start: 'July 21, 2026',
        end: 'July 21, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 6,
        dateApplied: 'July 20, 2026 at 08:40 AM',
        type: 'Emergency Leave',
        start: 'July 20, 2026',
        end: 'July 20, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 7,
        dateApplied: 'July 16, 2026 at 09:55 AM',
        type: 'Sick Leave',
        start: 'July 16, 2026',
        end: 'July 16, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 8,
        dateApplied: 'July 02, 2026 at 09:23 AM',
        type: 'Sick Leave',
        start: 'July 02, 2026',
        end: 'July 02, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 9,
        dateApplied: 'June 04, 2026 at 09:11 AM',
        type: 'Sick Leave',
        start: 'June 04, 2026',
        end: 'June 04, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 10,
        dateApplied: 'May 28, 2026 at 08:50 AM',
        type: 'Emergency Leave',
        start: 'May 28, 2026',
        end: 'May 28, 2026',
        duration: '1 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 11,
        dateApplied: 'April 15, 2026 at 10:30 AM',
        type: 'Vacation Leave',
        start: 'May 01, 2026',
        end: 'May 05, 2026',
        duration: '5 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 12,
        dateApplied: 'April 02, 2026 at 02:15 PM',
        type: 'Sick Leave',
        start: 'April 03, 2026',
        end: 'April 04, 2026',
        duration: '2 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 13,
        dateApplied: 'March 20, 2026 at 11:00 AM',
        type: 'Maternity Leave',
        start: 'July 01, 2026',
        end: 'October 28, 2026',
        duration: '120 day/s',
        status: 'PENDING',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 14,
        dateApplied: 'February 10, 2026 at 09:45 AM',
        type: 'Paternity Leave',
        start: 'March 15, 2026',
        end: 'March 21, 2026',
        duration: '7 day/s',
        status: 'APPROVED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      },
      {
        id: 15,
        dateApplied: 'January 05, 2026 at 08:30 AM',
        type: 'Bereavement Leave',
        start: 'January 06, 2026',
        end: 'January 08, 2026',
        duration: '3 day/s',
        status: 'REJECTED',
        approvers: [
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
          { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
        ]
      }
    ]
  }
})
