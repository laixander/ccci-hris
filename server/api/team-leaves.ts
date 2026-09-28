/**
 * Team Leaves API — returns all team members' leave records.
 * Supports optional ?year=&month= query params to filter by month.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const filterYear = query.year ? Number(query.year) : null
  const filterMonth = query.month ? Number(query.month) : null

  const teamLeaves = [
    // September 2026
    { id: 'tl-001', employee: 'MARIA ALMERON' ,        type: 'Vacation Leave',    start: '2026-09-01', end: '2026-09-05', duration: '5 day/s', status: 'APPROVED' },
    { id: 'tl-002', employee: 'JOSE REYES'          ,  type: 'Sick Leave',        start: '2026-09-02', end: '2026-09-02', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-003', employee: 'ANNA SANTOS'   ,        type: 'Emergency Leave',   start: '2026-09-03', end: '2026-09-04', duration: '2 day/s', status: 'APPROVED' },
    { id: 'tl-004', employee: 'MARK DELA CRUZ',        type: 'Vacation Leave',    start: '2026-09-08', end: '2026-09-10', duration: '3 day/s', status: 'PENDING'  },
    { id: 'tl-005', employee: 'LIZA TORRES'          , type: 'Sick Leave',        start: '2026-09-09', end: '2026-09-09', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-006', employee: 'CARLOS MENDOZA',        type: 'Birthday Leave',    start: '2026-09-10', end: '2026-09-10', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-007', employee: 'PATRICIA LIM'     ,     type: 'Vacation Leave',    start: '2026-09-11', end: '2026-09-15', duration: '5 day/s', status: 'APPROVED' },
    { id: 'tl-008', employee: 'RONALD GARCIA'        , type: 'Sick Leave',        start: '2026-09-12', end: '2026-09-13', duration: '2 day/s', status: 'DENIED'   },
    { id: 'tl-009', employee: 'SHEILA BAUTISTA',          type: 'Emergency Leave',   start: '2026-09-15', end: '2026-09-15', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-010', employee: 'FELIX NAVARRO'      ,   type: 'Maternity Leave',   start: '2026-09-16', end: '2026-09-30', duration: '15 day/s', status: 'APPROVED' },
    { id: 'tl-011', employee: 'GRACE TAN'        ,     type: 'Vacation Leave',    start: '2026-09-17', end: '2026-09-19', duration: '3 day/s', status: 'PENDING'  },
    { id: 'tl-012', employee: 'DENNIS CRUZ'     ,      type: 'Sick Leave',        start: '2026-09-18', end: '2026-09-18', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-013', employee: 'MARIA ALMERON'     ,    type: 'Paternity Leave',   start: '2026-09-22', end: '2026-09-28', duration: '7 day/s', status: 'APPROVED' },
    { id: 'tl-014', employee: 'JOSE REYES'      ,      type: 'Vacation Leave',    start: '2026-09-23', end: '2026-09-24', duration: '2 day/s', status: 'APPROVED' },
    { id: 'tl-015', employee: 'ANNA SANTOS',           type: 'Emergency Leave',   start: '2026-09-24', end: '2026-09-24', duration: '1 day/s', status: 'DENIED'   },
    { id: 'tl-016', employee: 'MARK DELA CRUZ',         type: 'Sick Leave',        start: '2026-09-25', end: '2026-09-26', duration: '2 day/s', status: 'PENDING'  },
    { id: 'tl-017', employee: 'LIZA TORRES'        ,   type: 'Vacation Leave',    start: '2026-09-29', end: '2026-09-30', duration: '2 day/s', status: 'APPROVED' },
    { id: 'tl-018', employee: 'CARLOS MENDOZA',         type: 'Birthday Leave',    start: '2026-09-30', end: '2026-09-30', duration: '1 day/s', status: 'APPROVED' },
    // October 2026
    { id: 'tl-019', employee: 'PATRICIA LIM' ,         type: 'Vacation Leave',    start: '2026-10-01', end: '2026-10-03', duration: '3 day/s', status: 'APPROVED' },
    { id: 'tl-020', employee: 'RONALD GARCIA'    ,     type: 'Sick Leave',        start: '2026-10-06', end: '2026-10-06', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-021', employee: 'SHEILA BAUTISTA' ,      type: 'Emergency Leave',   start: '2026-10-07', end: '2026-10-08', duration: '2 day/s', status: 'APPROVED' },
    { id: 'tl-022', employee: 'FELIX NAVARRO' ,        type: 'Bereavement Leave', start: '2026-10-10', end: '2026-10-12', duration: '3 day/s', status: 'APPROVED' },
    { id: 'tl-023', employee: 'GRACE TAN'           ,  type: 'Vacation Leave',    start: '2026-10-13', end: '2026-10-17', duration: '5 day/s', status: 'PENDING'  },
    { id: 'tl-024', employee: 'DENNIS CRUZ'   ,        type: 'Sick Leave',        start: '2026-10-14', end: '2026-10-14', duration: '1 day/s', status: 'DENIED'   },
    { id: 'tl-025', employee: 'MARIA ALMERON' ,        type: 'Vacation Leave',    start: '2026-10-20', end: '2026-10-23', duration: '4 day/s', status: 'APPROVED' },
    { id: 'tl-026', employee: 'JOSE REYES'    ,        type: 'Emergency Leave',   start: '2026-10-21', end: '2026-10-21', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-027', employee: 'ANNA SANTOS'      ,     type: 'Sick Leave',        start: '2026-10-27', end: '2026-10-28', duration: '2 day/s', status: 'PENDING'  },
    { id: 'tl-028', employee: 'MARK DELA CRUZ',          type: 'Vacation Leave',    start: '2026-10-29', end: '2026-10-30', duration: '2 day/s', status: 'APPROVED' },
    // August 2026
    { id: 'tl-029', employee: 'LIZA TORRES'          , type: 'Vacation Leave',    start: '2026-08-04', end: '2026-08-07', duration: '4 day/s', status: 'APPROVED' },
    { id: 'tl-030', employee: 'CARLOS MENDOZA'     ,   type: 'Sick Leave',        start: '2026-08-11', end: '2026-08-11', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-031', employee: 'PATRICIA LIM'    ,      type: 'Emergency Leave',   start: '2026-08-13', end: '2026-08-13', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-032', employee: 'RONALD GARCIA',           type: 'Vacation Leave',    start: '2026-08-18', end: '2026-08-22', duration: '5 day/s', status: 'PENDING'  },
    { id: 'tl-033', employee: 'SHEILA BAUTISTA'   ,    type: 'Birthday Leave',    start: '2026-08-20', end: '2026-08-20', duration: '1 day/s', status: 'APPROVED' },
    { id: 'tl-034', employee: 'FELIX NAVARRO'      ,   type: 'Sick Leave',        start: '2026-08-25', end: '2026-08-26', duration: '2 day/s', status: 'DENIED'   },
    { id: 'tl-035', employee: 'GRACE TAN'    ,         type: 'Vacation Leave',    start: '2026-08-27', end: '2026-08-28', duration: '2 day/s', status: 'APPROVED' },
  ]

  if (filterYear && filterMonth) {
    return teamLeaves.filter(leave => {
      const start = new Date(leave.start)
      const end = new Date(leave.end)
      const rangeStart = new Date(filterYear, filterMonth - 1, 1)
      const rangeEnd = new Date(filterYear, filterMonth, 0)
      return start <= rangeEnd && end >= rangeStart
    })
  }

  return teamLeaves
})
