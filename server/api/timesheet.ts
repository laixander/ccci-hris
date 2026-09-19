import type { TimesheetRecord, TimeAdjustmentRecord } from '~~/app/types'

export default defineEventHandler(() => {
    const timeAdjustmentData: TimeAdjustmentRecord[] = [
        { dateApplied: 'Sept 06, 2026', date: 'Sept 01, 2026', currentTimeIn: '09:32 AM', currentTimeOut: '06:45 PM', timeIn: '09:00 AM', timeOut: '06:00 PM', duration: 9, status: 'PENDING' },
        { dateApplied: 'Aug 21, 2026', date: 'Aug 20, 2026', currentTimeIn: '08:15 AM', currentTimeOut: '05:30 PM', timeIn: '08:00 AM', timeOut: '05:00 PM', duration: 9, status: 'APPROVED' },
    ]

    const records: TimesheetRecord[] = [
        { day: 1,  timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 2,  timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 3,  timeIn: '08:08:00 AM', timeOut: '05:02:00 PM', duration: 8.90, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 4,  timeIn: null,          timeOut: null,         duration: 0,    status: 'ON LEAVE', overtime: 0, late: 0, undertime: 0, leave: 8.00, lwop: 0    },
        { day: 5,  timeIn: '08:07:00 AM', timeOut: '05:00:00 PM', duration: 8.88, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 6,  timeIn: '07:55:00 AM', timeOut: '05:04:00 PM', duration: 9.15, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 7,  timeIn: '07:32:00 AM', timeOut: '05:08:00 PM', duration: 9.60, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 8,  timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 9,  timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 10, timeIn: '07:30:00 AM', timeOut: '05:05:00 PM', duration: 9.58, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 11, timeIn: null,          timeOut: null,         duration: 0,    status: 'ON LEAVE', overtime: 0, late: 0, undertime: 0, leave: 8.00, lwop: 0    },
        { day: 12, timeIn: '08:06:00 AM', timeOut: '05:02:00 PM', duration: 8.93, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 13, timeIn: '08:06:00 AM', timeOut: '05:01:00 PM', duration: 8.92, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 14, timeIn: '07:32:00 AM', timeOut: '05:23:00 PM', duration: 9.85, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 15, timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 16, timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 17, timeIn: null,          timeOut: null,         duration: 0,    status: 'LWOP',     overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 8.00 },
        { day: 18, timeIn: '07:31:00 AM', timeOut: '05:11:00 PM', duration: 9.67, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 19, timeIn: '07:57:00 AM', timeOut: '05:00:00 PM', duration: 9.05, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 20, timeIn: '07:57:00 AM', timeOut: '05:00:00 PM', duration: 9.05, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 21, timeIn: null,          timeOut: null,         duration: 0,    status: 'HOLIDAY',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 22, timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 23, timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 24, timeIn: '08:04:00 AM', timeOut: '05:02:00 PM', duration: 8.97, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 25, timeIn: '07:37:00 AM', timeOut: '05:01:00 PM', duration: 9.40, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 26, timeIn: '08:06:00 AM', timeOut: '05:00:00 PM', duration: 8.90, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 27, timeIn: '08:08:00 AM', timeOut: '05:01:00 PM', duration: 8.88, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 28, timeIn: '07:21:00 AM', timeOut: '05:13:00 PM', duration: 9.87, status: 'PRESENT',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 29, timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 30, timeIn: null,          timeOut: null,         duration: 0,    status: 'WEEKEND',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
        { day: 31, timeIn: null,          timeOut: null,         duration: 0,    status: 'HOLIDAY',  overtime: 0, late: 0, undertime: 0, leave: 0,    lwop: 0    },
    ]

    return {
        records,
        adjustments: timeAdjustmentData
    }
})
